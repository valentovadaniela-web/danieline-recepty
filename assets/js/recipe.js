const params =
  new URLSearchParams(window.location.search);

const file =
  params.get("id");

async function loadRecipe() {

  const data = await fetch(
    `recipes/${file}`
  ).then(r => r.json());

  // Titulok stránky
  document.title =
    data.recipe.title;

  // Bežný nadpis receptu
  document.getElementById(
    "recipe-title"
  ).textContent =
    data.recipe.title;

  // Bežná fotka receptu
  document.getElementById(
    "recipe-image"
  ).src =
    `images/${data.imageFilename}`;

  // Tlačový nadpis
  document.getElementById(
    "print-title"
  ).textContent =
    data.recipe.title;

  // Tlačová fotka
  document.getElementById(
    "print-image"
  ).src =
    `images/${data.imageFilename}`;

  // Celkový čas v minútach
  const totalMinutes =
    (data.recipe.total_time_hours || 0) * 60 +
    (data.recipe.total_time_minutes || 0);

  // Kategórie na stránke
  const categories =
    document.getElementById(
      "recipe-categories"
    );

  categories.innerHTML =
    data.collections
      ?.map(c =>
        `<a href="index.html?category=${encodeURIComponent(c)}"
            class="badge">
            ${c}
         </a>`
      )
      .join(" ")
    || "";

  // Meta informácie na stránke
  document.getElementById(
    "recipe-meta"
  ).innerHTML =
    totalMinutes > 0
      ? `⏱️ ${totalMinutes} min`
      : "";

  // Meta informácie pre tlač
  const categoryText =
    data.collections?.join(" • ") || "";

  const timeText =
    totalMinutes > 0
      ? ` • ${totalMinutes} min`
      : "";

  document.getElementById(
    "print-meta-line"
  ).textContent =
    categoryText + timeText;

  // Ingrediencie
  const ingredients =
    document.getElementById(
      "ingredients"
    );

  ingredients.innerHTML = "";

  data.ingredients.forEach(i => {

    const li =
      document.createElement("li");

    li.textContent =
      i.text;

    ingredients.appendChild(li);

  });

  // Postup
  const instructions =
    document.getElementById(
      "instructions"
    );

  instructions.innerHTML = "";

  data.instructions.forEach(step => {

    const li =
      document.createElement("li");

    li.textContent =
      step.text;

    instructions.appendChild(li);

  });

}

loadRecipe();
