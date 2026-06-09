const recipesDiv = document.getElementById("recipes");
const categoriesDiv = document.getElementById("categories");
const searchInput = document.getElementById("search");

let allRecipes = [];
let activeCategory = "Všetko";

async function loadRecipes() {

  const files = await fetch("recipes/index.json")
    .then(r => r.json());

  for (const file of files) {

    try {

      const data = await fetch(`recipes/${file}`)
        .then(r => r.json());

      allRecipes.push(data);

    } catch(err) {
      console.error(file, err);
    }
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
    renderRecipes();
  };

  categoriesDiv.appendChild(allBtn);

  [...categories].sort().forEach(cat => {

    const btn = document.createElement("button");

    btn.textContent = cat;

    btn.onclick = () => {
      activeCategory = cat;
      renderRecipes();
    };

    categoriesDiv.appendChild(btn);

  });
}

function renderRecipes() {

  recipesDiv.innerHTML = "";

  const search = searchInput.value.toLowerCase();

  const filtered = allRecipes.filter(recipe => {

    const title =
      recipe.recipe.title.toLowerCase();

    const categoryMatch =
      activeCategory === "Všetko" ||
      recipe.collections?.includes(activeCategory);

    const searchMatch =
      title.includes(search);

    return categoryMatch && searchMatch;

  });

  filtered.sort((a,b)=>
    a.recipe.title.localeCompare(
      b.recipe.title,
      "sk"
    )
  );

  filtered.forEach(recipe => {

    const title = recipe.recipe.title;

    const image =
      `images/${recipe.imageFilename}`;

    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${image}" alt="${title}">
      <h3>${title}</h3>
    `;

    recipesDiv.appendChild(card);

  });

}

searchInput.addEventListener(
  "input",
  renderRecipes
);

loadRecipes();
