var isFirstOverallGame = true; //helps determine first communityTopScore later on
var playing = true; //game will play until this is false

while (playing) {
  //Global Variables
  var numberOfDisks; // SET EQUAL to diskField.input once graphics are up
  var name; // = nameField.input();
  //Make sure numberOfDisks is greater than 0
  while (numberOfDisks < 1) {
    console.error("You must play with at least 1 disk.");
    //numberOfDisks = diskField.input();
  }

  var minMovesPossible = 2 ** numberOfDisks - 1;

  //Make sure you entered text
  while (name === "") {
    console.error("Please enter your name.");
    // name = nameField.input();
  }

  //Player class definition
  class Player {
    constructor(name) {
      this.name = name;
      scoreForDiskNumber = {
        runningScore: 0,
        numberOfGames: 0
      }
    }
  }

  //Tower class definition
  class Tower {
    constructor(number) {
      this.number = number;
    }
  }

  //Disk class definition
  class Disk {
    constructor(order, color) {
      this.tower = 0;
      this.order = order;
      this.color = color;
    }
  }

  //picks a random color for disk
  getRandomColor(){
    var values = "0123456789ABCDEF";
    var hash = "#";
    for (var i = 0; i < 6; i++) {
      hash += values[Math.floor(math.random() * 16)];
    }
    return hash;
  }

  //Object instantiations
  var player = new Player(name); //new Player
  for (var i = 0; i < 3; i++) {
    var `tower${i}` = new Tower(i); //3 new Towers
  }
  for (var i = 0; i < numberOfDisks; i++) {
    var `disk${i}` =  new Disk(i, getRandomColor());
  }

  //Move Loop ::: While game not over
  while(`disk${numberOfDisks - 1}`.tower === 0 && disk0.tower !== `disk${numberOfDisks - 1}`.tower) {

  }





  //End conditions
  isFirstOverallGame = false;

  //exitButton.on("click", function() {
  //   playing = false;
  // })
}
