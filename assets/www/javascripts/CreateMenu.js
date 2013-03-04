function SmenuItems()
 {
        $("#buttonlist").hide(); 
		document.getElementById("divContainMenu").innerHTML=" ";
 		var content="";
  		content +='<div id="Smenu" data-role="content" ><center><div class="ui-grid-a"><div class="ui-block-a"></div><div class="ui-block-b"></div><br/><br/><br/>';
  		content +='<div class="ui-block-a"><a href="#calendar" onClick="calendarDisplay();" ><img border="0" src="img/iconSet/64/calendar64x64.png"/></a>';
  		content +='<br/>Calendar</div>';
  		content +='<div class="ui-block-b">';
  		content +='<a href="#performance"><img border="0" src="img/iconSet/64/08_settings_64.png"/></a><br/>Performance</div>';
  		content +='<div class="ui-block-a"></div><div class="ui-block-b"></div><br/><br/><br/><div class="ui-block-a"></div><div class="ui-block-b"></div><br/><br/>';
  		content +='<div class="ui-block-a">';
  		//content +='<a href="#attendance" onClick="graphData();"><img border="0" src="img/iconSet/64/pad64x64.png" /></a><br/>Attendance</div>';
		content +='<a href="#attendance"><img border="0" src="img/iconSet/64/pad64x64.png" /></a><br/>Attendance</div>';
  		content +='<div class="ui-block-b"><a href="#Bothmsg"><img border="0" src="img/iconSet/64/01_messages_64.png" /></a><br/>Messages</div></div>';
  		content +='</center><br/><center><div><img border="0" src="img/iconSet/64/Register.png" onClick="logout()"/><br/>Logout</div></center></div>';
            
            
            
           document.getElementById("divContainMenu").innerHTML=content;
            //$('#Smenu').content('refresh');
        
	}
	
	
	
	
	function PmenuItems()
	{
		
	  document.getElementById("divContainMenu").innerHTML=" ";
	 $("#buttonlist").show(); 
 		var content=" ";
   		content +='<div id="Pmenu" data-role="content">';
  		content +='<center><div class="ui-grid-a"><div class="ui-block-a"></div>';
  		content +='<div class="ui-block-b"></div><br/><br/><br/>';
  		content +='<div class="ui-block-a"><a href="#calendar" onClick="calendarDisplay();" >';
  		content +='<img border="0" src="img/iconSet/64/calendar64x64.png"/></a><br/>Calendar</div>';
		content +='<div class="ui-block-b"><a href="#performance"><img border="0" src="img/iconSet/64/08_settings_64.png"/></a><br/>Performance</div>';
  		content +='<div class="ui-block-a"></div><div class="ui-block-b"></div><br/><br/><br/><div class="ui-block-a"></div><div class="ui-block-b"></div><br/><br/>';
     	content +='<div class="ui-block-a"><a href="#attendance"><img border="0" src="img/iconSet/64/pad64x64.png" /></a><br/>Attendance</div>';
   	 	content +='<div class="ui-block-b"><a href="#fees" onClick="feeStructure()"><img border="0" src="img/iconSet/64/checkout.png" /></a>';
  	 	content +='<br/>Fees';
  	 	content +='</div><div class="ui-block-a"></div><div class="ui-block-b"></div><br/><br/><br/><div class="ui-block-a"></div><div class="ui-block-b"></div><br/><br/>';
  	 	content +='<div class="ui-block-a"><a href="#Parentmsg"><img border="0" src="img/iconSet/64/01_messages_64.png" /></a>';
  	 	content +='<br/>Messages</div>';
  	 	content +='<div class="ui-block-b"><img border="0" src="img/iconSet/64/Register.png" onClick="logout()"/><br/>Logout</div></div></center></div>';
            document.getElementById("divContainMenu").innerHTML=content;
         //$('#Pmenu').content('refresh');
		}
		
		
		
 function TmenuItems()
 {     
        $("#buttonlist").hide();  
     	document.getElementById("divContainMenu").innerHTML="";
        var content=" ";
        content +='<div id="Tmenu" data-role="content">';
  		content +='<center><div class="ui-grid-a"><div class="ui-block-a"></div>';
  		content +='<div class="ui-block-b"></div><br/><br/><br/>';
  		content +='<div class="ui-block-a"><a href="#calendar" onClick="teacherCalendarDisplay();" >';
  		content +='<img border="0" src="img/iconSet/64/calendar64x64.png"/></a>';
		content +='<br/>Calendar</div>'; 	 
		content +='<div class="ui-block-b">';
  		content +='<a onClick="clearTextfield();" href="#wayToAttendance" ><img border="0" src="img/iconSet/64/pad64x64.png" /></a><br/>Student<br/>Attendance </div>';
		content +='<div class="ui-block-a">';
  		content +='<a onClick="clearTextfield();" href="#wayToPerformance" ><img border="0" src="img/iconSet/64/08_settings_64.png"/></a><br/>Student<br/>Performance</div>';
        content +='<div class="ui-block-b"><a href="#Teachermsg"><img border="0" src="img/iconSet/64/01_messages_64.png" /></a>';
  	 	content +='<br/>Messages</div>';  		
	    content +='<div class="ui-block-a"><img border="0" src="img/iconSet/64/Register.png" onClick="logout()"/><br/>Logout</div></div></center></div>';
		
        document.getElementById("divContainMenu").innerHTML=content; 	 
 	}		
		