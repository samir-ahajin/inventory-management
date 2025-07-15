function loadItemsFormScript() {
  const addForm = document.getElementById('addForm');
  const updateForm = document.getElementById('updateForm');
  const searchForm = document.getElementById('searchForm');

  if (addForm) {
    addForm.addEventListener('submit', async function (e) {
      e.preventDefault();
      const formData = new FormData(this);

      const res = await fetch('/items/add', {
        method: 'POST',
        body: formData
      });

      const result = await res.json();
      console.log(result);
      if (result.success) {
               // ✅ Clears all fields
      addForm.reset();   
    }
      alert(result.message);

  
    });
  }

  if (updateForm) {
    updateForm.addEventListener('submit', async function (e) {
      e.preventDefault();
      const formData = new FormData(this);
      console.log('Update form data:', formData);
      const res = await fetch('/items/update', {
        method: 'POST',
        body: formData
      });

      const result = await res.json();
      alert(result.message);
    });
  }


   if (searchForm) {
    searchForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      const formData = new FormData(this);
      const searchValue = formData.get('search');
    //  console.log('Search value:', searchValue);
      const res = await  fetch('/items/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ search: searchValue })
  });

     
      const html = await res.text(); // ✅ Expect HTML, not JSON
      document.getElementById('searchResults').innerHTML = html;

   document.addEventListener('click', function (e) {
  const li = e.target.closest('li.searchValue');
  if (li) {
    createRipple(e, li); // 👈 Add ripple effect

    const item = li.dataset;
    // console.log('Clicked element:', li);
    // console.log(item);

    fillUpdateForm({
      id: item.id,
      name: item.name,
      category: item.category,
      price: item.price,
      quantity: item.quantity,
      image: item.image,
      updated: item.updated
    });
  }
});
    });
  }
 
 
}

// ✅ Autofill form on item click
function fillUpdateForm(itemData) {
  const updateForm = document.getElementById('updateForm'); // ✅ Add this
  if (!updateForm) return;

  updateForm.classList.remove('hidden'); // ✅ Make sure to show the form

  updateForm.querySelector('[name="product_name"]').value = itemData.name;
  updateForm.querySelector('[name="quantity"]').value = itemData.quantity;
  updateForm.querySelector('[name="category"]').value = itemData.category;
  updateForm.querySelector('[name="price"]').value = itemData.price;


  // Optional: Add or update hidden input for ID
  let idInput = updateForm.querySelector('[name="id"]');
  if (!idInput) {
    idInput = document.createElement('input');
    idInput.type = 'hidden';
    idInput.name = 'id';
    updateForm.appendChild(idInput);
  }
  idInput.value = itemData.id;

  updateForm.scrollIntoView({ behavior: 'smooth' });
}



  function createRipple(event, element) {
  const circle = document.createElement("span");
  const diameter = Math.max(element.clientWidth, element.clientHeight);
  const radius = diameter / 2;

  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${event.offsetX - radius}px`;
  circle.style.top = `${event.offsetY - radius}px`;
  circle.classList.add("ripple");

  // Remove old ripple if exists
  const oldRipple = element.querySelector(".ripple");
  if (oldRipple) {
    oldRipple.remove();
  }

  element.appendChild(circle);
}

