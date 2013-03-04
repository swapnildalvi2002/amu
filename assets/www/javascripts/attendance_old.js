
var dAttended=[];
var sDays=[];
var lDays=[];
var avgD=[];
var avgS=[];
var avgL=[];
var month=[]
var data=[]; 

/*********************ATTENDANCE BLOCK************************************/
function graphData()
{
    var String="user_id="+localStorage.getItem('Userid')+"&school_id="+localStorage.getItem('Schoolid')+"&academicyear_id="+localStorage.getItem('Academicid');
    //url=ip+"mobileapp/attendance/?user_id="+user_id+"&school_id="+school_id+"&academicyear_id="+academic_yr_id;
    var randno = Math.floor(Math.random()*1000);
    var myAjax = new Ajax.Request(ip+'analysis/attendance/?',
       //var myAjax = new Ajax.Request(ip+'mobileapp/attendance/?', 
              {              
                method:'get',
                parameters:"user_id="+localStorage.getItem('Userid')+"&school_id="+localStorage.getItem('Schoolid')+"&academicyear_id="+localStorage.getItem('Academicid')+'&randno='+randno,
                onComplete: function (originalRequest)
                   {    
                      var msg = originalRequest.responseText;
                      // alert(msg);
                       var response = eval("(" + msg + ")");
                       if(response.size()>0&data.length==0)
                           {    
                                   for(i=0;i<response.size();i++)
                                   
                                   { 
                                      
                                       month.push((response[i]['td']['month']).substring(0,3));
                                       
                                       data.push(parseInt(parseInt(response[i]['af']['totalworkdays'])-parseInt(response[i]['af']['daysattended'])+parseInt(response[i]['af']['sickdays'])));
                                       dAttended.push(parseInt(response[i]['af']['daysattended']));  
                                      
                                       sDays.push(parseInt(response[i]['af']['sickdays']));  
                                      
                                       lDays.push(parseInt(response[i]['af']['latedays']));  
                                      
                                       avgD.push(parseFloat(response[i]['af']['avg_daysattended']));
                                       avgS.push(parseFloat(response[i]['af']['avg_sickdays']));
                                       avgL.push(parseFloat(response[i]['af']['avg_latedays']));
                                       console.log("data Array contain"+data);
                                    }
                        }
                       
                   }
              });
    document.addEventListener("backbutton",inAttendance, false);
    function inAttendance()
         {
             document.location="calendar.html";
             
         }
} 
    
function attendance()
{  
   
   
       dataTable = new google.visualization.DataTable();
        var numRows = 10;
        var numCols = 4;
        if(numRows>0)
          {
            dataTable.addColumn('string', 'Month');
            dataTable.addColumn('number', 'Non Sick Day');
            dataTable.addColumn('number', 'Attended Days');
            dataTable.addColumn('number', 'Sick Days');
           
             for(i=0;i<data.length;i++)
                 {   var dataAttendance=[];
                     dataAttendance.push(month[i])
                     dataAttendance.push(data[i])
                     dataAttendance.push(dAttended[i])
                     dataAttendance.push(sDays[i])
                     dataTable.addRow(dataAttendance);
                 }
            var options = 
                 {
                   title: 'Student Attendance Analysis',
                   hAxis: {title: 'Days', titleTextStyle: {color: 'blue'}},
                   vAxis: {title: "Months", titleTextStyle: {color: 'red'}},
                   legend: 'bottom',
                   chartArea:{left:50,top:60,right:30,width:"80%",height:"60%"},
                   fontSize:11,
                   isStacked: true, 
                   colors: [ '#89A54E','#4572A7','#AA4643']
                 }
             var chart = new google.visualization.BarChart(document.getElementById('mainform'));
             chart.draw(dataTable, options);
         //    document.getElementById("average").innerHTML='<input type="button" class="classname" value="AvgAttendance" onclick="DASpine();"><input type="button" class="classname" value="AvgSick" onclick="SDSpine();" ><input type="button" class="classname" value="AvgLate" onclick="LDSpine();"></div>';                
        }
                                                     
   document.addEventListener("backbutton",inAttendance, false);
   function inAttendance()
        {
            document.location="attendance.html";
            
        }
         
}
/********************REPORTCARD METHOD NOT IMPLEMENT YET*************************/
function DASpine()

{   
    jQuery('body').append('<div id="progress"><img src="img/loading-large.gif"></div>');    
    avgAttendedTable=new google.visualization.DataTable();
    var numRows = 10;
    var numCols = 3;
    if(numRows>0)
      {
        avgAttendedTable.addColumn('string', 'Month');
        avgAttendedTable.addColumn('number', 'Days Attended');
        avgAttendedTable.addColumn('number', 'Average days Attended');
        for(var j=0;j<10;j++)
            {
                var data1=[]
                data1.push(month[j]);
                data1.push(dAttended[j]);
                data1.push(avgD[j]);
                avgAttendedTable.addRow(data1);
            }
    
        var options = 
            {
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
         jQuery('#progress').remove();
         var chart = new google.visualization.ComboChart(document.getElementById('mainform'));
         chart.draw(avgAttendedTable, options);
       // document.getElementById("average").innerHTML='<center><input type="button" value=Back onclick="attendance();">';
      }
    document.addEventListener("backbutton", inDASpine, false);
    function inDASpine()
      {
        document.location="attendance.html";
        
      }
}


/*************************************SICK AVG****************************************/

function SDSpine()

{    
    jQuery('body').append('<div id="progress"><img src="img/loading-large.gif"></div>');
    avgSickTable=new google.visualization.DataTable();
    var numRows = 10;
    var numCols = 3;
    if(numRows>0)
      {
        avgSickTable.addColumn('string', 'Month');
        avgSickTable.addColumn('number', 'Sick Days');
        avgSickTable.addColumn('number', 'Average Sick Days');
        for(var j=0;j<10;j++)
          {
            var data1=[]
            data1.push(month[j]);
            data1.push(sDays[j]);
            data1.push(avgS[j]);
            avgSickTable.addRow(data1);
          }
         var options = 
          {
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
        jQuery('#progress').remove();
        var chart = new google.visualization.ComboChart(document.getElementById('mainform'));
        chart.draw(avgSickTable, options);
       // document.getElementById("average").innerHTML='<center><input type="button" value=Back onclick="attendance();">';
      }    
    document.addEventListener("backbutton", inSDSpine, false);
    function inSDSpine()
      {
        document.location="attendance.html";
        
      }

}


function LDSpine()
{   
    jQuery('body').append('<div id="progress"><img src="img/loading-large.gif"></div>');       
    avgLateTable=new google.visualization.DataTable();
    var numRows = 10;
    var numCols = 3;
    if(numRows>0)
      {
        avgLateTable.addColumn('string', 'Month');
        avgLateTable.addColumn('number', 'Late Days');
        avgLateTable.addColumn('number', 'Average Late Days');
        for(var j=0;j<10;j++)
          {
            var data1=[]
            data1.push(month[j]);
            data1.push(lDays[j]);
            data1.push(avgL[j]);
            avgLateTable.addRow(data1);
          }
        var options = 
          {
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
              jQuery('#progress').remove();
              var chart = new google.visualization.ComboChart(document.getElementById('mainform'));
              chart.draw(avgLateTable, options);
              //document.getElementById("average").innerHTML='<center><input type="button" value=Back onclick="attendance();">';
             }
    document.addEventListener("backbutton", inLDSpine, false);
    function inLDSpine()
      {
        document.location="attendance.html";
        
      }

}


