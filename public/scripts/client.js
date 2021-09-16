/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

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
        <p class="tweet-body">${tweetData.content.text}</p>
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

    tweets.forEach(tweet => {
      $('#tweets-container').append(createTweetElement(tweet));
    });

  };

  const charLimit = $('.counter')[0]["innerHTML"]

  $("form").on('submit', function(event) {
    event.preventDefault();
    const tweetText= $(this).children('#tweet-text').val();
    
  
    if (tweetText === ""){
      return alert("Tweet cannot be empty");
    }

    if (tweetText.length > charLimit){
      console.log(tweetText.length)
     return alert("Tweet is too long");
    }


    const serializeData = $(this).serialize(); 
    $.post("/tweets", serializeData)
    .then(() => {
      console.log(serializeData);
    })
    .catch((error) => {
      console.log(error)
    });
    
  });

  const loadTweets = () => {

    $.get('/tweets')
    .then(function (tweets) {
      renderTweets(tweets);
      
    }).catch((error) => {
      return error;
    });

  }

  loadTweets();
});