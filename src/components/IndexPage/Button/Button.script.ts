const IndexPageButton =
  document.querySelector<HTMLButtonElement>('.button button');
const indexPageButtonParagraph =
  document.querySelector<HTMLParagraphElement>('.button p');
let countButton = 0;

IndexPageButton.textContent = `Clicked ${countButton} time(s)`;

IndexPageButton.onclick = async () => {
  const { format } = await import('date-fns');
  countButton += 1;
  indexPageButtonParagraph.textContent = `Clicked at ${format(
    new Date(),
    'eeee',
  )}`;
  IndexPageButton.textContent = `Clicked ${countButton} time(s)`;
};
