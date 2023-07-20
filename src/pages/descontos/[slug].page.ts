import { definePage } from "../../page"
import { PageContext } from "../../types"

type PartnerProps = {
  slug: string;
}

async function Partner(props: PartnerProps, context: PageContext) {
  return {
    head: [
      `<script @asset(src/pages/descontos/script.ts) defer></script>`,
      `<style type="text/css" @asset(src/pages/descontos/style.css)></style>`
    ]
    ,
    body: `
      <h1>Parceiro ${JSON.stringify(props, null, 2)}</h1>
    `
  }
}

export default definePage(Partner)
