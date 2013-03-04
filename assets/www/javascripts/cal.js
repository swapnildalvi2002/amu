 //document.addEventListener("backbutton",inCal, false);
  /*function inCal()
  { 
      var answer=confirm("You will be logout?");
            if(answer!=0)
            {
              document.location="index.html";
             }
        
     }*/
/****************************calendar Function********************/
   // initialize some variables for later
  var eventType=[];
  var eventDate=[];
  var eventText=[];
  var mainMonth=[];
  var mainDate=[];
  var splitDate=[];
  function getFirstDay(theYear, theMonth)
  {
      var firstDate = new Date(theYear,theMonth,1);
      return firstDate.getDay() + 1;
  }
  // number of days in the month
  function getMonthLen(theYear, theMonth)   
  {
      var oneDay = 1000 * 60 * 60 * 24;
      var thisMonth = new Date(theYear, theMonth, 1);
      var nextMonth = new Date(theYear, theMonth + 1, 1);
      var len = Math.ceil((nextMonth.getTime() -thisMonth.getTime())/oneDay);
      return len;
  }
  // correct for Y2K anomalies
  function getY2KYear(today) 
  {
      var yr = today.getYear();
      return ((yr < 1900) ? yr+1900 : yr);
   
  }
  // create basic array
      theMonths = new MakeArray(12);
  // load array with English month names
  function MakeArray(n) {
  this[0] = "January";
  this[1] = "February";
  this[2] = "March";
  this[3] = "April";
  this[4] = "May";
  this[5] = "June";
  this[6] = "July";
  this[7] = "August";
  this[8] = "September";
  this[9] = "October";
  this[10] = "November";
  this[11] = "December";
  this.length = n;
  return this;
  }
  // end -->
  //END OF METHODS REQURED BY NEXT PART
  function calendarDisplay()
  {
  document.getElementById("calendarDisplay").innerHTML=" ";
  var today = new Date();
  var theYear = getY2KYear(today);
  var theMonth = today.getMonth(); // for index into our array
  
  // which is the first day of this month?
  var firstDay = getFirstDay(theYear, theMonth);
  // total number of <td>...</td> tags needed in for loop below
  var howMany = getMonthLen(theYear, theMonth) + firstDay;
  
  // start assembling HTML for table
 /* var content='<link rel="stylesheet" href="css/android.css" type="text/css" />';
  content +='<div id="container"><div id="header"><img border="0" src="img/image1_01.png" style="width:100%;"/>';  content +='<div id="icon"><img border="0" src="img/icon/calendar.png" style="width:14%;" onclick="document.location=\'calendar.html\'"/>'; 
  content +='<img border="0" src="img/icon/attendance.png" style="width:14%;" onclick="document.location=\'performance.html\'"/>';
  content +='<img border="0" src="img/icon/performance.png" style="width:14%;" onclick="document.location=\'attendance.html\'"/>'; 
  content +='<img border="0" src="img/icon/fees.png" id="fees" style="width:14%;" onclick="document.location=\'fees.html\'"/>'; 
  content +='<img border="0" src="img/icon/message.png" style="width:14%;"  onclick="document.location=\'message.html\'"/>'; 
  content +='<img border="0" src="img/icon/logout.png" style="width:14%;"/></div><br/><br/>'; */
  var content="";
  content += '<CENTER><TABLE BORDER="0px" id="CalendarTable">';
  // month and year display at top of calendar
  content += '<tr class="calHeader"><TH COLSPAN=7>' + theMonths[theMonth] + ' ' + theYear + '</TH></tr>';
  // days of the week at head of each column
  content += '<tr style="text-align: center;"><td>Sun</td><td>Mon</td><td>Tue</td><td>Wed</td>';
  content += '<td>Thu</td><td>Fri</td><td>Sat</td></tr>';
  content += '<tr>';
  
  // populate calendar
  	 //$=jQuery;
  	   	 //$('.helloCAL').empty();
	
  var calendarAjax=new Ajax.Request(ip+'dashboard/studentdashboard/?', 
      {
          method:'get',
          parameters:"student_id="+localStorage.getItem('Userid')+"&school_id="+localStorage.getItem('Schoolid')+"&academicyear_id="+localStorage.getItem('Academicid')+"&schoolsession_id="+localStorage.getItem('SchoolsessionID'),
          //parameters:"student_id="+19+"&school_id="+1+"&academicyear_id="+1+"&schoolsession_id="+1,
          onComplete: function (originalRequest)
              {    
                  // alert(originalRequest)             
                  var msg = originalRequest.responseText;
                 // console.log("Ajax Call================="+msg)
                  var response = eval("(" + msg + ")");
                  
                  if (eventDate.length==0)
                     {   
                          for(var i=0;i<response.size();i++)
                              {                
                                 // console.log("In for Loop================="+response[i]['0']['evtype'])
                                  eventType.push(response[i]['0']['evtype']);
                                  eventDate.push(response[i]['0']['evdate']);
                                  eventText.push(response[i]['0']['evText']);
                                  var n=eventDate[i].split("-");
                                  splitDate.push(n[2]);
                                  // mainMonth.push(n[1]);
                                  if(jQuery.inArray(n[2], mainDate)== -1)
                                     {
                                      mainDate.push(n[2]);
                                     }
                                 
                              }             
                     }
             
                   
              // populate calendar
                    
                  for (var i = 1; i < howMany; i++) 
                      {
                          if (i < firstDay) 
                              {
                              	 
                                  // 'empty' boxes prior to first day
                                  content += '<td></td>';
                              }
                          else
                              { 
                                  var day=i - firstDay + 1;
                                  //console.log("In for Loop================="+day)
                                  var a;
                                  var b;
                                   //console.log("----------"+ mainDate);
                           
                                  for(var j=0;j<mainDate.length;j++)
                                      {
                                          if(day==mainDate[j] & i % 7!=1)       
                                               {  
                                                  content += '<td align="center" style=background-image:url("img/checkbox/blue-corner.png");background-repeat:no-repeat;background-position:right top onclick="showDetail('+mainDate[j]+');">';        
                                                  content +=  day  ;
                                                  a=day;     
                                               //     console.log("a is================="+a)             
                                               }
                                   // enter date number
                                          
                                          
                                       }  
                                  
                                  if(i % 7==1)
                                        {
                                            content += "<td align='center'  style='background-color: #B4D44D;'>";        
                                            content +=  day;
                                            b=day;      
                                         //   console.log("b is================="+b)           
                                        }
                                         
  
                                  if(day!=a & day!=b)
                                          {
                                           content += '<td align="center">';
                                           content +=  day  ;
                                          }
                                content += "</td>";
                                }
                          // start new row after each week
                          if (i % 7 == 0 &&  i != howMany) 
                                {
                                  content += '</tr><tr>';
                                }
  
                          }
  
  
                  content += '</TABLE></CENTER>'
            content+='<div id="calendarEvent"><div class="rows"><div class="cols col1" id="StudentBirthdayImage"></div><div class="cols col2" id="detailStudent"></div></div><div style="clear:both"> </div><div class="rows"><div class="cols col1" id="TeacherBirthdayImage"></div><div class="cols col2" id="detailTeacher"></div></div><div style="clear:both"> </div><div class="rows"><div class="cols col1" id="HolidayImage"></div><div class="cols col2" id="detailHoliday"></div></div><div style="clear:both"> </div><div class="rows"><div class="cols col1" id="AssignmentImage"></div><div class="cols col2" id="detailAssignment"></div></div></div>';
                     
             //document.write(content);
			 document.getElementById("calendarDisplay").innerHTML=content;
            
             }
  
      });
  }
   function showDetail(datePass)
              {
                 document.getElementById('detailTeacher').innerHTML="";
                 document.getElementById('detailStudent').innerHTML="";
                 document.getElementById('detailHoliday').innerHTML="";
                 document.getElementById('detailAssignment').innerHTML="";
                 document.getElementById('TeacherBirthdayImage').innerHTML="";
                 document.getElementById('StudentBirthdayImage').innerHTML="";
                 document.getElementById('HolidayImage').innerHTML="";
                 document.getElementById('AssignmentImage').innerHTML="";
                   var DetailOf=datePass;
                   for(var i=0;i<splitDate.length;i++)
                       {
                         if(splitDate[i]==DetailOf)
                             {
                               var pattern1=/Student/g;
                              var pattern2=/Teacher/g;
                           if(eventType[i]=='Birthdays')   
                              { eventText[i].match(pattern1)
                                  if(eventText[i].match(pattern1))
                                      {
                                      var n=eventText[i].split("~");
                                      document.getElementById('StudentBirthdayImage').innerHTML="<img src='img/CalendarImage/partyhat.png'/><br>";
                                      jQuery('#detailStudent').append(n[1]+"<br>");        
                                      }
                                  if(eventText[i].match(pattern2))
                                      {
                                      var n=eventText[i].split("~");
                                      document.getElementById('TeacherBirthdayImage').innerHTML="<img src='img/CalendarImage/cake_25.png'/><br>";
                                      jQuery('#detailTeacher').append(n[1]+"<br>");  
                                      }
                              
                              }
                        
                          if(eventType[i]=='Holidays')	
                             {
                             	   document.getElementById("HolidayImage").innerHTML="<img src='img/CalendarImage/holiday.png'/>";
                                //jQuery('#HolidayImage').append("<img src='img/CalendarImage/holiday.png'/>");
                                jQuery('#detailHoliday').append(eventText[i]+"<br>");
                             }
                  if(eventType[i]=='Assignments')
                            
                            {
																									     document.getElementById('AssignmentImage').innerHTML="<img src='img/CalendarImage/assignment.png'/>";
                                 //jQuery('#AssignmentImage').append("<img src='img/CalendarImage/assignment.png'/>");
                                 jQuery('#detailAssignment').append(eventText[i]+"<br>");
                            }    
                        }  
                     
                     }
               
                 }
  
