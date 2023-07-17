
export default async function Partner(props) {
  return {
    head: `
      <script @asset(src/pages/descontos/script.ts) defer></script>
      <style type="text/css" @asset(src/pages/descontos/style.css)></style>
    `
    ,
    html: `<h1>Parceiro ${JSON.stringify(props, null, 2)}</h1>`
  }
}
