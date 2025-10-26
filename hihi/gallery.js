const accordions = document.querySelectorAll('.accordion');


accordions.forEach(acc => {
const items = acc.querySelectorAll('img, video');
items.forEach(item => {
item.addEventListener('click', () => {
if (item.classList.contains('active')) {
item.classList.remove('active');
} else {
items.forEach(i => i.classList.remove('active'));
item.classList.add('active');
}
});
});
});
