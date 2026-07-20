const recipesDiv = document.getElementById("recipes");
const categoriesDiv = document.getElementById("categories");
const searchTitle =
  document.getElementById("searchTitle");

const searchIngredient =
  document.getElementById("searchIngredient");

let allRecipes = [];
let activeCategory = "Všetko";

const sortButtons =
  document.querySelectorAll(".sort-buttons button");

let currentSort = "newest";

sortButtons.forEach(button => {
  button.addEventListener("click", () => {

    sortButtons.forEach(btn =>
      btn.classList.remove("active")
    );

    button.classList.add("active");

    currentSort = button.dataset.sort;

    renderRecipes();
  });
});

const params =
  new URLSearchParams(window.location.search);

const categoryFromUrl =
  params.get("category");

async function loadRecipes() {

  const files = await fetch("recipes/index.json")
    .then(r => r.json());

  const recipes = await Promise.all(

    files.map(file =>
      fetch(`recipes/${file}`)
        .then(r => r.json())
        .catch(err => {
          console.error(file, err);
          return null;
        })
    )

  );

  allRecipes = recipes.filter(Boolean);

if(categoryFromUrl){
  activeCategory = categoryFromUrl;
}
  
  createCategories();
  renderRecipes();
}

function createCategories() {

  const categories = new Set();

  allRecipes.forEach(recipe => {

    if(recipe.collections){

      recipe.collections.forEach(cat => {
        categories.add(cat);
      });

    }

  });

  categoriesDiv.innerHTML = "";

  const allBtn = document.createElement("button");
  allBtn.textContent = "Všetko";
  allBtn.onclick = () => {

  activeCategory = "Všetko";

  document
    .querySelectorAll(".categories button")
    .forEach(b => b.classList.remove("active"));

  allBtn.classList.add("active");

  renderRecipes();
};

  categoriesDiv.appendChild(allBtn);

  [...categories].sort().forEach(cat => {

  const btn = document.createElement("button");

  btn.textContent = cat;

  btn.onclick = () => {

    activeCategory = cat;

    document
      .querySelectorAll(".categories button")
      .forEach(b => b.classList.remove("active"));

    btn.classList.add("active");

    renderRecipes();
  };

  categoriesDiv.appendChild(btn);

});

if(categoryFromUrl){

  document
    .querySelectorAll(".categories button")
    .forEach(btn => {

      if(btn.textContent === categoryFromUrl){

        btn.classList.add("active");

      }

    });

} else {

  allBtn.classList.add("active");

}

}

function renderRecipes() {

  recipesDiv.innerHTML = "";

const titleSearch =
  searchTitle.value.toLowerCase();

const ingredientSearch =
  searchIngredient.value.toLowerCase();

  const filtered = allRecipes.filter(recipe => {

const title =
  recipe.recipe.title.toLowerCase();

const ingredientsText =
  (recipe.ingredients || [])
    .map(i => i.text.toLowerCase())
    .join(" ");

const categoryMatch =
  activeCategory === "Všetko" ||
  recipe.collections?.includes(activeCategory);

const titleMatch =
  !titleSearch ||
  title.includes(titleSearch);

const ingredientMatch =
  !ingredientSearch ||
  ingredientsText.includes(ingredientSearch);

return (
  categoryMatch &&
  titleMatch &&
  ingredientMatch
);

  });

switch(currentSort){

  case "az":

    filtered.sort((a,b)=>
      a.recipe.title.localeCompare(
        b.recipe.title,
        "sk"
      )
    );

    break;

  case "za":

    filtered.sort((a,b)=>
      b.recipe.title.localeCompare(
        a.recipe.title,
        "sk"
      )
    );

    break;

  case "newest":

    filtered.sort((a,b)=>
      new Date(b.recipe.createdAt || 0) -
      new Date(a.recipe.createdAt || 0)
    );

    break;

  case "random":

    filtered.sort(() =>
      Math.random() - 0.5
    );

    break;

}

  document.getElementById("recipe-count").textContent =
  `${filtered.length} receptov`;
  
  filtered.forEach(recipe => {

    const title = recipe.recipe.title;

    const image =
      `images/${recipe.imageFilename}`;

    const card = document.createElement("div");
    card.className = "card";

card.innerHTML = `
  <img
    src="${image}"
    alt="${title}"
    loading="lazy"
  >
  <h3>${title}</h3>
`;
card.style.cursor = "pointer";

card.onclick = () => {

  window.location.href =
    `recipe.html?id=${recipe.recipe.id}.json`;

};
    
    recipesDiv.appendChild(card);

  });

}

searchTitle.addEventListener(
  "input",
  renderRecipes
);

searchIngredient.addEventListener(
  "input",
  renderRecipes
);

loadRecipes();
