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

    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${image}" alt="">
      <h3>${recipe.title}</h3>
    `;

    recipesDiv.appendChild(card);
  }
}

loadRecipes();
