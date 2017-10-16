var View = function() {
  var notesEl = $('.notes');

  this.showMessage = function(Msg) {
    notesEl.text(Msg)
    var time = 2400;
    setTimeout(function(){
      notesEl.text("")
    }, time)
  }

  this.asherMessage = function(Msg) {
    notesEl.text(Msg)
    notesEl.css('color', '#e67e22')
    var time = 5500 + (Msg.length * 20);
    setTimeout(function(){
      notesEl.text("")
      notesEl.css('color', '#fff')
    }, time)
  }
}
