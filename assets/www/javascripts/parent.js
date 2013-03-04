  function getStudentList()
  {
  	 $.mobile.loading('show'); 
	  var myAjax = new Ajax.Request(ip+'mobileapp/getstudentlist/?', 
	   {
		   method:'get',
		   parameters:"user_id="+localStorage.getItem('parent_id')+"&school_id="+localStorage.getItem('Schoolid')+"&academicyear_id="+localStorage.getItem('Academicid'),
		   onComplete: function (originalRequest)
			  {
			  	 	 $.mobile.loading('hide');      
			   // alert(originalRequest)             
				  var msg = originalRequest.responseText;
				 // console.log("Student List if statement message================>"+msg);
				  var response = eval("(" + msg + ")");
					  if(response.size()>0)
						 {  
						 // console.log("Size of RESPONSE======>"+response.size());
						   var content=" ";
						   content +='<table class="ListTable" style="border:2px solid white; height:250px;">';  
            		       content+="<tr class='money'><td >Name</td><td>Grade</td><td>Section</td></tr>";
                           for(var i=0;i<response.size();i++)
		   				   {
									     content +='<tr class="even" onclick=getStudentData("'+response[i]['u']['id']+'")>';
										// console.log("ID======>"+response[i]['u']['id']);
	 								     content +="<td style='padding-left:3px;'>"+response[i]['u']['firstname']+" "+response[i]['u']['lastname']+"</td>";
										// console.log("NAME======>"+response[i]['u']['firstname']);
										 content +="<td>"+response[i]['g']['gradename']+"</td>"; 
 							            //console.log("Class======>"+response[i]['g']['gradename']);
								        //console.log("Subject======>"+response[i]['s']['subjectname']);          
										 content +="<td style='padding-left:18px;'>"+response[i]['s']['subjectname']+"</td>";      
										 
			             				 content +="</tr>"  ; 
                           }
					content+='</table>';		 
					document.getElementById("stdTable").innerHTML=content;	
					  }
	 				    
				
			 }
  
	   });
  
  
  }


function getStudentData(student_idResponse)
{ 
  var studentSelect=student_idResponse;
  localStorage.setItem('Userid',studentSelect)
 // document.getElementById("page2").style.display="block";
  //changePage("#page2","flip",true,false);
  //jQuery("#page2").show();
   PmenuItems();
  document.location="#page2";
}