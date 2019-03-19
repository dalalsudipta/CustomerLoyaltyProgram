//var apiUrl = location.protocol + '//' + location.host + "/api/";
var apiUrl= "http://localhost:3000" + "/api/";

console.log("at register.js");

//check user input and call server to create dataset
$('.register-customer').click(function() {

  //get user input data
  var formAccountNum = $('.account-number input').val();
  var formFirstName = $('.first-name input').val();
  var formLastName = $('.last-name input').val();
  var formAddressLine = $('.addressLine input').val();
  var formCity = $('.city input').val();
  var formZip = $('.zip input').val();
  var formState = $('.state input').val();

  //create json data
  console.log(apiUrl)
var jsonObj ={
   $class: "org.clp.citi.Customer",
    accountNumber: formAccountNum,
    firstName: formFirstName,
    lastName: formLastName,
    addressLine: formAddressLine,
    city: formCity,
    zip: formZip,
    state: formState,
    points:0
}
console.log(jsonObj)
//


$.ajax({
  type: 'GET',
  //url: apiUrl + 'registerMember',GET /queries/selectCustomer
  url: "http://localhost:3000/api/queries/selectCustomer",
  success: function(data) {
 console.log(data)

  },
  error: function(jqXHR, textStatus, errorThrown) {
    //reload on error
    alert("Error: Try again")
    console.log(errorThrown);
    console.log(textStatus);
    console.log(jqXHR);
  }
});



//
  //make ajax call to add the dataset
  
  $.ajax({
    type: 'POST',
    url: apiUrl + 'org.clp.citi.Customer',
    //url: "http://localhost:3000/api/org.clp.biznet.Member",
    data: JSON.stringify(jsonObj),
      
    contentType: 'application/json' ,
    beforeSend: function() {
      //display loading
      document.getElementById('loader').style.display = "block";
    },
    success: function(data) {

      //remove loader
      document.getElementById('loader').style.display = "none";

      //check data for error
      if (data.error) {
        document.getElementById('registration').style.display = "block";
        alert(data.error);
        return;
      } else {
        //notify successful registration
        document.getElementById('successful-registration').style.display = "block";
        document.getElementById('registration-info').style.display = "none";
      }

    },
    error: function(jqXHR, textStatus, errorThrown) {
      //reload on error
      alert("Error: Try again")
      console.log(errorThrown);
      console.log(textStatus);
      console.log(jqXHR);
    }
  });

});


//check user input and call server to create dataset
$('.register-partner').click(function() {

  //get user input data
  var formName = $('.partnerName input').val();
  var formPartnerId = $('.partnerId input').val();
  var formTransCurrency = $('.transCurrency input').val();
  var formConvertionRate = $('.convertionRate input').val();

  

  var jsonObjPartner ={
    $class: "org.clp.citi.Partner",
     id: formPartnerId,
     name: formName,
     transCurrency: formTransCurrency,
     convertionRate: formConvertionRate,
     rewardsBalance:0
 }

  //make ajax call to add the dataset
  $.ajax({
    type: 'POST',
    url: apiUrl + 'org.clp.citi.Partner',
    data: JSON.stringify(jsonObjPartner),
    dataType: 'json',
    contentType: 'application/json',
    beforeSend: function() {
      //display loading
     // document.getElementById('registration').style.display = "none";
      document.getElementById('loader').style.display = "block";
    },
    success: function(data) {

      //remove loader
      document.getElementById('loader').style.display = "none";

      //check data for error
      if (data.error) {
        document.getElementById('registration').style.display = "block";
        alert(data.error);
        return;
      } else {
        //notify successful registration
        document.getElementById('successful-registration').style.display = "block";
        document.getElementById('registration-info').style.display = "none";
      }

    },
    error: function(jqXHR, textStatus, errorThrown) {
      //reload on error
      alert("Error: Try again")
      console.log(errorThrown);
      console.log(textStatus);
      console.log(jqXHR);
    }
  });

});
