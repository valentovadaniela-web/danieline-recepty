const recipesDiv = document.getElementById("recipes");

async function loadRecipes() {

  const index = await fetch(
    "recipes/index.json"
  ).then(r => r.json());

  for (const file of index) {

    const recipe = await fetch(
      `recipes/${file}`
    ).then(r => r.json());

    const image =
  `images/${recipe.imageFilename}`;

const title =
  recipe.recipe.title;

card.innerHTML = `
  <img src="${image}" alt="${title}">
  <h3>${title}</h3>
`;

    recipesDiv.appendChild(card);
  }
}

loadRecipes();
