import { definePage } from "../page"

function NotFound() {
  return {
    html: `<h1>Not Found</h1>`
  }
}

export default definePage(NotFound)