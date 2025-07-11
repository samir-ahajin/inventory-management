function initProductFilter() {
  const dropdown = document.getElementById("categoryDropdown");
  const list = document.getElementById("product-list");

  if (!dropdown || !list) return;
  console.log(dropdown);

  const load = (category) => {
    fetch(`/products/partial?category=${category}`)
      .then(res => res.text())
      .then(html => {
        list.innerHTML = html;
      })
      .catch(err => {
        list.innerHTML = `<div class="text-red-500">Error loading products.</div>`;
        console.error("Fetch error:", err);
      });
  };

  load(dropdown.value); // Initial load

  dropdown.addEventListener("change", () => {
    load(dropdown.value);
  });
}

document.addEventListener("DOMContentLoaded", initProductFilter);