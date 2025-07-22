


function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("w-64");
  sidebar.classList.toggle("w-16");
}

function loadContent(page) {
  const cleanPage = page.replace(/^\/+/, '');   // "products"
  const browserUrl = '/' + cleanPage;           // "/products"
  const fetchUrl = '/partials/' + cleanPage;     // "/partial/products" ← used only for fetch

  // console.log('Fetching:', fetchUrl);
  history.pushState({}, '', browserUrl);        // This updates the URL shown in the browser

  fetch(fetchUrl)                               // Only used to fetch partial content
    .then(res => {
      if (!res.ok) throw new Error("Failed to load partial: " + res.status);
      return res.text();
    })
    .then(html => {
      const main = document.querySelector('#main-content');
      if (!main) throw new Error("Missing .main-content div");
      main.innerHTML = html;

      switch (cleanPage) {
        case 'items': 
            initTabs?.(); 
            loadItemsFormScript?.();
            break;
        case 'products': initProductFilter?.(); break;
      }
    })
    .catch(err => {
      console.error("Failed to load content:", err);
      const main = document.querySelector('.main-content');
      if (main) main.innerHTML = "<p>Error loading page.</p>";
    });
}

// Browser back/forward
window.onpopstate = function () {
  console.log(location.pathname)
  const path = location.pathname.slice(1);
  if (path) loadContent(path);
};
function initTabs() {
  const buttons = document.querySelectorAll(".tab-button");
  const contents = document.querySelectorAll(".tab-content");

  if (buttons.length === 0) return; // prevent errors if no tabs present

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const tabId = button.getAttribute("data-tab");

      contents.forEach(content => content.classList.add("hidden"));
      document.getElementById(tabId).classList.remove("hidden");

      buttons.forEach(btn => {
        btn.classList.remove("text-blue-600", "border-blue-600", "border-b-2", "font-semibold");
        btn.classList.add("text-gray-600");
      });

      button.classList.remove("text-gray-600");
      button.classList.add("text-blue-600", "border-blue-600", "border-b-2", "font-semibold");
    });
  });
}

function initProductFilter() {
  const dropdown = document.getElementById("categoryDropdown");
  const productList = document.getElementById("product-list");

  if (!dropdown || !productList) return;

 

  dropdown.addEventListener("change", () => {
    const selected = dropdown.value;
   console.log(selected);
    fetch(`/products/partial?category=${selected}`)
      .then(res => res.text())
      .then(html => {
        productList.innerHTML = html;
        
      })
      .catch(err => {
        productList.innerHTML = `<div class="text-red-500">Failed to load products.</div>`;
        console.error("Error loading products:", err);
      });
  });


}



