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

    // url: "https://api.giphy.com/v1/gifs/random?",

    url: "https://api.giphy.com/v1/gifs/search?",

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

    // createURL: function(apikey, url, buttonID) {
    //     url += $.param({"api_key": apikey, "tag": buttonID})
    //     this.ajaxCall(url);
    // },

    createURL: function(apikey, url, buttonID) {
        url += $.param({"api_key": apikey, "q": buttonID, "limit": "10"})
        this.ajaxCall(url);
    },

    //------------function 3-------------------
    //run ajax call with apikey property and newly edited url
    //display gif
    //call function 5

    // ajaxCall: function(url) {
    //     for (var i = 1; i <= 10; i++) {
    //         $.ajax(url, "Random").then(function(response) {
    //             console.log(response);
    //             var gifImgCont = $("<div>").attr({"class": "gifImgCont"});
    //             var gifImg = $("<img>").attr({"class": "gifImg", "data-state": "still", "src": response.data.images.fixed_height_still.url, "data-still": response.data.images.fixed_height_still.url, "data-animate": response.data.images.fixed_height.url});
    //             var dbtn = $("<button>Download</button>").attr({"class": "dnld"});
    //             // var dl = $("<a>").attr({"href": response.data.url, "download": "image.gif"}); //download attribute not working, also not sure what link to use
    //             // $(dl).click();
    //             // $(dl).append(dbtn);
    //             var fbtn = $("<button>Favorite</button>").attr({"class": "fvrt"})
    //             $(gifImgCont).append(gifImg, dbtn, fbtn);
    //             $("#gifDiv").prepend(gifImgCont);
    //             // $("#gifDiv").prepend(gifImg);
    //         })
    //     }
    // },

    ajaxCall: function(url) {
            $.ajax(url, "Search").then(function(response) {
                console.log(response);
                for (var i = 0; i <= 9; i++) {
                    var gifImgCont = $("<div>").attr({"class": "gifImgCont"});
                    var gifRating = $("<p>").attr("id", "rating").text(response.data[i].rating.toUpperCase())
                    var gifImg = $("<img>").attr({"class": "gifImg", "data-state": "still", "src": response.data[i].images.fixed_height_still.url, "data-still": response.data[i].images.fixed_height_still.url, "data-animate": response.data[i].images.fixed_height.url});
                    var dbtn = $("<button>Download</button>").attr({"class": "dnld"});
                    // var dl = $("<a>").attr({"href": response.data.url, "download": "image.gif"}); //download attribute not working, also not sure what link to use
                    // $(dl).click();
                    // $(dl).append(dbtn);
                    var fbtn = $("<button>Favorite</button>").attr({"class": "fvrt"})
                    $(gifImgCont).append(gifImg, gifRating, dbtn, fbtn);
                    $("#gifDiv").prepend(gifImgCont);
                    // $("#gifDiv").prepend(gifImg);
            }
        })
    },

    //-------------function 4---------------------
    //animate or de-animate gifs based on their current data-state attribute (initially set to still)

    animate: function(state, specImg) {
        if (state === "still") {
            $(specImg).attr({"data-state": "animate", "src": $(specImg).attr("data-animate")})
            $(specImg).parent().children("#rating").css("visibility", "hidden");
        }

        else if (state === "animate") {
            $(specImg).attr({"data-state": "still", "src": $(specImg).attr("data-still")})
            $(specImg).parent().children("#rating").css("visibility", "visible");
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

    //function that toggles hidden divs when other hidden div is open
    collapse: function(whichbtn, event) {
        event.preventDefault();

        if ($(whichbtn).attr("id") === "vg") {
            if ($("#vf").attr("aria-expanded") && $("#vg").attr("aria-expanded")) {
                $("#favDiv").collapse("hide");
            }
        }

        else if ($(whichbtn).attr("id") === "vf") {
            if ($("#vg").attr("aria-expanded") && $("#vg").attr("aria-expanded")) {
                $("#gifDiv").collapse("hide");
            }
        }
    },

    //function that adds gif to hidden favorites section on button click, should store favorites to session or local storage
    favoriteGif: function(fvrtGifbtn, event) {
        event.preventDefault();
        var toClone = $(fvrtGifbtn).parent();
        // var imgCanvas = document.createElement("canvas");
        // var imgContext = imgCanvas.getContext("2d");
        // imgCanvas.width = toClone.width;
        // imgCanvas.height = toClone.height;
        // imgContext.drawImage(toClone, 0, 0, toClone.width, toClone.height);
        // var imgAsDataURL = imgCanvas.toDataURL("image/png");
        // localStorage.setItem("image", imgAsDataURL);
        var clone = $(toClone).clone();
        $(clone).find(".dnld").remove();
        $(clone).find(".fvrt").remove();
        // localStorage.setItem("image", clone); //right here
        $("#favDiv").append(clone);
        $(fvrtGifbtn).remove();
    },

    //function that downloads gif on button click
    downloadGif: function(dnldGifbtn, event) {
        event.preventDefault();
        var todnld = $(dnldGifbtn).parent().children(".gifImg");
        var dlLink = $("<a>");
        $(dlLink).attr({"download": $(todnld).attr("data-animate"), "href": $(todnld).attr("data-animate"), "target": "_blank"});
        $(dlLink).append("body");
        $(dlLink)[0].click(); //https://stackoverflow.com/questions/17311645/download-image-with-javascript
    }
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
$(document).on("click", ".colbtn", function(e) {gifSearch.collapse($(this),e)});

//on favorite button click, run favorite gif function
$(document).on("click", ".fvrt", function(e) {gifSearch.favoriteGif($(this), e)});

//on download button click, run download gif function
$(document).on("click", ".dnld", function(e) {gifSearch.downloadGif($(this), e)})