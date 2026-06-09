const params =
  new URLSearchParams(window.location.search);

const file =
  params.get("id");

async function loadRecipe() {

  const data = await fetch(
    `recipes/${file}`
  ).then(r => r.json());

  document.title =
    data.recipe.title;

  document.getElementById(
    "recipe-title"
  ).textContent =
    data.recipe.title;

  document.getElementById(
    "recipe-image"
  ).src =
    `images/${data.imageFilename}`;

  const categories =
    document.getElementById(
      "recipe-categories"
    );

  categories.innerHTML =
    data.collections
      ?.map(c =>
        `<span class="badge">${c}</span>`
      )
      .join(" ")
      || "";

  const ingredients =
    document.getElementById(
      "ingredients"
    );

  data.ingredients.forEach(i => {

    const li =
      document.createElement("li");

    li.textContent =
      i.text;

    ingredients.appendChild(li);

  });

  const instructions =
    document.getElementById(
      "instructions"
    );

  data.instructions.forEach(step => {

    const li =
      document.createElement("li");

    li.textContent =
      step.text;

    instructions.appendChild(li);

  });

}

loadRecipe();
