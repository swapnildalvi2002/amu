var frmsg=[];
var subj=[];
var tomsg=[];
var subjout=[];
var receiveDate=[];
var receiveTime=[];
var sendDate=[];
//var sendTime=[];
var theouthr=[];
var theoutmin=[];
var theinhr=[];
var theinmin=[];
  // create basic array
      theMonths = ["Jan","Feb","Mar","Apr","May","June","July","Aug","Sept","Oct","Nov","Dec"];
  // load array with English month names
function inbox()
	{ 
	
	  //alert("inbox call ");
	  $=jQuery;
	  $.mobile.loading('show');
	  	$('.inmsgCONTENT').empty();
	 	
		var randno = Math.floor(Math.random()*1000);
		var myAjax = new Ajax.Request(

						ip+"messages/inbox/?",
					{
						method: 'post', 
						parameters: "user_id="+localStorage.getItem('Userid')+"&randno="+randno,
						onComplete: function(originalRequest)
						{

							var msg = originalRequest.responseText;
						 var response = eval("(" + msg + ")");
						 //console.log("Response is============>"+response);
							if(response.size()>0)
							{
								for(var i=0;i<response.size();i++) 
								{
								frmsg.push(response[i]['User']['firstname']+" "+response[i]['User']['lastname']);
								subj.push(response[i]['Message']['subject']);
								 var n=	response[i]['Message']['senddate'].split(" ");
								 var m=n[0].split("-");
								 theinYear=m[0];
								// console.log("Month is============>"+m[1]);
								
	         //theinMonth=parseInt(m[1])-1;
	         theinDay=m[2];
	        
								var msgContent="<div id='msgContentDiv"+response[i]['Messagemap']['id']+"' style='display:none;'><p>"+response[i]['Message']['content']+"</p></div>";
								var content="<li class='messageMenu'>";
									content+="<div class='messageContentDiv'> ";
									//content+="<a href='#message'> ";
									content+="<a href='#message' class='messageLink'  onclick='return getmsgContent("+response[i]['Messagemap']['id']+","+i+")';> ";
									content+=response[i]['User']['firstname']+" "+response[i]['User']['middlename']+" "+response[i]['User']['lastname'];
									content+="<span class='subject'>"+response[i]['Message']['subject']+"</span> ";
									 var t=n[1].split(":");
          theinhr.push(t[0]);
          theinmin.push(t[1]);									
	        
									//content+="<span class='preview'>"+theinDay+" "+theMonths[theinMonth]+" "+theinYear+"</span>";
									 if(m[1]=="00")
								 {
												 receiveDate.push('Date is not Updated');			   	 
												content+="<span class='preview'>"+"Date is not Updated"+"</span>"; 
								 }
								 else {
										 theinMonth=parseInt(m[1])-1;
										// console.log("Month is============>"+theinMonth);
										  receiveDate.push(theinDay+" "+theMonths[theinMonth]+" "+theinYear);
										  content+="<span class='preview'>"+theinDay+" "+theMonths[theinMonth]+" "+theinYear+"</span>";		 	 
									 }
									//content+="<span class='preview'>"+receiveDate[i]+"</span>";
									content+="</a>";
									content+="</div>";
									content+="<div class='messageContentDeleteDiv'> <a href='#'><img src='img/delete_bin.png'></a> </div>";
									content+=msgContent;
									content+="</li>";
									jQuery('#messages ul').append(content);		
									 							
							 	}
							 	//  $('#inmsg').listview('refresh');
							 						  	 $.mobile.loading('hide');
							}
							else
							{
													  	 $.mobile.loading('hide');
								var content="<li >No record found";
								content+="</li>";
								jQuery('#messages ul').append(content);
					 								
								}
								  //$('#inmsg').listview('refresh');
					}
				});
	}
	
	
	
	
	
	function outbox()
	{
		
		// alert("outbox call ");
	 $=jQuery;
	 $('.outmsgCONTENT').empty();
	 $.mobile.loading('show');
		var randno = Math.floor(Math.random()*1000);
		var myAjax = new Ajax.Request(
					ip+"messages/sentitems/",
					{
						method: 'post', 
						parameters: "user_id="+localStorage.getItem('Userid')+"&randno="+randno,
						//parameters: "user_id=15&randno="+randno,
					
						onComplete: function(originalRequest)
						{

							var msg = originalRequest.responseText;
							 var response = eval("(" + msg + ")");
							if(response.size()>0)
							{
								for(var i=0;i<response.size();i++) 
								{
	         tomsg.push(response[i]['User']['firstname']+" "+response[i]['User']['lastname']);
	         subjout.push(response[i]['Message']['subject']);
	         var n=	response[i]['Message']['senddate'].split(" ");
          var m=n[0].split("-");
	         theoutYear=m[0];
			
	         theoutDay=m[2];
	         								
								var msgContent="<div id='outmsgContentDiv"+response[i]['Messagemap']['id']+"' style='display:none;'><p>"+response[i]['Message']['content']+"</p></div>";
								var content="<li  class='messageMenu'>";
									content+="<div class='messageContentDiv'> ";
									//content+="<a href='#message'> ";
									content+="<a href='#outmessage' class='messageLink'  onclick='return getmsgContentoutbox("+response[i]['Messagemap']['id']+","+i+")';> ";
									content+=response[i]['User']['firstname']+" "+response[i]['User']['middlename']+" "+response[i]['User']['lastname'];
									content+="<span class='subject'>"+response[i]['Message']['subject']+"</span> ";
          var t=n[1].split(":");
          theouthr.push(t[0]);
          theoutmin.push(t[1]);
	         //sendTime.push(n[1]);
			 
			                          if(m[1]=="00")
			 {
     	          sendDate.push("Date is not Updated");
				  content+="<span class='preview'>"+"Date is not Updated"+"</span>";
			 }
			else
			{
        	    	theoutMonth=parseInt(m[1])-1;
		        	sendDate.push(theoutDay+" "+theMonths[theoutMonth]+" "+theoutYear);
					content+="<span class='preview'>"+theoutDay+" "+theMonths[theoutMonth]+" "+theoutYear+"</span>";
			}
									//content+="<span class='preview'>"+theoutDay+" "+theMonths[theoutMonth]+" "+theoutYear+"</span>";
									content+="</a>";
									content+="</div>";
									content+="<div class='messageContentDeleteDiv'> <a href='#'><img src='img/delete_bin.png'></a> </div>";
									content+=msgContent;
									content+="</li>";
									
									jQuery('#outmessages ul').append(content);									
							 	}
							 	      	 $.mobile.loading('hide');
							}
							else
							{   
							   	 $.mobile.loading('hide');
								var content="<li  class='messageMenu'>No record found";
								content+="</li>";
								jQuery('#outmessages ul').append(content);
								}
					}
				});
	}

	function getmsgContent(id,pos)
	{
		      	 $.mobile.loading('show');
		document.getElementById('displayMsgContent').innerHTML="";
		  var countpos=pos;
		  	var data=document.getElementById('msgContentDiv'+id).innerHTML;
		  	document.getElementById('theinHeader').innerHTML=frmsg[countpos];
		  	      	 $.mobile.loading('hide');
		  	      	 /*if(theinhr[countpos] >= 0 & theinhr[countpos] <= 12)
		  	      	 {
		  	      	 	  if(theinhr[countpos] == 12 & theinmin[countpos]>1)
		  	      	 	  {
		  	      	 	  	  //document.getElementById('displayMsgContent').innerHTML="<div>From:"+frmsg[countpos]+"<br/>on:"+receiveDate[countpos]+"  "+"at:"+receiveTime[countpos]+"<br/>Subject:<br/>"+subj[countpos]+"<br/>Message:<br/><div id='indata'>"+data+"</div></div>";
	             	  document.getElementById('displayMsgContent').innerHTML="<div>on:"+receiveDate[countpos]+"  "+"at:"+theinhr[countpos]+":"+theinmin[countpos]+"pm"+"<br/>Subject:<br/>"+subj[countpos]+"<br/>Message:<br/><div id='indata'>"+data+"</div></div>";		  	      	 	  	
		  	      	 	  	}
		  	      	 	  	else
		  	      	 	  	{
	             	  document.getElementById('displayMsgContent').innerHTML="<div>on:"+receiveDate[countpos]+"  "+"at:"+theinhr[countpos]+":"+theinmin[countpos]+"am"+"<br/>Subject:<br/>"+subj[countpos]+"<br/>Message:<br/><div id='indata'>"+data+"</div></div>";
	             	  
	  	      	 	  		}
               		  	      	 	
		  	      	 	}
		  	      	 	else
		  	      	 	{
		  	      	 		 if(theinhr[countpos] > 12 & theinhr[countpos] <= 24)
		  	      	 	{
 	             	  document.getElementById('displayMsgContent').innerHTML="<div>on:"+receiveDate[countpos]+"  "+"at:"+theinhr[countpos]+":"+theinmin[countpos]+"pm"+"<br/>Subject:<br/>"+subj[countpos]+"<br/>Message:<br/><div id='indata'>"+data+"</div></div>";           		  	      	 		
		  	      	 		}
            }*/		  	      	 	
		  //document.getElementById('displayMsgContent').innerHTML="<div>From:"+frmsg[countpos]+"<br/>on:"+receiveDate[countpos]+"  "+"at:"+receiveTime[countpos]+"<br/>Subject:<br/>"+subj[countpos]+"<br/>Message:<br/><div id='indata'>"+data+"</div></div>";
		 // document.getElementById('displayMsgContent').append("Subject:<br/>"+subj[countpos]);
   //	document.getElementById('displayMsgContent').append("Message:<br/>"+data);
    document.getElementById('displayMsgContent').innerHTML="<div class='sub'>"+subj[countpos]+"</div><br/><div class='date' >"+receiveDate[countpos]+"</div><br/><br/><div id='indata'>"+data+"</div></div>";
	}
	

	function getmsgContentoutbox(id,outpos)
	{
		var countpos=outpos;
      	 $.mobile.loading('show');		
		document.getElementById('displayOutMsgContent').innerHTML="";
		var data=document.getElementById('outmsgContentDiv'+id).innerHTML;
				  	document.getElementById('theoutHeader').innerHTML=tomsg[countpos];
		      	 $.mobile.loading('hide');
  	      	/* if(theouthr[countpos] >= 0 & theouthr[countpos] <= 12)
		  	      	 {
		  	      	 	  if(theouthr[countpos] == 12 & theoutmin[countpos]>1)
		  	      	 	  {
		  	      	 	  	  //document.getElementById('displayMsgContent').innerHTML="<div>From:"+frmsg[countpos]+"<br/>on:"+receiveDate[countpos]+"  "+"at:"+receiveTime[countpos]+"<br/>Subject:<br/>"+subj[countpos]+"<br/>Message:<br/><div id='indata'>"+data+"</div></div>";
	             	  document.getElementById('displayOutMsgContent').innerHTML="<div>on:"+sendDate[countpos]+"  "+"at:"+theouthr[countpos]+":"+theoutmin[countpos]+"pm"+"<br/>Subject:<br/>"+subjout[countpos]+"<br/>Message:<br/><div id='outdata'>"+data+"</div></div>";		  	      	 	  	
		  	      	 	  	}
		  	      	 	  	else
		  	      	 	  	{
	             	  document.getElementById('displayOutMsgContent').innerHTML="<div>on:"+sendDate[countpos]+"  "+"at:"+theouthr[countpos]+":"+theoutmin[countpos]+"am"+"<br/>Subject:<br/>"+subjout[countpos]+"<br/>Message:<br/><div id='outdata'>"+data+"</div></div>";
	             	  
	  	      	 	  		}
               		  	      	 	
		  	      	 	}
		  	      	 	else
		  	      	 	{
		  	      	 		 if(theouthr[countpos] > 12 & theouthr[countpos] <= 24)
		  	      	 	{
 	             	  document.getElementById('displayOutMsgContent').innerHTML="<div>on:"+sendDate[countpos]+"  "+"at:"+theouthr[countpos]+":"+theoutmin[countpos]+"pm"+"<br/>Subject:<br/>"+subjout[countpos]+"<br/>Message:<br/><div id='indata'>"+data+"</div></div>";           		  	      	 		
		  	      	 		}
            }*/		      	 
		      	  document.getElementById('displayOutMsgContent').innerHTML="<div class='sub'>"+subjout[countpos]+"</div><br/><div class='date'>"+sendDate[outpos]+"</div></div><br/><br/><div id='indata'>"+data+"</div>";
//		document.getElementById('displayOutMsgContent').innerHTML="<div>To:"+tomsg[outpos]+"<br/>on:"+sendDate[outpos]+"  "+"at:"+sendTime[outpos]+"<br/>Subject:<br/>"+subjout[outpos]+"<br/>Message:<br/><div id='outdata'>"+data+"</div></div>";
	}
	

	
	function sendMessage()
	{
		 //alert("sendMessage call ");
      	 $.mobile.loading('show');
		document.getElementById('error').innerHTML="";
		var messageSubject =document.getElementById('messageSubject').value;
		var MyMessage =document.getElementById('MyMessage').value;
		var sendMessageTo=document.getElementById('sendMessageTo').value;
		var user_id=localStorage.getItem('Userid');
		var errStr="";
		
		if(messageSubject=='')
		{      	 $.mobile.loading('hide');
			errStr+="Please enter subject <br/>";
			//alert("Please enter subject");
		}
		else if(MyMessage=='')
		{      	 $.mobile.loading('hide');
			errStr+="Please enter message <br/>";
				//		alert("Please enter message");
		}
		else if(sendMessageTo=='')
		{      	 $.mobile.loading('hide');
			errStr+="Please specify recipient <br/>";
					//	alert("Please specify recipient");			
		}
		
		if(errStr!='')
		{      	 $.mobile.loading('hide');
			document.getElementById('error').innerHTML=errStr;
			return false;
		}
		else
		{      	 $.mobile.loading('hide');
				document.getElementById('error').innerHTML="";
			var randno = Math.floor(Math.random()*1000);
			var myAjax = new Ajax.Request(ip+'messages/composemessageaction/?', 
     		{
				 method:'get',
				 parameters:"user_id="+localStorage.getItem('Userid')+"&messageSubject="+messageSubject+"&MyMessage="+MyMessage+'&sendMessageTo='+sendMessageTo+'&randno='+randno,
				 onComplete: function (originalRequest)
					{    
						var msg = originalRequest.responseText;
						if(msg=='success')
						{
							document.getElementById('error').innerHTML="Message successfully sent";
							//alert("Message Send Successfully");
							document.getElementById('messageSubject').value="";
							document.getElementById('MyMessage').value="";
							document.getElementById('sendMessageTo').value="";
							document.getElementById('sendMessageToText').value="";
						}
						else 
							//alert("Error occure, please try again later");					
							document.getElementById('error').innerHTML="Error occure, please try again later";
					}
			 });
		}
		
	}








/*Teacher send message starts*/

function studentMessage()
 {
    	 $.mobile.loading('show');
		document.getElementById('Serror').innerHTML="";
		var messageSubject =document.getElementById('SmessageSubject').value;
		var MyMessage =document.getElementById('SmessageContent').value;
		var sendMessageTo=document.getElementById('individualStudentid').value;
		var user_id=localStorage.getItem('Userid');
		var errStr="";
		
		if(messageSubject=='')
		{      	 $.mobile.loading('hide');
			errStr+="Please enter subject <br/>";
			//alert("Please enter subject");
		}
		else if(MyMessage=='')
		{      	 $.mobile.loading('hide');
			errStr+="Please enter message <br/>";
				//		alert("Please enter message");
		}
		else if(sendMessageTo=='')
		{      	 $.mobile.loading('hide');
			errStr+="Please specify recipient <br/>";
					//	alert("Please specify recipient");			
		}
		
		if(errStr!='')
		{      	 $.mobile.loading('hide');
			document.getElementById('Serror').innerHTML="<p>"+errStr+"</p>";
			return false;
		}
	   else
		{   
		   	$.mobile.loading('hide');
				//document.getElementById('error').innerHTML="";
			var randno = Math.floor(Math.random()*1000);
			var myAjax = new Ajax.Request(ip+'messages/composemessageaction/?', 
     		{
				 method:'get',
				 parameters:"user_id="+localStorage.getItem('Teacherid')+"&messageSubject="+messageSubject+"&MyMessage="+MyMessage+'&sendMessageTo='+sendMessageTo+'&randno='+randno,
				 onComplete: function (originalRequest)
					{    
						var msg = originalRequest.responseText;
						alert(msg);
						console.log("Message Response is===================>>>>>>>>>>>>"+msg);
						if(msg=='success')
						{
							console.log("SUCCESS");
							document.getElementById('Serror').innerHTML="<p>Message successfully sent</p>";
							//alert("Message Send Successfully");
							document.getElementById('SmessageSubject').value="";
							document.getElementById('SmessageContent').value="";
							document.getElementById('individualStudentid').value="";
							document.getElementById('individualStudentName').value="";
						}
						else 
							//alert("Error occure, please try again later");					
							document.getElementById('Serror').innerHTML="<p>Error occure, please try again later</p>";
					}
			 });
		}	        
 }






function parentMessage()
 {
    	 $.mobile.loading('show');
		document.getElementById('Perror').innerHTML="";
		var messageSubject =document.getElementById('PmessageSubject').value;
		var MyMessage =document.getElementById('PmessageContent').value;
		var sendMessageTo=document.getElementById('individualParentid').value;
		var user_id=localStorage.getItem('Userid');
		var errStr="";
		
		if(messageSubject=='')
		{      	 $.mobile.loading('hide');
			errStr+="Please enter subject <br/>";
			//alert("Please enter subject");
		}
		else if(MyMessage=='')
		{      	 $.mobile.loading('hide');
			errStr+="Please enter message <br/>";
				//		alert("Please enter message");
		}
		else if(sendMessageTo=='')
		{      	 $.mobile.loading('hide');
			errStr+="Please specify recipient <br/>";
					//	alert("Please specify recipient");			
		}
		
		if(errStr!='')
		{      	 $.mobile.loading('hide');
			document.getElementById('Perror').innerHTML="<p>"+errStr+"</p>";
			return false;
		}
	   else
		{   
		   	$.mobile.loading('hide');
				//document.getElementById('error').innerHTML="";
			var randno = Math.floor(Math.random()*1000);
			var myAjax = new Ajax.Request(ip+'messages/composemessageaction/?', 
     		{
				 method:'get',
				 parameters:"user_id="+localStorage.getItem('Teacherid')+"&messageSubject="+messageSubject+"&MyMessage="+MyMessage+'&sendMessageTo='+sendMessageTo+'&randno='+randno,
				 onComplete: function (originalRequest)
					{    
						var msg = originalRequest.responseText;
						if(msg=='success')
						{
							console.log("SUCCESS");
							document.getElementById('Perror').innerHTML="<p>Message successfully sent</p>";
							//alert("Message Send Successfully");
							document.getElementById('PmessageSubject').value="";
							document.getElementById('PmessageContent').value="";
							document.getElementById('individualParentid').value="";
							document.getElementById('individualParentName').value="";
						}
						else 
							//alert("Error occure, please try again later");					
							document.getElementById('Perror').innerHTML="<p>Error occure, please try again later</p>";
					}
			 });
		}	        
 }








function teacherMessage()
 {
    	 $.mobile.loading('show');
		document.getElementById('Terror').innerHTML="";
		var messageSubject =document.getElementById('TmessageSubject').value;
		var MyMessage =document.getElementById('TmessageContent').value;
		var sendMessageTo=document.getElementById('individualTeacherid').value;
		var user_id=localStorage.getItem('Userid');
		var errStr="";
		
		if(messageSubject=='')
		{      	 $.mobile.loading('hide');
			errStr+="Please enter subject <br/>";
			//alert("Please enter subject");
		}
		else if(MyMessage=='')
		{      	 $.mobile.loading('hide');
			errStr+="Please enter message <br/>";
				//		alert("Please enter message");
		}
		else if(sendMessageTo=='')
		{      	 $.mobile.loading('hide');
			errStr+="Please specify recipient <br/>";
					//	alert("Please specify recipient");			
		}
		
		if(errStr!='')
		{      	 $.mobile.loading('hide');
			document.getElementById('Terror').innerHTML="<p>"+errStr+"</p>";
			return false;
		}
	   else
		{   
		   	$.mobile.loading('hide');
				//document.getElementById('error').innerHTML="";
			var randno = Math.floor(Math.random()*1000);
			var myAjax = new Ajax.Request(ip+'messages/composemessageaction/?', 
     		{
				 method:'get',
				 parameters:"user_id="+localStorage.getItem('Teacherid')+"&messageSubject="+messageSubject+"&MyMessage="+MyMessage+'&sendMessageTo='+sendMessageTo+'&randno='+randno,
				 onComplete: function (originalRequest)
					{    
						var msg = originalRequest.responseText;
						if(msg=='success')
						{
							console.log("SUCCESS");
							document.getElementById('Terror').innerHTML="<p>Message successfully sent</p>";
							//alert("Message Send Successfully");
							document.getElementById('TmessageSubject').value="";
							document.getElementById('TmessageContent').value="";
							document.getElementById('individualTeacherid').value="";
							document.getElementById('individualTeacherName').value="";
						}
						else 
							//alert("Error occure, please try again later");					
							document.getElementById('Terror').innerHTML="<p>Error occure, please try again later</p>";
					}
			 });
		}	        
 }








function goSetUserIdforAttendance()
	{
				 		     jQuery('#warningforAttendance').hide();
		 $.mobile.loading('show');
	  var selectedStudentId=document.getElementById("Sattendanceid").value;
	  var selectedStudentName=document.getElementById("SattendanceName").value;
	  //alert(selectedStudentId);
	  localStorage.setItem('Userid',selectedStudentId);	
      clearArray();	 
	  //graphData();
	   $.mobile.loading('hide');
	   if(selectedStudentName!="")
	   {
		     jQuery('#warningforAttendance').hide();
	  document.location="#attendance";   
	   }
	  else{
 		     jQuery('#warningforAttendance').show();
		  }
	}

function goSetUserIdforPerformance()
	{
		 $.mobile.loading('show');
		 		     jQuery('#warningforPerformance').hide();
	  var selectedStudentId=document.getElementById("Sperformanceid").value;
	  var selectedStudentName=document.getElementById("SperformanceName").value;
	  //alert(selectedStudentId);
	  localStorage.setItem('Userid',selectedStudentId);	
	  clearArray();
	   $.mobile.loading('hide');
	   if(selectedStudentName!="")
	   {
		     jQuery('#warningforAttendance').hide();
	    document.location="#performance";
	   }
	   else{
		     jQuery('#warningforPerformance').show();
		   }
	  
	}


