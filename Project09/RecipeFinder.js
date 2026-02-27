// DOM Elements
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const mealsContainer = document.getElementById("meals");
const resultHeading = document.getElementById("result-heading");
const errorContainer = document.getElementById("error-container");
const mealDetails = document.getElementById("meal-details");
const mealDetailsContent = document.querySelector(".meal-details-content");
const backBtn = document.getElementById("back-btn");

const BASE_URL = "https://www.themealdb.com/api/json/v1/1/";
const SEARCH_URL = `${BASE_URL}search.php?s=`;
const LOOKUP_URL = `${BASE_URL}lookup.php?i=`;

// Event Listeners
searchBtn.addEventListener("click", searchMeals);
mealsContainer.addEventListener("click", handleMealClick);
backBtn.addEventListener("click", () => mealDetails.classList.add("d-none"));

searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") searchMeals();
});

// Search Meals Function
async function searchMeals() {
  const searchTerm = searchInput.value.trim();

  if (!searchTerm) {
    showError("Please enter a search term.");
    return;
  }

  try {
    resultHeading.textContent = `Searching for "${searchTerm}"...`;
    mealsContainer.innerHTML = "";
    hideError();

    const response = await fetch(`${SEARCH_URL}${searchTerm}`);
    const data = await response.json();

    if (!data.meals) {
      resultHeading.textContent = "";
      showError(`No recipes found for "${searchTerm}". Try another search term!`);
      return;
    }

    resultHeading.textContent = `Search results for "${searchTerm}":`;
    displayMeals(data.meals);
    searchInput.value = "";

  } catch (error) {
    showError("Something went wrong. Please try again later.");
  }
}

// Display Meals (Bootstrap Cards)
function displayMeals(meals) {
  mealsContainer.innerHTML = "";

  meals.forEach((meal) => {
    mealsContainer.innerHTML += `
      <div class="col-md-4">
        <div class="card meal shadow-sm h-100" data-meal-id="${meal.idMeal}">
          <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
          <div class="card-body">
            <h5 class="card-title">${meal.strMeal}</h5>
            ${
              meal.strCategory
                ? `<span class="badge bg-danger">${meal.strCategory}</span>`
                : ""
            }
          </div>
        </div>
      </div>
    `;
  });
}

// Handle Meal Click
async function handleMealClick(e) {
  const mealEl = e.target.closest(".meal");
  if (!mealEl) return;

  const mealId = mealEl.getAttribute("data-meal-id");

  try {
    const response = await fetch(`${LOOKUP_URL}${mealId}`);
    const data = await response.json();

    if (!data.meals || !data.meals[0]) return;

    const meal = data.meals[0];
    displayMealDetails(meal);

  } catch (error) {
    showError("Could not load recipe details. Please try again later.");
  }
}

// Display Meal Details
function displayMealDetails(meal) {
  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`] && meal[`strIngredient${i}`].trim() !== "") {
      ingredients.push(
        `<li><i class="fas fa-check-circle text-success me-2"></i> 
         ${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}
        </li>`
      );
    }
  }

  mealDetailsContent.innerHTML = `
    <div class="text-center">
      <img src="${meal.strMealThumb}" 
           class="img-fluid rounded mb-3 meal-details-img" 
           alt="${meal.strMeal}">
    </div>

    <h2 class="text-center text-danger mb-3">${meal.strMeal}</h2>

    <div class="text-center mb-3">
      <span class="badge bg-danger">${meal.strCategory || "Uncategorized"}</span>
    </div>

    <h4>Instructions</h4>
    <p class="text-muted">${meal.strInstructions}</p>

    <h4 class="mt-4">Ingredients</h4>
    <ul class="ingredients-list">
      ${ingredients.join("")}
    </ul>

    ${
      meal.strYoutube
        ? `
        <div class="text-center mt-4">
          <a href="${meal.strYoutube}" target="_blank" class="btn btn-danger">
            <i class="fab fa-youtube me-2"></i>Watch Video
          </a>
        </div>
      `
        : ""
    }
  `;

  mealDetails.classList.remove("d-none");
  mealDetails.scrollIntoView({ behavior: "smooth" });
}

// Error Handling
function showError(message) {
  errorContainer.textContent = message;
  errorContainer.classList.remove("d-none");
}

function hideError() {
  errorContainer.classList.add("d-none");
}