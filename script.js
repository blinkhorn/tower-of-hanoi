var isFirstOverallGame = true; //helps determine first communityTopScore later on
var playing = true; //game will play until this is false
var numberOfDisks = $("input[type=text][name=numberOfDisksEntered]").val();
//empty array and array with all disk.order in it for tower objects

var emptyArray0 = [];
var emptyArray1 = [];
var emptyArray2 = [];
var minMovesPossible = 2 ** numberOfDisks - 1;

//Disk class definition
class Disk {
  constructor(size, color) {
    this.tower = 0; // the tower the disk is currently located
    this.size = size; //size increases with order
    this.color = color; //disk color
    this.width = `${(size + 4) * 15}px`;
    this.height = "13px";
  }
}

var name; // = nameField.input();
var moveCount = 0;
while (playing) {
  //Make sure numberOfDisks is greater than 0
  while (numberOfDisks < 1) {
    console.error("You must play with at least 1 disk.");
    //numberOfDisks = diskField.input();
  }

  init();


  isFirstOverallGame = false;
  playing = false;

}

//picks a random color for disk
function getRandomColor() {
  var values = "0123456789ABCDEF";
  var hash = "#";
  const HEX_DIGITS = 6;
  for (var i = 0; i < HEX_DIGITS; i++) {
    hash += values[Math.floor(Math.random() * 16)];
  }
  return hash;
}

function init() {

  //append rod and base divs to each of the three towers
  $(`<div class='rod'></>`).appendTo('.tower');
  $(`<div class='base'></>`).appendTo('.tower');

  /* create three disks to append to #tower0's rod. Use
  the i value from this for loop to when creating
  the disk's size in the disk constructor above */
  for (var i = 0; i < numberOfDisks; i++) {
    var diskVar = `diskHtmlId${i}`;
    var disk = new Disk(i, getRandomColor());

    $(`<div class="disk" id="${diskVar}"></>`)
      .appendTo("#tower0 .rod");

    dragTop();

    $(`#${diskVar}`).css({
      background: disk.color,
      width: disk.width,
      height: disk.height
    });
  }

  movable();


  $(".rod").droppable({
    accept: ".movable",
    hoverClass: 'hovered',
    drop: handleDiskDrop
  });

  function movable() {
    $('.disk').removeClass("movable");
    for (i = 0; i < 3; i++) {
      $('.rod').eq(i).children().eq(0).addClass("movable");
    }
  }

  function handleDiskDrop(event, ui) {
    // console.log("in handleDiskDrop")
    if (goodToDrop($(this), ui.draggable)) {

      var diskCount = $(this).data("diskCount");

      var diskOrder = ui.draggable.data("order");

      // console.log("the disk order in handleDiskDrop is " + diskOrder);
      ui.draggable.draggable('option', 'revert', false);
      $(this).append(ui.draggable.detach());

      diskCount++; //I need a way of updating the diskCount for the rod which the dragged disk recently left
      //dragged disk is at center bottom of the rod
      ui.draggable.position({ of: $(this),
        my: 'center bottom',
        at: 'center bottom'
      });

      //dragged disk is at the center bottom of the bottom disk
      ui.draggable.position({ of: $(this).children().eq(0),
        my: 'center bottom',
        at: 'center bottom'
      })

      //the bottom disk on the rod is at the center of the rod
      $(this).children().eq(0).position({ of: $(this),
        my: 'center bottom',
        at: 'center bottom'
      })

      moveCount++;
      movable();
      // returnRevert($(`#rod${rodNumber}`), ui);
    } else {
      ui.draggable.draggable('option', 'revert', true);
    }
  }

  function goodToDrop(rod, disk) {
    // console.log("in good to drop");
    var lastDisk = rod.children().eq(0);
    // console.log("last disk is " + lastDisk.data("order"));
    // console.log("the dragged disk's order is " + disk.data("order"));
    if (parseInt(disk.data("order")) < parseInt(lastDisk.data("order")) || rod.children().length === 0) {
      return true;
    } else {
      return false;
    }
  }

  function dragTop() {
    $('.disk').first().draggable({
    containment: ".playingField",
    cursor: "move",
    stack: ".disk",
    revert: true
    })
  }

}
