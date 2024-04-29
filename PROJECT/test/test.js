
function exportReviewData(username, reviewText, starRating) {
  // Get the referring HTML file
  const referrer = document.referrer;

  // Determine the user name based on the referring HTML file
  let userNameToExport;
  if (referrer.includes('main.html')) {
    userNameToExport = `Guest-${Math.floor(Math.random() * 1000000).toString().slice(-6)}`;
  } else if (referrer.includes('main2.html')) {
    const userData = JSON.parse(localStorage.getItem('userData'));
    userNameToExport = username.userData;
  } else {
    console.error('Unknown referring HTML file:', referrer);
    return;
  }

  // Create an object with the review data
  const reviewData = {
    userName: userNameToExport,
    reviewText: reviewText,
    starRating: starRating
  };

  // Convert the review data object to a string
  const reviewDataString = `module.exports = ${JSON.stringify(reviewData)};`;

  // Write the review data string to the rating.js file
  fs.writeFile('rating.js', reviewDataString, (err) => {
    if (err) {
      console.error('Error writing review data to file:', err);
      return;
    }

    console.log('Review data successfully exported to rating.js');
  });
}
// Get the submit button element
const submitReview = document.getElementById('submitReview');

let submitClicked = false;
// Add a submit listener to the form
submitReview.addEventListener('click', (event) => {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Check if the submit button has been clicked before
  if (submitClicked) {
    return; // do nothing if the button has been clicked before
  }

  submitClicked = true; // set the flag to true

  // Get the review data from the form field
  const reviewText = document.getElementById('reviewText').value;
  const starRating = document.getElementById('starRating').value;

  // Call the exportReviewData function
  exportReviewData(null, reviewText, starRating);

  // Display a message indicating that the review has been posted
  const message = document.createElement('p');
  message.textContent = 'Your review has been posted.';
  message.style.color = 'green';
  submitReview.parentNode.insertBefore(message, submitReview.nextSibling);
});