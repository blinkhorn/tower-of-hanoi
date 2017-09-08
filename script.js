var isFirstOverallGame = true; //helps determine first communityTopScore later on
var playing = true; //game will play until this is false

while (playing) {
  //Global Variables
  //Initialize vars with info from HTML
  numberOfDisks = $("input[type=text][name=numberOfDisksEntered]").val();
  // console.log(numberOfDisks);

  //empty array and array with all disk.order in it for tower objects

  var emptyArray0 = [];
  var emptyArray1 = [];
  var emptyArray2 = [];


  var name; // = nameField.input();
  var moveCount = 0;
  //Make sure numberOfDisks is greater than 0
  while (numberOfDisks < 1) {
    console.error("You must play with at least 1 disk.");
    //numberOfDisks = diskField.input();
  }

  var minMovesPossible = 2 ** numberOfDisks - 1;

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
      $(`<div class="rod" id="rod${i}"></>`).data("diskCount", 0).appendTo(`#tower${i}`);
      $(`<div class="base" id="base${i}"></>`).appendTo(`#tower${i}`);
    }
    $("#rod0").data("diskCount", numberOfDisks);


    for (var i = 0; i < numberOfDisks; i++) {
      var diskVar = `disk${i}`;
      var disk = new Disk(i, getRandomColor());
      // console.log(disk.order);
      $(`<div class="disk" id="${diskVar}"></>`).data("order", i).appendTo("#rod0").draggable({
        containment: ".playingField",
        cursor: "move",
        stack: "#rod0, #rod1, #rod2",
        revert: true
      });
      // $("#rod0").data("diskArray").push(disk);
      // console.log($("#rod0").data("diskArray"));
      $(`#${diskVar}`).css({
        "background": `${disk.color}`,
        "width": `${disk.width}`,
        "height": `${disk.height}`
      });
      // $(`#${diskVar}`).data("rodLocation", 0);
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
        // console.log($('.rod').eq(i).children().eq(0));

      }
      // console.log($('.disk'));
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

  }

  isFirstOverallGame = false;
  playing = false;

}
