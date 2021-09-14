/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

const tweetData = {
  "user": {
    "name": "Descartes",
    "avatars": "https://i.imgur.com/nlhLi3I.png",
    "handle": "@rd"
  },
  "content": {
    "text": "Je pense , donc je suis"
  },
  "created_at": 1631568495771
}



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

const $tweet = createTweetElement(tweetData);
$('#tweets-container').append($tweet); 
});
