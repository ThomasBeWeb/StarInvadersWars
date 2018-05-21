void showRanking() {

  background(255);

  String[] file = loadStrings("ranking.txt");  //Chargement des meilleurs scores

  StringList players = new StringList();
  IntList scores = new IntList();

  for (int i = 0; i < file.length; i += 2) {
    players.append(file[i]);
    scores.append(Integer.parseInt(file[i+1]));
  }

  //Ajout du joueur et de son score et sauvegarde du fichier

  players.append("You");
  scores.append(playerScore);

  String[] saveList = new String[players.size()*2];

  int indexList = 0;

  for (int index = 0; index < players.size(); index++) {

    saveList[indexList] = players.get(index);
    saveList[indexList + 1] = String.valueOf(scores.get(index));

    indexList += 2;
  }

  saveStrings("data/ranking.txt", saveList);

  //Classement des 5 meilleurs joueurs par score decroissant

  IntList decScores = new IntList();
  StringList decPlayers = new StringList();

  IntList reverseScores = scores.copy(); 
  
  reverseScores.sortReverse();  //Liste des scores par valeur decroissante

  int compteur = 1;

  for (int score : reverseScores) {

    if (compteur <= 5) {
      decScores.append(score);
      int index = scores.index(score);  //Recuperation de l'index de ce score dans la liste non classee
      decPlayers.append(players.get(index));
      compteur++;
    }
  }

  //AFFICHAGE

  textMe("Best scores", fontBig, 150);

  if (decScores.hasValue(playerScore)) {
    textMe(("Your score is: " + playerScore + " pts  You are in the Top 5 !!!"), fontMedium, 250);
  } else {
    textMe(("Your score is: " + playerScore + " pts"), fontMedium, 250);
  }

  for (int z = 0; z < decScores.size(); z++) {

    String message = (z + 1) + " " + decPlayers.get(z) + " ................ " + decScores.get(z) + " pts"; 

    if (playerScore == decScores.get(z)) {

      textAlign(CENTER);
      textFont(fontMedium);
      fill(48, 237, 77);
      text(message, 700, (350 + z*50));
    } else {

      textMe(message, fontMedium, (350 + z*50));
    }
  }

  textMe("Back to start: Press s\nQuit the game: Press q", fontMedium, 700);
}