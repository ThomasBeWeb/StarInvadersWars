void levelOver() {  //Level reussi //<>//

  background(255);

  String message1, message2;

  if (level >= 1 && level <= 3) {
    message1 = " Success !!!";
    message2 = "Next level: Press n";
  } else {
    message1 = " The Dark Force is over !!!";
    message2 = "Ranking: Press n";
    outro.play();
  }

  playerScore = playerScore + (decompteScore * starShip.lives);  //Bonus de points avec multiplicateur nombre de vies

  textMe(message1, fontBig, 300);

  textMe(("Your score is: " + playerScore + " pts"), fontMedium, 400);

  textMe(message2, fontMedium, 500);
}

void gameOver() {  //Jeu perdu
  
  background(0);

  playerScore = playerScore + decompteScore;

  textMe("Game Over", fontBig, 300);

  textMe(("Your score is: " + playerScore + " pts"), fontMedium, 400);

  textMe("Back to start: Press s\nQuit the game: Press q", fontMedium, 500);
}