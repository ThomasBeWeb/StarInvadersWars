/*
Cette class Objet permet de creer un element affiche a l'ecran: Elle sera la base du vaisseau, des aliens, des tirs, des coeurs (vies) et du big boss
 
 Chaque objet est definit par un rectangle (hauteur et largeur) et des coordonnees de son coin superieur gauche (coordX et coordY)
 
 A l'interieur de ce rectangle, une matrice (matrix) definit si chaque pixel est colore ou non pour former le dessin de l'objet
 
 Tous les elements seront dessines suivant un pattern de carres de 5 pixels de cote
 Pour les dessiner, ume methode unique parcourt la matrice par groupe de 5 pixels en largeur sur 5 pixels en hauteur, si le 1er pixel est allume, le carre est dessine
 
 Ses autres parametres sont:
 - son nombre de vies
 - son type: Alien, Vaisseau, TirAlien, TirVaisseau ou Boss
 - sa ou ses couleurs
 - sa direction sur l'axe vertical, vers le haut (-1) / bas (1) de l'ecran, ou horizontal (0)
 - sa vitesse de deplacement en pixels / frame
 
 Parametre specifique au vaisseau, aux aliens et au BigBoss
 - Une variable qui informe s'ils sont autorises a tirer (ils ne peuvent produire qu'un tir a la fois)
 */

var Objet = {

  ////PARAMETRES

  type: "",  //Alien, Ship, Shot ou Boss
  largeur: 0,  //largeur du rectangle
  hauteur: 0,  //hauteur du rectangle
  coordX: 0, //coordonnee X de son coin superieur gauche
  coordY: 0,  //coordonnee Y de son coin superieur gauche
  lives: 0,  //Nombre de vies

  matrix: [],  //matrice d'etat des pixels

  colorsCodes: [], //liste des codes couleurs

  direction: 0,  //Direction en Y
  vitesse: 0,  //vitesse de propagation

  shot: 0,  //Autorisation de tirer ou non

  ////METHODES

  create: function () { //Methode de creation d'un objet en fonction de son type

    var pattern = [];  //Pattern des carres de 5 pixels

    //Definition des parametres selon le type d'objet

    switch (this.type) {

      case "Ship":

        this.largeur = 65;
        this.hauteur = 35;
        this.coordY = 700;  //Le vaisseau se dirige sur un axe horizontal a 100 pixels du bas de la fenetre (y = 700), position du haut du vaisseau
        this.direction = 0;
        this.vitesse = 0;  //Pas de vitesse specifique pour le vaisseau
        this.shot = 1;  //Pour le vaisseau, l'autorisation de tirer est binaire: 0 = non autorise, 1 = autorise
        this.ives = 5;

        int shipPattern[] = {0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1};

        for (int carre : shipPattern) {
          pattern.add(carre);
        }

        int listColors[] = {1, 2, 2, 2, 3, 2, 2, 2, 4, 2, 2, 2, 3, 3, 3, 2, 2, 4, 4, 4, 2, 2, 3, 3, 3, 3, 3, 2, 2, 4, 4, 4, 1, 2, 3, 3, 3, 3, 3, 2, 2, 2, 2, 2, 3, 3, 3, 5, 6, 7, 8, 7, 6, 5, 3};
        for (int couleur : listColors) {
          colorsCodes.add(couleur);
        }
        break;

      case "Alien":

        //Il existe 4 modeles differents d'alien, chacun avec sa propre couleur

        int modele = int(random(1, 5));  //Choix du modele, nombre aleatoire entre 1 et 4

        largeur = 45;
        hauteur = 40;
        // coordX sera mis à jour a chaque level
        coordY = 100;
        direction = 1;  //Se deplace vers le bas de la fenetre
        //vitesse definie a chaque level
        //shot: Pour un alien, l'autorisation de tirer se fait au moyen d'un compteur qui decroit a chaque frame. La valeur de depart est fixee au debut du level
        lives = 1;

        //Pattern des carres de 5 pixels et couleur, 4 modèles:

        int[] modele1 = {0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1};
        int[] modele2 = {0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1};
        int[] modele3 = {0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0};
        int[] modele4 = {0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1};

        int[] modeleAlien;

        //En fonction du numero de modele, definition du pattern de carre et leur couleur

        switch (modele) {

        case 1:
          modeleAlien = modele1;
          colorsCodes.add(8);
          break;

        case 2:
          modeleAlien = modele2;
          colorsCodes.add(9);
          break;

        case 3:
          modeleAlien = modele3;
          colorsCodes.add(10);
          break;

        default:
          modeleAlien = modele4;
          colorsCodes.add(5);
          break;
        }

        for (int carre : modeleAlien) {
          pattern.add(carre);
        }
        break;

      case "ShotAlien":
      case "ShotShip":

        //Definition des parametres communs aux 2 types de tir

        largeur = 5;
        hauteur = 10;
        //coordX sera mis a jour a chaque debut de tir
        //coordY sera mis a jour a chaque frame
        //shot: Pas defini ici
        lives = 1;

        //Le tir etant represente par un rectangle plein, divise en 10 carres tous colores donc egaux a 1

        for (int i = 0; i < 10; i++) {
          pattern.add(1);
        }

        //Definition des parametres specifiques

        if (typeCreation == "ShotAlien") {
          direction = 1;
          vitesse = 5;
          colorsCodes.add(5);
        } else {  //ShotShip
          direction = -1;
          vitesse = 20;
          colorsCodes.add(11);
        }
        break;

      case "Heart":

        largeur = 35;
        hauteur = 30;
        coordX = 20; 
        coordY = 20; 
        //dir Non renseigne
        //shot Non renseigne
        vitesse = 0;
        lives = 1;

        int[] heartPattern = {0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0};

        for (int carre : heartPattern) {
          pattern.add(carre);
        }

        colorsCodes.add(5);  //Couleur rouge
        break;

      case "BigBoss":

        largeur = 65;
        hauteur = 75;
        coordX  = 665;
        coordY  = 200;
        //direction est variable
        vitesse = 1;
        //shot idem Alien, compteur
        lives = 5;

        int bossPattern[] = {0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0};

        for (int carre : bossPattern) {
          pattern.add(carre);
        }

        int bossColors[] = {1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1};

        for (int couleur : bossColors) {
          colorsCodes.add(couleur);
        }
        break;

      default:
        break;
    }

    //Pour tous les types, remplissage de la matrice d'etat des pixels

    int indice = 0; //Indice du pattern

    matrix = new int[hauteur][largeur];

    for (int i = 0; i < hauteur; i += 5) {  // Tous les 5 pixels en Y
      for (int j = 0; j < largeur; j += 5) {  //Tous les 5 pixels en X

        int value = pattern.get(indice);

        for (int y = 0; y < 5; y++) {  //La valeur 1 ou 0 est attribuee aux 25 pixels du carre
          for (int z = 0; z < 5; z++) {

            matrix[i + y][j + z] = value;
          }
        }

        indice++;
      }
    }
  }
};

  void show() {  //Methode generique d'affichage de l'element

    int indexColor = 0;  //Index de l'ArrayList des codes couleur

    for (int i = 0; i < int(hauteur); i += 5) {  // Tous les 5 pixels en Y
      for (int j = 0; j < int(largeur); j += 5) {  //Tous les 5 pixels en X

        if (matrix[i][j] == 1) { //pixel colore donc carre dessine

          //Calcul des positions x,y du coin gauche superieur du carre
          float x = coordX + j;
          float y = coordY + i;

          //recuperation de la couleur du carre par la methode colorMe
          float r = colorMe(colorsCodes.get(indexColor)).get(0);
          float g = colorMe(colorsCodes.get(indexColor)).get(1);
          float b = colorMe(colorsCodes.get(indexColor)).get(2);

          //Affichage du carre
          strokeWeight(1);
          stroke(r, g, b);
          fill(r, g, b);
          rect(x, y, 5, 5);

          //Mise a jour de l'indexColor
          if ((colorsCodes.size() != 1) && (indexColor <  colorsCodes.size())) {
            indexColor++;
          }
        }
      }
    }
  }
}