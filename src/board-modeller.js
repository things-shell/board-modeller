import { LitElement, html, css } from 'lit-element'

import '@material/mwc-fab/mwc-fab'
import '@material/mwc-icon/mwc-icon'

import '@polymer/paper-dialog/paper-dialog'
// import { saveAs } from 'file-saver'
// import { store } from '../../reducer/store'

import { togglefullscreen } from './utils'
// import '../../commons/board-preview'
// import '../../components/things-scene-viewer/things-scene-viewer'
// import '../../components/things-scene-viewer/things-scene-inspector'

import './edit-toolbar/edit-toolbar'
import './component-toolbar/component-toolbar'
import './property-sidebar/property-sidebar'

// import { i18next } from '../../components/i18next'
// import elements from '../../things-scene-components-with-tools.import'

class BoardModeller extends LitElement {
  static get is() {
    return 'board-modeller'
  }

  static get properties() {
    return {
      boardName: String,
      model: Object,
      baseUrl: String,
      selected: Array,
      mode: Number,
      provider: Object,
      hideProperty: Boolean,
      $model: Object,
      overlay: String,
      scene: Object,
      store: Object
    }
  }

  static get styles() {
    return [
      css`
        :host {
          display: flex;
          flex-direction: column;

          overflow: hidden;
        }

        div {
          flex: 1;

          display: flex;
          flex-direction: row;
        }

        things-scene-viewer {
          flex: 1;
        }

        #scene-wrap {
          position: relative;
        }

        things-scene-inspector {
          position: absolute;
          left: 0px;
          top: 0px;
        }

        mwc-fab {
          position: absolute;
          right: 15px;
          bottom: 15px;
        }
      `
    ]
  }

  render() {
    return html`
      <edit-toolbar
        id="edittoolbar"
        .scene=${this.scene}
        .selected=${this.selected}
        ?hideProperty=${this.hideProperty}
        @hide-property-changed="${e => (this.hideProperty = e.detail.value)}"
        @open-preview="${e => this.onOpenPreview(e)}"
        @download-model="${e => this.onDownloadModel(e)}"
        @modeler-fullscreen="${e => this.onFullscreen(e)}"
      >
      </edit-toolbar>

      <div>
        <component-toolbar
          .scene=${this.scene}
          .mode=${this.mode}
          @mode-changed="${
            e => {
              this.mode = e.detail.value
            }
          }"
        >
        </component-toolbar>

        <div id="scene-wrap">
          <things-scene-viewer
            id="scene"
            .scene=${this.scene}
            @scene-changed="${
              e => {
                this.scene = e.detail.value
              }
            }"
            .model=${this.$model}
            .selected=${this.selected}
            @selected-changed="${
              e => {
                this.selected = e.detail.value
              }
            }"
            .mode=${this.mode}
            @mode-changed="${
              e => {
                this.mode = e.detail.value
              }
            }"
            fit="ratio"
            .baseUrl=${this.baseUrl}
            @contextmenu="${e => this.onContextMenu(e)}"
            .provider=${this.provider}
            name="modeler"
          >
            <things-scene-layer type="selection-layer"></things-scene-layer>
            <things-scene-layer type="modeling-layer"></things-scene-layer>
            <things-scene-layer type="guide-layer">
              <things-scene-property name="ruler" value="disabled"></things-scene-property>
            </things-scene-layer>
            <things-scene-layer type="shift-layer">
              <things-scene-property name="text" value="${this.overlay}"></things-scene-property>
              <things-scene-property name="alpha" value="0.3"></things-scene-property>
              <things-scene-property name="fontFamily" value="arial"></things-scene-property>
              <things-scene-property name="fontSize" value="30" type="number"></things-scene-property>
              <things-scene-property name="fontColor" value="navy"></things-scene-property>
              <things-scene-property name="textBaseline" value="top"></things-scene-property>
              <things-scene-property name="textAlign" value="left"></things-scene-property>
              <things-scene-property name="paddingTop" value="50" type="number"></things-scene-property>
              <things-scene-property name="paddingLeft" value="50" type="number"></things-scene-property>
            </things-scene-layer>
            <things-scene-layer type="tag-layer"></things-scene-layer>
            <things-scene-handler type="text-editor"></things-scene-handler>
            <things-scene-handler type="move-handler"></things-scene-handler>
          </things-scene-viewer>

          <things-scene-inspector .scene="${this.scene}"></things-scene-inspector>

          <mwc-fab icon="save" @tap=${e => this.onTapSave(e)} title="save"> </mwc-fab>
        </div>

        <property-sidebar .scene=${this.scene} .selected=${this.selected} ?collapsed=${this.hideProperty}>
        </property-sidebar>
      </div>
    `
  }

  constructor() {
    super()

    this.boardName = ''
    this.model = null
    this.baseUrl = ''
    this.selected = []
    this.mode = 1
    this.provider = null
    this.hideProperty = false
    this.$model = null
    this.overlay = null
    this.scene = null

    // https://webpack.js.org/guides/code-splitting/#dynamic-imports
    // 동적 임포트로 bundle splitting을 시도했으나, es2015 모듈에서는 안되는 듯.
    // import(
    //   /* webpackChunkName: "components-with-tools" */
    //   /* webpackMode: "lazy" */
    //   '../../things-scene-components-with-tools.import').then(elements => {
    //     store.dispatch({
    //       type: 'MODULE-PLUGIN',
    //       elements
    //     });
    //   }).catch(error => 'An error occurred while loading the component');

    /* 각 모듈의 locale정보로 resource bundle을 추가한다. */
    // for (let element in elements) {
    //   let locales = elements[element].locales

    //   locales &&
    //     Object.keys(locales).forEach(lng => {
    //       i18next.addResourceBundle(lng, 'translations', locales[lng], true, true)
    //     })
    // }

    // if (this.store)
    //   this.store.dispatch({
    //     type: 'MODULE-PLUGIN',
    //     elements
    //   })
  }

  stateChanged(state) {
    if (state.route.page !== 'modeler') {
      this.page = null
      this.boardName = null
      this.model = null
      this.baseUrl = null

      return
    }

    if (this.board !== state.boardCurrent) {
      this.board = state.boardCurrent
      this.boardName = state.boardCurrent.name
      this.baseUrl = state.route.rootPath

      this.model = state.boardCurrent.model
    }
  }

  updated(change) {
    change.has('page') && this._onPageChanged(this.page, change.page)
    change.has('model') && this._onModelChanged(this.model)
  }

  firstUpdated() {
    this.addEventListener('sidebar-collapsed-changed', () => {
      this.shadowRoot.getElementById('scene').resize()
    })
  }

  onOpenPreview() {
    this.previewModel = JSON.parse(JSON.stringify(this.scene.model))

    /*
     * paper-dialog appears behind backdrop when inside a <app-header-layout ..
     * https://github.com/PolymerElements/paper-dialog/issues/152
     **/

    var preview = document.createElement('board-preview')

    preview.style.width = '100%'
    preview.style.height = '100%'
    preview.style.margin = '0'
    preview.style.padding = '0'
    preview.model = this.previewModel
    preview.provider = this.provider

    var dialog = document.createElement('paper-dialog')

    dialog.style.width = '100%'
    dialog.style.height = '100%'
    dialog.setAttribute('with-backdrop', true)
    dialog.setAttribute('auto-fit-on-attach', true)
    dialog.setAttribute('always-on-top', true)
    dialog.addEventListener('iron-overlay-closed', () => {
      dialog.parentNode.removeChild(dialog)
    })

    dialog.appendChild(preview)
    document.body.appendChild(dialog)

    requestAnimationFrame(() => {
      dialog.open()
    })
  }

  onDownloadModel() {
    if (!this.scene) return

    var model = JSON.stringify(this.model, null, 2)
    var filename = (this.boardName || 'NONAME') + '-' + Date.now() + '.json'
    saveAs(new Blob([model], { type: 'application/octet-stream' }), filename)
  }

  onTapSave() {
    this.shadowRoot.getElementById('edittoolbar').saveBoard()
  }

  onFullscreen() {
    togglefullscreen(this)
  }

  _onModelChanged(after, before) {
    this.$model = this.model
  }
}

customElements.define(BoardModeller.is, BoardModeller)
