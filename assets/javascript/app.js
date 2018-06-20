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

    //maybe try with random instead of search, only use "tag" search criteria, have to parse response for first ten
    url: "https://api.giphy.com/v1/gifs/random?",

    initArr: ["Louis C.K.", "The Office", "Arrested Development", "It's Always Sunny In Philadelphia"],

    //-------------function 1------------------
    //for loop to add array elements to screen (for each element in array, append new button with array text to div)

    buttonCreate: function(initArr) {
        initArr.forEach(function(item) {
            var buttons = $("<button>").attr({"id": item, "class": "gifButton"}).text(item);
            $("#initButtons").append(buttons);
        })
    },

    //----------function 2---------------------
    //create url based on search criteria
    //call function 3

    createURL: function(apikey, url, buttonID) {
        url += $.param({"api_key": apikey, "tag": buttonID})
        console.log(url);
        this.ajaxCall(url);
    },

    //------------function 3-------------------
    //run ajax call with apikey property and newly edited url
    //call function 5

    ajaxCall: function(url) {
        for (var i = 1; i <= 10; i++) {
            console.log(i);
            $.ajax(url, "Random").then(function(response) {
                console.log(response);
                var gifImg = $("<img>").attr({"src": response.data.images.fixed_height.url});
                $("#gifDiv").prepend(gifImg);
            })
        }
    },

    //----------function 4--------------------
    //push users input from text box to tv show array
    //prevent user from entering blanks
    //call function 1

}

//=---------function 4--------------------

//push users input from text box to tv show array
//prevent user from entering blanks
//call function 1

//---------function 5----------------------

//display gifs on screen
//gifs should be displayed static until click (click event below)
//make sure to prepend as gifs should not be replaced?
//also display ratings under each gif

//----------------Click events (defined outside of functions)--------------------

//on GIF TOPIC button click, function 2

//on SEARCH button click, function 4

//on gif click, animate/staticate(?) gifs (essentially change state from active to inactive or inactive to active)

//----------------on startup----------------------

//run function 1

gifSearch.buttonCreate(gifSearch.initArr);

$(".gifButton").on("click", function() {gifSearch.createURL(gifSearch.apikey, gifSearch.url, $(this).attr("id"))});
