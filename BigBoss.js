//Methode qui renvoie une direction aleatoire

function indecis() {
  var value = 1; //Vers le bas / droite de la fentetre
  var alea = random(0, 101);

  if (alea < 50) {
    value = -1;  //Vers le haut / gauche de la fenetre
  }
  return value;
}

//Calcul des nouvelles coordonnees, en fonction de la vitesse (normale ou esquive), deplacement dans un rectangle de 1300 pixels sur 700

function trajectoireBB(vitesse) {

  if (frameCount % 250 == 0) {   //Toutes les 250 frames, la direction du Big Boss est aleatoirement modifiee
    bossDirX = indecis();
    bossDirY = indecis();
  }

  var newCoordX = bigBoss.coordX + (bossDirX * vitesse);  //Calcul nouvelle coordonnee X

  if (newCoordX < 50 || newCoordX > 1285) {  //Verification de la proximite d'un bord et modification de la coordonnee si contact
    bossDirX = bossDirX * -1;
    newCoordX = bigBoss.coordX + (bossDirX * vitesse);
  }

  var newCoordY = bigBoss.coordY + (bossDirY * vitesse);  //idem coordonnee Y

  if (newCoordY < 50 || newCoordY > 625) {
    bossDirY = bossDirY * -1;
    newCoordY = bigBoss.coordY + (bossDirY * vitesse);
  }

  //Attribution definitive des nouvelles coordonnees
  bigBoss.coordX = newCoordX;
  bigBoss.coordY = newCoordY;
}