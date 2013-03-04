var Tfrmsg=[];
var Tsubj=[];
var Ttomsg=[];
var Tsubjout=[];
var TreceiveDate=[];
var receiveTime=[];
var TsendDate=[];
//var sendTime=[];
var theouthr=[];
var theoutmin=[];
var theinhr=[];
var theinmin=[];
// create basic array
	theMonths = ["Jan","Feb","Mar","Apr","May","June","July","Aug","Sept","Oct","Nov","Dec"];
// load array with English month names
function Tinbox()
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
					parameters: "user_id="+localStorage.getItem('Teacherid')+"&randno="+randno,
					onComplete: function(originalRequest)
					{
				
					var msg = originalRequest.responseText;
					var response = eval("(" + msg + ")");
					//console.log("Response is============>"+response);
					if(response.size()>0)
					{
						for(var i=0;i<response.size();i++) 
						{
							Tfrmsg.push(response[i]['User']['firstname']+" "+response[i]['User']['lastname']);
							Tsubj.push(response[i]['Message']['subject']);
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
							content+="<a href='#message' class='messageLink'  onclick='return getmsgTContent("+response[i]['Messagemap']['id']+","+i+")';> ";
							content+=response[i]['User']['firstname']+" "+response[i]['User']['middlename']+" "+response[i]['User']['lastname'];
							content+="<span class='subject'>"+response[i]['Message']['subject']+"</span> ";
							var t=n[1].split(":");
							theinhr.push(t[0]);
							theinmin.push(t[1]);									
						
						//content+="<span class='preview'>"+theinDay+" "+theMonths[theinMonth]+" "+theinYear+"</span>";
							if(m[1]=="00")
							{
							TreceiveDate.push('Date is not Updated');					
							content+="<span class='preview'>"+"Date is not Updated"+"</span>"; 
							}
							else {
							theinMonth=parseInt(m[1])-1;
							// console.log("Month is============>"+theinMonth);
							TreceiveDate.push(theinDay+" "+theMonths[theinMonth]+" "+theinYear);
							content+="<span class='preview'>"+theinDay+" "+theMonths[theinMonth]+" "+theinYear+"</span>";			  
							}
							//content+="<span class='preview'>"+TreceiveDate[i]+"</span>";
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


  
  
  
  function Toutbox()
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
					  parameters: "user_id="+localStorage.getItem('Teacherid')+"&randno="+randno,
					  //parameters: "user_id=15&randno="+randno,
				  
					  onComplete: function(originalRequest)
					  {

						  var msg = originalRequest.responseText;
						   var response = eval("(" + msg + ")");
						  if(response.size()>0)
						  {
							  for(var i=0;i<response.size();i++) 
							  {
		   Ttomsg.push(response[i]['User']['firstname']+" "+response[i]['User']['lastname']);
		   Tsubjout.push(response[i]['Message']['subject']);
		   var n=    response[i]['Message']['senddate'].split(" ");
		var m=n[0].split("-");
		   theoutYear=m[0];
		  
		   theoutDay=m[2];
										   
							  var msgContent="<div id='outmsgContentDiv"+response[i]['Messagemap']['id']+"' style='display:none;'><p>"+response[i]['Message']['content']+"</p></div>";
							  var content="<li  class='messageMenu'>";
								  content+="<div class='messageContentDiv'> ";
								  //content+="<a href='#message'> ";
								  content+="<a href='#outmessage' class='messageLink'  onclick='return getmsgTContentoutbox("+response[i]['Messagemap']['id']+","+i+")';> ";
								  content+=response[i]['User']['firstname']+" "+response[i]['User']['middlename']+" "+response[i]['User']['lastname'];
								  content+="<span class='subject'>"+response[i]['Message']['subject']+"</span> ";
		var t=n[1].split(":");
		theouthr.push(t[0]);
		theoutmin.push(t[1]);
		  
		   
									if(m[1]=="00")
		   {
				 TsendDate.push("Date is not Updated");
				content+="<span class='preview'>"+"Date is not Updated"+"</span>";
		   }
		  else
		  {
				  theoutMonth=parseInt(m[1])-1;
				  TsendDate.push(theoutDay+" "+theMonths[theoutMonth]+" "+theoutYear);
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

  function getmsgTContent(id,pos)
  {
				 $.mobile.loading('show');
	  document.getElementById('displayMsgContent').innerHTML="";
		var countpos=pos;
			var data=document.getElementById('msgContentDiv'+id).innerHTML;
			document.getElementById('theinHeader').innerHTML=Tfrmsg[countpos];
					   $.mobile.loading('hide');
	   
  document.getElementById('displayMsgContent').innerHTML="<div class='sub'>"+Tsubj[countpos]+"</div><br/><div class='date' >"+TreceiveDate[countpos]+"</div><br/><br/><div id='indata'>"+data+"</div></div>";
  }
  

  function getmsgTContentoutbox(id,outpos)
  {
	  var countpos=outpos;
		 $.mobile.loading('show');        
	  document.getElementById('displayOutMsgContent').innerHTML="";
	  var data=document.getElementById('outmsgContentDiv'+id).innerHTML;
					document.getElementById('theoutHeader').innerHTML=Ttomsg[countpos];
				 $.mobile.loading('hide');
								 
				  document.getElementById('displayOutMsgContent').innerHTML="<div class='sub'>"+Tsubjout[countpos]+"</div><br/><div class='date'>"+TsendDate[outpos]+"</div></div><br/><br/><div id='indata'>"+data+"</div>";

  }
  




/****************Message to All Teacher***************************/

function sendMessageToAllTeacher()
{
	   	 $.mobile.loading('show');
		document.getElementById('allTerror').innerHTML="";
		var messageSubject =document.getElementById('allTSubject').value;
		var MyMessage =document.getElementById('allTContent').value;
		//var sendMessageTo=document.getElementById('sendMessageTo').value;
		//var user_id=localStorage.getItem('Userid');
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
			document.getElementById('allTerror').innerHTML=errStr;
			return false;
		}
		else
		{      	 $.mobile.loading('hide');
				document.getElementById('allTerror').innerHTML="";
			var randno = Math.floor(Math.random()*1000);
			var myAjax = new Ajax.Request(ip+'messages/sendmessagetoall/?', 
     		{
				 method:'get',
	             parameters:"content="+MyMessage+"&from_id="+localStorage.getItem('Teacherid')+"&subject="+messageSubject+"&school_id="+localStorage.getItem('Schoolid')+"&allTeachers=allTeachers", 
				    			 //parameters:"user_id="+localStorage.getItem('Userid')+"&messageSubject="+messageSubject+"&MyMessage="+MyMessage+'&sendMessageTo='+sendMessageTo+'&randno='+randno,
				 onComplete: function (originalRequest)
					{    
						var msg = originalRequest.responseText;
						if(msg=='success')
						{
							document.getElementById('allTerror').innerHTML="Message successfully sent";
							//alert("Message Send Successfully");
							document.getElementById('allTSubject').value="";
							document.getElementById('allTContent').value="";
							
						}
						else 
							//alert("Error occure, please try again later");					
							document.getElementById('allTerror').innerHTML="Error occure, please try again later";
					}
			 });
		}
		
	}








/****************Message to All Parent***************************/

function sendMessageToAllParent()
{
	   	 $.mobile.loading('show');
		document.getElementById('allPerror').innerHTML="";
		var messageSubject =document.getElementById('allPSubject').value;
		var MyMessage =document.getElementById('allPContent').value;
		//var sendMessageTo=document.getElementById('sendMessageTo').value;
		//var user_id=localStorage.getItem('Userid');
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
			document.getElementById('allPerror').innerHTML=errStr;
			return false;
		}
		else
		{      	 $.mobile.loading('hide');
				document.getElementById('allPerror').innerHTML="";
			var randno = Math.floor(Math.random()*1000);
			var myAjax = new Ajax.Request(ip+'messages/sendmessagetoall/?', 
     		{
				 method:'get',
	             parameters:"content="+MyMessage+"&from_id="+localStorage.getItem('Teacherid')+"&subject="+messageSubject+"&school_id="+localStorage.getItem('Schoolid')+"&allParents=allParents", 
				    			 //parameters:"user_id="+localStorage.getItem('Userid')+"&messageSubject="+messageSubject+"&MyMessage="+MyMessage+'&sendMessageTo='+sendMessageTo+'&randno='+randno,
				 onComplete: function (originalRequest)
					{    
						var msg = originalRequest.responseText;
						if(msg=='success')
						{
							document.getElementById('allPerror').innerHTML="Message successfully sent";
							//alert("Message Send Successfully");
							document.getElementById('allPSubject').value="";
							document.getElementById('allPContent').value="";
							
						}
						else 
							//alert("Error occure, please try again later");					
							document.getElementById('allPerror').innerHTML="Error occure, please try again later";
					}
			 });
		}
		
	}










/****************Message to All Student***************************/

function sendMessageToAllStudent()
{
	   	 $.mobile.loading('show');
		document.getElementById('allSerror').innerHTML="";
		var messageSubject =document.getElementById('allSSubject').value;
		var MyMessage =document.getElementById('allSContent').value;
		//var sendMessageTo=document.getElementById('sendMessageTo').value;
		//var user_id=localStorage.getItem('Userid');
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
			document.getElementById('allSerror').innerHTML=errStr;
			return false;
		}
		else
		{      	 $.mobile.loading('hide');
				document.getElementById('allSerror').innerHTML="";
			var randno = Math.floor(Math.random()*1000);
			var myAjax = new Ajax.Request(ip+'messages/sendmessagetoall/?', 
     		{
				 method:'get',
	             parameters:"content="+MyMessage+"&from_id="+localStorage.getItem('Teacherid')+"&subject="+messageSubject+"&school_id="+localStorage.getItem('Schoolid')+"&allStudents=allStudents", 
				    			 //parameters:"user_id="+localStorage.getItem('Userid')+"&messageSubject="+messageSubject+"&MyMessage="+MyMessage+'&sendMessageTo='+sendMessageTo+'&randno='+randno,
				 onComplete: function (originalRequest)
					{    
						var msg = originalRequest.responseText;
						alert(msg);
						console.log("Message Response is===================>>>>>>>>>>>>"+msg);
						if(msg=='success')
						{
							document.getElementById('allSerror').innerHTML="Message successfully sent";
							document.getElementById('allSSubject').value="";
							document.getElementById('allSContent').value="";
							
						}
						else 
							//alert("Error occure, please try again later");					
							document.getElementById('allSerror').innerHTML="Error occure, please try again later";
					}
			 });
		}
		
	}










/****************Message to All Staff***************************/

function sendMessageToAllStaff()
{
	   	 $.mobile.loading('show');
		document.getElementById('allStafferror').innerHTML="";
		var messageSubject =document.getElementById('allStaffSubject').value;
		var MyMessage =document.getElementById('allStaffContent').value;
		//var sendMessageTo=document.getElementById('sendMessageTo').value;
		//var user_id=localStorage.getItem('Userid');
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
			document.getElementById('allStafferror').innerHTML=errStr;
			return false;
		}
		else
		{      	 $.mobile.loading('hide');
				document.getElementById('allStafferror').innerHTML="";
			var randno = Math.floor(Math.random()*1000);
			var myAjax = new Ajax.Request(ip+'messages/sendmessagetoall/?', 
     		{
				 method:'get',
	             parameters:"content="+MyMessage+"&from_id="+localStorage.getItem('Teacherid')+"&subject="+messageSubject+"&school_id="+localStorage.getItem('Schoolid')+"&allStaff=allStaff", 
				    			 //parameters:"user_id="+localStorage.getItem('Userid')+"&messageSubject="+messageSubject+"&MyMessage="+MyMessage+'&sendMessageTo='+sendMessageTo+'&randno='+randno,
				 onComplete: function (originalRequest)
					{    
						var msg = originalRequest.responseText;
						if(msg=='success')
						{
							document.getElementById('allStafferror').innerHTML="Message successfully sent";
							document.getElementById('allStaffSubject').value="";
							document.getElementById('allStaffContent').value="";
							
						}
						else 
							//alert("Error occure, please try again later");					
							document.getElementById('allStafferror').innerHTML="Error occure, please try again later";
					}
			 });
		}
		
	}


