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
    
  }else{  //On compare pixel par pixel

    var listePixels1 = [];
    var listePixels2 = [];

    //ListePixels 1
    for (var i = 0; i < objet1.matrix.length; i++) {  // Tous les pixels en Y

      for (var j = 0; j < objet1.matrix[i].length; j++) {  //Chaque valeur de X

        if (objet1.matrix[i][j] == 1) { //Si le point est actif

          var posYStart = objet1.coordY + i*5;
          var posXStart = objet1.coordX + j*5;

          for(var t = 0 ; t < 5 ; t++){ //Creation coord pixel sous forme (coordX,coordY)
              
            var posY = parseInt(posYStart + t);

            for(var m = 0 ; m < 5 ; m++){
              var posX = parseInt(posXStart + m);
              var newPixel = [posX,posY];
              listePixels1.push(newPixel);
            }
          }
        }
      }
    }

    //ListePixels 2
    for (var i = 0; i < objet2.matrix.length; i++) {  // Tous les pixels en Y

      for (var j = 0; j < objet2.matrix[i].length; j++) {  //Chaque valeur de X

        if (objet2.matrix[i][j] == 1) { //Si le point est actif

          var posYStart = objet2.coordY + i*5;
          var posXStart = objet2.coordX + j*5;

          for(var t = 0 ; t < 5 ; t++){ //Creation coord pixel sous forme (coordX,coordY)
              
            posY = parseInt(posYStart + t);

            for(var m = 0 ; m < 5 ; m++){
              posX = parseInt(posX + m);
              var newPixel = [posX,posY];
              listePixels2.push(newPixel);
            }
          }
        }
      }
    }
  
    //Verification du plus petit objet
    if (listePixels1.length > listePixels2.length) {
      testobjet1 = listePixels1;
      testobjet2 = listePixels2;
    } else {
      testobjet1 = listePixels2;
      testobjet2 = listePixels1;
    }
    
    //Comparaison pixel à pixel
    for (var k = 0; k < testobjet2.length ; k++) { //Pour chaque pixel de objet 2

      for (var l = 0; l < testobjet2.length; l++) { //Comparaison à chaque pixel de objet 1

        if ((testobjet2[k][0] === testobjet1[l][0]) && (testobjet2[k][1] === testobjet1[l][1])) {  //Si la position des pixels est =

            result = true;
            break;
        }
      }
    }
  }

  return result;
}

