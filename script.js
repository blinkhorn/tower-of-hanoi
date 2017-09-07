// My overall feedback is don't be afraid to throw away non-working code.
// There are pieces of a variety of approaches here, which is a significant
// distraction while you're implementing an approach

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
    for (var i = 0; i < 6; i++) { // 6 is an example of a 'magic number'
    // Better practice is to have a constant like...
    // const HEX_DIGITS = 6
    // and then use it in a for-loop like this...
    // for (i = 0; i < HEX_DIGITS; i++) {
      hash += values[Math.floor(Math.random() * 16)];
    }
    return hash;
  }


  $(init); // would just use init() to call init, especially since init doesn't
  // return anything

  function init() {
    // You can replace your for-loops with https://api.jquery.com/each/
    for (var i = 0; i < 3; i++) {
      // since you have a container for your rods, take a look at the link below
      // https://api.jquery.com/event.stoppropagation/
      // I think that is one potential source of bugs in your program
      $(`<div class="tower" id="tower${i}"></div>`).data("number", i).appendTo(".playingField");
      $(`<div class="rod" id="rod${i}"></div>`).data("number", i).appendTo(`#tower${i}`);
      $(`<div class="base" id="base${i}"></div>`).appendTo(`#tower${i}`);
    }



    //add arrays for disks to the tower elements' data
    for (var i = 0; i < 3; i++) {
      $(`#rod${i}`).data("diskArray", emptyArray);
    }


    for (var i = 0; i < numberOfDisks; i++) {
      var diskVar = `disk${i}`; //suggested name: diskHtmlId
      var disk = new Disk(i, getRandomColor());

      // I might make only the top disk in each stack/rod draggable
      // If you go that route, I would break that out into a function that runs
      // each time through the game loop
      $(`<div class="disk" id="${diskVar}"></div>`)
        .data("order", i) // might call this 'size' rather than 'order'
        .appendTo("#rod0")
        .draggable({
          containment: ".playingField",
          cursor: "move",
          stack: "#rod0, #rod1, #rod2", //should be .disk I think according to the jQuery Ui docs
          //https://api.jqueryui.com/draggable/#option-stack
          revert: true
        })
      // I would avoid the pattern below and just use .children() to read from
      // the DOM directly, rather than storing an array as a data attribute of
      // a rod DOM element
      $("#rod0").data("diskArray").push(disk);
      $(`#${diskVar}`).css({
        background: `${disk.color}`, // dont need quotes for keys here
        width: `${disk.width}`,
        height: `${disk.height}`
      });
      $(`#${diskVar}`).data("rodLocation", 0);
    }

    movable();

    // //create .movable array for the
    // var diskArrays = $(".rod").data("diskArray"); //////NEW MAYBE ISSUE
    // console.log('general disk array', diskArrays);
    // var movableDisks = diskArrays[numberOfDisks - 1];

    $(".rod").droppable({
      accept: ".movable",
      hoverClass: 'hovered',
      drop: handleDiskDrop
    });
  }

  function movable() {
    $('.disk').removeClass("movable");
    // const NUM_RODS = 3
    // for (i = 0; i < NUM_RODS; i++) {

    for (i = 0; i < 3; i++) {
      $('.rod').eq(i).children().eq(0).addClass("movable");
    }
  }

  function handleDiskDrop(event, ui) {
    //I think one bug source is that `this` can potentially be the tower element
    //which contains your rods

    // an alternative might be to use event.target

    // check out https://api.jquery.com/event.stoppropagation/ for more info
    console.log("handleDiskDrop this:", this, "ui", ui);

    if (goodToDrop($(this), ui.draggable)) {
      var rodNumber = $(this).data("number");

      var diskRodLocation = ui.draggable.data("rodLocation");
      var oldRodNumber = diskRodLocation;
      var diskOrder = ui.draggable.data("order");

      // Ultimately I think your stacking bug has to do with the order of DOM
      // operations below
      ui.draggable.draggable('option', 'revert', false);

      $(this).append(ui.draggable.detach()) //appending may not be what you want
      // maybe prepending is what you want, since it would add the element to
      // the top of the parent element's NodeList (make it first child)

      ui.draggable.position({
        of: $(this),
        my: 'center bottom',
        at: 'center bottom'
      })

      ui.draggable.position({
        of: $(this).children().eq(0),
        my: 'center bottom',
        at: 'center bottom'
      })

      $(this).children().eq(0).position({
        of: $(this),
        my: 'center bottom',
        at: 'center bottom'
      })

      movable()
    } else {
      ui.draggable.draggable('option', 'revert', true);
    }
  }

  function goodToDrop(rod, disk) {
    var lastDisk = rod.children().eq(0); //firstDisk?

    //think you want:
    // if ((parseInt(disk.data("order")) < parseInt(lastDisk.data("order"))) || rod.children().length === 0) {
    if (parseInt(disk.data("order")) < parseInt(lastDisk.data("order")) || rod.children().length === 0) {
      return true;
    } else {
      return false;
    }
  }
  isFirstOverallGame = false;
  playing = false;
}

// for another jquery ui example
// https://blogocode.wordpress.com/2012/10/22/towers-of-hanoi-with-jquery/
