//Variables
var fond;
var nbAliens, compteurTirAlien, level = 0, decompteScore, playerScore = 0, bossDirX = 1, bossDirY = 1;
var vitesse, probaShot;
var changeLevel = true, pause = false;



function preload() {
    fond0 = loadImage("img/level0.jpg");
    fond1 = loadImage("img/level1.jpg");
    fond2 = loadImage("img/level2.jpg");
    fond3 = loadImage("img/level3.jpg");
    fond4 = loadImage("img/level4.jpg");
}

function setup() {
    createCanvas(1400, 800);

    

  }



function draw() {
    
    switch (level) {

        case 0:  //Ecran demarrage du jeu
      
          intro.play();
          starShip.create("Ship");  //Creation du vaisseau
          LoadLevel(0);    //Chargement parametres
          noLoop();  //Level debloque par methode keyPressed()  (MethodesDiverses)
          break;
      
          //Levels 1 a 4
        case 1:
        case 2:
        case 3:
        case 4:
      
          if (changeLevel) {  //Si changeLevel est vrai, les nouveaux parametres sont definis
      
            LoadLevel(level);
            background(fond);
            screenElements.clear();  //Reset de la liste
            screenElements.add(starShip);  //Ajout du vaisseau
      
            if (level >= 1 && level <= 3) {  //Chaque Alien est cree puis ajoute a screenElements
      
              float startX = 700 - ((nbAliens*45+(nbAliens-1)*35)/2);  //point de depart en X de la serie d'aliens calcule pour qu'ils apparaissent centres dans la fenetre
      
              for (int i = 0; i < nbAliens; i++) {
                Objet newAlien = new Objet();
                newAlien.create("Alien");
                newAlien.coordX = startX + (75 * i);  //En fonction de sa position dans le groupe, son X est calcule a partir du startX incremente de i fois
                newAlien.shot = compteurTirAlien;
                newAlien.vitesse = vitesse;
                screenElements.add (newAlien);
              }
            } else {  //Le Big Boss est cree puis ajoute a screenElements
              bigBoss.create("BigBoss");
              bigBoss.shot = compteurTirAlien;
              screenElements.add (bigBoss);
            }
      
            changeLevel = false;  //changeLevel passe en false jusqu'a la fin du level
          } else {  //Level en cours
      
            ///AFFICHAGE DES OBJETS EN VIE
            background(fond);
            showMustGoOn();   //Cf MethodesDiverses
      
            ////LIFES (Affichage des coeurs a l'ecran)
      
            for (int a = 0; a < starShip.lives; a++) {  //Vies du vaisseau
              Objet heart = new Objet();
              heart.create("Heart");
              heart.coordX += (a*50); //Chaque coeur espace de 15 pixels + 35 pixels du coeur precedent
              heart.show();
            }
            if (level == 4) {
              for (int a = 0; a < bigBoss.lives; a++) {  //Vies du BigBoss
                Objet alienHeart = new Objet();
                alienHeart.create("Heart");
                alienHeart.coordX += (1125 + a * 50); //Le groupe de coeur demarre a x = 1145
                alienHeart.colorsCodes.set(0, 1);  //Couleur rouge changee en noir
                alienHeart.show();
              }
            }
      
            ////UPDATE DE TOUS LES ELEMENTS EN VIE
      
            if (screenElements.size() > 0) {
              for (Objet element : screenElements) {
      
                if (element.lives > 0) {
      
                  switch (element.type) {
      
                  case "Ship":
                    element.coordX = mouseX - 32.5;  //La position de la souris represente le milieu du vaisseau, il faut donc calculer la valeur en X pour le cote gauche du rectangle
                    break;
      
                  case "Alien":
                    element.coordY += element.vitesse;  //le Y est incremente de la vitesse definie par le level
                    //Decompte aleatoire du compteur de tir, pour creer un decalage des tirs entre les aliens
                    if (loto (50)) element.shot -= 1; //Cf MethodesDiverses
                    break;
      
                  case "ShotShip":
                  case "ShotAlien":
                    element.coordY = element.coordY + (element.direction * element.vitesse); //L'ancienne coordonne en Y est additionne a la vitesse * 1 ou -1 pour diriger le tir vers le bas ou haut
                    break;
      
                  case "BigBoss":
                    trajectoireBB(bigBoss.vitesse);
                    element.shot -= 1;  //compteur shot decroit de 1
                    break;
      
                  default:
                    break;
                  }
                }
              }
            }
      
            ////TIR VAISSEAU (Un seul tir possible a la fois)
      
            if (starShip.shot == 1 && mousePressed == true) {
      
              starShip.shot = 0; //Le tir n'est plus possible
      
              ///Creation du tir
              fire.play();
              fire.rewind();
              Objet shotShip = new Objet();
              shotShip.create("ShotShip");
              shotShip.coordX = starShip.coordX + (starShip.largeur / 2);  // Le tir part du milieu du vaisseau
              shotShip.coordY = starShip.coordY;  // Le tir part du haut du vaisseau
              screenElements.add(shotShip);
            }
      
      
            // TIR DES ALIENS ET BIG BOSS
      
            for (int u = 0; u < screenElements.size(); u++) {
      
              Objet alienForShot = screenElements.get(u);
      
              if ((alienForShot.type == "Alien" || alienForShot.type == "BigBoss") && alienForShot.lives > 0 && alienForShot.shot == 0) {
      
                if (loto(probaShot)) {  // Pour chaque Alien, le tir automatique est declenche aleatoirement
      
                  if (alienForShot.type == "Alien") {  //Differenciation Alien et BigBoss
                    shootAlien.play();
                    shootAlien.rewind();
                    Objet shotAlien = new Objet();
                    shotAlien.create("ShotAlien");
                    shotAlien.coordX = alienForShot.coordX + (alienForShot.largeur/ 2);  // Le tir part du milieu de l'alien
                    shotAlien.coordY = alienForShot.coordY + alienForShot.hauteur;  // Le tir au dessous de l'alien
                    screenElements.add(shotAlien);
                  } else {  //4 tirs crees pour le BigBoss
      
                    float[] coordXTirs = {2.5, 12.5, 52.5, 63.5};
      
                    for (int i = 0; i < 4; i++) {
                      Objet shotAlien = new Objet();
                      shotAlien.create("ShotAlien");
                      shotAlien.coordX = alienForShot.coordX + coordXTirs[i];
                      shotAlien.coordY = alienForShot.coordY + 60;
                      screenElements.add(shotAlien);
                    }
                  }
                }
                alienForShot.shot = compteurTirAlien;  //Reset du compteur
              }
      
      
              ////COLLISIONS
      
              for (Objet testElement : screenElements) {
      
                if (testElement.lives > 0) {
      
                  switch (testElement.type) {
      
                  case "ShotAlien":
      
                    if (testElement.coordY >= 800) { //Si Le tir est arrive en bas, il est supprime
                      testElement.lives -= 1;
                    } else { //Test collision avec Vaisseau
                      if (collision(testElement, starShip)) {
                        explosionShip.play();
                        explosionShip.rewind();
                        testElement.lives -= 1;  //Le tir est supprime
                        starShip.lives -= 1;  //le vaisseau perd une vie
                      }
                    }
                    break;
      
                  case "ShotShip":
      
                    if (testElement.coordY <= 0) { //Si Le tir est arrive en haut, il est supprime
                      testElement.lives -= 1;
                      starShip.shot = 1; //Le vaisseau est de nouveau autorise a tirer
                    } else { //Test collision avec Aliens ou BigBoss
      
                      for (Objet testAlien : screenElements) {
      
                        if (testAlien.type == "Alien" && testAlien.lives > 0) {  //Si Alien
      
                          if (collision(testElement, testAlien)) {
                            explosionAlien.play();
                            explosionAlien.rewind();
                            testElement.lives -= 1;
                            starShip.shot = 1;
                            testAlien.lives -= 1;
                            nbAliens--;
                          }
                        } else if (testAlien.type == "BigBoss" && testAlien.lives > 0) {  //Si BigBoss
      
                          if (collision(testElement, testAlien)) {
      
                            if (loto (50)) {  //Le bigBoss a 1 chance sur 2 d'eviter le tir
                              explosionAlien.play();
                              explosionAlien.rewind();
                              testElement.lives -= 1;
                              starShip.shot = 1;
                              testAlien.lives -= 1;
                              trajectoireBB(60); //Le bigBoss s'ecarte pour eviter d'etre touche 2 fois de suite
                              bigBoss.show();
                              esquive.play();
                              esquive.rewind();
                            } else {
                              trajectoireBB(60); //Nouvelles coordonnees d'esquive
                              bigBoss.show();
                              if (collision(testElement, testAlien)) {  //Malgres l'esquive, le test de colission est relance
                                explosionAlien.play();
                                testElement.lives -= 1;
                                starShip.shot = 1;
                                testAlien.lives -= 1;
                              } else {
                                esquive.play();
                                esquive.rewind();
                              }
                            }
                          }
                        }
                      }
                    }
                    break;
      
                  case "Ship":
      
                    for (Objet testAlien : screenElements) {  //Test collision avec Aliens
                      if ((testAlien.type == "Alien" || testAlien.type == "BigBoss") && testAlien.lives > 0) {
                        if (collision(starShip, testAlien)) {
                          explosionShip.play();
                          explosionShip.rewind();
                          starShip.lives = 0;
                        }
                      }
                    }
                    break;
      
                  default:
                    break;
                  }
                }
              }
            }
}