/**
 * @license Copyright © HatioLab Inc. All rights reserved.
 */
import { LitElement, html, css } from 'lit-element'

import { connect } from 'pwa-helpers/connect-mixin.js'
import { store, hideContextmenu } from '../reducer/store'

import './things-i18n-msg'

class ThingsContextmenu extends connect(store)(LitElement) {
  static get is() {
    return 'things-contextmenu'
  }

  static get properties() {
    return {}
  }

  static get styles() {
    return [
      css`
        :host {
          position: fixed;
          width: 100%;
          height: 100%;
        }

        #contextmenu {
          position: fixed;
          list-style: none;
          border: #efefef;
          border-radius: 5%;
          padding: 5px;
          background-color: #f6f6f6;
          box-shadow: #aaa 2px 2px;
        }

        #contextmenu > li {
          padding: 5px 10px;
          border-bottom: #999 1px dashed;
          cursor: pointer;
        }

        #contextmenu > li:last-child {
          border-bottom: none;
        }

        #contextmenu > li > a {
          text-decoration: none;
        }
      `
    ]
  }

  firstUpdated() {
    this.addEventListener('click', e => {
      this.hide()
    })
  }

  render() {
    return html`
      <ul id="contextmenu"></ul>
    `
  }

  stateChanged(state) {
    this.hidden = !(state.contextmenu && state.contextmenu.show)
    if (!this.hidden) {
      this.show(state.contextmenu.position.x, state.contextmenu.position.y, state.contextmenu.list)
    }
  }

  show(x, y, list) {
    var contextmenu = this.shadowRoot.querySelector('#contextmenu')
    contextmenu.style.left = `${x}px`
    contextmenu.style.top = `${y}px`

    this._createContextmenuList(list)
  }

  hide() {
    store.dispatch(hideContextmenu())
    // this.hidden = true
  }

  _clearContextmenu() {
    var contextmenu = this.shadowRoot.querySelector('#contextmenu')

    while (contextmenu.hasChildNodes()) {
      contextmenu.removeChild(contextmenu.firstChild)
    }
  }

  _createContextmenuList(list) {
    if (!list || !Array.isArray(list)) return

    var contextmenu = this.shadowRoot.querySelector('#contextmenu')

    this._clearContextmenu()

    list.forEach(item => {
      var name = item.name
      var action = item.action

      var a = document.createElement('a')
      a.textContent = name

      var li = document.createElement('li')
      li.onclick = e => {
        action(e)
        this.hide()
      }
      li.appendChild(a)

      contextmenu.appendChild(li)
    })
  }
}

customElements.define(ThingsContextmenu.is, ThingsContextmenu)
