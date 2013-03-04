var subj=[];	
var frmsg=[];

	function inbox()
	{
	  $=jQuery;
	  	$('.inmsgCONTENT').empty();
	 	 $.mobile.loading('show'); 
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
							if(response.size()>0)
							{
								for(var i=0;i<response.size();i++) 
								{
								
								var msgContent="<div id='msgContentDiv"+response[i]['Messagemap']['id']"' style='display:none;'><p>"+response[i]['Message']['content']+"</p></div>";
								var content="<li class='messageMenu'>";
									content+="<div class='messageContentDiv'> ";
									//content+="<a href='#message'> ";
									content+="<a href='#message' class='messageLink'  onclick='return getmsgContent("+response[i]['Messagemap']['id']+","+i+")';> ";
									content+=response[i]['User']['firstname']+" "+response[i]['User']['middlename']+" "+response[i]['User']['lastname'];
									content+="<span class='subject'>"+response[i]['Message']['subject']+"</span> ";
								 frmsg.push(response[i]['User']['firstname']+" "+response[i]['User']['lastname']);
									
									subj.push(response[i]['Message']['subject'])
								 var n=	response[i]['Message']['senddate'].split(" ");
	         var sendDate=n[0];	
									content+="<span class='preview'>"+sendDate+"</span>";
									content+="</a>";
									content+="</div>";
									content+="<div class='messageContentDeleteDiv'> <a href='#'><img src='img/delete_bin.png'></a> </div>";
									content+=msgContent;
									content+="</li>";
									jQuery('#messages ul').append(content);		
									 							
							 	}
					  	 $.mobile.loading('hide');
							 	//  $('#inmsg').listview('refresh');
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
	 $('.inmsgCONTENT').empty();
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
								
								var msgContent="<div id='msgContentDiv"+response[i]['Messagemap']['id']+"' style='display:none;'><p>"+response[i]['Message']['content']+"</p></div>";
								var content="<li  class='messageMenu'>";
									content+="<div class='messageContentDiv'> ";
									//content+="<a href='#message'> ";
									content+="<a href='#message' class='messageLink'  onclick='return getmsgContent("+response[i]['Messagemap']['id']+")';> ";
									content+=response[i]['User']['firstname']+" "+response[i]['User']['middlename']+" "+response[i]['User']['lastname'];
									//frmsg.push(response[i]['User']['firstname']+" "+response[i]['User']['middlename']);
									content+="<span class='subject'>"+response[i]['Message']['subject']+"</span> ";
									//subj.push(response[i]['Message']['subject']);
									content+="<span class='preview'>"+response[i]['Message']['senddate']+"</span>";
									content+="</a>";
									content+="</div>";
									content+="<div class='messageContentDeleteDiv'> <a href='#'><img src='img/delete_bin.png'></a> </div>";
									content+=msgContent;
									content+="</li>";
									
									jQuery('#messages ul').append(content);									
							 	}
							 	 $.mobile.loading('hide');
							}
							else
							{
								 $.mobile.loading('hide');
								var content="<li  class='messageMenu'>No record found";
								content+="</li>";
								jQuery('#messages ul').append(content);
								}
					}
				});
	}
	
	
	function getmsgContent(id,pos)
	{
		var countpos=pos;
		document.getElementById('displayMsgContent').innerHTML="";
		document.getElementById('displayMsgContent').innerHTML="From:<br/>"+frmsg[countpos];
		document.getElementById('displayMsgContent').append("Subject:<br/>"+subj[countpos]);
		var data=document.getElementById('msgContentDiv'+id).innerHTML;
		document.getElementById('displayMsgContent').append("Message:<br/>"+data);
	}
	
function getmsgContent(id)
{
		document.getElementById('displayMsgContent').innerHTML="";
		var data=document.getElementById('msgContentDiv'+id).innerHTML;
		document.getElementById('displayMsgContent').innerHTML=data;
	}	

	
	function sendMessage()
	{
		//alert("sendMessage call ");
		document.getElementById('error').innerHTML="";
		var messageSubject =document.getElementById('messageSubject').value;
		var MyMessage =document.getElementById('MyMessage').value;
		var sendMessageTo=document.getElementById('sendMessageTo').value;
		var user_id=localStorage.getItem('Userid');
		var errStr="";
		
		if(messageSubject=='')
		{
			errStr+="Please enter subject <br/>";
			alert("Please enter subject ");
		}
		else if(MyMessage=='')
		{
			errStr+="Please enter message <br/>";
			alert("Please enter message");
		}
		else if(sendMessageTo=='')
		{
			errStr+="Please specify recipient <br/>";
						alert("Please specify recipient");
		}
		
		if(errStr!='')
		{
			//document.getElementById('error').innerHTML=errStr;
			return false;
		}
		else
		{
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
							document.getElementById('messageSubject').value="";
							document.getElementById('MyMessage').value="";
							document.getElementById('sendMessageTo').value="";
							document.getElementById('sendMessageToText').value="";
						}
						else 
							document.getElementById('error').innerHTML="Error occure, please try again later";
					}
			 });
		}
		
	}























