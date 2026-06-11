document
  .getElementById("generate")
  .addEventListener("click", generateRecipe);

function generateRecipe() {

  const title =
    document.getElementById("title")
      .value.trim();

  const imageFilename =
    document.getElementById("image")
      .value.trim();

  const categories =
    document.getElementById("categories")
      .value
      .split("\n")
      .map(x => x.trim())
      .filter(Boolean);

  const ingredients =
    document.getElementById("ingredients")
      .value
      .split("\n")
      .filter(Boolean)
      .map((text,index) => ({
        id: crypto.randomUUID(),
        text,
        quantity: 0,
        quantity2: 0,
        sort_order: index,
        category_id: null,
        description: text,
        is_group_header: false,
        unit_of_measure: null,
        unit_of_measure_id: null
      }));

  const instructions =
    document.getElementById("instructions")
      .value
      .split("\n")
      .filter(Boolean)
      .map((text,index) => ({
        id: crypto.randomUUID(),
        url: null,
        text,
        image_url: null,
        sort_order: index,
        is_group_header: false
      }));

  const recipeId =
    crypto.randomUUID();

  const recipe = {

    recipe: {
      id: recipeId,
      title: title,
      description: null
    },

    ingredients,

    instructions,

    collections: categories,

    imageFilename

  };

  document.getElementById(
    "output"
  ).textContent =
    JSON.stringify(
      recipe,
      null,
      2
    );

}
