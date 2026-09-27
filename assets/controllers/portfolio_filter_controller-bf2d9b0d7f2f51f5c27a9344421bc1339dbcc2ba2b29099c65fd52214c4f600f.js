import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["button", "grid"]

  connect() {
    this.currentCategory = "Todos"
  }

  toggleCategory(event) {
    const button = event.currentTarget
    const category = button.dataset.portfolioFilterCategory

    this.buttonTargets.forEach(btn => {
      btn.setAttribute("aria-pressed", btn === button ? "true" : "false")
      btn.classList.toggle("btn-primary", btn === button)
      btn.classList.toggle("btn-outline-dark", btn !== button)
    })

    this.currentCategory = category
    this.filterItems()
  }

  filterItems() {
    const items = this.gridTarget.querySelectorAll(".portfolio-item")
    items.forEach(item => {
      const itemCategory = item.dataset.category
      const shouldShow = this.currentCategory === "Todos" || itemCategory === this.currentCategory
      item.hidden = !shouldShow
      if (shouldShow) {
        item.style.display = ""
      } else {
        item.style.display = "none"
      }
    })
  }
};
