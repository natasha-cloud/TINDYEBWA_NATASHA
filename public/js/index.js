let menuicn = document.querySelector(".menuicn");
let nav = document.querySelector(".navcontainer");
 
menuicn.addEventListener("click", () => {
    nav.classList.toggle("navclose");
})


const BatteryOption = document.querySelector('.nav-option.option2');
const tableContent = document.querySelector('.table-content');

BatteryOption.addEventListener('click', () => {
  tableContent.classList.toggle('hidden');
});
