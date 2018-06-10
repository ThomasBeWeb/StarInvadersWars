//Variables
var fond;
var nbAliens, compteurTirAlien, level, decompteScore, playerScore, bossDirX, bossDirY;
var vitesse, probaShot;

var starShip;

//Liste des objets en vie
var screenElements = [];

var changeLevel;
var pause = false;


function preload() {
    //Chargement fonds
    fond0 = loadImage("img/level0.jpg");
    fond1 = loadImage("img/level1.jpg");
    fond2 = loadImage("img/level2.jpg");
    fond3 = loadImage("img/level3.jpg");
    fond4 = loadImage("img/level4.jpg");

    //Chargement police
    fontBig = loadFont('./data/TitilliumWeb-SemiBold.ttf');
    fontMedium = loadFont('./data/TitilliumWeb-Light.ttf');
    fontSmall = loadFont('./data/TitilliumWeb-ExtraLight.ttf');

    level = 0;
    changeLevel = true;
    
}

function setup() {
    createCanvas(1400, 800);
    
  }



function draw() {

    if(changeLevel === true){    //Chargement Level si besoin

        LoadLevel(level);
        screenElements = [];  //Reset de la liste

        //Creation de screenElements

            screenElements.push(starShip);  //Ajout du vaisseau

            if (level >= 1 && level <= 3) {  //Chaque Alien est cree puis ajoute a screenElements
      
              var startX = 700 - ((nbAliens*45+(nbAliens-1)*35)/2);


              for (var i = 0; i < nbAliens; i++) {
                newAlien = new Objet("Alien");
                newAlien.coordX = startX + (75 * i);  //En fonction de sa position dans le groupe, son X est calcule a partir du startX incremente de i fois
                newAlien.shot = compteurTirAlien;
                newAlien.vitesse = vitesse;
                screenElements.push(newAlien);
              }
            }else if(level === 4) {  //Le Big Boss est cree puis ajoute a screenElements
              var bigBoss = new Objet("BigBoss");
              bigBoss.shot = compteurTirAlien;
              screenElements.push(bigBoss);
            }

            console.log(screenElements);

    }else{  //Level en cours

        //Fond
        background(fond);

        //Level

        switch (level){

            case 0:
                textIntro();
                break;

            case 1:
            case 2:
            case 3:
            case 4:

                //Affichage elements en vie
                screenElements.forEach(function(item){
                    if (item.lives > 0) {
                        item.showObject();
                    }
                });

                //Affichage des coeurs Ship et BigBoss
                for(var a = 0; a < starShip.lives; a++) {  //Vies du vaisseau
                    var heart = new Objet("Heart");
                    heart.coordX += (a*50);
                    heart.showObject();
                }
                if (level == 4) {
                    for (var a = 0; a < bigBoss.lives; a++) {  //Vies du BigBoss
                        var alienHeart = new Objet("Heart");
                        alienHeart.coordX += (1125 + a * 50); //Le groupe de coeur demarre a x = 1145
                        //Changement couleur en noir
                        for(var i = 0 ; i < alienHeart.colorsCodes.length ; i++){
                            for(var j = 0 ; j < alienHeart.colorsCodes[i].length ; j++){
                                alienHeart.colorsCodes[i][j] = 1;
                            }
                        }
                        alienHeart.showObject();
                    }
                  }
                break;

    
            default:
                break;
        }
    }




    
}