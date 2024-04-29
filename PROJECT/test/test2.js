// Implement the logic for importing the review data from the main.js file here
// This could involve using the import statement, or some other method of inter-file communication

// Once the review data has been imported, create a new div element for each review and append it to the #reviews div
const reviewsDiv = document.getElementById('reviews');
const reviewData = JSON.parse(localStorage.getItem('reviewData'));// Implement this function to import the review data from the main.js file

reviewData.forEach(review => {
  const reviewDiv = document.createElement('div');
  reviewDiv.innerHTML = `
    <p><strong>${review.userName}:</strong> ${review.reviewText}</p>
    <p>Star Rating: ${review.starRating}</p>
  `;
  reviewsDiv.appendChild(reviewDiv);
});