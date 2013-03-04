var Pfrmsg=[];
var Psubj=[];
var Ptomsg=[];
var Psubjout=[];
var PreceiveDate=[];
var receiveTime=[];
var PsendDate=[];
//var sendTime=[];
var theouthr=[];
var theoutmin=[];
var theinhr=[];
var theinmin=[];
// create basic array
	theMonths = ["Jan","Feb","Mar","Apr","May","June","July","Aug","Sept","Oct","Nov","Dec"];
// load array with English month names
function Pinbox()
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
					parameters: "user_id="+localStorage.getItem('parent_id')+"&randno="+randno,
					onComplete: function(originalRequest)
					{
				
					var msg = originalRequest.responseText;
					var response = eval("(" + msg + ")");
					//console.log("Response is============>"+response);
					if(response.size()>0)
					{
						for(var i=0;i<response.size();i++) 
						{
							Pfrmsg.push(response[i]['User']['firstname']+" "+response[i]['User']['lastname']);
							Psubj.push(response[i]['Message']['subject']);
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
							content+="<a href='#message' class='messageLink'  onclick='return getmsgPContent("+response[i]['Messagemap']['id']+","+i+")';> ";
							content+=response[i]['User']['firstname']+" "+response[i]['User']['middlename']+" "+response[i]['User']['lastname'];
							content+="<span class='subject'>"+response[i]['Message']['subject']+"</span> ";
							var t=n[1].split(":");
							theinhr.push(t[0]);
							theinmin.push(t[1]);									
						
						//content+="<span class='preview'>"+theinDay+" "+theMonths[theinMonth]+" "+theinYear+"</span>";
							if(m[1]=="00")
							{
							PreceiveDate.push('Date is not Updated');					
							content+="<span class='preview'>"+"Date is not Updated"+"</span>"; 
							}
							else {
							theinMonth=parseInt(m[1])-1;
							// console.log("Month is============>"+theinMonth);
							PreceiveDate.push(theinDay+" "+theMonths[theinMonth]+" "+theinYear);
							content+="<span class='preview'>"+theinDay+" "+theMonths[theinMonth]+" "+theinYear+"</span>";			  
							}
							//content+="<span class='preview'>"+PreceiveDate[i]+"</span>";
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


  
  
  
  function Poutbox()
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
					  parameters: "user_id="+localStorage.getItem('parent_id')+"&randno="+randno,
					  //parameters: "user_id=15&randno="+randno,
				  
					  onComplete: function(originalRequest)
					  {

						  var msg = originalRequest.responseText;
						   var response = eval("(" + msg + ")");
						  if(response.size()>0)
						  {
							  for(var i=0;i<response.size();i++) 
							  {
		   Ptomsg.push(response[i]['User']['firstname']+" "+response[i]['User']['lastname']);
		   Psubjout.push(response[i]['Message']['subject']);
		   var n=    response[i]['Message']['senddate'].split(" ");
		var m=n[0].split("-");
		   theoutYear=m[0];
		  
		   theoutDay=m[2];
										   
							  var msgContent="<div id='outmsgContentDiv"+response[i]['Messagemap']['id']+"' style='display:none;'><p>"+response[i]['Message']['content']+"</p></div>";
							  var content="<li  class='messageMenu'>";
								  content+="<div class='messageContentDiv'> ";
								  //content+="<a href='#message'> ";
								  content+="<a href='#outmessage' class='messageLink'  onclick='return getmsgPContentoutbox("+response[i]['Messagemap']['id']+","+i+")';> ";
								  content+=response[i]['User']['firstname']+" "+response[i]['User']['middlename']+" "+response[i]['User']['lastname'];
								  content+="<span class='subject'>"+response[i]['Message']['subject']+"</span> ";
		var t=n[1].split(":");
		theouthr.push(t[0]);
		theoutmin.push(t[1]);
		  
		   
									if(m[1]=="00")
		   {
				 PsendDate.push("Date is not Updated");
				content+="<span class='preview'>"+"Date is not Updated"+"</span>";
		   }
		  else
		  {
				  theoutMonth=parseInt(m[1])-1;
				  PsendDate.push(theoutDay+" "+theMonths[theoutMonth]+" "+theoutYear);
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

  function getmsgPContent(id,pos)
  {
				 $.mobile.loading('show');
	  document.getElementById('displayMsgContent').innerHTML="";
		var countpos=pos;
			var data=document.getElementById('msgContentDiv'+id).innerHTML;
			document.getElementById('theinHeader').innerHTML=Pfrmsg[countpos];
					   $.mobile.loading('hide');
	   
  document.getElementById('displayMsgContent').innerHTML="<div class='sub'>"+Psubj[countpos]+"</div><br/><div class='date' >"+PreceiveDate[countpos]+"</div><br/><br/><div id='indata'>"+data+"</div></div>";
  }
  

  function getmsgPContentoutbox(id,outpos)
  {
	  var countpos=outpos;
		 $.mobile.loading('show');        
	  document.getElementById('displayOutMsgContent').innerHTML="";
	  var data=document.getElementById('outmsgContentDiv'+id).innerHTML;
					document.getElementById('theoutHeader').innerHTML=Ptomsg[countpos];
				 $.mobile.loading('hide');
								 
				  document.getElementById('displayOutMsgContent').innerHTML="<div class='sub'>"+Psubjout[countpos]+"</div><br/><div class='date'>"+PsendDate[outpos]+"</div></div><br/><br/><div id='indata'>"+data+"</div>";

  }
  






function parentSendMessageToTeacher()
{
	  
	   $.mobile.loading('show');
		document.getElementById('parentmsgerror').innerHTML="";
		var messageSubject =document.getElementById('PTmessageSubject').value;
		var MyMessage =document.getElementById('PTmessageContent').value;
		var sendMessageTo=document.getElementById('PTeacherid').value;
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
			document.getElementById('parentmsgerror').innerHTML="<p>"+errStr+"</p>";
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
				 parameters:"user_id="+localStorage.getItem('parent_id')+"&messageSubject="+messageSubject+"&MyMessage="+MyMessage+'&sendMessageTo='+sendMessageTo+'&randno='+randno,
				 onComplete: function (originalRequest)
					{    
						var msg = originalRequest.responseText;
						if(msg=='success')
						{
							console.log("SUCCESS");
							document.getElementById('parentmsgerror').innerHTML="<p>Message successfully sent</p>";
							//alert("Message Send Successfully");
							document.getElementById('PTmessageSubject').value="";
							document.getElementById('PTmessageContent').value="";
							document.getElementById('PTeacherid').value="";
							document.getElementById('PTeacherName').value="";
						}
						else 
							//alert("Error occure, please try again later");					
							document.getElementById('parentmsgerror').innerHTML="<p>Error occure, please try again later</p>";
					}
			 });
		}	        
	  
	}

