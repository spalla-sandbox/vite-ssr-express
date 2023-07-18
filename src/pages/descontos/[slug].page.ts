import { defineAuthPage, definePage } from "../../page"
import { PageContext } from "../../types"

type PartnerProps = {
  slug: string;
}

async function Partner(props: PartnerProps, context: PageContext) {
  return {
    head: `
      <script @asset(src/pages/descontos/script.ts) defer></script>
      <style type="text/css" @asset(src/pages/descontos/style.css)></style>
    `
    ,
    html: `
      <h1>Parceiro ${JSON.stringify(props, null, 2)}</h1>
      <pre>${JSON.stringify(context.extra, null, 2)}</pre>
    `
  }
}

export default defineAuthPage(Partner)
