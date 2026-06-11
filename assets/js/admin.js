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

document.getElementById("indexLine").value =
  `"${recipe.recipe.id}.json",`;

}

document
  .getElementById("download")
  .addEventListener("click", downloadRecipe);

function downloadRecipe() {

  const json =
    document.getElementById("output")
      .textContent;

  if (!json.trim()) {
    alert("Najprv vygeneruj recept.");
    return;
  }

  const recipe =
    JSON.parse(json);

  const filename =
    recipe.recipe.id + ".json";

  const blob =
    new Blob(
      [json],
      { type: "application/json" }
    );

  const link =
    document.createElement("a");

  link.href =
    URL.createObjectURL(blob);

  link.download =
    filename;

  link.click();

}
document.getElementById("load-recipe").addEventListener("change", function(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    const data = JSON.parse(e.target.result);
    
    // Vyplnenie formulára údajmi z načítaného JSONu
    document.getElementById("title").value = data.recipe.title;
    document.getElementById("image").value = data.imageFilename;
    document.getElementById("categories").value = (data.collections || []).join("\n");
    
    // Prevod polí na text (riadky v textarea)
    document.getElementById("ingredients").value = data.ingredients.map(i => i.text).join("\n");
    document.getElementById("instructions").value = data.instructions.map(i => i.text).join("\n");
    
    // Aktualizácia výstupu a riadku pre index
    document.getElementById("output").textContent = JSON.stringify(data, null, 2);
    document.getElementById("indexLine").value = `"${data.recipe.id}.json",`;
  };
  reader.readAsText(file);
});
