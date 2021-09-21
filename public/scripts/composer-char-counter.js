$(document).ready(function() {
  // To retrieve the character limit from html
  const $charLimit = $(".counter")[0]["innerHTML"];

  // On input this will take the character counter and subtract the characters being typed
  $("#tweet-text").on("input", function() {
    const $counter = $(this).siblings("div").children(".counter"); // Accessing the counter
    const $textInput = $(this).val().length; // Accessing the text input from the text-area
    const totalChars = $charLimit - $textInput;

    $($counter).text(totalChars);

    // To add class making text red if the counter is over the limit
    totalChars < 0 ? $counter.addClass("redText") : $counter.removeClass("redText")
  });
});