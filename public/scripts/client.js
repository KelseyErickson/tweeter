/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {

  const safeHTML = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

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
          <span>10 days ago</span>
          <div class="footer-icons">
            <i class="fas fa-flag"></i>
            <i class="fas fa-retweet"></i>
            <i class="fas fa-heart"></i>
          </div>
        </footer>
      </article>`);

    return $tweet;

  };

  const renderTweets = (tweets) => {
    $('#tweets-container').empty();
    tweets.forEach(tweet => {
      $('#tweets-container').prepend(createTweetElement(tweet));
    });

  };

  const charLimit = $('.counter')[0]["innerHTML"];

  $("form").on('submit', function(event) {
    event.preventDefault();
    const tweetText = $(this).children('#tweet-text').val();

    $('.alert').slideUp("slow")

    if (tweetText === "") {
      $('.alert').slideUp("slow", function() {
        $('.alert').slideDown("slow")
        $('.alert span').text("You cannot have an empty tweet.")
      });
      
      return;
    }

    if (tweetText.length > charLimit) {
      $('.alert').slideUp("slow", function() {
        $('.alert').slideDown("slow")
        $('.alert span').text("Your tweet has exceeded the maximum characters allowed.")
      });

      return;
    }

    const serializeData = $(this).serialize();
    console.log(serializeData)

    $.post("/tweets", serializeData)
      .then(function () {
        loadTweets();

      })
      .catch((error) => {
        console.log(error);
      });

    $(this)[0].reset();

  });

  const loadTweets = () => {

    $.get('/tweets')
      .then(function (tweets) {
        renderTweets(tweets);

      }).catch((error) => {
        return error;
      });

  };

  loadTweets();



});