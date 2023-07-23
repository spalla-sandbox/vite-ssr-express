const button = document.querySelector('button');
let count = 0;

button.textContent = `Clicked ${count} time(s)`;

button.onclick = async () => {
  const { format } = await import('date-fns');
  count += 1;
  button.textContent = `Clicked ${count} time(s) at ${format(
    new Date(),
    'eeee',
  )}`;
};
