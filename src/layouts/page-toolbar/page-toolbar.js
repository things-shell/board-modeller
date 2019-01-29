import { LitElement, html, css } from 'lit-element'

import '@material/mwc-icon/mwc-icon'
import '@material/mwc-button/mwc-button'

import '@polymer/app-layout/app-toolbar/app-toolbar'
import '@polymer/paper-icon-button/paper-icon-button'
import '@polymer/paper-listbox/paper-listbox'
import '@polymer/paper-menu-button/paper-menu-button'
import '@polymer/paper-item/paper-item'

import { i18next } from '../../components/i18next'

class PageToolbar extends LitElement {
  static get is() {
    return 'page-toolbar'
  }

  constructor() {
    super()

    this.email = ''
    this.drawerCollapsed = false
  }

  static get properties() {
    return {
      email: Object,
      locale: Object,
      drawerCollapsed: Boolean
    }
  }

  static get styles() {
    return [
      css`
        :host {
          display: block;
        }

        app-toolbar {
          background-color: var(--primary-dark-color);
          justify-content: space-between;
          height: 45px;
          padding: 0;
          color: var(--third-color);
        }

        paper-menu-button {
          padding-left: 0px;
        }

        mwc-button {
          font-size: 14px;
          margin: 0px;
          padding: 0px;
          vertical-align: middle;
        }

        .padding {
          flex: 1;
        }

        slot {
          display: flex;
          flex: 1;
          flex-basis: 1280px;
          flex-wrap: nowrap;
          height: 100%;
          align-items: center;
          overflow: hidden;
          padding: 10px;
        }

        ::slotted(*) {
          flex: 1;
          padding: 0px;
        }

        ::slotted(paper-input) {
          --paper-input-container-input-color: white;
        }

        ::slotted(paper-icon-button) {
          flex-basis: 32px;
          min-width: 20px;
        }

        ::slotted(.vline) {
          display: block;
          flex: none;
          border-left: 1px solid rgba(255, 255, 255, 0.07);
          border-right: 1px solid rgba(0, 0, 0, 0.1);
          width: 0px;
          height: 18px;
          margin: 0 4px;
        }

        ::slotted(label) {
          margin-right: 5px;
          color: #fff;
          font-size: 20px;
        }

        [logo] {
          width: 45px;
          height: 45px;
        }

        span.space {
          width: 10px;
        }

        [user] {
          border-radius: 50%;
          background-color: var(--secondary-color);
          padding: 2px;
          margin: 2px;

          font-size: 1em;
        }

        #user-box {
          flex-basis: 270px;
          justify-content: flex-end;
          align-items: center;
          display: flex;
        }
      `
    ]
  }

  render() {
    return html`
      <app-toolbar>

        <img
          src="assets/logo.png"
          @click=${e => this._onDrawerToggler(e)}
          ?hidden=${!this.drawerCollapsed} logo>
        </img>

        <slot></slot>
        
        <span class="padding"></span>

        <div id="user-box">
        <a href="/user-profile">
          <mwc-icon title="acting" user>person</mwc-icon>
        </a>
        <paper-menu-button>
          <mwc-button .label=${this.email}
            slot="dropdown-trigger"></mwc-button>
          <paper-listbox
            slot="dropdown-content"
            attr-for-selected="locale"
            @click=${e => this._onChangeLocale(e)}
            selected=${this.locale}>
            <!--
              <paper-item>settings</paper-item>
              <paper-item>logout</paper-item>
              <paper-item>help</paper-item>
            -->
            <paper-item
              locale="en-US">English</paper-item>
            <paper-item
              locale="ko-KR">한글</paper-item>
            <paper-item
              locale="zh-CN">中文</paper-item>
          </paper-listbox>
        </paper-menu-button>
      </div>

      </app-toolbar>
    `
  }

  stateChanged(state) {
    this.email = (state.auth.user && state.auth.user.email) || ''
    this.locale = state.auth.locale
    this.drawerCollapsed = state.drawer.collapsed
  }

  _onDrawerToggler(e) {
    store.dispatch({
      type: 'TOGGLE-DRAWER'
    })
  }

  _onChangeLocale(e) {
    var locale = e.target.getAttribute('locale')

    i18next.changeLanguage(locale)

    store.dispatch({
      type: 'SET-LOCALE',
      locale
    })
  }
}

customElements.define(PageToolbar.is, PageToolbar)
