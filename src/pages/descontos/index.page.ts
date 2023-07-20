import { defineAuthPage } from "../../page"

function Index() {
  return {
    body: `<h1>PArceiros</h1>`
  }
}

export default defineAuthPage(Index)