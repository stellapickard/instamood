var API_DOMAIN = "https://api.instagram.com/v1";
var RECENT_MEDIA_PATH = "/users/self/media/recent";

   var imgCount = 0;    
// what do you think a variable in all caps means?

$(document).ready(function() {
   var token = window.location.hash;
  // if (!token) {
  //   window.location.replace("./login.html");
  // }
  token = token.replace("#", "?"); // Prepare for query parameter
  var mediaUrl = API_DOMAIN + RECENT_MEDIA_PATH + token;

  $.ajax({
    method: "GET",
    url: mediaUrl,
    dataType: "jsonp",
    success: handleResponse,
    error: function() {
      alert("there has been an error...")
    }
  });



function handleResponse(response) {
  imgCount = response.data.length;
  for (var i = 0; i <= response.data.length-1; i++) {
    $(".instaimages").append("<img class=pics src='"+response.data[i].images.standard_resolution.url+"'/>");
    $(".instaimages").append(response.data[i].caption.text);
  } 
  getEgoResponse();
  averageNumberLikes(response);
  avgCaptionLength(response);
  visibilityThirst(response);
}

// this styling code does not work, I don't know why
$("img.pics").css({"max-height": "500px", "max-width": "480px", "border-radius": "4px"});


//Stage 3: Stats on Stats - Ego Score
var EGO_API_DOMAIN = "https://api.instagram.com/v1/users/self/media/liked?access_token=2199392036.37c56ef.08b399627ebf4e26bfb48b7966b5ea53" 


  function getEgoResponse() {
    $.ajax({
        method: "GET",
        url: "https://api.instagram.com/v1/users/self/media/liked?access_token=2199392036.37c56ef.08b399627ebf4e26bfb48b7966b5ea53",
        dataType: "jsonp",
        success: handleEgoResponse,
        error: function() {
          alert("there has been an error...")
        }
      });
  }

function handleEgoResponse(egoResponse){
  var count = 0
  for (var i=0; i<egoResponse.data.length; i++){
    
    if (egoResponse.data[i].user_has_liked) {
      count++;
    }
      // $("#egotext").append('I liked '+count+' of my own images');


  var percentage = (count/imgCount)*100;
  

      $("#percentagetext").append(percentage+" percent of my own pictures liked");
  }



  };
  //Stage 3: Stats on Stats - average number of likes

  function averageNumberLikes(response) {
    var totalLikes = 0
    for (var i = 0; i <= response.data.length-1; i++){
      totalLikes += response.data[i].likes.count; 
    }
    var avgLikes = totalLikes/imgCount;
    $("#likes").append("My average number of likes per image is "+avgLikes);
  }; 

// Stage 3: Stats on Stats - Active Days

// Stage 3: Stats on Stats - Brevity

  function avgCaptionLength(cap) {

    var totalCaptionLength = 0

    for (var i = 0; i <= cap.data.length-1; i++){
      totalCaptionLength += cap.data[i].caption.text.length; 
    }
    var avgCaptionLength = totalCaptionLength/imgCount; 
    $("#caption").append("My average caption length is "+avgCaptionLength);
    
  };
// Stage 3: Stats on Stats - Visibility Thirst

function visibilityThirst(vis) {

  var totalHashtags = 0

  for (var i=0; i<= vis.data.length-1;  i++){
    totalHashtags += vis.data[i].tags.length;
  }
  
  var avgNumHashtags = (totalHashtags/imgCount); 
  $("#hashtag").append("Average amount of hashtags used per post is "+avgNumHashtags);

}

  

// ________________________ doc ready wrap funtion ends below __________________________//

});