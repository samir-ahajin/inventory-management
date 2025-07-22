function initProductFilter() {
  const dropdown = document.getElementById("categoryDropdown");
  const list = document.getElementById("product-list");
  

  if (!dropdown || !list) return;
  // console.log(dropdown);


  const load = (category) => {
    fetch(`/products/partial?category=${category}`)
      .then(res => res.text())
      .then(html => {
        list.innerHTML = html;
        const deleteButtons = list.querySelectorAll('.deleteButton');
                deleteButtons.forEach(button => {
                    button.addEventListener('click', async function (e) {
                    e.preventDefault(); // ✅ Prevent the default behavior early

                    const confirmed = confirm('Delete this item?');
                    if (!confirmed) return;

                    const productId = this.dataset.id;
                    if (confirm("Are you sure you want to delete this item?")) {
                  await fetch(`/items/delete/${productId}`, {
                    method: 'DELETE',
                  })
                  .then(async (res) => {
                    const contentType = res.headers.get("content-type");
                    if (contentType && contentType.includes("application/json")) {
                      const data = await res.json();
                       const dropdown = document.getElementById("categoryDropdown");
                      //  console.log("Delete response:", dropdown.value);
                       dropdown.value = "All"; // Reset to "all" category
                      initProductFilter(); // Reload the product filter
                      alert(data.message);
                      // console.log(data);
                      // location.reload(); // or update DOM
                    } else {
                      const text = await res.text();
                      console.error("Expected JSON, got:", text);

                    }
                  })
                  .catch(err => console.error("Delete failed:", err));
                  }
                                
                  });
                })
       
        
      })
      .catch(err => {
        list.innerHTML = `<div class="text-red-500">Error loading products.</div>`;
        // console.error("Fetch error:", err);
      }
    );
  };

  load(dropdown.value); // Initial load

  dropdown.addEventListener("change", () => {
    load(dropdown.value);

  });



}

document.addEventListener("DOMContentLoaded", initProductFilter);



// async function handleDelete(productId) {
//     if (confirm("Are you sure you want to delete this item?")) {
//      await fetch(`/items/delete/${productId}`, {
//       method: 'DELETE',
//     })
//     .then(async (res) => {
//       const contentType = res.headers.get("content-type");
//       if (contentType && contentType.includes("application/json")) {
//         const data = await res.json();
//         // console.log(data);
//         // location.reload(); // or update DOM
//       } else {
//         const text = await res.text();
//         console.error("Expected JSON, got:", text);
//       }
//     })
//     .catch(err => console.error("Delete failed:", err));
//     }
//   }
