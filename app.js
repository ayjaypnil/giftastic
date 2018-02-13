// Before you can make any part of our site work, you need to create an array of strings, each one related to a topic that interests you.Save it to a variable called topics.
var topics = ["cat", "dog", "monkey", "elephant", "giraffe", "gorilla", "lion"];

// Add a form to your page takes the value from a user input box and adds it into your topics array.Then make a function call that takes each topic in the array remakes the buttons on the page.

all();

$("#addBtn").on("click", function (event) {

    event.preventDefault();
    var addTerm = $("#addAnimal").val().trim();
    topics.push(addTerm);
    $("#buttonSpace").empty();

    all();
})



// Your app should take the topics in this array and create buttons in your HTML.
// Try using a loop that appends a button for each string in the array.
function all() {
    for (i = 0; i < topics.length; i++) {
        var gifBtn = $("<button>");
        gifBtn.addClass("btn btn-default");
        gifBtn.text(topics[i]);

        $("#buttonSpace").append(gifBtn);
        // When the user clicks on a button, the page should grab 10 static, non - animated gif images from the GIPHY API and place them on the page.


        $(gifBtn).on("click", function () {

            var topic = $(this).text();
            // console.log(topic);

            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=jsLZ9GKKuOv4BnHetdjztg2AyhnErSeg&limit=10";

            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {
                var results = response.data;
                for (i = 0; i < results.length; i++) {
                    var gifDiv = $("<div>");
                    var gifLink = results[i].images.fixed_height_still.url;
                    var topicImage = $("<img>");
                    topicImage.attr("src", gifLink);
                    topicImage.attr("data-still", results[i].images.fixed_height_still.url);
                    topicImage.attr("alt", " image");
                    topicImage.attr("data-state", "still");
                    topicImage.attr("data-animate", results[i].images.downsized.url);

                    // Under every gif, display its rating(PG, G, so on).
                    // This data is provided by the GIPHY API.
                    var rating = results[i].rating;
                    var p = $("<p>").text("Rating: " + rating);

                    $(gifDiv).prepend(p);
                    $(gifDiv).prepend(topicImage);

                    $(".gifSpace").append(gifDiv);

                    // When the user clicks one of the still GIPHY images, the gif should animate.If the user clicks the gif again, it should stop playing.
                    $(topicImage).on("click", function () {
                        var state = $(this).attr("data-state");

                        if (state === "still") {
                            // $(this).attr("src", results[i].url);
                            // $(this).attr("data-state", "animate");
                            $(this).attr("src", $(this).attr("data-animate"));
                            $(this).attr("data-state", "animate");
                        } else {
                            // $(this).attr("src", results[i].images.fixed_height_still.url);
                            $(this).attr("src", $(this).attr("data-still"));
                            $(this).attr("data-state", "still");
                        }
                    })
                }
            })
        })
    }
};


