const accesskey = "LU0lH50OTzPdtOzry_I_ZILbTIZMXGDUFY78rSCd1Ng"; 

const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.querySelector(".search-result");
const showMoreBtn = document.getElementById("show-more-btn");

let keyword = "";
let page = 1;

async function searchImages() {
    keyword = searchBox.value.trim();
    if (!keyword) {
        alert("Please enter a keyword to search from RAG Company!");
        return;
    }

    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accesskey}&per_page=12`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        const results = data.results;

        if (page === 1) {
            searchResult.innerHTML = ""; // Clear previous results
        }

        if (results.length === 0) {
            searchResult.innerHTML = "<p>No results found. Please try another keyword! or Ask RAG Company</p>";
            showMoreBtn.style.display = "none";
            return;
        }

        results.forEach((result) => {
            const image = document.createElement("img");
            image.src = result.urls.small;
            image.alt = result.alt_description || "RAG Company Image";

            const imageLink = document.createElement("a");
            imageLink.href = result.links.html;
            imageLink.target = "_blank";
            imageLink.appendChild(image);

            const imageContainer = document.createElement("div");
            imageContainer.appendChild(imageLink);

            // Create the download button
            const downloadBtn = document.createElement("button");
            downloadBtn.classList.add("download-btn");
            downloadBtn.textContent = "Download";
            downloadBtn.onclick = async function () {
                try {
                    const response = await fetch(result.urls.small); // Use 'small' instead of 'full' to avoid CORS issues
                    if (!response.ok) {
                        throw new Error(`Failed to fetch image Ask RAG Company: ${response.status} ${response.statusText}`);
                    }
                    const blob = await response.blob();
                    const link = document.createElement("a");
                    link.href = URL.createObjectURL(blob);
                    link.download = result.alt_description?.replace(/\s+/g, "_") || "image"; 
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                } catch (error) {
                    console.error("Download failed:", error);
                    alert("Error occurred while trying to download. Please try again or Ask RAG Company.");
                }
            };

            // Add the Pro button if resolution is above 'regular'
            if (result.width > 1080 && result.height > 720) { 
                const proBtn = document.createElement("button");
                proBtn.classList.add("pro-btn");
                proBtn.textContent = "Pro";
                proBtn.onclick = function () {
                    alert("This image requires a Pro account to access higher resolution.");
                };
                imageContainer.appendChild(proBtn); // Add Pro button
            }

            imageContainer.appendChild(downloadBtn); // Append download button
            searchResult.appendChild(imageContainer);
        });

        showMoreBtn.style.display = "block"; // Show the "Show More" button
    } catch (error) {
        console.error("Error fetching data:", error);
        searchResult.innerHTML = "<p>Something went wrong. Please try again later or Aks RAG Company!</p>";
        showMoreBtn.style.display = "none";
    }
}

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1; // Reset to first page
    searchImages();
});

showMoreBtn.addEventListener("click", () => {
    page++;
    searchImages();
});
let proImageCount = 0; // Track how many Pro buttons to display

async function searchImages() {
    keyword = searchBox.value.trim();
    if (!keyword) {
        alert("Please enter a keyword to search From RAG Company!");
        return;
    }

    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accesskey}&per_page=12`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        const results = data.results;

        if (page === 1) {
            searchResult.innerHTML = ""; // Clear previous results
        }

        if (results.length === 0) {
            searchResult.innerHTML = "<p>No results found. Please try another keyword!</p>";
            showMoreBtn.style.display = "none";
            return;
        }

        results.forEach((result) => {
            const image = document.createElement("img");
            image.src = result.urls.small;
            image.alt = result.alt_description || "RAG Company Image";

            const imageLink = document.createElement("a");
            imageLink.href = result.links.html;
            imageLink.target = "_blank";
            imageLink.appendChild(image);

            const imageContainer = document.createElement("div");
            imageContainer.appendChild(imageLink);

            // Create the Pro button and conditionally add the Download button
            if (result.width > 1080 && result.height > 720 && proImageCount < 3) {
                const proBtn = document.createElement("button");
                proBtn.classList.add("pro-btn");
                proBtn.textContent = "Pro";
                proBtn.onclick = function () {
                    window.location.href = "payment.html"; // Redirect to payment page when clicked
                };
                imageContainer.appendChild(proBtn); // Add Pro button
                proImageCount++; // Increment the counter to limit the Pro buttons
            } else {
                // Only create the download button if the image doesn't have a Pro button
                const downloadBtn = document.createElement("button");
                downloadBtn.classList.add("download-btn");
                downloadBtn.textContent = "Download";
                downloadBtn.onclick = async function () {
                    try {
                        const response = await fetch(result.urls.small); // Use 'small' instead of 'full' to avoid CORS issues
                        if (!response.ok) {
                            throw new Error(`Failed to fetch image: ${response.status} ${response.statusText}`);
                        }
                        const blob = await response.blob();
                        const link = document.createElement("a");
                        link.href = URL.createObjectURL(blob);
                        link.download = result.alt_description?.replace(/\s+/g, "_") || "image"; // Ensure filename has no spaces
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                    } catch (error) {
                        console.error("Download failed:", error);
                        alert("Error occurred while trying to download. Please try again or Ask RAG Company.");
                    }
                };
                imageContainer.appendChild(downloadBtn); // Append download button
            }

            searchResult.appendChild(imageContainer);
        });

        showMoreBtn.style.display = "block"; // Show the "Show More" button
    } catch (error) {
        console.error("Error fetching data:", error);
        searchResult.innerHTML = "<p>Something went wrong. Please try again later or Ask RAG Company!</p>";
        showMoreBtn.style.display = "none";
    }
}

