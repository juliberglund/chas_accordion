// Function to handle toggling the 'active' class and loading content
function toggle(e) {
  const titleElement = e.target; // Get the clicked title element
  const descriptionElement = titleElement.nextElementSibling; // Get the corresponding description

  // Toggle the 'active' class on the clicked title
  titleElement.classList.toggle("active");

  // If the description isn't loaded yet, fetch the data and add it
  if (!descriptionElement.hasAttribute("data-loaded")) {
    // Load data from JSON API
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json()) // Parse the JSON data from the response
      .then((data) => {
        // Here we assume we're using the section's title or index to get specific data
        // For simplicity, we'll grab the post with index corresponding to the section clicked
        const sectionIndex = Array.from(
          document.querySelectorAll(".title")
        ).indexOf(titleElement);

        // Assuming the section corresponds to the same index as the post
        const post = data[sectionIndex]; // Get the post based on the clicked section index
        descriptionElement.textContent = post.body; // Set the body text as description content

        // Mark this section as 'loaded' to prevent re-fetching
        descriptionElement.setAttribute("data-loaded", "true");
      })
      .catch((error) => {
        descriptionElement.textContent = "Error loading content."; // Show error message in case of failure
        console.error("Error fetching data:", error); // Log the error
      });
  }

  // Toggle the visibility of the corresponding description
  descriptionElement.style.display = titleElement.classList.contains("active")
    ? "block"
    : "none";
}

// Select all elements with the 'title' class and attach the click event listener
const titles = document.querySelectorAll(".title");
titles.forEach((title) => {
  title.addEventListener("click", toggle);
});
