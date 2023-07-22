const button = document.querySelector('button');
let count = 0;

button.textContent = `Clicked ${count} time(s)`;

button.onclick = () => {
  count += 1;
  button.textContent = `Clicked ${count} time(s)`;
};
