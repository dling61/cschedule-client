<div id="createEventDialog">
  <div id="tabs-create">
    <ul id="create-tab-list">
      <li><a href="#basic" data-id="tab-1" class="createEventTab">Basic Info</a></li>
      <li><a href="#timeLoc" class="createEventTab" data-id="tab-2">Time & Location</a></li>
      <li><a href="#task" class="createEventTab" data-id="tab-3">Tasks (optional)</a></li>
      <li><a href="#preview" class="createEventTab" data-id="tab-4">Preview & Publish</a></li>
    </ul>

      <div id="preview">
        <div class="title">Preview & Publish</div>
        <div class="eventbody" style="width:95%">
          <div class="discussion">Assignment Discussion</div>
          <div class="event-body">
            <div class="eventlist">
              <ul>
                <li>Add task</li>
                <li>Food service</li>
                <li>Ride service</li>
                <li>Cleaning</li>
              </ul>
            </div><!-- end event list -->

            <div class="event-schedule">    
<!-- Insert to your webpage where you want to display the carousel -->
<div id="amazingcarousel-container-1">
    <div id="amazingcarousel-1" style="display:none;position:relative;width:100%;max-width:720px;margin:0px auto 0px;">
        <div class="amazingcarousel-list-container">
            <ul class="amazingcarousel-list">
                <li class="amazingcarousel-item">
                    <div class="amazingcarousel-item-container">
<div class="amazingcarousel-image"><a href="images/33674_51111_4378_jxHSY.svol-lightbox.png"  class="html5lightbox" data-group="amazingcarousel-1"><img src="images/33674_51111_4378_jxHSY.svol.png"  /></a></div>
                   </div>
                </li>
                <li class="amazingcarousel-item">
                    <div class="amazingcarousel-item-container">
<div class="amazingcarousel-image"><a href="images/42371_66853_4378_iF303.svol-lightbox.png"  class="html5lightbox" data-group="amazingcarousel-1"><img src="images/42371_66853_4378_iF303.svol.png"  /></a></div>
                   </div>
                </li>
                <li class="amazingcarousel-item">
                    <div class="amazingcarousel-item-container">
<div class="amazingcarousel-image"><a href="images/liKr9fahGUqA-lightbox.jpg" class="html5lightbox" data-group="amazingcarousel-1"><img src="images/liKr9fahGUqA.jpg"  /></a></div>
                    </div>
                </li>
                <li class="amazingcarousel-item">
                    <div class="amazingcarousel-item-container">
<div class="amazingcarousel-image"><a href="images/IMG_2389-lightbox.jpg" class="html5lightbox" data-group="amazingcarousel-1"><img src="images/IMG_2389.jpg"   /></a></div>
                 </div>
                </li>
            </ul>
            <div class="amazingcarousel-prev"></div>
            <div class="amazingcarousel-next"></div>
        </div>
    </div>
</div>
<!-- End of body section HTML codes -->
            </div><!-- end event scehdule -->
          </div>
        </div>
      <!-- TBD: display Preview & Publish -->

    </div>

    <div id="basic" >
      <div class="title">Basic Info</div>
      <div class="eventbody">
        <table><tr >
        <td class="t1">Event Name:*</td> <td><input type="text" placeholder=" eg. Monthly Potluck" id="createEventNameFLD" required></td></tr>
        <tr><td class="t1">Description:</td><td><input type="text" placeholder=" Brief introduction about this event" id="createEventDescripFLD"></td></tr>
      </table>
    </div>
    </div>

    <div id="task">
      <div class="title">Task (optional)</div>
      <div class="eventbody">
      <table><tr>
      <td class="t1">Task Name:* &nbsp;</td> <td><input type="text" placeholder=" eg. Food Service"></input></td></tr>
      <td class="t1">Description: &nbsp;</td> <td valign="top"><textarea class="des"rows="3" type="text" placeholder=" Brief introduction about the task"></textarea></td></tr>
       <td class="t1">No. of Helpers: &nbsp;</td> <td><input type="number" placeholder="00" style="width:10%;text-align:center"></input></td></tr>
     </table>
     <table><tr>
      <td class="t1" valign="top">Helper Pool: &nbsp;&nbsp; </td>

      <td style="width:10px">
        <div class="participants" id="pool">
          <section>participants pool</section>
        </div></td>
      <td style="width:50px">move</td>
      <td style="width:200px">
        <div class="participants" >
          <!--<div id="p1">Participant 1</div>
          <div id="p2">Participant 2</div>
          <div id="p3">Participant 3</div>-->
          <ul id="gallery" >
            <section>candidates pool</section>
            <li >
              WenJuan Li
            </li>

            <li >
              JingRan
            </li>

            <li>
              Tony
            </li>

            <li >
              Bill
            </li>
          </ul><!-- end gallery list -->
        </div></td></tr>
      </table>
            <div style="width:40%"> 
        <button id="addNewTask">Add Another Task</button> 
      </div>
    </div>

    
    </div>

    <div id="timeLoc">
      <div class="title">Time and Location</div>
      <div class="eventbody">
        <div class="one-time-event">

          <form>
        <div id="radio1"> <input type="radio" onclick="oneEvent()" id="onetimeEvent" name="eventType" checked >This is a one-time event.</div>
         <div id="radio2"><input type="radio" onclick="repeat()" id="repeatEvent" name="eventType">This is a repeating event.<br></div>
       </form>
       </div>
       <script>
       function oneEvent()
       {
        document.getElementById("createEventRepeat").style.display = "none";
        document.getElementById("createEventOneTime").style.display = "block";
        document.getElementById("radio1").style.color="#34629A";
        document.getElementById("radio1").style.fontWeight="bold";
        document.getElementById("radio2").style.color="black";
        document.getElementById("radio2").style.fontWeight="normal";


      }
      function repeat()
      {
        document.getElementById("createEventRepeat").style.display = "block";
        document.getElementById("createEventOneTime").style.display = "none";
        document.getElementById("radio1").style.color="black";
        document.getElementById("radio1").style.fontWeight="normal";
        document.getElementById("radio2").style.color="#34629A";
        document.getElementById("radio2").style.fontWeight="bold";

      }

        $(function() {
    // there's the gallery and the pool
    var $gallery = $( "#gallery" ),
      $pool = $( "#pool" );
 
    // let the gallery items be draggable
    $( "li", $gallery ).draggable({
      cancel: "a.ui-icon", // clicking an icon won't initiate dragging
      revert: "invalid", // when not dropped, the item will revert back to its initial position
      containment: "document",
      helper: "clone",
      cursor: "move"
    });
 
    // let the pool be droppable, accepting the gallery items
    $pool.droppable({
      accept: "#gallery > li",

      drop: function( event, ui ) {
        deleteImage( ui.draggable );
      }
    });
 
    // let the gallery be droppable as well, accepting items from the pool
    $gallery.droppable({
      accept: "#pool li",
      activeClass: "custom-state-active",
      drop: function( event, ui ) {
        recycleImage( ui.draggable );
      }
    });
 
    // image deletion function
    //var recycle_icon = "<a href='link/to/recycle/script/when/we/have/js/off' title='Recycle this image' class='ui-icon ui-icon-refresh'>Recycle image</a>";
    function deleteImage( $item ) {
      $item.fadeOut(function() {
        var $list = $( "ul", $pool ).length ?
          $( "ul", $pool ) :
          $( "<ul class='gallery ui-helper-reset'/>" ).appendTo( $pool );
 
        $item.find( "a.ui-icon-pool" ).remove();
        $item.appendTo( $list ).fadeIn(function() {
          $item.animate({ width: "220px" });
        });
      });
    }
 
    // image recycle function
   // var pool = "<a href='link/to/pool/script/when/we/have/js/off' title='Delete this image' class='ui-icon ui-icon-pool'>Delete image</a>";
    function recycleImage( $item ) {
      $item.fadeOut(function() {
        $item
          .find( "a.ui-icon-refresh" )
            .remove()
          .end()
          .css( "width", "220px")
          .appendTo( $gallery )
          .fadeIn();
      });
    }
 
    // image preview function, demonstrating the ui.dialog used as a modal window
 
    // resolve the icons behavior with event delegation
    $( "ul.gallery > li" ).click(function( event ) {
      var $item = $( this ),
        $target = $( event.target );
 
      if ( $target.is( "a.ui-icon-pool" ) ) {
        deleteImage( $item );
      }  else if ( $target.is( "a.ui-icon-refresh" ) ) {
        recycleImage( $item );
      }
      return false;
    });
  });
        
       </script>
      <div id="createEventOneTime" style="width:100%;display:block">
        <table style="width:95%;left:2%">
          <tr>
          <td class="t1">First Event Start:*</td><td><input type="text" placeholder="mm/dd/yyyy" id="createOneEventStartDTFLD" style="width:40%"></input>
          &nbsp;&nbsp;
          <input style="width:30%"type="text" placeholder="HH:MM AM"  id="StartTime"></input></td>
        </tr>
        <tr>
          <td class="t1">First Event End:* </td><td><input type="text" placeholder="mm/dd/yyyy" id="createOneEventEndDTFLD" style="width:40%"></input>
          &nbsp;&nbsp;
          <input style="width:30%"type="text" placeholder="HH:MM AM"  id="EndTime"></input></td>
        </tr>
         <tr> <td class="t1">Time Zone:* </td><td><input type="text" value="Pacific Time"  id="timezone-one"></input></td></tr>
        <tr><td valign="top" class="t1"> Location:*</td><td><textarea rows="4"type="text" placeholder=" Address" id="createEventLocFLD"></textarea></td></tr>
        <tr><td class="t1"> Host:</td> <td><input style="width:95%"type="text" placeholder="Type a participant's name" id="createEventHostFLD"></input></td></tr>
          <tr><td class="t1">Alert:*</td><td><input tyle="text" value="24 Hours Before" id="alert-one"></input></td></tr>
       </table>
     </div>

        <div id="createEventRepeat" style="display:none" >
          <table style="width:95%;left:2%">
          <tr>
          <td class="t1">First Event Start:*</td><td><input type="text" placeholder="mm/dd/yyyy" id="createOneEventStartDTFLD" style="width:40%"></input>
          &nbsp;&nbsp;
          <input style="width:30%"type="text" placeholder="HH:MM AM"  id="StartTime"></input></td>
        </tr>
        <tr>
          <td class="t1">First Event End:* </td><td><input type="text" placeholder="mm/dd/yyyy" id="createOneEventEndDTFLD" style="width:40%"></input>
          &nbsp;&nbsp;
          <input style="width:30%"type="text" placeholder="HH:MM AM"  id="EndTime"></input></td>
        </tr>
         <tr> <td class="t1">Time Zone:* </td><td><input type="text" value="Pacific Time"  id="timezone-one"></input></td></tr>
       </table>
         
          <div class="createEventRepeatSetting">
            <table style="width:95%;left:2%"><tr>
          <td class="t1">Repeat Every:* </td><td><input type="text" value="1" style="width:20%"> &nbsp;&nbsp;<input type="text" value="weeks" style="width:20%"></td>
        </tr>
         <tr>
          <td class="t1">On:* </td> <td ><input type="checkbox" value="Sun"> Sun
              <input  type="checkbox" value="Mon"> Mon
              <input type="checkbox" value="Tue"> Tue 
              <input type="checkbox" value="Wed"> Wed
              <input type="checkbox" value="Thu"> Thu 
              <input type="checkbox" value="Fri"> Fri 
              <input type="checkbox" value="Sat"> Sat
            </td>
          </tr>
          <tr><td class="t1">Repeat Until:*</td> <td><input type="text" placeholder="mm/dd/yyyy" id="createEventRS" style="width:40%"></td>
        </table>
        </div>  
   </div>
    </div>



  </div>
</div>