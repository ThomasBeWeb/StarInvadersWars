function updateScreen() {

    screenElements.forEach(function(element) {

        if (element.lives > 0) {
    
            switch (element.type) {
      
            case "Ship":

                //MAJ
                element.coordX = mouseX - 32.5;  //La position de la souris
              
                //Test Collision
                screenElements.forEach(function(testAlien) {  //Test collision avec Aliens

                    if ((testAlien.type == "Alien" || testAlien.type == "BigBoss") && testAlien.lives > 0) {
                        if (collision(starShip, testAlien)) {
                            // explosionShip.play();
                            // explosionShip.rewind();
                            starShip.lives = 0;
                        }
                    }
                })
                break;
      
            case "Alien":

                //MAJ
                element.coordY += element.vitesse;  //le Y est incremente de la vitesse definie par le level

                //Decompte aleatoire du compteur de tir, pour creer un decalage des tirs entre les aliens
                if (loto (50)) element.shot -= 1;
                break;
      
            case "ShotShip":

                //MAJ
                element.coordY = element.coordY + (element.direction * element.vitesse);
                
                //Test Collision
                if (element.coordY <= 0) { //Si Le tir est arrive en haut, il est supprime
                    element.lives -= 1;
                    starShip.shot = 1; //Le vaisseau est de nouveau autorise a tirer

                }else{ //Test collision avec Aliens ou BigBoss

                    screenElements.forEach(function(testAlien) {

                        if (testAlien.type == "Alien" && testAlien.lives > 0) {  //Si Alien

                            if (collision(element, testAlien)) {
                                // explosionAlien.play();
                                // explosionAlien.rewind();
                                element.lives -= 1;
                                starShip.shot = 1;
                                testAlien.lives -= 1;
                                nbAliens--;
                            }

                        }else if(testAlien.type == "BigBoss" && testAlien.lives > 0) {  //Si BigBoss

                            if (collision(element, testAlien)) {

                                if (loto (50)) {  //Le bigBoss a 1 chance sur 2 d'eviter le tir
                                    // explosionAlien.play();
                                    // explosionAlien.rewind();
                                    element.lives -= 1;
                                    starShip.shot = 1;
                                    testAlien.lives -= 1;
                                    trajectoireBB(60); //Le bigBoss s'ecarte pour eviter d'etre touche 2 fois de suite
                                    bigBoss.show();
                                    // esquive.play();
                                    // esquive.rewind();
                                }else{
                                    trajectoireBB(60); //Nouvelles coordonnees d'esquive
                                    bigBoss.show();

                                    if (collision(element, testAlien)) {  //Malgres l'esquive, le test de colission est relance
                                        //explosionAlien.play();
                                        element.lives -= 1;
                                        starShip.shot = 1;
                                        testAlien.lives -= 1;
                                    }else{
                                        //   esquive.play();
                                        //   esquive.rewind();
                                    }
                                }
                            }
                        }
                    })
                }
                break;

            case "ShotAlien":

                //MAJ
                element.coordY = element.coordY + (element.direction * element.vitesse); //L'ancienne coordonne en Y est additionne a la vitesse * 1 ou -1 pour diriger le tir vers le bas ou haut
              
                //Test Collision
                if (element.coordY >= 800) { //Si Le tir est arrive en bas, il est supprime
                    element.lives -= 1;

                }else{ //Test collision avec Vaisseau

                    if (collision(element, starShip)) {
                    //   explosionShip.play();
                    //   explosionShip.rewind();
                    element.lives -= 1;  //Le tir est supprime
                    starShip.lives -= 1;  //le vaisseau perd une vie
                    }
                }
                break;
      
            case "BigBoss":

                //MAJ
                trajectoireBB(bigBoss.vitesse);
                element.shot -= 1;  //compteur shot decroit de 1
                break;
      
            default:
                break;
            }
        }

    })

    // TIR DES ALIENS ET BIG BOSS

    for (var u = 0; u < screenElements.length; u++) {

        var alienForShot = screenElements[u];

        if ((alienForShot.type === "Alien" || alienForShot.type === "BigBoss") && alienForShot.lives > 0 && alienForShot.shot == 0) {

            if (loto(probaShot)) {  // Pour chaque Alien, le tir automatique est declenche aleatoirement

                if (alienForShot.type == "Alien") {  //Differenciation Alien et BigBoss
                    // shootAlien.play();
                    // shootAlien.rewind();
                    var shotAlien = new Objet("ShotAlien");
                    shotAlien.coordX = alienForShot.coordX + (alienForShot.largeur/ 2);  // Le tir part du milieu de l'alien
                    shotAlien.coordY = alienForShot.coordY + alienForShot.hauteur;  // Le tir au dessous de l'alien
                    screenElements.push(shotAlien);

                } else {  //4 tirs crees pour le BigBoss

                    var coordXTirs = [2.5, 12.5, 52.5, 63.5];

                    for (var i = 0; i < coordXTirs.length ; i++) {
                        var shotAlien = new Objet("ShotAlien");
                        shotAlien.coordX = alienForShot.coordX + coordXTirs[i];
                        shotAlien.coordY = alienForShot.coordY + 60;
                        screenElements.push(shotAlien);
                    }
                }
            }
            
            alienForShot.shot = compteurTirAlien;  //Reset du compteur
        }
    }
}