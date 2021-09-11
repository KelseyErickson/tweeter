$(document).ready(function () {

  const charLimit = $('.counter')[0]["innerHTML"]

  $('#tweet-text').on("input", function () {

    const $counter = $(this).siblings("div").children(".counter");
    const $textInput = $($(this)).val().length;
    const totalChars = charLimit - $textInput;

    $($counter).text(totalChars);

    totalChars < 0 ? $counter.addClass("redText") : $counter.removeClass("redText");

  });

});








