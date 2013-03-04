//var ip="http://mobileapp.skoolcloud.com/";
var ip="http://192.168.0.150/sismobile/";
var Userid;
var Schoolid;
var Academicid;
var nm;
var pss;
var stdid;
var parent_id;
var SchoolsessionID;
var Teacherid;
$=jQuery;
function logout()
{   answer=confirm("Do you really want to Exit?")
    if(answer!=0)
        {
        	
           localStorage.clear();
		   clearArray();
		   document.getElementById('username').value="";
		    document.getElementById('password').value="";
        	  document.addEventListener("backbutton", onBackKey, false);   
        	  document.location="#mainpage";
	        	
        }
  }        

											