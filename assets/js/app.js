const recipesDiv = document.getElementById("recipes");

async function loadRecipes() {

  const files = await fetch("recipes/index.json")
    .then(r => r.json());

  for (const file of files) {

    const data = await fetch(`recipes/${file}`)
      .then(r => r.json());

    const title = data.recipe.title;
    const image = `images/${data.imageFilename}`;

    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${image}" alt="${title}">
      <h3>${title}</h3>
    `;

    recipesDiv.appendChild(card);
  }
}

loadRecipes();
