/*Gestion des collisions
 Source: https://openclassrooms.com/courses/theorie-des-collisions/formes-simples

 Ce test verifie si 2 objets sont situes dans la meme zone de l'ecran, si oui, on teste alors s'ils partagent un meme pixel a l'ecran, pixel par pixel
 
 NOTES:
 - Les coordonnees etant du type float, pour les tests de collisions, elles sont converties en int, pour que la detection d'un pixel commun soit facilite
 - Les collisions entre les tirs ne sont pas testes
 */

function collision (objet1, objet2) {

  var result = false;

  if (  //Verification rapide de proximite des 2 objets
    (objet1.coordX >= objet2.coordX + objet2.largeur)         // trop à droite
    || (objet1.coordX + objet1.largeur <= objet2.coordX)     // trop à gauche
    || (objet1.coordY >= objet2.coordY + objet2.hauteur)       // trop en bas
    || (objet1.coordY + objet1.hauteur <= objet2.coordY))    // trop en haut

  {
    result = false;
    
  } else {  //On compare pixel par pixel

    //On prend comme modele l'objet le plus petit

    Objet testobjet1 = new Objet();
    Objet testobjet2 = new Objet();

    if (objet1.matrix.length > objet2.matrix.length) {
      testobjet1 = objet1;
      testobjet2 = objet2;
    } else {
      testobjet1 = objet2;
      testobjet2 = objet1;
    }

    for (int i = 0; i < testobjet1.hauteur; i++) {  // Tous les pixels en Y
      for (int j = 0; j < testobjet1.largeur; j++) {  //Tous les pixels en X

        if (testobjet1.matrix[i][j] == 1) { //Si le pixel est actif

          //Calcul des coordonnees du pixel de testobjet1

          int pixelX1 = (int)testobjet1.coordX + j;
          int pixelY1 = (int)testobjet1.coordY + i;

          //Comparaison a tous les pixels de testobjet2

          for (int k = 0; k < testobjet2.hauteur; k++) {
            for (int l = 0; l < testobjet2.largeur; l++) {

              if (testobjet2.matrix[k][l] == 1) {  //Si le pixel est actif

                int pixelX2 = (int)testobjet2.coordX + l;
                int pixelY2 = (int)testobjet2.coordY + k;

                if (pixelX1 == pixelX2 && pixelY1 == pixelY2) {

                  result = true;
                }
              }
            }
          }
        }
      }
    }
  }
  return result;
}