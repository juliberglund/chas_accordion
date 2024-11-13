// Function to handle toggling the 'active' class and loading content
function toggle(e) {
  const titleElement = e.target; // Get the clicked title element
  const descriptionElement = titleElement.nextElementSibling; // Get the corresponding description

  // Toggle the 'active' class on the clicked title
  titleElement.classList.toggle("active");

  //  toggle the visibility of the descriptionElement based on whether the titleElement has the "active" class
  descriptionElement.style.display = titleElement.classList.contains("active")
    ? "block"
    : "none";
}

// Fetch the data and dynamically create FAQ sections
fetch("https://jsonplaceholder.typicode.com/posts")
  .then((response) => response.json()) // Parse the JSON data
  .then((data) => {
    const accordion = document.querySelector(".accordion"); // Get the accordion container

    // Iterate through the data and create sections dynamically
    data.forEach((post) => {
      // Create a new title div for each post
      const titleDiv = document.createElement("div");
      titleDiv.classList.add("title");
      titleDiv.innerHTML = `<h4>${post.title}</h4>`; // Set the title text

      // Create a new description div for each post
      const descriptionDiv = document.createElement("div");
      descriptionDiv.classList.add("description");
      descriptionDiv.innerHTML = `<p>${post.body}</p>`;

      // Append the title and description to the accordion container
      accordion.appendChild(titleDiv);
      accordion.appendChild(descriptionDiv);

      // Add a click event listener to each title
      titleDiv.addEventListener("click", toggle);
    });
  })
  .catch((error) => {
    console.error("Error fetching data:", error); // Handle any errors from the fetch request
  });
