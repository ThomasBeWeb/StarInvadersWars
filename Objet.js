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

function Objet(type){

    ////PARAMETRES
  this.type = type;

  var listeColors;
  var listeMatrix;

  for(i = 0 ; i < listeObjets.length ; i++){

    if(listeObjets[i].type === this.type){
      this.largeur = listeObjets[i].largeur;
      this.hauteur = listeObjets[i].hauteur;
      this.coordY = listeObjets[i].coordY;
      this.coordX = listeObjets[i].coordX;
      this.lives = listeObjets[i].lives;
      this.direction = listeObjets[i].direction;
      this.vitesse = listeObjets[i].vitesse;
      this.shot = listeObjets[i].shot;

      if(this.type === "Alien"){
        listeMatrix = listeObjets[i].matrix;
      }else{
        this.matrix = listeObjets[i].matrix;
      }
      
      listeColors = listeObjets[i].colorsCodes;

      break;
    }
  }

  //Creation de matrix pour alien et colorsCodes pour tous

  switch (this.type) {

    case "Alien":

      //Tirage du type
     this.matrix = listeMatrix[Math.floor(Math.random()*listeMatrix.length)];
    
      //Tirage de la couleur
      var colorChoose = listeColors[Math.floor(Math.random()*listeColors.length)];

      var newListe = [];

      for(i = 0 ; i < this.matrix.length ; i++){

        var newLine = [];

        for(j = 0 ; j < this.matrix[i].length ; j++){
          newLine.push(colorChoose);
        }

        newListe.push(newLine);
      }

      this.colorsCodes = newListe;

      break;
    
      case "ShotAlien":
      case "ShotShip":

        var newListe = [];

        for(i = 0 ; i < this.matrix.length ; i++){

          var newLine = [];

          for(j = 0 ; j < this.matrix[i].length ; j++){
            newLine.push(listeColors);
          }

          newListe.push(newLine);
        }

        this.colorsCodes = newListe;

        break;

    case "Heart":
      var newListe = [];

      for(i = 0 ; i < this.matrix.length ; i++){

        var newLine = [];

        for(j = 0 ; j < this.matrix[i].length ; j++){
          if(this.matrix[i][j] === 0){
            newLine.push(0);
          }else{
            newLine.push(listeColors);
          }
        }
        newListe.push(newLine);
      }
      this.colorsCodes = newListe;
      break;
      
    default:
      this.colorsCodes = listeColors;
      break;

  }

  this.showObject = function() {

    for (i = 0; i < this.matrix.length; i++) {  // Tous les 5 pixels en Y
      for (j = 0; j < this.matrix[i].length; j++) {  //Tous les 5 pixels en X

        if (this.matrix[i][j] === 1) { //pixel colore donc carre dessine

          //Calcul des positions x,y du coin gauche superieur du carre
          var x = this.coordX + j*5;
          var y = this.coordY + i*5;

          //recuperation de la couleur du carre par la methode colorMe

          var listeCouleurs = ColorMe(this.colorsCodes[i][j]);
          var r = listeCouleurs[0];
          var g = listeCouleurs[1];
          var b = listeCouleurs[2];

          //Affichage du carre
          strokeWeight(1);
          stroke(r, g, b);
          fill(r, g, b);
          rect(x, y, 5, 5);

        }
      }
    }
  }

}


listeObjets = [
  {
      "type": "Ship",
      "largeur": 65,
      "hauteur": 35,
      "coordY": 700,
      "coordX": 700,
      "direction": 0,
      "vitesse": 0,
      "shot": 1,
      "lives": 5,
      "matrix": [
          [
              0,
              0,
              0,
              0,
              0,
              0,
              1,
              0,
              0,
              0,
              0,
              0,
              0
          ],
          [
              0,
              0,
              0,
              0,
              0,
              1,
              1,
              1,
              0,
              0,
              0,
              0,
              0
          ],
          [
              0,
              0,
              1,
              1,
              1,
              1,
              1,
              1,
              1,
              1,
              1,
              0,
              0
          ],
          [
              0,
              1,
              1,
              1,
              1,
              1,
              1,
              1,
              1,
              1,
              1,
              1,
              0
          ],
          [
              1,
              1,
              1,
              1,
              1,
              1,
              1,
              1,
              1,
              1,
              1,
              1,
              1
          ],
          [
              1,
              1,
              0,
              0,
              1,
              1,
              1,
              1,
              1,
              0,
              0,
              1,
              1
          ],
          [
              1,
              0,
              0,
              1,
              1,
              1,
              1,
              1,
              1,
              1,
              0,
              0,
              1
          ]
      ],
      "colorsCodes": [
          [
              0,
              0,
              0,
              0,
              0,
              0,
              1,
              0,
              0,
              0,
              0,
              0,
              0
          ],
          [
              0,
              0,
              0,
              0,
              0,
              2,
              2,
              2,
              0,
              0,
              0,
              0,
              0
          ],
          [
              0,
              0,
              3,
              2,
              2,
              2,
              4,
              2,
              2,
              2,
              3,
              0,
              0
          ],
          [
              0,
              3,
              3,
              2,
              2,
              4,
              4,
              4,
              2,
              2,
              3,
              3,
              0
          ],
          [
              3,
              3,
              3,
              2,
              2,
              4,
              4,
              4,
              1,
              2,
              3,
              3,
              3
          ],
          [
              3,
              3,
              0,
              0,
              2,
              2,
              2,
              2,
              2,
              0,
              0,
              3,
              3
          ],
          [
              3,
              0,
              0,
              5,
              6,
              7,
              8,
              7,
              6,
              5,
              0,
              0,
              3
          ]
      ]
  },
  {
      "type": "Alien",
      "largeur": 45,
      "hauteur": 40,
      "coordY": 100,
      "coordX": 100,
      "direction": 1,
      "vitesse": 0,
      "shot": 1,
      "lives": 1,
      "matrix": [
          [
              [
                  0,
                  0,
                  0,
                  1,
                  1,
                  1,
                  0,
                  0,
                  0
              ],
              [
                  0,
                  1,
                  1,
                  1,
                  1,
                  1,
                  1,
                  1,
                  0
              ],
              [
                  1,
                  1,
                  1,
                  1,
                  1,
                  1,
                  1,
                  1,
                  1
              ],
              [
                  1,
                  0,
                  0,
                  1,
                  1,
                  1,
                  0,
                  0,
                  1
              ],
              [
                  1,
                  1,
                  1,
                  1,
                  1,
                  1,
                  1,
                  1,
                  1
              ],
              [
                  0,
                  0,
                  1,
                  0,
                  0,
                  0,
                  1,
                  0,
                  0
              ],
              [
                  0,
                  1,
                  0,
                  1,
                  1,
                  1,
                  0,
                  1,
                  0
              ],
              [
                  1,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  1
              ]
          ],
          [
              [
                  0,
                  0,
                  0,
                  1,
                  1,
                  1,
                  0,
                  0,
                  0
              ],
              [
                  0,
                  0,
                  1,
                  1,
                  1,
                  1,
                  1,
                  0,
                  0
              ],
              [
                  0,
                  1,
                  1,
                  1,
                  1,
                  1,
                  1,
                  1,
                  0
              ],
              [
                  1,
                  1,
                  0,
                  1,
                  1,
                  1,
                  0,
                  1,
                  1
              ],
              [
                  1,
                  1,
                  1,
                  1,
                  1,
                  1,
                  1,
                  1,
                  1
              ],
              [
                  0,
                  0,
                  1,
                  0,
                  0,
                  0,
                  1,
                  0,
                  0
              ],
              [
                  0,
                  1,
                  0,
                  1,
                  1,
                  1,
                  0,
                  1,
                  0
              ],
              [
                  1,
                  0,
                  1,
                  0,
                  0,
                  0,
                  1,
                  0,
                  1
              ]
          ],
          [
              [
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0
              ],
              [
                  0,
                  0,
                  1,
                  0,
                  0,
                  0,
                  1,
                  0,
                  0
              ],
              [
                  1,
                  0,
                  0,
                  1,
                  1,
                  1,
                  0,
                  0,
                  1
              ],
              [
                  1,
                  0,
                  1,
                  1,
                  1,
                  1,
                  1,
                  0,
                  1
              ],
              [
                  1,
                  1,
                  1,
                  0,
                  1,
                  0,
                  1,
                  1,
                  1
              ],
              [
                  0,
                  1,
                  1,
                  1,
                  1,
                  1,
                  1,
                  1,
                  0
              ],
              [
                  0,
                  0,
                  1,
                  0,
                  0,
                  0,
                  1,
                  0,
                  0
              ],
              [
                  0,
                  1,
                  0,
                  0,
                  0,
                  0,
                  0,
                  1,
                  0
              ]
          ],
          [
              [
                  0,
                  1,
                  0,
                  0,
                  0,
                  0,
                  0,
                  1,
                  0
              ],
              [
                  0,
                  0,
                  1,
                  1,
                  1,
                  1,
                  1,
                  0,
                  0
              ],
              [
                  0,
                  1,
                  1,
                  1,
                  1,
                  1,
                  1,
                  1,
                  0
              ],
              [
                  0,
                  1,
                  0,
                  0,
                  1,
                  0,
                  0,
                  1,
                  0
              ],
              [
                  0,
                  1,
                  1,
                  1,
                  1,
                  1,
                  1,
                  1,
                  0
              ],
              [
                  0,
                  1,
                  1,
                  1,
                  1,
                  1,
                  1,
                  1,
                  0
              ],
              [
                  1,
                  0,
                  1,
                  0,
                  1,
                  0,
                  1,
                  0,
                  1
              ],
              [
                  1,
                  0,
                  1,
                  0,
                  1,
                  0,
                  1,
                  0,
                  1
              ]
          ]
      ],
      "colorsCodes": [
          8,
          9,
          10,
          5
      ]
  },
  {
      "type": "ShotAlien",
      "largeur": 5,
      "hauteur": 10,
      "coordY": 0,
      "coordX": 0,
      "direction": 1,
      "vitesse": 5,
      "shot": 0,
      "lives": 1,
      "matrix": [[1],[1],[1],[1],[1]],
      "colorsCodes": 5
  },
  {
      "type": "ShotShip",
      "largeur": 5,
      "hauteur": 10,
      "coordY": 0,
      "coordX": 0,
      "direction": -1,
      "vitesse": 20,
      "shot": 0,
      "lives": 1,
      "matrix": [[1],[1],[1],[1],[1]],
      "colorsCodes": 11
  },
  {
      "type": "Heart",
      "largeur": 35,
      "hauteur": 30,
      "coordY": 20,
      "coordX": 20,
      "direction": 0,
      "vitesse": 0,
      "shot": 0,
      "lives": 1,
      "matrix": [
          [
              0,
              1,
              1,
              0,
              1,
              1,
              0
          ],
          [
              1,
              1,
              1,
              1,
              1,
              1,
              1
          ],
          [
              1,
              1,
              1,
              1,
              1,
              1,
              1
          ],
          [
              0,
              1,
              1,
              1,
              1,
              1,
              0
          ],
          [
              0,
              0,
              1,
              1,
              1,
              0,
              0
          ],
          [
              0,
              0,
              0,
              1,
              0,
              0,
              0
          ]
      ],
      "colorsCodes": 5
  },
  {
      "type": "BigBoss",
      "largeur": 65,
      "hauteur": 75,
      "coordY": 200,
      "coordX": 200,
      "direction": 0,
      "vitesse": 1,
      "shot": 0,
      "lives": 5,
      "matrix": [
          [
              0,
              0,
              0,
              0,
              1,
              1,
              1,
              1,
              1,
              0,
              0,
              0,
              0
          ],
          [
              0,
              0,
              0,
              1,
              1,
              1,
              1,
              1,
              1,
              1,
              0,
              0,
              0
          ],
          [
              0,
              0,
              1,
              1,
              1,
              1,
              1,
              1,
              1,
              1,
              1,
              0,
              0
          ],
          [
              0,
              0,
              1,
              1,
              1,
              1,
              1,
              1,
              1,
              1,
              1,
              0,
              0
          ],
          [
              0,
              0,
              1,
              1,
              1,
              1,
              1,
              1,
              1,
              1,
              1,
              0,
              0
          ],
          [
              0,
              1,
              1,
              1,
              1,
              1,
              1,
              1,
              1,
              1,
              1,
              1,
              0
          ],
          [
              0,
              1,
              1,
              1,
              1,
              1,
              1,
              1,
              1,
              1,
              1,
              1,
              0
          ],
          [
              0,
              1,
              1,
              0,
              0,
              1,
              1,
              1,
              0,
              0,
              1,
              1,
              0
          ],
          [
              0,
              1,
              1,
              0,
              0,
              0,
              1,
              0,
              0,
              0,
              1,
              1,
              0
          ],
          [
              1,
              1,
              1,
              1,
              0,
              1,
              1,
              1,
              0,
              1,
              1,
              1,
              1
          ],
          [
              1,
              1,
              1,
              1,
              1,
              1,
              1,
              1,
              1,
              1,
              1,
              1,
              1
          ],
          [
              1,
              1,
              1,
              0,
              1,
              0,
              1,
              0,
              1,
              0,
              1,
              1,
              1
          ],
          [
              0,
              0,
              0,
              1,
              1,
              0,
              1,
              0,
              1,
              1,
              0,
              0,
              0
          ],
          [
              0,
              0,
              0,
              0,
              1,
              1,
              1,
              1,
              1,
              0,
              0,
              0,
              0
          ],
          [
              0,
              0,
              0,
              0,
              0,
              1,
              1,
              1,
              0,
              0,
              0,
              0,
              0
          ]
      ],
      "colorsCodes": [
          [
              0,
              0,
              0,
              0,
              1,
              1,
              1,
              1,
              1,
              0,
              0,
              0,
              0
          ],
          [
              0,
              0,
              0,
              1,
              1,
              1,
              1,
              1,
              1,
              1,
              0,
              0,
              0
          ],
          [
              0,
              0,
              1,
              1,
              1,
              1,
              1,
              1,
              1,
              1,
              1,
              0,
              0
          ],
          [
              0,
              0,
              1,
              1,
              1,
              1,
              1,
              1,
              1,
              1,
              1,
              0,
              0
          ],
          [
              0,
              0,
              1,
              1,
              1,
              1,
              1,
              1,
              1,
              1,
              1,
              0,
              0
          ],
          [
              0,
              1,
              1,
              1,
              1,
              1,
              1,
              1,
              1,
              1,
              1,
              1,
              0
          ],
          [
              0,
              1,
              1,
              1,
              1,
              1,
              1,
              1,
              1,
              1,
              1,
              1,
              0
          ],
          [
              0,
              1,
              1,
              0,
              0,
              1,
              1,
              1,
              0,
              0,
              1,
              1,
              0
          ],
          [
              0,
              1,
              1,
              0,
              0,
              0,
              1,
              0,
              0,
              0,
              1,
              1,
              0
          ],
          [
              1,
              1,
              1,
              1,
              0,
              1,
              1,
              1,
              0,
              1,
              1,
              1,
              1
          ],
          [
              1,
              1,
              1,
              1,
              1,
              1,
              5,
              1,
              1,
              1,
              1,
              1,
              1
          ],
          [
              1,
              1,
              1,
              0,
              1,
              0,
              1,
              0,
              1,
              0,
              1,
              1,
              1
          ],
          [
              0,
              0,
              0,
              1,
              1,
              0,
              1,
              0,
              1,
              1,
              0,
              0,
              0
          ],
          [
              0,
              0,
              0,
              0,
              1,
              1,
              1,
              1,
              1,
              0,
              0,
              0,
              0
          ],
          [
              0,
              0,
              0,
              0,
              0,
              1,
              1,
              1,
              0,
              0,
              0,
              0,
              0
          ]
      ]
  }
];