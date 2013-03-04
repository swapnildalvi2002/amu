
var dAttended=[];
var sDays=[];
var lDays=[];

var avgD=[];
var avgS=[];
var avgL=[];
var month=[]


/*********************ATTENDANCE BLOCK************************************/

function attendance()
{    $=jQuery;
	$.mobile.loading('show');
	document.getElementById('mainform').innerHTML="";  
	
  var String="user_id="+localStorage.getItem('Userid')+"&school_id="+localStorage.getItem('Schoolid')+"&academicyear_id="+localStorage.getItem('Academicid');
  //url=ip+"mobileapp/attendance/?user_id="+user_id+"&school_id="+school_id+"&academicyear_id="+academic_yr_id;
   {
       
       var myAjax = new Ajax.Request(ip+'analysis/attendance/?',
       //var myAjax = new Ajax.Request(ip+'mobileapp/attendance/?', 
                              {
               
                method:'get',
                parameters:"user_id="+localStorage.getItem('Userid')+"&school_id="+localStorage.getItem('Schoolid')+"&academicyear_id="+localStorage.getItem('Academicid'),
                onComplete: function (originalRequest)
                   {    
                   
                        
                        
                        var msg = originalRequest.responseText;
                      // alert(msg);
                       var response = eval("(" + msg + ")");
                             
                       if(response.size()>0)
                           {
                               dataTable = new google.visualization.DataTable();
                                var numRows = response.size();
                                var numCols = 4;
                                         
                         if(numRows>0)
                           {
                             dataTable.addColumn('string', 'Month');
                             dataTable.addColumn('number', 'Non Sick Day');
                             dataTable.addColumn('number', 'Attended Days');
                             dataTable.addColumn('number', 'Sick Days');
                             //dataTable.addColumn('number', 'Late Days');
                             
                           for(i=0;i<response.size();i++)
                             { 
								var data=[]; 						
								data.push((response[i]['td']['month']).substring(0,3));
								data.push(parseInt(parseInt(response[i]['af']['totalworkdays'])-parseInt(response[i]['af']['daysattended'])+parseInt(response[i]['af']['sickdays'])));			
								data.push(parseInt(response[i]['af']['daysattended']));								
								data.push(parseInt(response[i]['af']['sickdays']));
								dataTable.addRow(data);
                                 
                             }
                           
                           
                           
                         var options = {
                                    title: 'Student Attendance Analysis',
                                    hAxis: {title: 'Days', titleTextStyle: {color: 'blue'}},
                                    vAxis: {title: "Months", titleTextStyle: {color: 'red'}},
                                    legend: 'bottom',
                           
                                    chartArea:{left:50,top:60,right:30,width:"80%",height:"60%"},
                                     fontSize:11,
                                     isStacked: true, 
                           //colors: [ '#89A54E','#4572A7','#AA4643','#004411']
						             colors: [ '#89A54E','#4572A7','#AA4643']
						   
                        };
                         
						$.mobile.loading('hide');
                        var chart = new google.visualization.BarChart(document.getElementById('mainform'));
                        chart.draw(dataTable, options);
                         }
                      } 
					  else 
                         {
							 $.mobile.loading('hide');
                             document.getElementById('mainform').innerHTML="<div><p>Oops! There doesn't seem to be any data!</p></div>";
                             return false;
                         } 
                    
                   }
                                                     
                              
             });
     
   }      
}
/********************REPORTCARD METHOD NOT IMPLEMENT YET*************************/

/********************AVG DAYS ATTENDED*****************************/
function DASpine()
{    $=jQuery;
  $.mobile.loading('show');
document.getElementById('DAGraph').innerHTML="";

 var myAjax = new Ajax.Request(ip+'analysis/attendance/?',
       //var myAjax = new Ajax.Request(ip+'mobileapp/attendance/?', 
                              {
               
                method:'get',
                parameters:"user_id="+localStorage.getItem('Userid')+"&school_id="+localStorage.getItem('Schoolid')+"&academicyear_id="+localStorage.getItem('Academicid'),
                onComplete: function (originalRequest)
                   {    
                   
                        
                        
                        var msg = originalRequest.responseText;
                      // alert(msg);
                       var response = eval("(" + msg + ")");
                             
                       if(response.size()>0)
                           {
                             avgAttendedTable=new google.visualization.DataTable();
                              var numRows = response.size();
                              var numCols = 3;
                                         
                         if(numRows>0)
                           {
                          avgAttendedTable.addColumn('string', 'Month');
    avgAttendedTable.addColumn('number', 'Days Attended');
    avgAttendedTable.addColumn('number', 'Average days Attended');

                           for(i=0;i<response.size();i++)
                             {    var data1=[]
									data1.push((response[i]['td']['month']).substring(0,3));
									data1.push(parseInt(response[i]['af']['daysattended']));
									data1.push(parseFloat(response[i]['af']['avg_daysattended']));
									avgAttendedTable.addRow(data1);    
                             }
                           
					 var options = {
              title : 'Days Attended Vs Average',
              vAxis: {title: "Days", titleTextStyle: {color: 'blue'}},
              hAxis: {title: "Month", titleTextStyle: {color: 'blue'}},
              seriesType: "bars",
              chartArea:{left:50,top:60,right:30,bottom:20,width:"100%",height:"60%"},
              // chartArea:{left:20,top:40,right:10,width:"80%"},
                fontSize:11,
                legend: 'bottom',
              series: {1: {type: "line"}},
               colors: ['#4572A7','#AA4643']
            };
			$.mobile.loading('hide');
            var chart = new google.visualization.ComboChart(document.getElementById('DAGraph'));
            chart.draw(avgAttendedTable, options);

					}
				
				}
				else{ 
				       $.mobile.loading('hide');
					  document.getElementById('DAGraph').innerHTML="<div><p>Oops! There doesn't seem to be any data!</p></div>";
					}
					
			}
		});
	}

/*************************************SICK AVG****************************************/

function SDSpine()

{   $=jQuery;  
$.mobile.loading('show');
document.getElementById('SDGraph').innerHTML="";
     var myAjax = new Ajax.Request(ip+'analysis/attendance/?',
       //var myAjax = new Ajax.Request(ip+'mobileapp/attendance/?', 
                              {
               
                method:'get',
                parameters:"user_id="+localStorage.getItem('Userid')+"&school_id="+localStorage.getItem('Schoolid')+"&academicyear_id="+localStorage.getItem('Academicid'),
                onComplete: function (originalRequest)
                   {    
                   
                        
                        
                        var msg = originalRequest.responseText;
                      // alert(msg);
                       var response = eval("(" + msg + ")");
                             
                       if(response.size()>0)
                           {
                             avgSickTable=new google.visualization.DataTable();
                              var numRows = response.size();
                              var numCols = 3;
                                         
                         if(numRows>0)
                           {
                       avgSickTable.addColumn('string', 'Month');
    avgSickTable.addColumn('number', 'Sick Days');
    avgSickTable.addColumn('number', 'Average Sick Days');

                           for(i=0;i<response.size();i++)
                             {    var data1=[]
									data1.push((response[i]['td']['month']).substring(0,3));
									data1.push(parseInt(response[i]['af']['sickdays']));
									data1.push(parseFloat(response[i]['af']['avg_sickdays']));
									avgSickTable.addRow(data1);   
									
									
									
                             }
                           
			  var options = {
              title : 'Sick Days Vs Average',
              vAxis: {title: "Days", titleTextStyle: {color: 'blue'}},
              hAxis: {title: "Month", titleTextStyle: {color: 'blue'}},
              seriesType: "bars",
              // chartArea:{left:20,top:40,right:10,width:"80%"},
              chartArea:{left:50,top:60,right:30,bottom:40,width:"100%",height:"60%"},
                fontSize:11,
                legend: 'bottom',
              series: {1: {type: "line"}},
               colors: ['#4572A7','#AA4643']
            };
			$.mobile.loading('hide');
            var chart = new google.visualization.ComboChart(document.getElementById('SDGraph'));
            chart.draw(avgSickTable, options);
            jQuery('#SDGraph').show();
					}
				
				}
				else{
					  $.mobile.loading('hide');
					  document.getElementById('SDGraph').innerHTML="<div><p>Oops! There doesn't seem to be any data!</p></div>";
					}
					
			}
		});
 
}


function LDSpine()

{   
	 $=jQuery;
   $.mobile.loading('show');
   document.getElementById('LDGraph').innerHTML="";
   var myAjax = new Ajax.Request(ip+'analysis/attendance/?',
       //var myAjax = new Ajax.Request(ip+'mobileapp/attendance/?', 
                              {
               
                method:'get',
                parameters:"user_id="+localStorage.getItem('Userid')+"&school_id="+localStorage.getItem('Schoolid')+"&academicyear_id="+localStorage.getItem('Academicid'),
                onComplete: function (originalRequest)
                   {    
                   
                        
                        
                        var msg = originalRequest.responseText;
                      // alert(msg);
                       var response = eval("(" + msg + ")");
                             
                       if(response.size()>0)
                           {
                             avgLateTable=new google.visualization.DataTable();
                              var numRows = response.size();
                              var numCols = 3;
                                         
                         if(numRows>0)
                           {
                        avgLateTable.addColumn('string', 'Month');
						avgLateTable.addColumn('number', 'Late Days');
						avgLateTable.addColumn('number', 'Average Late Days');

                           for(i=0;i<response.size();i++)
                             {    var data1=[]
									data1.push((response[i]['td']['month']).substring(0,3));
									data1.push(parseInt(response[i]['af']['latedays']));
									data1.push(parseFloat(response[i]['af']['avg_latedays']));
									avgLateTable.addRow(data1);   
									
									
									
                             }
                           
			   var options = {
              title : 'Late Days Vs Average',
              vAxis: {title: "Days", titleTextStyle: {color: 'blue'}},
              hAxis: {title: "Month", titleTextStyle: {color: 'blue'}},
              seriesType: "bars",
              // chartArea:{left:20,top:40,right:10,width:"80%"},
              chartArea:{left:50,top:60,right:30,bottom:20,width:"100%",height:"60%"},
                fontSize:11,
                legend: 'bottom',
              series: {1: {type: "line"}},
               colors: ['#4572A7','#AA4643']
            };
			$.mobile.loading('hide');
         var chart = new google.visualization.ComboChart(document.getElementById('LDGraph'));
            chart.draw(avgLateTable, options);
					}
				
				}
				else{ 
					  $.mobile.loading('hide');
					  document.getElementById('LDGraph').innerHTML="<div><p>Oops! There doesn't seem to be any data!</p></div>";
					}
					
			}
		});

}

