function LoadLevel(level) {
  
    decompteScore = 2000;  //Reset du decompte score
  
    switch (level) {
  
        case 0:  //Ecran de demarrage du jeu
    
            clear();
            fond = fond0;

            //Creation du vaisseau
            starShip = new Objet("Ship");
            break;

        case 1:
            fond = fond1;
            nbAliens = 10;
            vitesse = 0.3;
            compteurTirAlien = 120;
            probaShot = 40;
            break;
    
        case 2:
            fond = fond2;
            nbAliens = 14;
            vitesse = 0.4;
            compteurTirAlien = 100;
            probaShot = 50;
            break;
    
        case 3:
            fond = fond3;
            nbAliens = 16;
            vitesse = 0.5;
            compteurTirAlien = 80;
            probaShot = 60;
            break;
    
        case 4:  //Big Boss
            fond = fond4;
            nbAliens = 1;
            compteurTirAlien = 40;
            probaShot = 70;
            break;
    
        default:
            break;
    }

    changeLevel = false;
  }