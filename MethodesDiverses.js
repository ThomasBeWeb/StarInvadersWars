//COLORME

function ColorMe(code) {

  var codeRGB = [];

  switch (code) {

  case 1:  //Black
    //Red
    codeRGB.push(0);
    //Green
    codeRGB.push(0);
    //Blue
    codeRGB.push(0);
    break;
  case 2:  //Gray
    codeRGB.push(111);
    codeRGB.push(102);
    codeRGB.push(102);
    break;
  case 3:  //Blue
    codeRGB.push(77);
    codeRGB.push(93);
    codeRGB.push(178);
    break;
  case 4:  //White
    codeRGB.push(255);
    codeRGB.push(255);
    codeRGB.push(255);
    break;
  case 5:  //Red
    codeRGB.push(255);
    codeRGB.push(0);
    codeRGB.push(0);
    break;
  case 6:  //Dark orange
    codeRGB.push(245);
    codeRGB.push(130);
    codeRGB.push(7);
    break;
  case 7:  //Soft orange
    codeRGB.push(250);
    codeRGB.push(184);
    codeRGB.push(114);
    break;
  case 8:  //Yellow
    codeRGB.push(249);
    codeRGB.push(250);
    codeRGB.push(114);
    break;
  case 9:  //Turquoise
    codeRGB.push(35);
    codeRGB.push(206);
    codeRGB.push(247);
    break;
  case 10:  //Pink
    codeRGB.push(250);
    codeRGB.push(116);
    codeRGB.push(206);
    break;
  case 11:  //Green
    codeRGB.push(54);
    codeRGB.push(232);
    codeRGB.push(85);
    break; 
  default:
    break;
  }

  return codeRGB;
}

//AFFICHAGE TEXTE
function textMe(texte, font, size, coordY) {
  textAlign(CENTER);
  textSize(size);
  textFont(font);
  fill(255, 0, 0);
  text(texte, 700, parseInt(coordY));
}

//TEXTES INTRO
function textIntro() {

  textMe("Projet UE NFA031  -  Cantinelli Thomas", fontSmall, 20, 25);

  textMe("Star Wars Invaders", fontBig, 60, 140);
        
  var levels = "Press key to start\n\n";

  for (i = 1; i < 4; i++) {
      levels += "key " + i + " ........... Level " + i +"\n";
  }

  levels += "key 4 ......... Big Boss";

  textMe(levels, fontMedium, 30, 500);
  textMe("To move: Mouse Left/Right  To shoot: Left Button", fontMedium, 30, 750);
}

//KEYPRESSED
function keyPressed() {

  //CHOIX LEVEL
  if(level === 0){

    changeLevel = true;

    switch (keyCode){

      case 49:  //1
        level = 1;
        break;
      case 50:  //2
        level = 2;
        break;
      case 51:  //3
        level = 3;
        break;
      case 52:  //4
        level = 4;
        break;
      default:
        break;
    }
  }

  //NEXT LEVEL
  if (pause && (keyCode == 78)) { //Ecran intermediaire entre chaque level
    changeLevel = true;
    pause = false;
    loop();
  }

  if(keyCode === 81){  //q
    changeLevel = true;
    level = 0;
  }

  if(keyCode === 80){  //p
    noLoop();
  }
  
}

//RANDOM
function loto (value) {
  resultat = false;
  if (value > (Math.random()*100)) resultat = true;
  return resultat;
}

////TIR VAISSEAU (Un seul tir possible a la fois)
function mousePressed() {

  if (starShip.shot == 1 && level > 0 && level < 5) {

    starShip.shot = 0; //Le tir n'est plus possible
  
    ///Creation du tir
    // fire.play();
    // fire.rewind();
    shotShip = new Objet("ShotShip");
    shotShip.coordX = starShip.coordX + (starShip.largeur / 2);  // Le tir part du milieu du vaisseau
    shotShip.coordY = starShip.coordY;  // Le tir part du haut du vaisseau
    screenElements.push(shotShip);

  }
  return false;
}

