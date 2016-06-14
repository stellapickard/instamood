function analyzeSentiments(data) {
 $.each(data, function(index, value) {
   var phrase = value.caption.text;
   var SENTIMENT_API_BASE_URL =
   "https://twinword-sentiment-analysis.p.mashape.com/analyze/";
   $.ajax({
     method: "POST",
     url: SENTIMENT_API_BASE_URL,
     headers: {
       "X-Mashape-Key": "PZhVoSU58ZmshQLuImiWrQy04U3Rp1DYjXDjsnkodgl0Yg6Pwp"
     },
     data: {text: phrase},
     success: function(response) {
      console.log(response);
      addSentiment(response.type, response.score, index);
    }
  });
 });
}


function addSentiment(type, score, picNum) {
//   Find the post the corresponds to this sentiment
var picDiv = $("#images" + picNum);
// Create a sentiment div
var sentimentDiv = $("<div></div>");
var sentimentI = $("<i></i>");
  sentimentI.addClass("fa");
//   // Add the appropriate smiley using FontAwesome
//   var faClass = "fa-meh-o";
//   if (type === "positive") {
//     sentimentDiv.addClass("positive");
//     faClass = "fa-smile-o";
//   } else if (type === "negative") {
//     sentimentDiv.addClass("negative");
//     faClass = "fa-frown-o";
//   }
//   sentimentI.addClass(faClass);

//   sentimentDiv.append("Sentiment: ").append(sentimentI)
//   .append(" (score: " + score.toFixed(2) + ")");
//   picDiv.append(sentimentDiv);
 
//   updateTotalSentiment(score);
// }

// var allSentimentScores = []; // Aggregator for all sentiments so far.
// function updateTotalSentiment(score) {
//   allSentimentScores.push(score);
//   console.log(allSentimentScores, score);
//   // Calculate the average sentiment.
//   var sum = 0;
//   for (var i=0; i<allSentimentScores.length; i++) {
//     sum += allSentimentScores[i];
//   }
//   var avg = sum / allSentimentScores.length;

//   // Add nice text and colors.
//   var text = "Neutral"
//   var textClass = "";
//   if (avg > 0) {
//     text = "Positive!";
//     textClass = "positive";
//   } else if (avg < 0) {
//     text = "Negative :(";
//     textClass = "negative";
//   }

//   $("#mood").html(text + " (score: " + avg + ")");
//   $("#mood").addClass(textClass);
// }
var mode = function mode(arr) {
var numMapping = {};
var greatestFreq = 0;
var mode;
arr.forEach(function findMode(number) {
  numMapping[number] = (numMapping[number] || 0) + 1;

  if (greatestFreq < numMapping[number]) {
    greatestFreq = numMapping[number];
    mode = number;
  }
});
return +mode;
}