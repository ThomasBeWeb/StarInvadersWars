function LoadLevel(level) {
  
    decompteScore = 2000;  //Reset du decompte score
  
    switch (level) {
  
        case 0:  //Ecran de demarrage du jeu
    
            background(fond0);
        
            screenElements.clear();
        
            /*textMe("Projet UE NFA031  -  Cantinelli Thomas", fontSmall, 25);
            textMe("Stars Invaders Wars", fontBig, 140);
        
            String levels = "Press key to start\n\n";
        
            for (int i = 1; i < 4; i++) {
                levels = levels + "key " + i + " ........... Level " + i +"\n";
            }
        
            levels += "key 4 ......... Big Boss";
        
            textMe(levels, fontMedium, 500);
            textMe("To move: Mouse Left/Right  To shoot: Left Button", fontMedium, 750); */
            break;

        case 1:
            background(fond1);
            nbAliens = 10;
            vitesse = 0.3;
            compteurTirAlien = 120;
            probaShot = 40;
            break;
    
        case 2:
            background(fond2);
            nbAliens = 14;
            vitesse = 0.4;
            compteurTirAlien = 100;
            probaShot = 50;
            break;
    
        case 3:
            background(fond3);
            nbAliens = 16;
            vitesse = 0.5;
            compteurTirAlien = 80;
            probaShot = 60;
            break;
    
        case 4:  //Big Boss
            background(fond4);
            nbAliens = 1;
            compteurTirAlien = 40;
            probaShot = 70;
            break;
    
        default:
            break;
    }
  }