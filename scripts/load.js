"use strict";
$(document).ready(function(){

  $("#gitHubSearchForm").on("submit", function(){
    var useStars = $("#useStars").val();
    var langChoice = $("#langChoice").val();
    var searchPhrase = $("#searchPhrase").val();
    
    if (searchPhrase) {
      resultList.text("Performing search...");
      
      var gitSearch = "https://api.github.com/search/repositories?q=" + encodeURIComponent(searchPhrase);
      
      if (langChoice != "All") {
        gitSearch += "+language:" + encodeURIComponent(langChoice);
      }

      if (useStars) {
        gitSearch += "&sort=stars";
      }

      $.ajax({
        url : gitSearch,
        type: 'GET',
        success : handleData
      });

      function handleData(r) {
        displayResult(r.items);
      }
    }
		return false;
	});

	var resultList = $("#resultslist");
	var toggleButton = $("#toggleButton");
	toggleButton.on('click', function(){
	resultList.toggle(500);

	if (toggleButton.text() === 'Hide'){
		toggleButton.text('Show');
	} else {
		toggleButton.text('Hide');
	}
	});
	
	var items = $("header nav li");
	items.css("font-weight","bold");

	items.filter(":first").css("font-size","22px");

	function displayResult(result){
		resultList.empty();
		$.each(result, function(i, item){
  		var newResult = $("<div class='result'>" +
  		"<div class='title'>" + item.name + "</div>" +
  		"<div> Language:" + item.language + "</div>" +
  		"<div> Login:" + item.owner.login + "</div>" +
  		"<div> Forks:" + item.owner.forks + "</div>" +
  		"</div>");

  		// hover 2 functions 
  		newResult.hover(function(){
  			// make it darker
  			$(this).css("background-color","lightgray");
  		}, function(){
  			//reverse
  			$(this).css("background-color","transparent");
  		});
      resultList.append(newResult);
    });
  }

});