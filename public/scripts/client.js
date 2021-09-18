/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

  // Function to take in html string from textarea and returns it escaped
  // Prevents malicious html from entering through user input
  const safeHTML = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // Function that takes in tweet data and returns a formatted article element with all tweet information inserted
  // Timeago used to display time since tweet
  const createTweetElement = (tweetData) => {
    const $tweet = $(
      `<article class="tweet">
        <header>
          <div class="poster-profile">
            <img src=${tweetData.user.avatars} alt="profile-pic">
            <p class="user-name">${tweetData.user.name}</p>
          </div>
          <p class="tweet-handle">${tweetData.user.handle}</p>
        </header>
        <p class="tweet-body">${safeHTML(tweetData.content.text)}</p>
        <footer>
          <span>${timeago.format(new Date())}</span> 
          <div class="footer-icons">
            <i class="fas fa-flag"></i>
            <i class="fas fa-retweet"></i>
            <i class="fas fa-heart"></i>
          </div>
        </footer>
      </article>`);

    return $tweet;

  };

  // Takes in the tweet information and for each adds it to the tweet container after using creatTweetElement function
  // Empties container each time it is called to not render duplicate tweets on the page
  const renderTweets = (tweets) => {
    $('#tweets-container').empty();
    tweets.forEach(tweet => {
      $('#tweets-container').prepend(createTweetElement(tweet));
    });

    return;
  };

  // To retrieve the char limit from the html
  const charLimit = $('.counter')[0]["innerHTML"];

  $("form").on('submit', function(event) {
    event.preventDefault();
    //Retrieve user input from text-area for validation
    const tweetText = $(this).children('#tweet-text').val();

    // Slides up alert if it is down when user resubmits tweet after error
    $('.alert').slideUp("slow");

    // Validations
    if (tweetText === "") {
      // The slide down and adding text wrapped in slideUp function to prevent message from changing before the alert is completely slid up
      $('.alert').slideUp("slow", function() {
        $('.alert').slideDown("slow");
        $('.alert span').text("You cannot have an empty tweet.");
      });
      
      return;
    }

    if (tweetText.length > charLimit) {
      $('.alert').slideUp("slow", function() {
        $('.alert').slideDown("slow");
        $('.alert span').text("Your tweet has exceeded the maximum characters allowed.");
      });

      return;
    }

    const serializeData = $(this).serialize();
    console.log(serializeData);

    // Post request to show all the tweets on the page
    $.post("/tweets", serializeData)
      .then(function() {
        loadTweets();

      })
      .catch((error) => {
        console.log(error);
      });

    $(this)[0].reset(); // To reset text-area when tweet submitted

  });

  // Function to get tweets from the server and render them
  const loadTweets = () => {
    $.get('/tweets')
      .then(function(tweets) {
        renderTweets(tweets);

      }).catch((error) => {
        return error;
      });

  };

  loadTweets();

});