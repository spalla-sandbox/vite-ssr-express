import { definePage } from "../../page"
import { PageContext } from "../../types"

type PartnerProps = {
  slug: string;
}

async function Partner(props: PartnerProps, context: PageContext) {
  return {
    head: [
      `<script @source(src/assets/scripts/script.ts) defer></script>`,
      `<style type="text/css">@content(src/assets/styles/style.css)</style>`
    ]
    ,
    body: `
      <pre>Parceiro ${JSON.stringify(props, null, 2)}</pre>
    `
  }
}

export default definePage(Partner)
