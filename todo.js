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
});
