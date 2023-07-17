
import style from './style.css?raw'

export default async function Partner(props) {
  return {
    head: `
      <script type="module" src="@pages/descontos/script" defer></script>
      <style>${style}</style>
    `
    ,
    html: `<h1>Parceiro ${JSON.stringify(props, null, 2)}</h1>`
  }
}
