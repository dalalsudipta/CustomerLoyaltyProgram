//var apiUrl = location.protocol + '//' + location.host + "/api/";
var apiUrl= "http://localhost:3000" + "/api/";
//check user input and call server
$('.sign-in-member').click(function() {
  updateMember();

  
});

function updateMember() {

  //get user input data
  var formAccountNum = $('#account-number').val();
  var formCardId = $('.card-id input').val();

  //create json data
  var inputData = '{' + '"accountnumber" : "' + formAccountNum + '", ' + '"cardid" : "' + formCardId + '"}';
  console.log(inputData)

  //make ajax call
  $.ajax({
    type: 'get',
    url: apiUrl + 'org.clp.citi.Customer/'+formAccountNum,
    //url: 'http://localhost:3000/api/org.clp.citi.Customer/123456',
    data: inputData,
    dataType: 'json',
    contentType: 'application/json',
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

        //remove login section and display member page
        document.getElementById('loginSection').style.display = "none";
        document.getElementById("transactionSection").style.display = "block";
         
        //update heading
        $('.heading').html(function() {
          var str = '<h4><b>' + data.firstName + ' ' + data.lastName + '</b></h4>';
          str = str + '<h4><b>' + data.accountNumber + '</b></h4>';
          str = str + '<h4><b>' + data.points + '</b></h4>';

          return str;
        });
        // setting hidden field
        $('#customerFirstName').val(data.firstName);
        $('#customerLastName').val(data.lastName);
        $('#customerZip').val(data.zip);
        //update partners dropdown for earn points transaction
        /*$('.earn-partner select').html(function() {
          var str = '<option value="" disabled="" selected="">select</option>';
          var partnersData = data.partnersData;
          for (var i = 0; i < partnersData.length; i++) {
            str = str + '<option partner-id=' + partnersData[i].id + '> ' + partnersData[i].name + '</option>';
          }
          return str;
        });

        //update partners dropdown for use points transaction
        
        $('.use-partner select').html(function() {
          var str = '<option value="" disabled="" selected="">select</option>';
          var partnersData = data.partnersData;
          for (var i = 0; i < partnersData.length; i++) {
            str = str + '<option partner-id=' + partnersData[i].id + '> ' + partnersData[i].name + '</option>';
          }
          return str;
        });

        //update earn points transaction
        $('.points-allocated-transactions').html(function() {
          var str = '';
          var transactionData = data.earnPointsResult;

          for (var i = 0; i < transactionData.length; i++) {
            str = str + '<p>timeStamp: ' + transactionData[i].timestamp + '<br />partner: ' + transactionData[i].partner + '<br />member: ' + transactionData[i].member + '<br />points: ' + transactionData[i].points + '<br />transactionName: ' + transactionData[i].$class + '<br />transactionID: ' + transactionData[i].transactionId + '</p><br>';
          }
          return str;
        });

        //update use points transaction
        $('.points-redeemed-transactions').html(function() {
          var str = '';

          var transactionData = data.usePointsResults;

          for (var i = 0; i < transactionData.length; i++) {
            str = str + '<p>timeStamp: ' + transactionData[i].timestamp + '<br />partner: ' + transactionData[i].partner + '<br />member: ' + transactionData[i].member + '<br />points: ' + transactionData[i].points + '<br />transactionName: ' + transactionData[i].$class + '<br />transactionID: ' + transactionData[i].transactionId + '</p><br>';
          }
          return str;
        });
*/
        
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
//remove loader
document.getElementById('loader').style.display = "none";

    }
  });
}



//check user input and call server
$('.earn-points-transaction').click(function() {

  var formPoints = $('.earnPoints input').val();
  earnPoints(formPoints);
});



$('.cup50').click(function() {
  usePoints(50, "Purchased cup with 50 Points");
});

$('.book70').click(function() {
  usePoints(70,"Purchased book with 70 Points");
});




//check user input and call server
$('.use-points-transaction').click(function() {
  var formPoints = $('.usePoints input').val();
  usePoints(formPoints);
});


function usePoints(formPoints,description) {

  //get user input data
  var formAccountNum = $('#account-number').val();
  var custFName=$('#customerFirstName').val();
  var custLName=$('#customerLastName').val();
  var custZip=$('#customerZip').val();

  var formCardId = $('.card-id input').val();
  //var formPartnerId = $('.use-partner select').find(":selected").attr('partner-id');
  var formPartnerId = 'bestbuy';

  //create json data
  
  var inputData = '{' + '"$class" : "org.clp.citi.UsePoints" , "points" : "' + formPoints + '", "usePointDescription" : "' + description + '", "customerFirstName" : "' + custFName + '", "customerLastName" : "' + custLName + '", "customerZip" : "' + custZip + '",' + '"partner" : "resource:org.clp.citi.Partner\#bestbuy", '+' "member" : "resource:org.clp.citi.Customer\#' + formAccountNum + '"}';

  console.log("data : " + inputData)

  //make ajax call
  $.ajax({
    type: 'POST',
    url: apiUrl + 'org.clp.citi.UsePoints',
    data: inputData,
    dataType: 'json',
    contentType: 'application/json',
    beforeSend: function() {
      //display loading
      document.getElementById('loader').style.display = "block";
      document.getElementById('infoSection').style.display = "none";
    },
    success: function(data) {

      document.getElementById('loader').style.display = "none";
      document.getElementById('infoSection').style.display = "block";

      //check data for error
      if (data.error) {
        alert(data.error);
        return;
      } else {
        //update member page and notify successful transaction
        updateMember();
        alert('Transaction successful');
      }

    },
    error: function(jqXHR, textStatus, errorThrown) {
        alert('Transaction not completed');
      console.log(errorThrown);
      console.log(textStatus);
      console.log(jqXHR);
    },
    complete: function() {
      document.getElementById('loader').style.display = "none";
    }
  });

}
