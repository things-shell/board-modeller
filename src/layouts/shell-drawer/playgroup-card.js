import { LitElement, html, css } from 'lit-element'

import '@material/mwc-icon/mwc-icon'

import { connect } from 'pwa-helpers/connect-mixin.js'
import { store, setRoute, updatePlayGroup } from '../../reducer/store'

import { GroupCardStyle } from './group-card-style'

export default class PlayGroupCard extends connect(store)(LitElement) {
  static get is() {
    return 'playgroup-card'
  }

  static get properties() {
    return {
      group: Object,
      mode: String
    }
  }

  static get styles() {
    return [GroupCardStyle]
  }

  render() {
    return html`
      <div class="card" @click="${e => this._onClick(e)}">
        <p @dblclick="${e => this._onNameDblclick(e)}">${this.group && this.group.name}</p>
        <p @dblclick="${e => this._onDescriptionDblclick(e)}">${this.group && this.group.description}</p>

        ${
          this.mode == 'name_edit'
            ? html`
                <paper-input
                  id="name-input"
                  always-float-label
                  label="name"
                  value="${this.group && this.group.name}"
                  @change="${e => this._onNameEditEnd(e)}"
                  @blur="${e => this._onNameEditEnd(e)}"
                >
                </paper-input>
              `
            : html``
        }
        ${
          this.mode == 'desc_edit'
            ? html`
                <paper-input
                  id="desc-input"
                  always-float-label
                  label="description"
                  value="${this.group && this.group.description}"
                  @change="${e => this._onDescriptionEditEnd(e)}"
                  @blur="${e => this._onDescriptionEditEnd(e)}"
                ></paper-input>
              `
            : html``
        }

        <mwc-icon @click="${e => this._onClickPlay(e)}}">play_arrow</mwc-icon>
      </div>
    `
  }

  stateChanged(state) {}

  /**
   * 외부에서 호출할 수 있는 메쏘드임.
   * TODO element attribute로 처리할 수 있도록 하자.
   */
  dim(on) {
    var button = this.shadowRoot.querySelector('mwc-icon')
    if (on) button.style.color = 'red'
    else button.style.color = ''
  }

  _onClick(e) {
    store.dispatch(setRoute('list-by-playgroup', this.group.id))
    e.stopPropagation()
  }

  _onClickPlay(e) {
    store.dispatch(setRoute('player', this.group.id))
    e.stopPropagation()
  }

  _onNameDblclick(e) {
    this.mode = 'name_edit'

    requestAnimationFrame(() => {
      let input = this.shadowRoot.querySelector('#name-input')
      input && input.focus()
    })
  }

  _onNameEditEnd(e) {
    this.mode = 'view'

    store.dispatch(
      updatePlayGroup({
        id: this.group.id,
        name: e.target.value
      })
    )
  }

  _onDescriptionDblclick(e) {
    this.mode = 'desc_edit'

    requestAnimationFrame(() => {
      let input = this.shadowRoot.querySelector('#desc-input')
      input && input.focus()
    })
  }

  _onDescriptionEditEnd(e) {
    this.mode = 'view'

    store.dispatch(
      updatePlayGroup({
        id: this.group.id,
        description: e.target.value
      })
    )
  }
}

customElements.define(PlayGroupCard.is, PlayGroupCard)
