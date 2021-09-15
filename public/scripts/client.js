/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

   // Fake data taken from initial-tweets.json
   const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    },

    {
      "user": {
        "name": "Kelsey",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@WHAT"
      },
      "content": {
        "text": "I do not speak French"
      },
      "created_at": 1461113959088
    }
  ]

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

  renderTweets(data)

  $("form").on('submit', function(event) {
    event.preventDefault();
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

    $.ajax('/tweets', { method: 'GET' })
    .then(function (tweets) {
      console.log('Success: ', tweets);
      
    }).catch((error) => {
      console.log(error)
    });

  }

  loadTweets();
});