var isFirstOverallGame = true; //helps determine first communityTopScore later on
var playing = true; //game will play until this is false

while (playing) {
  //Global Variables
  var numberOfDisks; // SET EQUAL to diskField.input once graphics are up
  var name; // = nameField.input();
  var moveCount = 0;
  //Make sure numberOfDisks is greater than 0
  while (numberOfDisks < 1) {
    console.error("You must play with at least 1 disk.");
    //numberOfDisks = diskField.input();
  }

  var minMovesPossible = 2 ** numberOfDisks - 1;

  // //Make sure you entered text
  // while (name === "") {
  //   console.error("Please enter your name.");
  //   // name = nameField.input();
  // }

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
    constructor(number, contents) {
      this.number = number; //tower number [0, 1, 3]
      this.contents = contents; // contains the disk (order[s])
    }
  }

  //Disk class definition
  class Disk {
    constructor(order, color) {
      this.tower = 0; // the tower the disk is currently located
      this.order = order; //size increases with order
      this.color = color; //disk color
      this.width = `${(order + 4) * 15}px`;
      this.height = "13px";
    }
  }
  //METHODS

  //Detects if disk is let go over another tower
  function detectLocation(disk, moveCount) {
    //if drop it on one of the other two towers, call move(), passing that tower among other vars
    $(`tower${disk.tower + 1 % 3}`).on("mouseover", move(disk, moveCount, `tower${disk.tower + 1 % 3}`));
    $(`tower${disk.tower + 2 % 3}`).on("mouseover", move(disk, moveCount, `tower${disk.tower + 2 % 3}`));
  } // if mouse is let go over another tower, call move() function with disk and tower


  //determines whether you can move that disk to the tower you're dropping it on
  function move(disk, moveCount, destinationTower) {
    if (destinationTower.contents.length === 0) {
      // destinationTower.contents.push(disk.order); //push disk.order to tower's contents
      moveToTower(disk, moveCount, destinationTower); //destinationTower's contents is empty
      //so move disk there
    } else if (disk.order > destinationTower.contents[destinationTower.contents.length - 1]) { //if trying
      //to place a disk on smaller disk
      console.error("Invalid move: you can only stack disks in increasing size order");
    } else { //move is valid
      moveToTower(disk, moveCount, destinationTower); //move disk to new tower with moveToTower()
    }
  }

  //moves the disk to tower, updates disk.tower, and increments moveCount
  function moveToTower(disk, destinationTower, moveCount) {
    destinationTower.contents.push(disk.order); //push disk to destinationTower's contents array
    disk.tower = destinationTower.number; // set disks tower number to match destinationTower
    moveCount++; //increment moveCount to indicate another move
  }

  //picks a random color for disk
  function getRandomColor() {
    var values = "0123456789ABCDEF";
    var hash = "#";
    for (var i = 0; i < 6; i++) {
      hash += values[Math.floor(Math.random() * 16)];
    }
    return hash;
  }

  $(init);

  function init() {
    $(".disk").draggable({
      containment: ".playingField",
      cursor: "move",
      snap: ".tower",
      stack: ".tower"
    });
    $('.tower').droppable();
  }

  //Initialize vars with info from HTML
  numberOfDisks = $("input[type=text][name=numberOfDisksEntered]").val();
  console.log(numberOfDisks);

  //Object instantiations

  //new Player
  // var player = new Player(name);

  //empty array and array with all disk.order in it for tower objects
  var emptyArray = [];
  var fullContentsArray = [];
  for (var i = numberOfDisks - 1; i >= 0; i--) {
    fullContentsArray.push(i);
  }

  //3 new Towers
  var tower0 = new Tower(0, fullContentsArray);
  var tower1 = new Tower(1, emptyArray);
  var tower2 = new Tower(2, emptyArray);

  // numberOfDisks new disks


  for (var i = 0; i < numberOfDisks; i++) {
    var disk = `disk${i}`
    var disk = new Disk(i, getRandomColor());
    console.log(disk.order);
    $(".firstTower").find(".rod").append(`<div class='disk' id='disk${i}'></>`);
    $(`#disk${i}`).css({
      "background": `${disk.color}`,
      "width": `${disk.width}`,
      "height": `${disk.height}`
    });
  }


  //Move Loop ::: While game not over
  while (tower1.contents.length === numberOfDisks || tower2.contents.length === numberOfDisks) {
    if (moveCount === 0) {
      //disk0.on("mousedown", "startTimes()");
    }
    // $(this).on("mousemove", visuallyMove($(this)));
    //when you let go of the disk with your mouse, call detectLocation
    // $(this).on("mouseup", detectLocation($(this), moveCount));

    //restartButton()
  }

  //stopTimer()
  //storeScoresAndTime()
  //printEndMessage()
  //scoreKeeper()


  //End conditions
  isFirstOverallGame = false;
  playing = false;
  //exitButton.on("click", function() {
  //   playing = false;
  // })
}
