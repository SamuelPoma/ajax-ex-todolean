$(document).ready(function(){
  // Con questa chiamata AJAX, col metodo get prendo gli elementi della lista salvati nel server
  // e appendo e li stampo sul dom
  $.ajax({
      url:"http://138.68.64.12:3005/todo/",
      method:"GET",
      success:function(data) {
        for (var i = 0; i < data.length; i++) {
          console.log(data)
          $(".wishlist").append('<li class = wishlist-item>' + data[i].text + '</ul>')
        }
      },
  });
  // Al click sul button viene effettuata una chiamata AJAX con metodo POST che aggiunge
  // un wishlist-item alla wishlist
  $("#btn-send-wish").click(function(){
    $.ajax({
        url:"http://138.68.64.12:3005/todo/",
        method:"POST",
        data:
          {
            "text" : $("#wish-input").val()
          },

        success:function(data) {
          for (var i = 0; i < data.length; i++) {
            console.log(data)
            $(".wishlist").append('<li class = wishlist-item>' + data[i].text + '</ul>')
          }
        },
    });
  });

});
