
function getPerformanceAnalysisData(value)
{  $=jQuery;
$.mobile.loading('show');  
	 console.log("value is=========================>"+value);
	 document.getElementById('performanceGraph').innerHTML="";
	  document.getElementById("subPerformanceHeader").innerHTML=""; 
    var subject_id=value;
  
    //alert(student_id);
    var randno = Math.floor(Math.random()*1000); 
    if(subject_id=='all')
    {
    	   
//         alert("method call Successfully");  
        var myAjax = new Ajax.Request(
        ip+'analysis/getPerformanceAnalysisAllData/?', 
        {
            method: 'get', 
            parameters: 'student_id='+localStorage.getItem('Userid')+'&school_id='+localStorage.getItem('Schoolid')+'&academicyear_id='+localStorage.getItem('Academicid')+'&randno='+randno,
            //parameters: 'student_id='+19+'&school_id='+1+'&academicyear_id='+1,
            onComplete: function(originalRequest)
            { 
                 
                var msg = originalRequest.responseText;
                var response = eval ("("+msg+") ");
                //document.getElementById('CompareScoreBySub').innerHTML=msg;
                dataTable = new google.visualization.DataTable();
                
            // determine the number of rows and columns.
              var numRows = response.size();
              var numCols = 5;

			   
                if(numRows>0)
                {
                    dataTable.addColumn('string', 'Exam Name');
                    dataTable.addColumn('number', 'Student Total Score');
                    dataTable.addColumn('number', 'Max Total Score');
                    dataTable.addColumn('number', 'Min Total Score');
                    dataTable.addColumn('number', 'Avg Total Score'); 
                  document.getElementById("subPerformanceHeader").innerHTML="All";
                  for(i=0;i<response.size();i++)
                    { 
                        var data=[];
                        data.push(response[i]['classscores']['testname'].toString());
                        data.push(parseFloat(response[i]['studentscores']['totalscore']));
                        data.push(parseFloat(response[i][0]['maxtotal']));
                        data.push(parseFloat(response[i][0]['mintotal']));
                        data.push(parseFloat(response[i][0]['avgtotal']));
                        dataTable.addRow(data);
                    }
                 
                    var chartDivId = 'performanceGraph';
        
                    // Set chart options
                    var options = {
                      title : 'Student Total Score Vs Averages',
                      vAxis: {title: "Scores", titleTextStyle: {color: 'blue'}},
                      hAxis: {title: "Subjects", titleTextStyle: {color: 'blue'}},
                      seriesType: "bars",
                      series: {3: {'type': "line"}},
                      legend: 'bottom',
                      chartArea:{left:50,top:60,right:30,bottom:40,width:"100%",height:"60%"},
                      fontSize:11
                    };
                      $.mobile.loading('hide');
					// Instantiate and draw our chart, passing in some options.
                    var chart = new google.visualization.ComboChart(document.getElementById(chartDivId));
                    chart.draw(dataTable, options);
                    //document.location="#performanceGraphDisplay";
                }
                else 
                {    $.mobile.loading('hide');
                    document.getElementById("performanceGraph").innerHTML="<div><p>Oops! There doesn't seem to be any data!</p></div>";
                   //alert("")
                     //document.location="#performanceGraphDisplay";
					 // document.location="#subjectList";
                    return false;
                }
            }
        });
        

    /*    document.addEventListener("backbutton",inSubject, false);
        function inSubject()
        {
            document.location="subject_list.html";
            
        } */
  
    }
    else if(subject_id!='all' && subject_id!='')
    {   
	
	     
        var randno = Math.floor(Math.random()*1000);  
        var myAjax = new Ajax.Request(
        ip+'analysis/getPerformanceAnalysisBySubjectId/?', 
        {
            method: 'get', 
            parameters: 'student_id='+localStorage.getItem('Userid')+'&subject_id='+subject_id+'&school_id='+localStorage.getItem('Schoolid')+'&academicyear_id='+localStorage.getItem('Academicid')+'&randno='+randno,
            //parameters: 'student_id='+19+'&subject_id='+subject_id+'&school_id='+1+'&academicyear_id='+1,
            
            onComplete: function(originalRequest)
            {
				       
                var msg = originalRequest.responseText;
                var response = eval ("("+msg+") ");
                dataTable = new google.visualization.DataTable();
              var numRows = response.size();
              var numCols = 5;
              
                if(numRows>0)
                {
                    dataTable.addColumn('string', 'Exam Name');
                    dataTable.addColumn('number', 'Student Score');
                    dataTable.addColumn('number', 'Max Score');
                    dataTable.addColumn('number', 'Min Score');
                    dataTable.addColumn('number', 'Avg Score'); 
                   var theHeaderSubjectName=response[0]['sts']['subjectname'].toString();
			   document.getElementById("subPerformanceHeader").innerHTML=theHeaderSubjectName;
                  for(i=0;i<response.size();i++)
                    { 
                        var data=[];
						
						data.push(response[i]['sts']['testname'].toString());
                        data.push(parseFloat(response[i]['sf']['score']));
                        data.push(parseFloat(response[i]['sf']['maxscore']));
                        data.push(parseFloat(response[i]['sf']['minscore']));
                        data.push(parseFloat(response[i]['sf']['avgscore']));
                        dataTable.addRow(data);
                    }
                 
                    var chartDivId = 'performanceGraph';
        
                    // Set chart options
                    var options = {
                      title : 'Student Score Vs Averages',
                      vAxis: {title: "Scores", titleTextStyle: {color: 'blue'}},
                      hAxis: {title: "Exams", titleTextStyle: {color: 'blue'}},
                      seriesType: "bars",
                      series: {3: {'type': "line"}},
                      legend: 'bottom',
                      chartArea:{left:50,top:60,right:30,bottom:40,width:"100%",height:"60%"},
                   //   chartArea:{left:50,top:60,right:30,width:"100%",height:"100%"},
                      fontSize:11
                    };
					    $.mobile.loading('hide');  
		           // Instantiate and draw our chart, passing in some options.
                    var chart = new google.visualization.ComboChart(document.getElementById(chartDivId));
                    chart.draw(dataTable, options);
                    // document.location="#performanceGraphDisplay";
                }
                else 
                {        $.mobile.loading('hide');  
                    document.getElementById("performanceGraph").innerHTML="<div><p>Oops! There doesn't seem to be any data!</p></div>";
                    //alert("Record is not present for specified Subject");
                     //document.location="#subjectList";
                    return false;
                }
            }
        });

    /*    document.addEventListener("backbutton",inSubject, false);
        function inSubject()
        {
            document.location="subject_list.html";
            
        }*/ 
        
    }
}               


/****************************************Test Analysis**********************************/


function getAnalysisByUserTest(value,t_Name)
{   
    
    $=jQuery;
    document.getElementById('testGraph').innerHTML="";
    var test_id=value;
    document.getElementById('testPerformanceHeader').innerHTML="";
   
    var colors = {'blue': '#369', 'red': '#c22', 'green': '#283', 'yellow': '#c91'};
    var randno = Math.floor(Math.random()*1000); 
    if(test_id!='')
    {
         $.mobile.loading('show');  
        var myAjax = new Ajax.Request(
        ip+'analysis/getAnalysisByUserTestgraphdata/?', 
        {
            method: 'get', 
            parameters: 'student_id='+localStorage.getItem('Userid')+'&test_id='+test_id+'&school_id='+localStorage.getItem('Schoolid')+'&academicyear_id='+localStorage.getItem('Academicid')+'&randno='+randno,
//            parameters: '&student_id='+19+'test_id='+test_id+'&school_id='+1+'&academicyear_id='+1,
            onComplete: function(originalRequest)
            {
            	 $.mobile.loading('hide');  
              var msg = originalRequest.responseText;
                var response = eval ("("+msg+") ");
                dataTable = new google.visualization.DataTable();
                
            // determine the number of rows and columns.
              var numRows = response.size();
              var numCols = 5;
    
                if(numRows>0)
                {
                    dataTable.addColumn('string', 'Subjects');
                    dataTable.addColumn('number', 'Student Score');
                    dataTable.addColumn('number', 'Highest Score');
                    dataTable.addColumn('number', 'Minimum Score');
                    dataTable.addColumn('number', 'Avg Score'); 
                   document.getElementById('testPerformanceHeader').innerHTML=t_Name;	
                  for(i=0;i<response.size();i++)
                    { 
                        var data=[];
                        data.push(response[i]['sts_d']['subjectname'].toString());
                        data.push(parseFloat(response[i]['sg']['score']));
                        data.push(parseFloat(response[i]['sg']['maxscore']));
                        data.push(parseFloat(response[i]['sg']['minscore']));
                        data.push(parseFloat(response[i]['sg']['avgscore']));
                        dataTable.addRow(data);
                    }
                 
                    var chartDivId = 'testGraph';
        
                    // Set chart options
                    var options = 
                    {
                      title : 'Score Vs Subject',
                      vAxis: {title: "Scores", titleTextStyle: {color: 'blue'}},
                      hAxis: {title: "Subjects", titleTextStyle: {color: 'blue'}},
                      seriesType: "bars",
                      series: {3: {'type': "line"}},
                      legend: 'bottom',
                      chartArea:{left:50,top:60,right:30,bottom:40,width:"100%",height:"60%"},
                      //chartArea:{left:50,top:60,right:30,width:"100%",height:"100%"},
                      fontSize:11
                    };		
					
                
                    // Instantiate and draw our chart, passing in some options.
                    var chart = new google.visualization.ComboChart(document.getElementById(chartDivId));
                    chart.draw(dataTable, options);
                    //document.location="#testGraphDisplay";
                }
                else 
                {  
                  document.getElementById('testGraph').innerHTML="<div><p>Oops! There doesn't seem to be any data!</p></div>";
                  // alert("Record is not present for specified Test");
                   // document.location="#testGraphDisplay";
                    return false;
                }
            }
        });
    }
    else 
        return false;
    
   /* document.addEventListener("backbutton",inTest, false);
    function inTest()
    {
        document.location="test_list.html";
        
    }*/

}
