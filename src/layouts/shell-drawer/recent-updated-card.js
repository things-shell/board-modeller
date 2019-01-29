import { LitElement, html } from 'lit-element'

import { GroupCardStyle } from './group-card-style'

export default class RecentUpdatedCard extends LitElement {
  static get is() {
    return 'recent-updated-card'
  }

  static get properties() {
    return {
      group: {
        type: Object
      }
    }
  }

  static get styles() {
    return [GroupCardStyle]
  }

  render() {
    return html`
      <div class="card"><a href="/list-recent">Recently Updated</a></div>
    `
  }
}

customElements.define(RecentUpdatedCard.is, RecentUpdatedCard)
