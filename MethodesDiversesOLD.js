////Actions specifiques du clavier

void keyPressed() {

  if (level == 0) {  //Declencher un niveau sur ecran d'intro
    if (key == '1') {
      level = 1;
    } else if (key == '2') {
      level = 2;
    } else if (key == '3') {
      level = 3;
    } else if (key == '4') {
      level = 4;
    }
    intro.pause();
    intro.rewind();
    loop();
  }
  if (pause && (key == 'n' || key == 'N')) { //Ecran intermediaire entre chaque level
    changeLevel = true;
    pause = false;
    loop();
  }
  if (starShip.lives == 0 || level == 5) {  //GameOver
    if (key == 'q' || key == 'Q') {
      exit();
    }
    if (key == 's' || key == 'S') {
      outro.pause();
      outro.rewind();
      level = 0;
      changeLevel = true;
      playerScore = 0;
      loop();
    }
  }
}

//Methode showMustGoOn d'affichage des elements

void showMustGoOn() {
  for (Objet testElement : screenElements) {
    if (testElement.lives > 0) {
      testElement.show();
    }
  }
}


//Methode de probabilite

public boolean loto (float value) {
  boolean resultat = false;
  if (value > random(0, 100.1)) resultat = true;
  return resultat;
}


//Methode pour ecrire un texte en rouge, centre a l'ecran. Parametres: le texte, la police et la coordonnee en Y



//Methode qui renvoi le code RGB en fonction du code couleur indique en parametre

public ArrayList<Float> colorMe(int code) {
  ArrayList<Float> codeRGB = new ArrayList<Float>();

  switch (code) {

  case 1:  //Black
    //Red
    codeRGB.add (0.0);
    //Green
    codeRGB.add (0.0);
    //Blue
    codeRGB.add (0.0);
    break;
  case 2:  //Gray
    codeRGB.add (111.0);
    codeRGB.add (102.0);
    codeRGB.add (102.0);
    break;
  case 3:  //Blue
    codeRGB.add (77.0);
    codeRGB.add (93.0);
    codeRGB.add (178.0);
    break;
  case 4:  //White
    codeRGB.add (255.0);
    codeRGB.add (255.0);
    codeRGB.add (255.0);
    break;
  case 5:  //Red
    codeRGB.add (255.0);
    codeRGB.add (0.0);
    codeRGB.add (0.0);
    break;
  case 6:  //Dark orange
    codeRGB.add (245.0);
    codeRGB.add (130.0);
    codeRGB.add (7.0);
    break;
  case 7:  //Soft orange
    codeRGB.add (250.0);
    codeRGB.add (184.0);
    codeRGB.add (114.0);
    break;
  case 8:  //Yellow
    codeRGB.add (249.0);
    codeRGB.add (250.0);
    codeRGB.add (114.0);
    break;
  case 9:  //Turquoise
    codeRGB.add (35.0);
    codeRGB.add (206.0);
    codeRGB.add (247.0);
    break;
  case 10:  //Pink
    codeRGB.add (250.0);
    codeRGB.add (116.0);
    codeRGB.add (206.0);
    break;
  case 11:  //Green
    codeRGB.add (54.0);
    codeRGB.add (232.0);
    codeRGB.add (85.0);
    break; 
  default:
    break;
  }

  return codeRGB;
}