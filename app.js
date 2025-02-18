
let blogContainer = document.getElementById("blog-container");
let searchField = document.getElementById("search-input");
let searchButton = document.getElementById("search-button");


function displayBlog(articles) {

    blogContainer.innerHTML = "";

    articles.forEach((article) => {

        let blogCard = document.createElement("div");
        blogCard.classList.add("blog-card");

        const img = document.createElement("img");
        img.src = article.urlToImage;
        img.alt = article.title;

        const title = document.createElement("h2");
        const truncatedArticle = article.title?.length > 30 ? article.title.slice(0, 30) + "....." : article.title;
        title.textContent = truncatedArticle;

        const description = document.createElement("p");
        const truncatedDescription = article.description?.length > 100 ? article.description.slice(0, 100) + "....." : article.description || "No Description Available";
        description.textContent = truncatedDescription;

        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);

        blogCard.addEventListener("click", function () {
            window.open(article.url, "_blank");
        });

        blogContainer.appendChild(blogCard);

    });

};

const API_KEY = window.config.API_KEY;

async function fetchRandomNews() {

    try {
        const apiUrl = `https://newsapi.org/v2/top-headlines?sources=bbc-news&pagesize=10&apikey=${API_KEY}`;
        let response = await fetch(apiUrl);
        let data = await response.json();
        return data.articles;

    } catch (error) {
        console.log(error);
        return [];

    };

};

async function fetchQuery(query) {

    try {
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pagesize=10&apikey=${API_KEY}`;

        let response = await fetch(apiUrl);
        let data = await response.json();
        return data.articles;

    } catch (error) {
        console.log(error);
        return [];

    };

}

searchButton.addEventListener("click", async function () {

    const query = searchField.value.trim();

    if (query !== "") {

        try {
            const articles = await fetchQuery(query);
            displayBlog(articles);
        } catch (error) {
            console.log("Error fetching by query", error);
        };

    };

});


(async function () {

    try {
        let articles = await fetchRandomNews();
        displayBlog(articles);

    } catch (error) {
        console.log(error);
    };

})();