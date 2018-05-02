$(document).ready(function(){
  // Con questa chiamata AJAX, col metodo get prendo gli elementi della lista salvati nel server
  // e appendo e li stampo sul dom

  $.ajax({
      url:"http://138.68.64.12:3005/todo/",
      method:"GET",
      success:function(data) {
        for (var i = 0; i < data.length; i++) {
          console.log(data)
          $(".wishlist").append('<li class = wishlist-item>' + data[i].text +
              '<i class="far fa-trash-alt" id ="' + data[i].id + '">' + '</i>' +
              '<i class="far fa-plus-square" id ="'+ data[i].id + '">' + '</i>' +
          '</li>')
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
            $(".wishlist").append('<li class = wishlist-item>' + data[i].text +
                '<i class="far fa-trash-alt" id ="' + data[i].id + '">' + '</i>' +
                '<i class="far fa-plus-square" id ="'+ data[i].id + '">' + '</i>' +
             '</li>')
          }
        },
    });
  });
  // creo due eventi in cui andando su ogni wishlist item appare un'icona cestino
  // sulla quale sarà possibile cliccare per eliminare il messaggio in maniera
  // permanente mediante una chiamata AJAX con metodo DELETE
  $(document).on("mouseenter",".wishlist-item",function(){
    var currentIcon= $(this).find(".far.fa-trash-alt");
    currentIcon.show();
  });

  $(document).on("mouseleave",".wishlist-item",function(){
    var currentIcon= $(this).find(".far.fa-trash-alt");
    currentIcon.hide();
  });

  $(document).on("click",".far.fa-trash-alt",function(){
    currentDeleteWishItem = $(this);
    var currentId= $(this).attr("id");
    console.log(currentId)
    $.ajax({
        url:"http://138.68.64.12:3005/todo/"+currentId ,
        method:"DELETE",
        success:function(data) {
          currentDeleteWishItem.parent().remove();
        },
    });
  });
  // creo due eventi in cui andando su ogni wishlist item appare un'icona add(plus)
  // sulla quale sarà possibile cliccare per modificare il messaggio in maniera
  // permanente mediante una chiamata AJAX con metodo PUT
  $(document).on("mouseenter",".wishlist-item",function(){
    var currentIcon= $(this).find(".far.fa-plus-square");
    currentIcon.show();
  });

  $(document).on("mouseleave",".wishlist-item",function(){
    var currentIcon= $(this).find(".far.fa-plus-square");
    currentIcon.hide();
  });

  $(document).on("click",".far.fa-plus-square",function(){
    $(".modify-wish-container").show();
    currentModifyWishItem = $(this);
    var currentId= $(this).attr("id");
    $(document).on("click","#btn-modify-wish",function(){
      var input = $("#modify-wish-input").val();
      console.log(input);
      $.ajax({
          url:"http://138.68.64.12:3005/todo/"+currentId ,
          method:"PUT",
          data:
          {
            "text" : input,
          },
          success:function(data) {
              $(".wishlist").html('<li class = wishlist-item>' + data.text +

               '</li>');
          },
      });
    });
  });

});
