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

 


// Sentiment Request
// function getSentiment(text) {
//   $.ajax({
//     method: "GET",
//     data: "text="+text,
//     url:"https://twinword-sentiment-analysis.p.mashape.com/analyze/?text=great+value+in+its+price+range!",
//     headers:{"X-Mashape-Key": "IU5RDQiu0omshnKfW2nXe6Qe891Hp16W0Vjjsnwn8zDAeD07gY","Accept": "application/json",},
//     success: analyzeSentiments,
//     error: function() {
//     alert("there has been an error...")
//     }
// });
  console.log("yo");
// }


// function analyzeSentiments(data) {
//   // console.log(data);
//   var totalScore = 0
//   for(var i=0; i<data[i].length; i++){
//     totalScore += data[i].score;
//   }
//   var avgScore = totalScore/imgCount;
//   $(".instaimages").append("<div class='score'>"+avgScore);
// };
// lenght is undefined, I don't know why. 


// end of sentiment stuff

function handleResponse(response) {
  console.log(response);
  imgCount = response.data.length;
  for (var i = 0; i <= response.data.length-1; i++) { //this is looping through instagram objects from the API
    $(".instaimages").append("<div class='images'><img class='pic' src='"+response.data[i].images.standard_resolution.url+"'/></div>");
    $(".instaimages").append("<div class='text'>"+response.data[i].caption.text+"</div>");
    // getSentiment(response.data[i].caption.text); // makes a get request to the Sentiment API with the caption of this particular image
  } 
  
  getEgoResponse();
  averageNumberLikes(response);
  avgCaptionLength(response);
  visibilityThirst(response);
  activedays(response);
  
}


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

function activedays(response) {
  console.log("We are in active days");
  var days=[0,0,0,0,0,0,0];
  var week=["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  for (var i=0; i<response.data.length; i++){
    var time = parseInt(response.data[i].created_time);
    var date = new Date(time*1000);
    days[date.getDay()]++;  
  }
  console.log(days);
  // for loop for days
  var biggestDay = 0;
  console.log("We are about to loop through days");
  for (var i=0; i<=days.length; i++){
    if (days[i] > biggestDay){
      biggestDay = 0 + days[i];
      console.log(biggestDay);
      // var dayOfWeek = days[i];
      var dayOfWeekIndex = days.indexOf(biggestDay);
      console.log(dayOfWeekIndex);
    };
console.log(dayOfWeekIndex.text);
 // console.log(week[0]);
    
  }
  var mostActiveDay = week[(Math.max.apply(Math, days))]; 
  $("#activedays").append("The most common day I post pictures on is "+mostActiveDay);
};



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