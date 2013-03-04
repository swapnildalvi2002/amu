 
 
 var 	skool_id=[]; 
 var  	skool_month=[];
 
 
  function feeStructure()
  { 
   clearArray();
	//alert("FeeStructure call successfully");
	if(skool_id.length==0)
	{
		 $.mobile.loading('show');
	  var myAjax = new Ajax.Request(ip+'fees/getassignedfeestostudents/?', 
	   {
		   method:'get',
		   parameters:"user_id="+localStorage.getItem('Userid')+"&school_id="+localStorage.getItem('Schoolid')+"&academicyear_id="+localStorage.getItem('Academicid'),
		   onComplete: function (originalRequest)
			  {    
			         $.mobile.loading('hide');
			   // alert(originalRequest)             
				  var msg = originalRequest.responseText;
  					var response = eval("(" + msg + ")");
					  if(response.size()>0)
						 {
						 	
							 for(var i=0;i<response.size();i++) 
							  {
							  	
							  	skool_id.push(response[i]['Schoolsession']['id']);
							  	skool_month.push(response[i]['Schoolsession']['month']);
							  }
							  var content='<li data-theme="a" onclick="getFeeData(\'all\')"><a href="#">All</a></li>';
							  for(var i=0;i<skool_id.length;i++)
									{
										//jQuery('#monthList ul').append("<li data-theme='a' onclick='getFeeData("+skool_id[i]+");'><a href='#'>"+skool_month[i]+"</a></li>");	
										content +="<li data-theme='a' onclick='getFeeData("+skool_id[i]+");'><a href='#'>"+skool_month[i]+"</a></li>";
										}	
               document.getElementById('month').innerHTML=content;
         $('#month').listview('refresh');
	 					 // var result=document.getElementById('monthList');
	 					  //console.log("monthList div contain=================="+result.html());

						 }      
									
			 }
  
	   }); //End of myAjax
  
  
  }
/*else
{
for(var i=0;i<skool_id.length;i++)
{
	jQuery('#monthList ul').append("<li data-theme='b' onclick='getFeeData("+skool_id[i]+");'><a href='#feeDetail'>"+skool_month[i]+"</a></li>");	
	}	
	   $('#month').listview('refresh');
	     $.mobile.loading('hide');
}*/


  
  } //End of if statement
