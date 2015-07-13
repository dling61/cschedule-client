//REST API Connection

var userListView = new UserListView();
var userEditView = new UserEditView();
var router = new Router;


    userListView.render();
/* router.on('route:home', function () {
    // render user list
    userListView.render();
	
	$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip({html:true});   
});


//	$(document).ready(function(){
//    $('#showDetails').popover({ html: true, placement: "right", effect: "slideDown", delay: 250});   
//});





$(function() {
    $(document).tooltip({		
		content: function () {
              return $(this).prop('title');
          },		 
    });   
  });
$(function(){
		$(document).ready(function(){
    $('#showDetails').popover({ title: "test" ,html:true});   
});

});
	

})
router.on('route:edit', function () {
    userEditView.render();
	
	$(function() {
    $( "name,email,mobile" ).tooltip({
		
      show: {
        effect: "slideDown",
        delay: 250
      }
    });   
  });
  
 
 
  
  
	
})


Backbone.history.start();
*/