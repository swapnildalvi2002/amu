var session_id;
function getFeeData(value)
{
    session_id=value;
    localStorage.setItem('SchoolsessionID', session_id)
    var myAjax = new Ajax.Request(ip+'fees/getassignedfeestostudentsinner/?', 
         {
            
             method:'get',
             parameters:"user_id="+localStorage.getItem('Userid')+"&school_id="+localStorage.getItem('Schoolid')+"&academicyear_id="+localStorage.getItem('Academicid')+"&schoolsession_id="+localStorage.getItem('SchoolsessionID'),
             onComplete: function (originalRequest)
                {    
                  var content="";  
                
                     var msg = originalRequest.responseText;
                     var response = eval("(" + msg + ")");
                     if(session_id=='all')
                     {                   
                              if(response.size()>0)  
                                      { 
            						  	  content+='<table class="ListTable">';  
            						  	  content+="<tr class='money'><th >Fee Type</th><th>Month</th><th>Fee Amount</th></tr>";
                                       
                                          
                                          for(var i=0;i<response.size();i++) 
                                              { 
                                              if(response[i]['ft']['feetype']!=null)
                                                   { 
												   		var paidamount=response[i][0]['paidamount'];
														console.log("Date:======================="+response[i][0]['paiddate']);
														var paiddate='';
														if(response[i][0]['paiddate']!='null')
														{
															 paiddate=response[i][0]['paiddate'];
														}
														var paymentmode=response[i][0]['paymentmode'];
													
														
							     						content +='<tr class="even" onclick=getMoreDetail("';
														content +=paidamount;
														content +='","';
														content +=paiddate.replace(/\s+/g,"&nbsp;");
														content +='","';
														content +=paymentmode.replace(/\s+/g,"&nbsp;");
														content +='")>';
														console.log("========<tr class='even' onclick=getMoreDetail('"+ paidamount +"','"+ paiddate +"','"+ paymentmode +"')>");
                                                        content +="<td style='padding-left:3px;'>"+response[i]['ft']['feetype']+"</td>";
                                                        content +="<td>"+response[i]['ss']['schoolsession_month']+"</td>";
                                                        content +="<td>"+response[i]['sf']['feeamount']+" <span style='float:right;'>&rsaquo; &nbsp; </span></td>";
                                                        content +="</tr>";
                                                    }
                                                       
                                              else
                                                   {
                                                  if(response[i]['ft']['feetype']==null)
                                                         {
                                                          document.getElementById("feeTable").innerHTML="No record found";
                                                          return false;
                                                          }
                                                     }
                                                  }
            							   content+='</table>'; 
            							   document.getElementById("feeTable").innerHTML=content;
            							   
                                       } 
                              //BACK button code START

                              document.addEventListener("backbutton",inAllDetail, false);
                              function inAllDetail()
                               {
                                    
                                  document.location="fees.html";
                               }
                              //BACK button code END
 
                                           
                     }
                
                 else{
                    if(session_id!='all') 
                          {
                            //if not all
                   	   		content +="<table class='ListTable'>";  
						   		content +="<tr class='money'><th>Fee Type</th><th>Fee Amount</th><th>Status</th></tr>";
                              
                               for(var i=0;i<response.size();i++) 
                               { 
							     var paidamount=response[i][0]['paidamount'];
								 var paiddate=response[i][0]['paiddate'];
								
								 var paymentmode=response[i][0]['paymentmode'];
								
								 	content +='<tr class="even" onclick=getMoreDetail("';
														content +=paidamount;
														content +='","';
														content +=paiddate.replace(/\s+/g,"&nbsp;");
														content +='","';
														content +=paymentmode.replace(/\s+/g,"&nbsp;");
														content +='")>';
                                 content +="<td style='padding-left:3px;'>"+response[i]['ft']['feetype']+"</td>";
                                 content +="<td>"+response[i]['sf']['feeamount']+"</td>";
                                //for Notification
                                        if(response[i]['ft']['monthfee']==response[i][0]['paidamount'])
                                            {
                                             content +="<td> <div style='float:left;'> <img src='img/checkbox/ok.png' style='width:90%;' /></div> <span style='float:right;'>&rsaquo; &nbsp; </span></td>";
                                            }
                                        else if(response[i][0]['paidamount']<response[i]['ft']['monthfee'])
											{
											  content +="<td> <div style='float:left;'> <img src='img/checkbox/partial.png' style='width:90%;'/></div> <span style='float:right;'>&rsaquo; &nbsp; </span></td>";
											}
										else if(response[i][0]['paidamount']=='')
										  {
										   content +="<td> <div style='float:left;'> <img src='img/checkbox/null.png' style='width:90%;'/></div> <span style='float:right;'>&rsaquo; &nbsp; </span></td>";
										  }
                                        content +="</tr>"  ; 
                                     }
								content+='</table>';
								document.getElementById("feeTable").innerHTML=content;
                          
                 
								   //BACK button code START
							    document.addEventListener("backbutton",inSingleDetail, false);
							    function inSingleDetail()
							     {
							          
							        document.location="fees.html";
							     }
							    //BACK button code END

                           }
                        else
                        {
                            document.getElementById("feeTable").innerHTML="No record found";
                            return false;      
                        } 
    						   		
                     }
                    
            
                }     
         });

        
}


function getMoreDetail(paidamount,paiddate,paymentmode)
 {
	var content="";
	content+='<table class="ListTable">';
	content+="<tr class='money'><th>Paid Amount</th><th>Paid Date</th><th>Payment Mode</th></tr>";
	content +="<tr class='even'>";
	if(paiddate!='null' && paiddate!='')
	{
		content +="<td style='padding-left:3px;'>"+paidamount+"</td>";
		content +="<td>"+paiddate+"</td>";
		content +="<td>"+paymentmode+"</td>";
	}
	else
	{
		content +="<td colspan='3' style='padding-left:3px;'>No record Found</td>";
	}
	content +="</tr>";
	content+='</table>';
	document.getElementById('feeTable').innerHTML=content;
	
	//BACK button code START

	
	//BACK button code END
 }


