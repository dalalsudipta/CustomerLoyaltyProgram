var apiUrl= "http://localhost:3000" + "/api/";


$('.search-customer').click(function() {
  var formAccountNum = $('#account-number').val();
  var zip = $('#zip').val();
  var startDate = $('#startDate').val();
  var endDate = $('#endDate').val();
  if(formAccountNum!='' && startDate!='' && endDate!='')
    searchByIdAndDate();
  else if(formAccountNum!='')
    searchById();
  else if(zip!='' && startDate!='' && endDate!='')
  searchByZipAndDate();
  else if(zip!='') 
    searchByZip();
});


function searchByZipAndDate()
{

  //get user input data
  var formZip = $('#zip').val();
  var startDate = $('#startDate').val();
  var endDate = $('#endDate').val();
  //make ajax call
  $.ajax({
    type: 'get',
    url: apiUrl + 'queries/selectUsePointsByZipAndDate?customerZip='+formZip+'&startDate='+startDate+'&endDate='+endDate,
    beforeSend: function() {
      //display loading
      document.getElementById('loader').style.display = "block";
    },
    success: function(data) {
      //remove loader
      document.getElementById('loader').style.display = "none";
      //check data for error
      if (data.error) {
        alert(data.error);
        return;
      } else {
        loadTable(data)
        
      }

    },
    error: function(jqXHR, textStatus, errorThrown) {
      //reload on error
      alert("Error: Try again")
      console.log(errorThrown);
      console.log(textStatus);
      console.log(jqXHR);
    },
    complete: function() {

    }
  });

}

function searchByZip()
{

  //get user input data
  var formZip = $('#zip').val();
  //make ajax call
  $.ajax({
    type: 'get',
    url: apiUrl + 'queries/selectUsePointsByZip?customerZip='+formZip,
    beforeSend: function() {
      //display loading
      document.getElementById('loader').style.display = "block";
    },
    success: function(data) {
      //remove loader
      document.getElementById('loader').style.display = "none";
      //check data for error
      if (data.error) {
        alert(data.error);
        return;
      } else {
        loadTable(data)
        
      }

    },
    error: function(jqXHR, textStatus, errorThrown) {
      //reload on error
      alert("Error: Try again")
      console.log(errorThrown);
      console.log(textStatus);
      console.log(jqXHR);
    },
    complete: function() {

    }
  });

}

function searchByIdAndDate()
{

  //get user input data
  var formAccountNum = $('#account-number').val();
  var startDate = $('#startDate').val();
  var endDate = $('#endDate').val();
  var custId="resource%3Aorg.clp.citi.Customer%23"+formAccountNum ;
  //make ajax call
  $.ajax({
    type: 'get',
    url: apiUrl + 'queries/selectUsePointsByIdAndDate?customerId='+custId+'&startDate='+startDate+'&endDate='+endDate ,
    beforeSend: function() {
      //display loading
      document.getElementById('loader').style.display = "block";
    },
    success: function(data) {
      //remove loader
      document.getElementById('loader').style.display = "none";
      //check data for error
      if (data.error) {
        alert(data.error);
        return;
      } 
      else {
        loadTable(data)
        
      }

    },
    error: function(jqXHR, textStatus, errorThrown) {
      //reload on error
      alert("Error: Try again")
      console.log(errorThrown);
      console.log(textStatus);
      console.log(jqXHR);
    },
    complete: function() {

    }
  });

}


function searchById()
{

  //get user input data
  var formAccountNum = $('#account-number').val();
  var custId="resource%3Aorg.clp.citi.Customer%23"+formAccountNum ;
  //make ajax call
  $.ajax({
    type: 'get',
    url: apiUrl + 'queries/selectUsePointsById?customerId='+custId,
    beforeSend: function() {
      //display loading
      document.getElementById('loader').style.display = "block";
    },
    success: function(data) {
      //remove loader
      document.getElementById('loader').style.display = "none";
      //check data for error
      if (data.error) {
        alert(data.error);
        return;
      } 
      else {
        loadTable(data)
        
      }

    },
    error: function(jqXHR, textStatus, errorThrown) {
      //reload on error
      alert("Error: Try again")
      console.log(errorThrown);
      console.log(textStatus);
      console.log(jqXHR);
    },
    complete: function() {

    }
  });

}

function loadTable(dataset)
{
  // Jquery Data Table population Logic.
  
  if (!dataset[0]) 
      {
        alert("No record found");
        $('#searchTable').DataTable().clear().draw();
      }
$('#searchTable').DataTable().destroy();     
$('#searchTable').DataTable( {
  "data": dataset,
  "columns": [
      { "data": "customerFirstName" },
      { "data": "customerLastName" },
      { "data": "customerZip" },
      { "data": "usePointDescription" },
      { "data": "timestamp" }
  ]
} );

}


$('.add-points').click(function() {
  
  earnPoints();
});


function earnPoints() {

  //get user input data
  var formAccountNum = $('#account-number').val();
  var formPoints = $('#points').val();
  //create json data
  var inputData = '{' + '"$class" : "org.clp.citi.EarnPoints" , "points" : "' + formPoints + '", ' + '"partner" : "resource:org.clp.citi.Partner\#bestbuy", '+' "member" : "resource:org.clp.citi.Customer\#' + formAccountNum + '"}';
  console.log(inputData)
  //make ajax call
  $.ajax({
    type: 'POST',
    url: apiUrl + 'org.clp.citi.EarnPoints',
    data: inputData,
    dataType: 'json',
    contentType: 'application/json',
    beforeSend: function() {
      //display loading
      document.getElementById('loader').style.display = "block";
    },
    success: function(data) {
      document.getElementById('loader').style.display = "none";
      //check data for error
      if (data.error) {
        alert(data.error);
        return;
      } else {
        alert('Transaction successful');
      }


    },
    error: function(jqXHR, textStatus, errorThrown) {
      alert("Error: Try again")
      console.log(errorThrown);
      console.log(textStatus);
      console.log(jqXHR);
    },
    complete: function() {
      document.getElementById('loader').style.display = "none";
    }
  });

}
