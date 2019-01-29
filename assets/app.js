// api Key VFw1T2oLjjK9zYZYbU9BM10HO1g1xqWE
//todo make sure that when you are loading a seach term you change the space to %20
// https://api.giphy.com/v1/gifs/search?key=VFw1T2oLjjK9zYZYbU9BM10HO1g1xqWE&q=ryan%20gosling&limit=10&lan=en
var url = "https://api.giphy.com/v1/gifs/search";
var apiKey = "VFw1T2oLjjK9zYZYbU9BM10HO1g1xqWE";

var searchTerms = ['cow', 'cat', 'dog','chicken','sheep', 'turkey','duck','horse','pig', 'donkey','rabbit'];

// first thing buttons are populated from pre defined array of search terms
function init() {
    renderButtons(searchTerms);
    // localStorage.setItem('searchTerms', searchTerms );

}

function getGifs(searchTerm) {
    console.log('Getting gifs for search term ' + searchTerm);

    $.ajax(url, {
        data: {
            'apiKey': apiKey,
            'q': searchTerm,
            'limit': 10,
            'lan': 'en',
        }
    }).then(function (response) {
        $('#gifs').empty();

        // response.data
        response.data.forEach(function (gif) {
            var animatedUrl = gif.images.fixed_width.url;
            var staticUrl = gif.images.fixed_width_still.url;
            var rating = gif.rating;
            renderGif(staticUrl, animatedUrl, rating);
        });
    }).catch(function () {

    });
}

function renderGif(staticUrl, animatedUrl, rating) {
    var image = $('<img>');
    image.attr('src', staticUrl);
    image.data('static', staticUrl);
    image.data('animated', animatedUrl);
    image.data('is-static', 'true');
    var container = $('<div>');
    container.append(rating);
    container.append(image);
    $('#gifs').append(container);
    image.click(function () {
        var isStatic = $(this).data('is-static') === 'true';

        if (isStatic) {
            var animatedUrl = $(this).data('animated');
            $(this).attr('src', animatedUrl);
            $(this).data('is-static', 'false');
        }else {
            var staticUrl = $(this).data('static');
            $(this).data('static');
            $(this).attr('src', staticUrl);
            $(this).data('is-static', 'true');
        }
    })

}

function renderButtons(searchTerms) {
    // $('#buttons').empty();
    // searchTerms = localStorage.getItem("searchTerms");
    searchTerms.forEach(function (searchTerm) {
        var button = $('<button>');
        button.html(searchTerm);

        button.click(function (event) {
            getGifs(event.target.innerHTML);
        });

        $('#buttons').append(button);
    });
}
// add a submit listner that posts search input into array to make button.
$("#submit-button").on("click", function(event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var newGif = $("#input").val().trim();
console.log(newGif);
    // Adding search term from the textbox to searchTerm array
    searchTerms.push(newGif);
console.log(searchTerms);
    $('#buttons').empty();
    $('#input').val('');
    // Calling renderButtons which handles the processing of gif searchTerms array
    localStorage.setItem('searchTerms', searchTerms );
    renderButtons(searchTerms);
});

$(document).ready(function () {
    init();
});