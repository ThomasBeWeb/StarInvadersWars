var bossPattern = [0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0];

var newListe = [];
for(i = 0; i<bossPattern.length; i = i + 13){
  var u = 0;
  var provi = [];
  while(u < 13){
    provi.push(bossPattern[i + u]);
    u++;
  }
  newListe.push(provi);
}

// var indice = 0; //Indice du pattern

// var largeur = 65;
// var hauteur = 75;

// var matrix = [][];

// for (var i = 0; i < hauteur; i += 5) {  // Tous les 5 pixels en Y
//   for (var j = 0; j < largeur; j += 5) {  //Tous les 5 pixels en X

//     var value = bossPattern[indice];

//     for (var y = 0; y < 5; y++) {  //La valeur 1 ou 0 est attribuee aux 25 pixels du carre
//       for (var z = 0; z < 5; z++) {

//         matrix[i + y][j + z] = value;
//       }
//     }

//     indice++;
//   }
// }

console.log(newListe);

newListe.forEach(element => {
  document.getElementsById('test').innerHTML = element;
});


