var animals = ["cow", "pigeon", "gopher", "kitten", "puppy", "blue footed booby"];

// Creates animal buttons when the page loads so the user has some choices to pick from.
createAnimalButtons();


// Function for new buttons
$('#addAnimal').on('click', function() {
    var newAnimal = $('#animalInput').val().trim();
    animals.push(newAnimal);
    $('#animalInput').val('');
    createAnimalButtons();

    return false;
});

// Click Event Function
$(document.body).on('click', '.button-list', function() {
    // Creates a variable and assigns the value to the name of the animal clicked/
    var animalClicked = $(this).data('animal');
    // Creates a variable to hold the query string for the Giphy API request and adds the aniamls name to the query string.
    var query = 'https://api.giphy.com/v1/gifs/search?q=' + animalClicked + '&limit=10&api_key=NgtHinej8QjLOFsEkpAN1Wfic86C8K4b';

    // Empties the animals element so new gifs are loaded in on each click of an animals button.
    $('#animals').empty();


    // Makes an AJAX request using the query string outlined above.
    $.ajax({
        url: query,
        method: 'GET'
            // Performs this anonymous function when the request is recieved back from the API.
    }).done(function(response) {
        // Creates a new variable and assigns its value to the responses JSON data object.
        var results = response.data;

        // Runs a for loop for the number of recieved results. 
        for (i = 0; i < results.length; i++) {
            // Creates a new variable and assigns a div with a class of col-sm-4 to it.
            var newGif = $('<div class="col-sm-4">');
            // Creates a new variable and assigns a rating from the response to it.
            var rating = results[i].rating.toUpperCase();
            // Creates a new variable and assigns a paragraph to it with the HTML of the gifs rating.
            var p = $('<p>').html('Rating: ' + rating);
            // Adds the text-center class to the p variable.
            p.addClass('text-center');
            // Creates a new variable and assigns a img.
            var img = $('<img>');

            // Adds a src to the img variable of the gifs still image.
            img.attr('src', results[i].images.fixed_height_small_still.url);
            // Adds a data attribute to the img variable of the gifs still image.
            img.attr('data-still', results[i].images.fixed_height_small_still.url);
            // Adds a data attribute to the img variable of the gif.
            img.attr('data-animate', results[i].images.fixed_height_small.url);
            // Adds a data attribute to the img variable of the gifs state.
            img.attr('data-clicked', 'still');
            // Adds a classes to the img variable.
            img.addClass('gif-margin gif center-block panel');

            // Appends the p and img variables to the newGif variable.
            newGif.append(p);
            newGif.append(img);
            // Appends the newGif variable to the element with the animals ID.
            $('#animals').append(newGif);
        }
    });
});

// Function to make gifs still 
$(document.body).on('click', '.gif', function() {
    var click = $(this).attr('data-clicked');

    if (click === 'still') {
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-clicked', 'animated');
    } else {
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-clicked', 'still');
    }
});


// This function creates buttons
function createAnimalButtons() {
    $('#animalButtons').empty();

    for (var i = 0; i < animals.length; i++) {
        var button = $('<button>').addClass('btn btn-primary button-list');
        button.attr('data-animal', animals[i]).html(animals[i]);
        $('#animalButtons').append(button);
    }
}