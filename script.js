var isFirstOverallGame = true; //helps determine first communityTopScore later on
var playing = true; //game will play until this is false

while (playing) {
  //Global Variables
  //Initialize vars with info from HTML
  numberOfDisks = $("input[type=text][name=numberOfDisksEntered]").val();
  // console.log(numberOfDisks);

  //empty array and array with all disk.order in it for tower objects
  var emptyArray = [];
  var fullContentsArray = [];


  //3 new Towers
  // var tower00 = new Tower(0, fullContentsArray);
  // var tower01 = new Tower(1, emptyArray);
  // var tower02 = new Tower(2, emptyArray);


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

  // //Player class definition
  // class Player {
  //   constructor(name) {
  //     this.name = name;
  //     scoreForDiskNumber = {
  //       runningScore: 0,
  //       numberOfGames: 0
  //     }
  //   }
  // }
  //
  // //Tower class definition
  // class Tower {
  //   constructor(number, contents) {
  //     this.number = number; //tower number [0, 1, 3]
  //     this.contents = contents; // contains the disk (order[s])
  //   }
  // }

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

  // //Detects if disk is let go over another tower
  // function detectLocation(disk, moveCount) {
  //   //if drop it on one of the other two towers, call move(), passing that tower among other vars
  //   $(`tower${disk.tower + 1 % 3}`).on("mouseover", move(disk, moveCount, `tower${disk.tower + 1 % 3}`));
  //   $(`tower${disk.tower + 2 % 3}`).on("mouseover", move(disk, moveCount, `tower${disk.tower + 2 % 3}`));
  // } // if mouse is let go over another tower, call move() function with disk and tower

  //
  // //determines whether you can move that disk to the tower you're dropping it on
  // function move(disk, moveCount, destinationTower) {
  //   if (destinationTower.contents.length === 0) {
  //     // destinationTower.contents.push(disk.order); //push disk.order to tower's contents
  //     moveToTower(disk, moveCount, destinationTower); //destinationTower's contents is empty
  //     //so move disk there
  //   } else if (disk.order > destinationTower.contents[destinationTower.contents.length - 1]) { //if trying
  //     //to place a disk on smaller disk
  //     console.error("Invalid move: you can only stack disks in increasing size order");
  //   } else { //move is valid
  //     moveToTower(disk, moveCount, destinationTower); //move disk to new tower with moveToTower()
  //   }
  // }
  //
  // //moves the disk to tower, updates disk.tower, and increments moveCount
  // function moveToTower(disk, destinationTower, moveCount) {
  //   destinationTower.contents.push(disk.order); //push disk to destinationTower's contents array
  //   disk.tower = destinationTower.number; // set disks tower number to match destinationTower
  //   moveCount++; //increment moveCount to indicate another move
  // }

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
    for (var i = 0; i < 3; i++) {
      $(`<div class="tower" id="tower${i}"></>`).data("number", i).appendTo(".playingField");
      $(`<div class="rod" id="rod${i}"></>`).data("number", i).appendTo(`#tower${i}`);
      $(`<div class="base" id="base${i}"></>`).appendTo(`#tower${i}`);
    }

    //add arrays for disks to the tower elements' data
    for (var i = 0; i < 3; i++) {
      $(`#rod${i}`).data("diskArray", emptyArray);
    }
    // $("#rod0").data("diskArray", fullContentsArray);
    // $("#rod1").data("diskArray", emptyArray);
    // $("#rod2").data("diskArray", emptyArray);


    for (var i = 0; i < numberOfDisks; i++) {
      var diskVar = `disk${i}`;
      var disk = new Disk(i, getRandomColor());
      console.log(disk.order);
      $(`<div class="disk" id="${diskVar}"></>`).data("order", i).appendTo("#rod0").draggable({
        containment: ".playingField",
        cursor: "move",
        stack: "#rod0, #rod1, #rod2",
        revert: true
      });
      $("#rod0").data("diskArray").unshift(disk);
      console.log($("#rod0").data("diskArray"));
      $(`#${diskVar}`).css({
        "background": `${disk.color}`,
        "width": `${disk.width}`,
        "height": `${disk.height}`
      });
      $(`#${diskVar}`).data("rodLocation", 0);
    }

    movable();

    //create .movable array for the
    var diskArrays = $(".rod").data("diskArray"); //////NEW MAYBE ISSUE
    var movableDisks = diskArrays[numberOfDisks - 1];
    console.log(movableDisks);


    // console.log(disksDisks);
    // console.log(movableDisks);

    console.log(diskArrays[numberOfDisks - 1]);


    // console.log($("#rod0").children().length);

    $(".rod").droppable({
      accept: ".movable",
      hoverClass: 'hovered',
      drop: handleDiskDrop
    });

    // $stacks.droppable({
    //   accept: ".movable",
    //   drop: function(event, ui) {
    //     if (!gameover) {
    //       if (goodToDrop($(this), ui.draggable)) {
    //         ui.draggable.draggable('option', 'revert', false);
    //         $(this).append(ui.draggable.detach());
    //         ui.draggable.css({
    //           'top': 0,
    //           'left': 0
    //         });
    //         //reset things
    //         $movableBlocks = $('[data-block]:last-child');
    //         $('[data-block]').removeClass("movable");
    //         $movableBlocks.addClass("movable");
    //         $blocks.draggable({
    //           revert: true
    //         });
    //         //checkForWin
    //         checkForWin();
    //       }
    //     } else {
    //       resetGame();
    //     }
    //   }
    // });
  }

  function movable() {
    $('.disk').removeClass("movable");
    for (i = 0; i < 3; i++) {
      $('.rod').eq(i).children().eq(0).addClass("movable");
      console.log($('.rod').eq(i).children().eq(0));

    }
    console.log($('.disk'));
  }

  function handleDiskDrop(event, ui) {
    console.log("in handleDiskDrop")
    if (goodToDrop($(this), ui.draggable)) {
      var rodNumber = $(this).data("number");
      var rodDiskArray = $(this).data("diskArray");
      var diskRodLocation = ui.draggable.data("rodLocation");
      var diskOrder = ui.draggable.data("order");
      ui.draggable.draggable('option', 'revert', false);
      $(this).append(ui.draggable.detach());
      // ui.draggable.draggable( 'disable' );
      // $(this).droppable( 'disable' );
      ui.draggable.position({ of: $(this),
        my: 'center bottom',
        at: 'center bottom'
      });
      // var diskArrays = $(".rod").data("diskArray"); //////NEW MAYBE ISSUE
      // var movableDisks = $("diskArrays:last-child");
      // $movableBlocks = $('[data-block]:last-child');
      // $('[data-block]').removeClass("movable");
      // $movableBlocks.addClass("movable");
      // $blocks.draggable({
      //   revert: true
      // });

      rodDiskArray.push(diskOrder);
      diskRodLocation = rodNumber;
      console.log(rodNumber);
      console.log(rodDiskArray);
      console.log(diskRodLocation);
      console.log(diskOrder);
      moveCount++;
      movable();
      // returnRevert($(`#rod${rodNumber}`), ui);
    }
  }

  function goodToDrop(rod, disk) {
    var lastDisk = rod.children().last();
    console.log(lastDisk);
    if (parseInt(disk.attr("order")) < parseInt(lastDisk.attr("order")) || rod.children().length === 0) {
      return true;
    } else {
      return false;
    }
  }

  // If all the cards have been placed correctly then display a message
  // and reset the cards for another go

  // if ( correctCards == 10 ) {
  //   $('#successMessage').show();
  //   $('#successMessage').animate( {
  //     left: '380px',
  //     top: '200px',
  //     width: '400px',
  //     height: '100px',
  //     opacity: 1
  //   } );
  // }
  // ui.draggable.draggable( 'option', 'revert', true );


  function returnRevert(event, ui) {
    ui.draggable.draggable('option', 'revert', true);
  }

  //Object instantiations

  //new Player
  // var player = new Player(name);






  //Move Loop ::: While game not over
  // while (tower1.contents.length === numberOfDisks || tower2.contents.length === numberOfDisks) {
  //   if (moveCount === 0) {
  //     //disk0.on("mousedown", "startTimes()");
  //   }
  //   // $(this).on("mousemove", visuallyMove($(this)));
  //   //when you let go of the disk with your mouse, call detectLocation
  //   // $(this).on("mouseup", detectLocation($(this), moveCount));
  //
  //   //restartButton()
  // }

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
