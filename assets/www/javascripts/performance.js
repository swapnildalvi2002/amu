	
	
/*	var std_sub=[];
	var result=[];
	var test=[];
	var std_id=[];
	var student_id;
	var std_test =[];
	var stdsubject=[];*/
	var sub_id=[];
	var sub_name=[];
	var test_id=[];
	var test_name=[];
	
 	
	/***************************************************************************/
	function performanceSubject ()
	{ $=jQuery;
	    clearArray();
		  $.mobile.loading('show');  
      //alert ("Subject Function call successfully");
   if(sub_id.length==0)
   {
	  var randno = Math.floor(Math.random()*1000);
	  var myAjax = new Ajax.Request(ip+'analysis/performancebyuserSubjects/?', 
	   {
		   method:'get',
		   parameters:"user_id="+localStorage.getItem('Userid')+"&school_id="+localStorage.getItem('Schoolid')+"&academicyear_id="+localStorage.getItem('Academicid')+'&randno='+randno,
		   onComplete: function (originalRequest)
			  {    
    
					   //alert(originalRequest)             
				  var msg = originalRequest.responseText;
	 
						 var response = eval("(" + msg + ")");
							  if(response.size()>0)
			  
							  {
							//	alert ("Size of response"+response.size());
								 student_id=response['student_id'];
								 localStorage.setItem('stdid', student_id);
							   //adding test option field
							  
								  for(var i=0;i<response.size();i++) 
									{
										  sub_id.push(response[i]['subj']['id']);
										  sub_name.push(response[i]['subj' ]['name']);
									}
									var valueall=['all'];
									var content='<li data-theme="a" onClick="getPerformanceAnalysisData(\'all\');"><a href="#performanceGraphDisplay">All</a>';
									for(var i=0;i<sub_id.length;i++)
									{
										content +="<li data-theme='a' onclick='getPerformanceAnalysisData("+sub_id[i]+");'><a href='#performanceGraphDisplay'>"+sub_name[i]+"</a></li>";
               //jQuery('#Slist ul').append("<li data-theme='a' onclick='getPerformanceAnalysisData("+sub_id[i]+");'><a href='#performanceGraphDisplay'>"+sub_name[i]+"</a></li>");
									    //jQuery('#Slist ul').append("<li data-theme='b'><a href='#performanceGraphDisplay' onclick='getPerformanceAnalysisData("+sub_id[i]+");'data-transition='none'>"+sub_name[i]+"</a></li>");
										
										}
										
										document.getElementById('subject').innerHTML=content;
	           $('#subject').listview('refresh');
							  }      
		  $.mobile.loading('hide');  											 
    // 	document.location="#subjectList";									 
				  }
	   });

	}
/*else
{
		for(var i=0;i<sub_id.length;i++)
									{
               //jQuery('#Slist ul').append("<li data-theme='b' onclick='getPerformanceAnalysisData("+response[i]['subj']['id']+");'><a href='#performanceGraphDisplay'>"+response[i]['subj' ]['name']+"</a></li>");
									    jQuery('#Slist ul').append("<li data-theme='b'><a href='#performanceGraphDisplay' onclick='getPerformanceAnalysisData("+sub_id[i]+");'data-transition='none'>"+sub_name[i]+"</a></li>");
										
										}
	           $('#subject').listview('refresh');
							  }      
		  $.mobile.loading('hide');  						
	
	}*/	
	 $.mobile.loading('hide');  				
//	document.location="#subjectList";
	}
	/***********************************************Performance Analysis****************************/
	
	function performanceTest()
	{ $=jQuery;
	clearArray();
    $.mobile.loading('show');
    if(test_id.length==0)  
    {
     //alert ("Test Function call successfully");  
	  var randno = Math.floor(Math.random()*1000);
	  var myAjax = new Ajax.Request(ip+'analysis/performancebyuserTests/?', 
		   {
			  
			   method:'get',
			   parameters:"user_id="+localStorage.getItem('Userid')+"&school_id="+localStorage.getItem('Schoolid')+"&academicyear_id="+localStorage.getItem('Academicid')+'&randno='+randno,
			   onComplete: function (originalRequest)
						  // alert(originalRequest)             
			   {
					      
					  var msg = originalRequest.responseText;
						 var response = eval("(" + msg + ")");
								  if(response.size()>0)
				  
								  {var content="";
										for(var i=0;i<response.size();i++) 
										{
											test_id.push(response[i]['t']['test_id']);	
											test_name.push(response[i]['t']['testname']);										
											                    
			
										}
										
										for(var i=0;i<test_id.length;i++)
										{
									
								 var str=test_name[i].toString()        											
								 var T_Name=str.replace(/ /g,"&nbsp");
								 content +="<li data-theme='a' onclick=getAnalysisByUserTest("+test_id[i]+",'"+T_Name+"');><a href='#testGraphDisplay'>"+test_name[i]+"</a></li>";
								   //jQuery('#Tlist ul').append("<li data-theme='a' onclick=getAnalysisByUserTest("+test_id[i]+",'"+T_Name+"');><a href='#testGraphDisplay'>"+test_name[i]+"</a></li>");
											}
											
				document.getElementById('test').innerHTML=content;
			   $('#test').listview('refresh');
					$.mobile.loading('hide');
								  }      
								
			   }
					 });//end of myajax
	}//end of if statement
	
	$.mobile.loading('hide');
}//end of function
	
