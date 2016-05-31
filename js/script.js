$(document).ready(function() {
    //Aadding items in  list using a variable function 
    
     var list = $(".list");



list.on("click", "input[type=button]", function(event) {
        EditList.call($(this).parent());

        
        //stop bubble effect
        event.stopPropagation();
    });

 list.on("focusout", "input[type=text]", edititem);
 list.on("mouseleave", "input[type=text]",edititem);

    list.on("keypress", "input[type=text]", function(event) {
        // Save changes when enter key is pressed
        if (event.which == 13) {
            $(this).focusout();
        }
    });


function  edititem() {
    var input = $(this);
    var prgph = (input).siblings("p");
     
    input.hide();
    prgph.text(input.val());
    console.log("New item value: " + input.val());
    prgph.show();


}



function EditList(event) {


     var p = $(this).find("p");
     var input = $(this).find("input[type=text]");
     var k =p[0].innerHTML;
     p.hide();
    input.val(k).show().focus();


}

  function Sort() {
    $( ".list" ).sortable();
    $( ".list" ).disableSelection();
  };

    var addItem = function() {
         var Input =$('input[name=ListItem]');
        var toAdd = Input.val().trim();

         var ListString =$('.list').append('<li class="item"><input class ="item" id="Chckbox" type="checkbox"/>'
            +'<input type="text" value="' + toAdd + '"><p>' 
            + toAdd +'</p><input type="button" class="button" value="Edit" id="EditBtn"></li>');
        if(toAdd.length != 0) 
          { 
              ListString.appendTo(".list");
             Input.val(" ");
             status();
              $("#error").hide();
              Sort(); 
        }
        else {

      var error = $("#error").hide();
        error.find("span").text("Please enter a non-empty value");
       error.show();
        return false;
    }
            //Checking for blanks need to add something to show error on page
             //$(#error).show();
              
        };






    $('#add').click(function() {
        addItem();
        //Calling a function to add ITEM in My DIV Container1
    });


    $('input').keypress(function(e) {
        if (e.keyCode == '13') {
            e.preventDefault();
           addItem();
        //Item to be added if user hit enter//13 enter 
        }
    });
    $('#clearAll').mousedown(function() {
         $('.item').remove();
         //Removing all the item from list
         status(0); 
    });
    $('#clearChecked').mousedown(function() {
         $('.checked').remove();

         //Removing checked item 
        status(0);
    });
    $(document).on('click', '.item', function() {

        $(this).toggleClass('checked');

       //  $(this).find("input[type=checkbox]").click();
     //  var Chckbox = $(this).find('input[type=checkbox]');
       //  Chckbox.prop('checked',true);
     
        //Changing the class name to be checked to be deleted later
         status(1)
    });
    $(document).on('dblclick', '.item', function() {
        $(this).remove();
        //Removing an item after dbl click event
         status(0);
    });
    var status = function(n) {
      var RemovedItem = $('.checked').length;
      if (n==1 & RemovedItem>0)
      {

             RemovedItem = RemovedItem -1;
      }

      var  TotItem = $('.item').length/2;
    
        $('span').html('<span>' + (TotItem-RemovedItem) + '/' + TotItem + '</span>');
    };
   

    
});