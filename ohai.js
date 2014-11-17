$('.cell').on("click", function(e){
  var $cell = $(this);
  var newState = Game.toggleCell($cell.data('row'), $cell.data('col'));
  switch(newState) {
    case 0: // empty (gray)
    $cell.removeClass('blue');
    break;
    case 1: // red
    $cell.addClass('red');
    break;
    case 2: // blue
    $cell.removeClass('red');
    $cell.addClass('blue');
    break;
  }
  Game.validate();
});

var Game = {
  board: [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0]
  ],
  toggleCell: function(row, col) {
    this.board[row][col] = (this.board[row][col] + 1) % 3;
    return this.board[row][col];
  },
  validate: function() {
    // TODO: figure out how to make this better when we have lots of checks
    var message = this.rowCheck() || this.columnCheck();
    if (message) {
      alert(message);
      return;
    }
  },
  rowCheck: function(){
    for (var row=0; row < this.board.length; row++) {
      var numberOfReds = 0;
      var numberOfBlues = 0;
      for (var cell=0; cell < this.board.length; cell++){
        switch (this.board[row][cell]) {
          case 1:
          numberOfReds++;
          break;
          case 2:
          numberOfBlues++;
          break;
        }
        if (numberOfBlues > 2 || numberOfReds > 2) {
          return 'Row ' + (row + 1) + ' must have an equal number of reds and blues.';
        }
      }
    }
  },
  columnCheck:function(){
    for (var column=0; column<this.board.length; column++ ){
      var numberOfReds = 0;
      var numberOfBlues = 0;
      for (var cell=0; cell < this.board.length; cell++){
        switch (this.board[cell][column]) {
          case 1:
          numberOfReds++;
          break;
          case 2:
          numberOfBlues++;
          break;
        }
        if (numberOfBlues > 2 || numberOfReds > 2) {
          return 'Column ' + (column + 1) + ' must have an equal number of reds and blues.';
        }
      }
    }
  }
};