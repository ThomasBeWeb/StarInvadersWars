<?php
/** SHIP ****************************************************************************************************/
$pattern = [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1];
$colors = [1, 2, 2, 2, 3, 2, 2, 2, 4, 2, 2, 2, 3, 3, 3, 2, 2, 4, 4, 4, 2, 2, 3, 3, 3, 3, 3, 2, 2, 4, 4, 4, 1, 2, 3, 3, 3, 3, 3, 2, 2, 2, 2, 2, 3, 3, 3, 5, 6, 7, 8, 7, 6, 5, 3];

 //Recup des messages precedents
 $json_source = file_get_contents('./json/objects.json');
 $listeMessages = json_decode($json_source, true);

$type = "Ship";
$largeur = 65;
$hauteur = 35;
$coordY = 700;
$coordX = 0;
$direction = 0;
$vitesse = 0;
$shot = 1; 
$lives = 5;

$nb = $largeur / 5;
 //Creation du post au format tableau
 $postTableau = [
  'type' => $type, 
 'largeur' => $largeur, 
 'hauteur' => $hauteur, 
 'coordY' => $coordY,
 'coordX' => $coordY,
 'direction' => $direction,
 'vitesse' => $vitesse,
 'shot' => $shot,
 'lives' => $lives];

//Pattern
 $newListe = [];
 for($i = 0; $i<count($pattern); $i = $i + $nb){
   $u = 0;
   $provi = [];
   while($u < $nb){
     array_push($provi,$pattern[$i + $u]);
     $u++;
   }
   array_push($newListe,$provi);
 }

 $postTableau['matrix'] = $newListe;

//Colors
$newListe = [];
$compteur = 0;
for($i = 0; $i<count($pattern); $i = $i + $nb){
  $u = 0;
  $provi = [];
  while($u < $nb){
      if($pattern[$i + $u] === 1){
        array_push($provi,$colors[$compteur]);
        $compteur++;
      }else{
        array_push($provi,0);
      }
    $u++;
  }
  array_push($newListe,$provi);
}

$postTableau['colorsCodes'] = $newListe;


 //Integration au tableau en cours
 array_push($listeMessages, $postTableau);

 //Conversion au format JSON
 $listePostsJson = json_encode($listeMessages, JSON_PRETTY_PRINT); //This parameter will format our JSON object and store it in json file
 
 //Recup du fichier d'origine
 $file = "./json/objects.json";
 
 //Ecrire la nouvelle liste dans le fichier messages.json
 file_put_contents($file, $listePostsJson);

 /** ALIEN******************************************************* */
$pattern = [[0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
[0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0],
[0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1]];

$colors = [8,9,10,5];

 //Recup des messages precedents
 $json_source = file_get_contents('./json/objects.json');
 $listeMessages = json_decode($json_source, true);

$type = "Alien";
$largeur = 45;
$hauteur = 40;
$coordY = 100;
$coordX = 0;
$direction = 1;
$vitesse = 0;
$shot = 1; 
$lives = 1;

$nb = $largeur / 5;
 //Creation du post au format tableau
 $postTableau = [
  'type' => $type, 
 'largeur' => $largeur, 
 'hauteur' => $hauteur, 
 'coordY' => $coordY,
 'coordX' => $coordY,
 'direction' => $direction,
 'vitesse' => $vitesse,
 'shot' => $shot,
 'lives' => $lives];

 //Pattern
$listeNewListe = [];
for($j = 0; $j<count($pattern); $j++){
  $newListe = [];
  for($i = 0; $i<count($pattern[$j]); $i = $i + $nb){
    $u = 0;
    $provi = [];
    while($u < $nb){
      array_push($provi,$pattern[$j][$i + $u]);
      $u++;
    }
    array_push($newListe,$provi);
  }
  array_push($listeNewListe,$newListe);
}


 $postTableau['matrix'] = $listeNewListe;

//Colors
$postTableau['colorsCodes'] = $colors;


 //Integration au tableau en cours
 array_push($listeMessages, $postTableau);

 //Conversion au format JSON
 $listePostsJson = json_encode($listeMessages, JSON_PRETTY_PRINT); //This parameter will format our JSON object and store it in json file
 
 //Recup du fichier d'origine
 $file = "./json/objects.json";
 
 //Ecrire la nouvelle liste dans le fichier messages.json
 file_put_contents($file, $listePostsJson);

 /** SHOTALIEN ****************************************************************************************************/
$pattern = [[1,1,1,1,1],[1,1,1,1,1],[1,1,1,1,1],[1,1,1,1,1],[1,1,1,1,1],[1,1,1,1,1],[1,1,1,1,1],[1,1,1,1,1],[1,1,1,1,1],[1,1,1,1,1]];
$colors = 5;

 //Recup des messages precedents
 $json_source = file_get_contents('./json/objects.json');
 $listeMessages = json_decode($json_source, true);

$type = "ShotAlien";
$largeur = 5;
$hauteur = 10;
$coordY = 0;
$coordX = 0;
$direction = 1;
$vitesse = 5;
$shot = 0; 
$lives = 1;

 //Creation du post au format tableau
 $postTableau = [
  'type' => $type, 
 'largeur' => $largeur, 
 'hauteur' => $hauteur, 
 'coordY' => $coordY,
 'coordX' => $coordY,
 'direction' => $direction,
 'vitesse' => $vitesse,
 'shot' => $shot,
 'lives' => $lives,
  'matrix' => $pattern,
  'colorsCodes' => $colors
 ];

 //Integration au tableau en cours
 array_push($listeMessages, $postTableau);

 //Conversion au format JSON
 $listePostsJson = json_encode($listeMessages, JSON_PRETTY_PRINT); //This parameter will format our JSON object and store it in json file
 
 //Recup du fichier d'origine
 $file = "./json/objects.json";
 
 //Ecrire la nouvelle liste dans le fichier messages.json
 file_put_contents($file, $listePostsJson);

 /** SHOTSHIP ****************************************************************************************************/
$pattern = [[1,1,1,1,1],[1,1,1,1,1],[1,1,1,1,1],[1,1,1,1,1],[1,1,1,1,1],[1,1,1,1,1],[1,1,1,1,1],[1,1,1,1,1],[1,1,1,1,1],[1,1,1,1,1]];
$colors = 11;

 //Recup des messages precedents
 $json_source = file_get_contents('./json/objects.json');
 $listeMessages = json_decode($json_source, true);

$type = "ShotShip";
$largeur = 5;
$hauteur = 10;
$coordY = 0;
$direction = -1;
$vitesse = 20; 
$lives = 1;
$coordX = 0;
$shot = 0; 


 //Creation du post au format tableau
 $postTableau = [
  'type' => $type, 
 'largeur' => $largeur, 
 'hauteur' => $hauteur, 
 'coordY' => $coordY,
 'coordX' => $coordY,
 'direction' => $direction,
 'vitesse' => $vitesse,
 'shot' => $shot,
 'lives' => $lives,
 'matrix' => $pattern,
 'colorsCodes' => $colors
];
 //Integration au tableau en cours
 array_push($listeMessages, $postTableau);

 //Conversion au format JSON
 $listePostsJson = json_encode($listeMessages, JSON_PRETTY_PRINT); //This parameter will format our JSON object and store it in json file
 
 //Recup du fichier d'origine
 $file = "./json/objects.json";
 
 //Ecrire la nouvelle liste dans le fichier messages.json
 file_put_contents($file, $listePostsJson);

 /** HEART ****************************************************************************************************/
$pattern = [[0, 1, 1, 0, 1, 1, 0],[1, 1, 1, 1, 1, 1, 1],[1, 1, 1, 1, 1, 1, 1],[0, 1, 1, 1, 1, 1, 0],[0, 0, 1, 1, 1, 0, 0],[0, 0, 0, 1, 0, 0, 0]];
$colors = 5;

 //Recup des messages precedents
 $json_source = file_get_contents('./json/objects.json');
 $listeMessages = json_decode($json_source, true);

$type = "Heart";
$largeur = 35;
$hauteur = 30;
$coordY = 20;
$coordX = 20;
$direction = 0;
$vitesse = 0;
$shot = 0; 
$lives = 1;

 //Creation du post au format tableau
 $postTableau = [
  'type' => $type, 
 'largeur' => $largeur, 
 'hauteur' => $hauteur, 
 'coordY' => $coordY,
 'coordX' => $coordY,
 'direction' => $direction,
 'vitesse' => $vitesse,
 'shot' => $shot,
 'lives' => $lives,
 'matrix' => $pattern,
 'colorsCodes' => $colors
];

 //Integration au tableau en cours
 array_push($listeMessages, $postTableau);

 //Conversion au format JSON
 $listePostsJson = json_encode($listeMessages, JSON_PRETTY_PRINT); //This parameter will format our JSON object and store it in json file
 
 //Recup du fichier d'origine
 $file = "./json/objects.json";
 
 //Ecrire la nouvelle liste dans le fichier messages.json
 file_put_contents($file, $listePostsJson);

 /** BigBoss ****************************************************************************************************/
$pattern = [0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0];
$colors = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

 //Recup des messages precedents
 $json_source = file_get_contents('./json/objects.json');
 $listeMessages = json_decode($json_source, true);

$type = "BigBoss";
$largeur = 65;
$hauteur = 75;
$coordX = 665;
$coordY = 200;
$direction = 0;
$vitesse = 1;
$shot = 0; 
$lives = 5;

$nb = $largeur / 5;
 //Creation du post au format tableau
 $postTableau = [
  'type' => $type, 
 'largeur' => $largeur, 
 'hauteur' => $hauteur, 
 'coordY' => $coordY,
 'coordX' => $coordY,
 'direction' => $direction,
 'vitesse' => $vitesse,
 'shot' => $shot,
 'lives' => $lives];

//Pattern
 $newListe = [];
 for($i = 0; $i<count($pattern); $i = $i + $nb){
   $u = 0;
   $provi = [];
   while($u < $nb){
     array_push($provi,$pattern[$i + $u]);
     $u++;
   }
   array_push($newListe,$provi);
 }

 $postTableau['matrix'] = $newListe;

//Colors
$newListe = [];
$compteur = 0;
for($i = 0; $i<count($pattern); $i = $i + $nb){
  $u = 0;
  $provi = [];
  while($u < $nb){
      if($pattern[$i + $u] === 1){
        array_push($provi,$colors[$compteur]);
        $compteur++;
      }else{
        array_push($provi,0);
      }
    $u++;
  }
  array_push($newListe,$provi);
}

$postTableau['colorsCodes'] = $newListe;


 //Integration au tableau en cours
 array_push($listeMessages, $postTableau);

 //Conversion au format JSON
 $listePostsJson = json_encode($listeMessages, JSON_PRETTY_PRINT); //This parameter will format our JSON object and store it in json file
 
 //Recup du fichier d'origine
 $file = "./json/objects.json";
 
 //Ecrire la nouvelle liste dans le fichier messages.json
 file_put_contents($file, $listePostsJson);