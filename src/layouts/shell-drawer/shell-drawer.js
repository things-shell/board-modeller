import { LitElement, html, css } from 'lit-element'

import '@material/mwc-icon/mwc-icon'
import '@material/mwc-button/mwc-button'

import '@polymer/paper-input/paper-input'
import '@polymer/paper-input/paper-textarea'

import '@polymer/neon-animation/animations/scale-up-animation'
import '@polymer/neon-animation/animations/fade-out-animation'
import '@polymer/paper-dialog/paper-dialog'
import '@polymer/paper-dialog-scrollable/paper-dialog-scrollable'

import { connect } from 'pwa-helpers/connect-mixin.js'
import {
  store,
  fetchGroupList,
  fetchPlayGroupList,
  createGroup,
  createPlayGroup,
  setRoute,
  joinGroup,
  joinPlayGroup,
  fetchDataSourceList,
  fetchPublisherList,
  fetchFontList,
  fetchFileList
} from '../../reducer/store'

import { i18next } from '../../components/i18next'
import { localize } from '../../components/localize-mixin'

import '../../components/things-i18n-msg'

import GroupCard from './group-card'
import PlayGroupCard from './playgroup-card'
import './recent-updated-card'

class ShellDrawer extends connect(store)(localize(i18next)(LitElement)) {
  constructor() {
    super()

    this.boardGroupList = []
    this.boardPlayGroupList = []
    this.boardGroupCurrent = {}
  }

  static get is() {
    return 'shell-drawer'
  }

  static get properties() {
    return {
      boardGroupList: Array,
      boardPlayGroupList: Array,
      boardGroupCurrent: Object,
      started: Boolean
    }
  }

  static get styles() {
    return [
      css`
        :host {
          position: relative;
          display: flex;
          flex-direction: column;
        }
        *:focus {
          outline: none;
        }

        app-toolbar {
          background-color: var(--primary-dark-color);
          justify-content: space-between;
          height: 45px;
          padding: 0;
          color: var(--third-color);
        }

        app-toolbar.setting-menu {
          padding: 0 4px 0 4px;
          background-color: var(--primary-dark-color);
        }

        a,
        a:link,
        a:visited {
          text-decoration: none;
          color: white;
        }

        [logo] {
          width: 45px;
          height: 45px;
        }

        [main-title] {
          height: 45px;
          min-height: 45px;
          padding-left: 9px;
          color: var(--third-color);
          text-transform: capitalize;
          font-size: 22px;
          font-weight: normal;
          line-height: 2.1;
        }

        mwc-icon {
          margin: 4px;

          --mdc-icon-size: 1.2em;
        }

        paper-listbox {
          flex: 1;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
          padding: 0 0 45px 0;
        }

        #new-group-dialog {
          min-width: 300px;
        }

        #new-container {
          background-color: var(--secondary-dark-color);
          border: 1px solid rgba(0, 0, 0, 0.15);
          border-width: 1px 0;
          padding: 7px;
        }

        #new-container button {
          background-color: transparent;
          border: none;
          padding: 0 10px 0 5px;
          color: rgba(255, 255, 255, 0.9);
          font-size: 15px;
          text-transform: capitalize;
        }

        #new-container button:hover {
          color: #fff;
        }

        #new-container button:active {
          background-color: rgba(0, 0, 0, 0.1);
          color: #fff;
        }

        #new-container button::before {
          content: '+';
          width: 25px;
          height: 25px;
          display: inline-block;
          border-radius: 50%;
          background-color: var(--secondary-accent-color);
          border: 2px solid transparent;
          margin-right: 5px;
          color: #fff;
          font-size: 19px;
          font-weight: bold;
        }

        #new-container button:hover::before {
          border: 2px solid rgba(255, 255, 255, 0.5);
        }

        #new-container button:active::before {
          border: 2px solid rgba(0, 0, 0, 0.4);
        }

        #new-container button:nth-child(2)::before {
          background-color: var(--primary-accent-color);
        }
      `
    ]
  }

  render() {
    return html`
    <app-toolbar>
      <img src="assets/logo.png" @click=${e => this.onClickLogo(e)} logo></img>
      <h3 main-title>Things Real</h3>
    </app-toolbar>

    <app-toolbar class="setting-menu">
      <a href="/setting-font"><mwc-icon>font_download</mwc-icon></a>
      <a href="/setting-file"><mwc-icon>perm_media</mwc-icon></a>
      <a href="/setting-datasource"><mwc-icon>cloud_done</mwc-icon></a>
      <a href="/setting-publisher"><mwc-icon>cloud_download</mwc-icon></a>
      <a href="/setting-security"><mwc-icon>security</mwc-icon></a>
    </app-toolbar>

    <div id="new-container">
      <button>board</button>
      <button @click=${e => this.onClickNewGroup(e)}>group</button>
    </div>

    <paper-listbox>
      <recent-updated-card ?active=${this.boardGroupCurrent.type === 'recent'}>
      </recent-updated-card>

      ${this.boardGroupList.map(
        item => html`
          <group-card
            ?active=${this.boardGroupCurrent.id === item.id}
            .group=${item}
            @drop="${e => this.onCardDrop(e)}"
            @dragover="${e => this.onCardDragOver(e)}"
            @dragleave="${e => this.onCardDragLeave(e)}"
          >
          </group-card>
        `
      )}

      ${this.boardPlayGroupList.map(
        item => html`
          <playgroup-card
            ?active=${this.boardGroupCurrent.id === item.id}
            .group=${item}
            @drop="${e => this.onCardDrop(e)}"
            @dragover="${e => this.onCardDragOver(e)}"
            @dragleave="${e => this.onCardDragLeave(e)}"
          >
          </playgroup-card>
        `
      )}
    </paper-listbox>

    <paper-dialog 
      id="new-group-dialog" 
      entry-animation="scale-up-animation" 
      exit-animation="fade-out-animation"
      @iron-overlay-closed=${e => this.onNewGroupDialogClosed(e)}" 
      no-overlap>

      <h2>${i18next.t('label.new-group')}</h2>
      <paragraph>${i18next.t('label.pls-name-group')}</paragraph>

      <paper-input
        id="new-group-name"
        label="${i18next.t('label.name')}" 
        .value=${this.newGroupName}>
      </paper-input>
      <paper-textarea
        id="new-group-description"
        label="${i18next.t('label.description')}" 
        rows=1
        .value=${this.newGroupDescription}>
      </paper-textarea>

      <paper-radio-group id="new-group-type" selected="group">
        <paper-radio-button name="group">Group</paper-radio-button>
        <paper-radio-button name="play-group">Play Group</paper-radio-button>
      </paper-radio-group>

      <div class="buttons">
        <mwc-button dialog-dismiss>
          <things-i18n-msg msgid="button.cancel">Cancel</things-i18n-msg>
        </mwc-button>
        <mwc-button dialog-confirm autofocus>
          <things-i18n-msg msgid="button.accept">Accept</things-i18n-msg>
        </mwc-button>
      </div>
    </paper-dialog>
    `
  }

  stateChanged(state) {
    this.boardGroupList = state.boardGroupList
    this.boardPlayGroupList = state.boardPlayGroupList
    this.boardGroupCurrent = state.boardGroupCurrent
  }

  firstUpdated() {
    this.started && this.updateGroupList()
  }

  updated(change) {
    change.has('started') && this.started && this.updateGroupList()
  }

  updateGroupList() {
    store.dispatch(fetchGroupList())
    store.dispatch(fetchPlayGroupList())
    store.dispatch(fetchFontList())
  }

  onClickLogo(e) {
    store.dispatch({
      type: 'CLOSE-DRAWER'
    })
  }

  onClickNewGroup(e) {
    this.newGroupName = ''
    this.newGroupDescription = ''

    this.shadowRoot.querySelector('#new-group-dialog').open()
  }

  onNewGroupDialogClosed(e) {
    var dialog = e.target

    if (!dialog.closingReason.confirmed) return

    var group = {
      name: dialog.querySelector('#new-group-name').value,
      description: dialog.querySelector('#new-group-description').value
    }
    var groupType = dialog.querySelector('#new-group-type').selected

    if (groupType == 'group') {
      store.dispatch(createGroup(group))
    } else {
      store.dispatch(createPlayGroup(group))
    }
  }

  onCardDrop(e) {
    e.preventDefault()

    var card = e.target
    var board = e.dataTransfer.getData('board')

    card.dim(false)

    try {
      if (card instanceof GroupCard) {
        store.dispatch(joinGroup(board, card.group))
      } else if (card instanceof PlayGroupCard) {
        store.dispatch(joinPlayGroup(board, card.group))
      }
    } catch (e) {
      if (this.showToastMsg) this.showToastMsg(e)
    }
  }

  onCardDragOver(e) {
    e.preventDefault()

    var card = e.target

    card.dim(true)
  }

  onCardDragLeave(e) {
    e.preventDefault()

    var card = e.target

    card.dim(false)
  }
}

customElements.define(ShellDrawer.is, ShellDrawer)
