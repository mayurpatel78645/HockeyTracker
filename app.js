function Team(teamName, goals) {
  this.teamName = teamName;
  this.goals = goals;
  this.points = 0;
  this.wins = 0;
  this.draws = 0;
  this.losses = 0;
}

function HockeyTracker(){
  this.gameArray = [];
}

HockeyTracker.prototype.findTeam = function(teamName){
  for (let value of this.gameArray){
    if (value.teamName === teamName){
      return value;
    }
  }
}

HockeyTracker.prototype.evaluateWins = function(gameArray){
  if (gameArray[0][1] > gameArray[1][1]){
    return gameArray[0][0];
  }else if (gameArray[1][1] > gameArray[0][1]){
    return gameArray[1][0];
  }
}

HockeyTracker.prototype.updateHomeTeam = function(teamName){
  this.updateWins(teamName, gameArray);
}

HockeyTracker.prototype.updateAwayTeam = function(teamName){
  this.updateWins(teamName, gameArray);
}

HockeyTracker.prototype.updateTeams = function(gameArray){
  this.updateWins(gameArray[0][1], gameArray);
  this.updateWins(gameArray[1][0], gameArray);
}

HockeyTracker.prototype.add = function(gameArray){
  if (this.checkData(gameArray[0][0]) && this.checkData(gameArray[1][0])){
    this.updateTeams(gameArray);
  }
  if (!this.checkData(gameArray[0][0]) && !this.checkData(gameArray[1][0])){
    for (let value of gameArray){
      this.gameArray.push(new Team(value[0], value[1]));
    }
    this.updateTeams(gameArray);
  }else if (!this.checkData(gameArray[0][0])){
    this.gameArray.push(new Team(gameArray[0][0], gameArray[0][1]));
    this.updateHomeTeam(gameArray[0][0]);
  }else if (!this.checkData(gameArray[1][0])){
    this.gameArray.push(new Team(gameArray[1][0], gameArray[1][1]));
    this.updateAwayTeam(gameArray[1][0]);
  }
}

HockeyTracker.prototype.updateWins = function(teamName, gameArray){
  if (this.evaluateWins(gameArray) === teamName){
    this.findTeam(teamName).wins++;
  }
}

HockeyTracker.prototype.checkData = function(teamName){
  return this.gameArray.some( elements => elements.teamName === teamName);
}

HockeyTracker.prototype.getPoints = function(teamName){
  return this.findTeam(teamName).points = this.findTeam(teamName).wins + 2;
}

const tracker = new HockeyTracker();

tracker.add([["Winnipeg", 3], ["Edmonton", 0]])

console.log(tracker.getPoints("Winnipeg")); // 2
console.log(tracker.getPoints("Edmonton")); // 0

tracker.add([["Winnipeg", 1], ["Edmonton", 1]]);

console.log(tracker.getPoints("Winnipeg")); // 4
console.log(tracker.getPoints("Edmonton")); // 1
console.log(tracker);