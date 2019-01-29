import { LitElement, html, css } from 'lit-element'

/**
WEB Component for snackbar.

Example:

  <things-snackbar value=${text}>
  </things-snackbar>
*/
export default class ThingsSnackbar extends LitElement {
  static get is() {
    return 'things-snackbar'
  }

  static get properties() {
    return {
      message: String,
      targetTitle: String,
      targetUrl: String
    }
  }

  static get styles() {
    return [
      css`
        :host {
          --snackbar-background: #323232;
          --snackbar-text: #ffffff;
          --snackbar-link: #f4cb1e;
        }

        :host {
          display: block;
          position: fixed;
          left: calc(50% - 300px);
          right: calc(50% - 300px);
          bottom: 0;
          background-color: var(--snackbar-background);
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
          color: var(--snackbar-text);
          width: 600px;
          padding: 16px;
          visibility: hidden;
          text-align: center;
          will-change: transform;
          -webkit-transform: translate3d(0, 100%, 0);
          transform: translate3d(0, 100%, 0);
          transition-property: visibility, -webkit-transform, opacity;
          transition-property: visibility, transform, opacity;
          transition-duration: 0.2s;
          font-family: 'Roboto', 'Noto', sans-serif;
          -webkit-font-smoothing: antialiased;
          z-index: 105;
        }
        :host(.show) {
          visibility: visible;
          -webkit-transform: translate3d(0, 0, 0);
          transform: translate3d(0, 0, 0);
        }

        @media (max-width: 767px) {
          :host {
            top: auto;
            bottom: 0;
            left: 0;
            right: 0;
            width: auto;
            -webkit-transform: translate3d(0, 100%, 0);
            transform: translate3d(0, 100%, 0);
          }
        }

        #container {
          display: flex;
          align-items: center;
        }

        #message {
          flex: 3;
          text-align: left;
        }
        #action {
          flex: 1;
        }

        #action a,
        #action a:visited {
          color: var(--snackbar-link);
          text-transform: uppercase;
          text-decoration: none;
        }
      `
    ]
  }

  static toast(message, targetTitle, targetUrl) {
    document.dispatchEvent(
      new CustomEvent('snackbar-notify', {
        bubbles: true,
        composed: true,
        detail: {
          message,
          targetTitle,
          targetUrl
        }
      })
    )
  }

  render() {
    return html`
      <div id="container">
        <div id="message">${this.message}</div>
        <div id="action"><a href=${this.targetUrl}>${this.targetTitle}</a></div>
      </div>
    `
  }

  connectedCallback() {
    super.connectedCallback()

    this.boundShowSnackbar = this.show.bind(this)
    document.addEventListener('snackbar-notify', this.boundShowSnackbar)
  }

  disconnectedCallback() {
    super.disconnectedCallback()

    document.removeEventListener('snackbar-notify', this.boundShowSnackbar)
  }

  show(e) {
    var { message, targetTitle, targetUrl } = e.detail

    this.message = message
    this.targetTitle = targetTitle
    this.targetUrl = targetUrl

    this.classList.add('show')

    if (this.setTimeoutId !== undefined) {
      clearTimeout(this.setTimeoutId)
    }

    this.setTimeoutId = setTimeout(() => {
      this.classList.remove('show')
      delete this.setTimeoutId
    }, 3000)
  }
}

customElements.define(ThingsSnackbar.is, ThingsSnackbar)
