// document.addEventListener("DOMContentLoaded", () => {
//   const buttons = document.querySelectorAll(".tab-button");
//   const contents = document.querySelectorAll(".tab-content");
//  console.log(buttons)
//   buttons.forEach(button => {
//     button.addEventListener("click", () => {
//       const tabId = button.getAttribute("data-tab");
     
//       contents.forEach(content => content.classList.add("hidden"));
//       document.getElementById(tabId).classList.remove("hidden");

//       buttons.forEach(btn => {
//         btn.classList.remove("text-blue-600", "border-blue-600", "border-b-2", "font-semibold");
//         btn.classList.add("text-gray-600");
//       });

//       button.classList.add("text-blue-600", "border-blue-600", "border-b-2", "font-semibold");
//       button.classList.remove("text-gray-600");
//     });
//   });
// });
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