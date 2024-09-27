let isDetails = false

const itemContent = (fundraiser) => `
    <div class="item">
        <h3>${fundraiser.CAPTION}</h3>
        <p>Organizer: ${fundraiser.ORGANIZER}</p>
        <p>Category: ${fundraiser.CATEGORY_NAME}</p>
        <p>Target Funding: $${fundraiser.TARGET_FUNDING}</p>
        <p>Current Funding: $${fundraiser.CURRENT_FUNDING}</p>
        <p>City: ${fundraiser.CITY}</p>
        ${fundraiser.FUNDRAISER_ID % 2 == 0 ? `<img src="./logo.jpg" alt="">` : `<img src="./banner.jpg" alt="">`}
        ${isDetails ? `<button class='donate'>donate</button>` : `<a href="/fundraiser.html?id=${fundraiser.FUNDRAISER_ID}">Go to Details</a>`}
    </div>
`;
const renderFundraisers = (data) => {
    const list = document.querySelector(".list");
    list.innerHTML = ""; // 清空已有内容

    if (data.length === 0) {
        list.innerHTML = "<span class='error'>Content is empty</span>";
        return;
    }
    for (const item of data) {
        list.innerHTML += itemContent(item);
    }
};
function getFundraisers() {
    fetch("/fundraisers")
        .then((response) => response.json())
        .then((data) => {
            renderFundraisers(data);
        });
}
// search.js
function searchFundraisers() {
    const organizer = document.getElementById("organizer").value;
    const city = document.getElementById("city").value;
    const category = document.getElementById("category").value;
    if (!organizer && !city && !category) {
        alert("Search content is empty");
        return;
    }
    fetch(
        `http://localhost:3000/search?organizer=${organizer}&city=${city}&category=${category}`
    )
        .then((response) => response.json())
        .then((data) => {
            renderFundraisers(data);
        });
}
function renderCategories(data) {
    const category = document.getElementById("category");
    for (const item of data) {
        const option = document.createElement("option");
        option.value = item.CATEGORY_ID;
        option.textContent = item.NAME;
        category.appendChild(option);
    }
}
function getCategories() {
    fetch(`/categories`)
        .then((response) => response.json())
        .then((data) => {
            renderCategories(data);
        });
}
function details() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    document.querySelector(".title").innerHTML = `Fundraiser Details  ${id}`;
    isDetails = true
    fetch(`/fundraiser/${id}`)
        .then((response) => response.json())
        .then((data) => {
            renderFundraisers(data);
            document.querySelector(".donate").addEventListener("click", function () {
                window.confirm("This feature is under contruction!");
            });
        });
}
