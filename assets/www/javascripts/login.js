var name;
var pass;
var user_id;
var school_id;
var academic_yr_id;

/*******************************LOGIN BLOCK*************************/
 
function login()
{   
   $=jQuery;
   // alert("Login Call Successfully" );
	$.mobile.loading('show');
	//document.location="#Tmsg";
	//document.location="#studentMenu";
	//document.location="#parentMenu";
		
	//document.location="#parent";
    name = document.getElementById("username").value;
    pass = document.getElementById("password").value;
    localStorage.setItem('nm', name);
    //localStorage.setItem('pss',pass);
    var String="username="+name&"password="+pass;
    //var url="http://192.168.0.100/sisapp/userValidation.php?username="+name+"&password="+pass;    
    //url=ip+"mobileapp/mobilelogin/?username="+ localStorage.getItem('nm')+"&password="+localStorage.getItem('pss');
    url=ip+"logins/mobilelogin/?username="+ localStorage.getItem('nm')+"&password="+pass;
    //alert(url)

    jQuery.ajax({
                type: 'get', // type of request either Get or Post
                url: url, // Url of the page where to post data and receive response
                data: String, // data to be post
                success: function(data) 
                {  

                    var str=data;
                    var patternMain=/success/g;
                    var pattern1=/Student/g;
                    var pattern2=/Parent/g;
                    var pattern3=/Teacher/g;
                    var patternFail=/fail/g;
                    //ID is in splt[1] 
                    var splt=str.split('"');
                    user_id=splt[11];
                    school_id=splt[15];
                    academic_yr_id=splt[19];
                    localStorage.setItem('Userid', user_id);
                    localStorage.setItem('Schoolid',school_id);
                    localStorage.setItem('Academicid',academic_yr_id);
					//alert(academic_yr_id);
					//alert(localStorage.getItem('Academicid'));
     
                  //check for success
                    if(str.match(patternMain))
                      {//check for Student
                        if(str.match(pattern1))
                            {  
																											$.mobile.loading('hide'); 
																										   //return true;
																										   //document.getElementById("page2").style.display="block";
																										   //changePage("#page2","flip",true,false);
																			                               //jQuery("#page2").show();
																			           SmenuItems();
                               document.location="#page2";
                            }
    
                        else 
                            {

                            //check for Parent
                            if(str.match(pattern2))
                                 {
                                    $.mobile.loading('hide');                                     
				    	                           localStorage.setItem('parent_id',user_id)
				                          					getStudentList();
																												    //changePage("#parent","flip",true,false);
																																//jQuery("#parent").show();
																															   document.location="#parent";

                                 }
                              else
                              {
														                  if(str.match(pattern3))
                                 {
                                    $.mobile.loading('hide');      
									                               
				    	                           localStorage.setItem('Teacherid',user_id);
												   //alert(localStorage.getItem('Teacherid'));
				                          					//getStudentList();
																												    //changePage("#parent","flip",true,false);
																																//jQuery("#parent").show();
																																  TmenuItems();
																															   document.location="#page2";

                                 }            	
                              	}   
   
                            }
        
                      }
                    else
                      {
                        $.mobile.loading('hide');                  
                        alert("Please Enter Correct Username and Password");//function to be called on successful reply from server
                      }
                }

        });

return false;  
}     


 
 
 
 
 
  
  