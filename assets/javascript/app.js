//API key = W0NHYrDzcv0pFJplSchuDzX9s4R4tnG5

//url = https://api.giphy.com/v1/gifs/search?api_key=W0NHYrDzcv0pFJplSchuDzX9s4R4tnG5&q=the office&limit=25&offset=0&rating=Y&lang=en

//this url uses "search" endpoint on giphy api (search?)
//search criteria include q (search terms), limit (number of gifs shown, should be 10 for this assignment?), rating (leave this out ideally, display this under gif though?), lang (prob just set to english, or leave out, idk)

//set up app as object

var gifSearch = {

    //api key property

    //url property

    //TV show array property

    apikey: "W0NHYrDzcv0pFJplSchuDzX9s4R4tnG5",

    url: "https://api.giphy.com/v1/gifs/random?",

    initArr: ["Louis C.K.", "The Office", "Arrested Development", "It's Always Sunny In Philadelphia"],

    //-------------function 1------------------
    //for loop to add array elements to screen (for each element in array, append new button with array text to div)

    buttonCreate: function(initArr) {
        $("#initButtons").empty();
        initArr.forEach(function(item) {
            var buttons = $("<button>").attr({"id": item, "class": "gifButton btn btn-primary"}).text(item);
            $("#initButtons").append(buttons);
        })
    },

    //----------function 2---------------------
    //create url based on search criteria
    //call function 3

    createURL: function(apikey, url, buttonID) {
        url += $.param({"api_key": apikey, "tag": buttonID})
        this.ajaxCall(url);
    },

    //------------function 3-------------------
    //run ajax call with apikey property and newly edited url
    //display gif
    //call function 5

    ajaxCall: function(url) {
        for (var i = 1; i <= 10; i++) {
            $.ajax(url, "Random").then(function(response) {
                console.log(response);
                var gifImg = $("<img>").attr({"class": "gifImg", "data-state": "still", "src": response.data.images.fixed_height_still.url, "data-still": response.data.images.fixed_height_still.url, "data-animate": response.data.images.fixed_height.url});
                $("#gifDiv").prepend(gifImg);
            })
        }
    },

    //-------------function 4---------------------
    //animate or de-animate gifs based on their current data-state attribute (initially set to still)

    animate: function(state, specImg) {
        if (state === "still") {
            $(specImg).attr({"data-state": "animate", "src": $(specImg).attr("data-animate")});
        }

        else if (state === "animate") {
            $(specImg).attr({"data-state": "still", "src": $(specImg).attr("data-still")});
        }
    },

    //----------function 5--------------------
    //push users input from text box to tv show array
    //prevent user from entering blanks
    //call function 1

    newButton: function(inputText, initArr, event) {
        event.preventDefault();
        if (inputText) {
            initArr.push(inputText);
            gifSearch.buttonCreate(initArr);
        }
    },

    collapse: function(event) {
        event.preventDefault();
    },

}

//----------------on startup----------------------

//run function 1

gifSearch.buttonCreate(gifSearch.initArr);

//----------------Click events (defined outside of functions)--------------------

//on SEARCH button click, function 4

$("#submit").on("click", function(e) {gifSearch.newButton($("#gfs").val(), gifSearch.initArr, e)})

//on GIF TOPIC button click, function 2

$(document).on("click", ".gifButton", function() {gifSearch.createURL(gifSearch.apikey, gifSearch.url, $(this).attr("id"))});

//on gif click, animate/staticate(?) gifs (essentially change state from active to inactive or inactive to active)

$(document).on("click", ".gifImg", function() {gifSearch.animate($(this).attr("data-state"), $(this))});

//on collapse button click, stop page from refreshing

$(document).on("click", ".colbtn", function(e) {gifSearch.collapse(e)})
