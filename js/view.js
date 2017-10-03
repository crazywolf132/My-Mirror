var View = function() {
  var notesEl = $('.notes');

  this.showMessage = function(Msg) {
    notesEl.text(Msg)
    var time = 2400;
    setTimeout(function(){
      notesEl.text("")
    }, time)
  }
}
