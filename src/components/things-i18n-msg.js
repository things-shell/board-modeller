/**
 * @license Copyright © HatioLab Inc. All rights reserved.
 */

import { LitElement, html } from 'lit-element'

import { localize } from '../components/localize-mixin'
import { i18next } from '../components/i18next'

export default class ThingsI18nMsg extends localize(i18next)(LitElement) {
  static get is() {
    return 'things-i18n-msg'
  }

  static get properties() {
    return {
      msgid: String
    }
  }

  render() {
    return html`
      ${i18next.t(this.msgid)}
    `
  }
}

customElements.define(ThingsI18nMsg.is, ThingsI18nMsg)
