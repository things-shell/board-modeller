/**
 * @license Copyright © HatioLab Inc. All rights reserved.
 */

import { LitElement, html, css } from 'lit-element'

import '@polymer/app-layout/app-toolbar/app-toolbar'
import '@polymer/paper-slider/paper-slider'
import '@polymer/paper-input/paper-input'
import '@polymer/paper-input/paper-textarea'

import '@polymer/neon-animation/animations/scale-up-animation'
import '@polymer/neon-animation/animations/fade-out-animation'
import '@polymer/paper-dialog/paper-dialog'
import '@polymer/paper-dialog-scrollable/paper-dialog-scrollable'

// import { Component } from '../../../things-real'

import { i18next } from '../components/i18next'
import { localize } from '../components/localize-mixin'

import '../components/things-i18n-msg'
import '../layouts/page-toolbar/page-toolbar'

class EditToolbar extends localize(i18next)(LitElement) {
  static get is() {
    return 'edit-toolbar'
  }

  static get properties() {
    return {
      scene: Object,
      selected: Array,
      hideProperty: Boolean,
      labelName: String,

      variables: Object,
      boardGroupList: Array,

      boardCurrent: Object,

      group: Object
    }
  }

  static get styles() {
    return [
      css`
        paper-icon-button {
          background: url(./assets/images/icon-htoolbar.png) no-repeat;
          background-position-x: 50%;
        }

        page-toolbar > label,
        #fullscreen,
        #toggle-property {
          flex: none;
        }

        #align-left {
          background-position-y: 10px;
        }

        #align-center {
          background-position-y: -40px;
        }

        #align-right {
          background-position-y: -90px;
        }

        #align-top {
          background-position-y: -140px;
        }

        #align-middle {
          background-position-y: -190px;
        }

        #align-bottom {
          background-position-y: -240px;
        }

        #undo {
          background-position-y: -590px;
        }

        #redo {
          background-position-y: -640px;
        }

        #front {
          background-position-y: -290px;
        }

        #back {
          background-position-y: -340px;
        }

        #forward {
          background-position-y: -390px;
        }

        #backward {
          background-position-y: -440px;
        }

        #symmetry-x {
          background-position-y: -490px;
        }

        #symmetry-y {
          background-position-y: -540px;
        }

        #group {
          background-position-y: -490px;
        }

        #ungroup {
          background-position-y: -540px;
        }

        #fullscreen {
          background-position-y: -690px;
        }

        #toggle-property {
          background-position-y: -690px;
          float: right;
        }

        #zoomin {
          background-position-y: -740px;
        }

        #zoomout {
          background-position-y: -790px;
        }

        #fit-scene {
          background-position-y: -1490px;
        }

        #cut {
          background-position-y: -840px;
        }

        #copy {
          background-position-y: -890px;
        }

        #paste {
          background-position-y: -940px;
        }

        #delete {
          background-position-y: -990px;
        }

        #font-increase {
          background-position-y: -1040px;
        }

        #font-decrease {
          background-position-y: -1090px;
        }

        #style-copy {
          background-position-y: -1140px;
        }

        #context-menu {
          background-position-y: -690px;
        }

        #symmetry-x {
          background-position-y: -1190px;
        }

        #symmetry-y {
          background-position-y: -1240px;
        }

        #rotate-cw {
          background-position-y: -1290px;
        }

        #rotate-ccw {
          background-position-y: -1340px;
        }

        #distribute-horizontal {
          background-position-y: -1540px;
        }

        #distribute-vertical {
          background-position-y: -1591px;
        }

        #toggle-property {
          background-position-y: -1390px;
        }

        #preview {
          background-position-y: -1638px;
        }

        /* bigger buttons */
        #fullscreen {
          background: url(./assets/images/icon-fullscreen.png) 50% 10px no-repeat;
          width: 45px;
          height: 45px;
          border-left: 1px solid rgba(0, 0, 0, 0.1);
        }

        #toggle-property {
          background: url(./assets/images/icon-collapse.png) 80% 10px no-repeat;
          width: 45px;
          height: 45px;
          border-left: 1px solid rgba(0, 0, 0, 0.1);
        }

        #toggle-property[active] {
          background: url(./assets/images/icon-collapse-active.png) 80% 10px no-repeat;
        }
      `
    ]
  }

  constructor() {
    super()

    this.scene
    this.selected = []
    this.hideProperty = false
    this.labelName = 'SAMPLE'
    this.variables = {}
    this.boardGroupList = []
    this.boardCurrent = null
    this.group = {}
  }

  firstUpdated() {
    window.addEventListener('paste', e => {
      this.cliped = e.clipboardData.getData('text/plain')
    })

    this.shadowRoot.getElementById('align-left').addEventListener('tap', this.onTapAlign.bind(this))
    this.shadowRoot.getElementById('align-center').addEventListener('tap', this.onTapAlign.bind(this))
    this.shadowRoot.getElementById('align-right').addEventListener('tap', this.onTapAlign.bind(this))
    this.shadowRoot.getElementById('align-top').addEventListener('tap', this.onTapAlign.bind(this))
    this.shadowRoot.getElementById('align-middle').addEventListener('tap', this.onTapAlign.bind(this))
    this.shadowRoot.getElementById('align-bottom').addEventListener('tap', this.onTapAlign.bind(this))
    this.shadowRoot.getElementById('undo').addEventListener('tap', this.onTapUndo.bind(this))
    this.shadowRoot.getElementById('redo').addEventListener('tap', this.onTapRedo.bind(this))
    this.shadowRoot.getElementById('front').addEventListener('tap', this.onTapZorder.bind(this))
    this.shadowRoot.getElementById('back').addEventListener('tap', this.onTapZorder.bind(this))
    this.shadowRoot.getElementById('forward').addEventListener('tap', this.onTapZorder.bind(this))
    this.shadowRoot.getElementById('backward').addEventListener('tap', this.onTapZorder.bind(this))
    this.shadowRoot.getElementById('fullscreen').addEventListener('tap', this.onTapFullscreen.bind(this))
    this.shadowRoot.getElementById('cut').addEventListener('tap', this.onTapCut.bind(this))
    this.shadowRoot.getElementById('copy').addEventListener('tap', this.onTapCopy.bind(this))
    this.shadowRoot.getElementById('paste').addEventListener('tap', this.onTapPaste.bind(this))
    this.shadowRoot.getElementById('delete').addEventListener('tap', this.onTapDelete.bind(this))
    this.shadowRoot.getElementById('font-increase').addEventListener('tap', this.onTapFontIncrease.bind(this))
    this.shadowRoot.getElementById('font-decrease').addEventListener('tap', this.onTapFontDecrease.bind(this))
    this.shadowRoot.getElementById('group').addEventListener('tap', this.onTapGroup.bind(this))
    this.shadowRoot.getElementById('ungroup').addEventListener('tap', this.onTapUngroup.bind(this))
    this.shadowRoot.getElementById('symmetry-x').addEventListener('tap', this.onTapSymmetryX.bind(this))
    this.shadowRoot.getElementById('symmetry-y').addEventListener('tap', this.onTapSymmetryY.bind(this))
    this.shadowRoot.getElementById('rotate-cw').addEventListener('tap', this.onTapRotateCW.bind(this))
    this.shadowRoot.getElementById('rotate-ccw').addEventListener('tap', this.onTapRotateCCW.bind(this))
    this.shadowRoot.getElementById('toggle-property').addEventListener('tap', this.onTapToggle.bind(this))
    this.shadowRoot.getElementById('fit-scene').addEventListener('tap', this.onTapFitScene.bind(this))
    this.shadowRoot.getElementById('distribute-vertical').addEventListener('tap', this.onTapDistribute.bind(this))
    this.shadowRoot.getElementById('distribute-horizontal').addEventListener('tap', this.onTapDistribute.bind(this))
    this.shadowRoot.getElementById('preview').addEventListener('tap', this.onTapPreview.bind(this))

    // TODO injection 으로 변경합시다.
    var modelerScene = this.parentNode.querySelector('things-scene-viewer')

    var userOS = this._isMacOS() // OS가 맥인지 확인

    modelerScene.addEventListener('keydown', e => {
      this.onShortcut(e, userOS)
      modelerScene.focus()
    })
  }

  stateChanged(state) {
    this.boardGroupList = state.boardGroupList
    this.boardCurrent = state.boardCurrent
    this.group = state.boardGroupCurrent
  }

  updated(change) {
    change.has('scene') && this.onSceneChanged(this.scene, change.scene)
    change.has('selected') && this.onSelectedChanged(this.selected, change.selected)
  }

  render() {
    return html`
      <page-toolbar>
        <label>${this.buildTitle(this.boardCurrent)}</label>

        <paper-icon-button id="undo" title="undo (${this.getShortcutString('cmd', 'z')})"> </paper-icon-button>
        <paper-icon-button id="redo" title="redo (${this.getShortcutString('cmd', 'shift', 'z')})"> </paper-icon-button>

        <span class="vline"></span>

        <paper-icon-button id="cut" title="cut (${this.getShortcutString('cmd', 'x')})"> </paper-icon-button>
        <paper-icon-button id="copy" title="copy (${this.getShortcutString('cmd', 'c')})"> </paper-icon-button>
        <paper-icon-button id="paste" title="paste (${this.getShortcutString('cmd', 'v')})"> </paper-icon-button>
        <paper-icon-button
          id="delete"
          title="delete (${this.getShortcutString('backspace')}, ${this.getShortcutString('delete')})"
        >
        </paper-icon-button>

        <span class="vline"></span>

        <!-- TODO Implement style-copy
        <paper-icon-button id="style-copy" title="format painter"></paper-icon-button>
        <span class="vline"></span>
      -->

        <paper-icon-button
          data-align="left"
          id="align-left"
          title="align left (${this.getShortcutString('alt', 'shift', 'l')})"
        >
        </paper-icon-button>
        <paper-icon-button
          data-align="center"
          id="align-center"
          title="align center (${this.getShortcutString('alt', 'shift', 'c')})"
        >
        </paper-icon-button>
        <paper-icon-button
          data-align="right"
          id="align-right"
          title="align right (${this.getShortcutString('alt', 'shift', 'r')})"
        >
        </paper-icon-button>

        <paper-icon-button
          data-align="top"
          id="align-top"
          title="align top (${this.getShortcutString('alt', 'shift', 't')})"
        >
        </paper-icon-button>
        <paper-icon-button
          data-align="middle"
          id="align-middle"
          title="align middle (${this.getShortcutString('alt', 'shift', 'm')})"
        >
        </paper-icon-button>
        <paper-icon-button
          data-align="bottom"
          id="align-bottom"
          title="align bottom (${this.getShortcutString('alt', 'shift', 'b')})"
        >
        </paper-icon-button>

        <paper-icon-button
          data-distribute="HORIZONTAL"
          id="distribute-horizontal"
          title="distribute horizontally (${this.getShortcutString('alt', 'shift', 'h')})"
        >
        </paper-icon-button>

        <paper-icon-button
          data-distribute="VERTICAL"
          id="distribute-vertical"
          title="distribute vertically (${this.getShortcutString('alt', 'shift', 'v')})"
        >
        </paper-icon-button>

        <span class="vline"></span>

        <paper-icon-button
          id="front"
          data-zorder="front"
          title="bring to front (${this.getShortcutString('cmd', 'shift', 'f')})"
        >
        </paper-icon-button>
        <paper-icon-button
          id="back"
          data-zorder="back"
          title="send to back (${this.getShortcutString('cmd', 'shift', 'b')})"
        >
        </paper-icon-button>
        <paper-icon-button
          id="forward"
          data-zorder="forward"
          title="bring forward (${this.getShortcutString('cmd', 'f')})"
        >
        </paper-icon-button>
        <paper-icon-button
          id="backward"
          data-zorder="backward"
          title="send backward (${this.getShortcutString('cmd', 'b')})"
        >
        </paper-icon-button>

        <span class="vline"></span>

        <paper-icon-button id="symmetry-x" title="symmetry-x (${this.getShortcutString('alt', 'shift', 'x')})">
        </paper-icon-button>
        <paper-icon-button id="symmetry-y" title="symmetry-y (${this.getShortcutString('alt', 'shift', 'y')})">
        </paper-icon-button>
        <paper-icon-button id="rotate-cw" title="rotate clockwise (${this.getShortcutString('alt', 'shift', 'e')})">
        </paper-icon-button>
        <paper-icon-button
          id="rotate-ccw"
          title="rotate counter clockwise (${this.getShortcutString('alt', 'shift', 'w')})"
        >
        </paper-icon-button>

        <span class="vline"></span>

        <paper-icon-button id="group" title="group (${this.getShortcutString('cmd', 'g')})"> </paper-icon-button>
        <paper-icon-button id="ungroup" title="ungroup (${this.getShortcutString('cmd', 'shift', 'g')})">
        </paper-icon-button>

        <span class="vline"></span>

        <paper-icon-button id="font-increase" title="increase font size"></paper-icon-button>
        <paper-icon-button id="font-decrease" title="decrease font size"></paper-icon-button>

        <span class="vline"></span>

        <paper-icon-button id="fit-scene" title="fit scene (${this.getShortcutString('cmd', 'd')})">
        </paper-icon-button>

        <span class="vline"></span>

        <paper-icon-button id="preview" title="preview (${this.getShortcutString('ctrl', 'p')})"> </paper-icon-button>

        <paper-icon-button id="fullscreen" title="fullscreen (${this.getShortcutString('f11')})"> </paper-icon-button>

        <paper-icon-button
          id="toggle-property"
          title="toggle property panel (${this.getShortcutString('cmd', 'h')})"
          toggles="true"
        >
        </paper-icon-button>
      </page-toolbar>

      <paper-dialog
        id="save-new-dialog"
        entry-animation="scale-up-animation"
        exit-animation="fade-out-animation"
        @iron-overlay-closed=${e => this.onSaveNewDialogClosed(e)}
        no-overlap
      >
        <h2><things-i18n-msg msgid="label.save-new-board">Save New Board</things-i18n-msg></h2>
        <paragraph>
          <things-i18n-msg msgid="label.pls-name-board">Please, give a name for the new board.</things-i18n-msg>
        </paragraph>

        <paper-input
          always-float-label
          .label="${i18next.t('label.name')}"
          @change="${e => (this.newBoardName = e.target.value)}"
          .value=${this.newBoardName}
        >
        </paper-input>
        <paper-textarea
          always-float-label
          .label="${i18next.t('label.description')}"
          @value-changed=${e => (this.newBoardDescription = e.target.value)}
          rows="1"
          .value=${this.newBoardDescription}
        >
        </paper-textarea>

        <label>${i18next.t('label.group')}</label>
        <select @change=${e => (this.newBoardGroup = e.target.value)} .value=${this.newBoardGroup || this.group.id}>
          <option value=""></option>
          ${
            this.boardGroupList.map(
              item => html`
                <option value=${item.id}>${item.name}</option>
              `
            )
          }
        </select>

        <div class="buttons">
          <paper-button dialog-dismiss> <things-i18n-msg msgid="button.cancel">Cancel</things-i18n-msg> </paper-button>
          <paper-button dialog-confirm autofocus>
            <things-i18n-msg msgid="button.accept">Accept</things-i18n-msg>
          </paper-button>
        </div>
      </paper-dialog>
    `
  }

  buildTitle(boardCurrent) {
    return (boardCurrent && boardCurrent.name) || 'NO TITLE'
  }

  _isMacOS() {
    return navigator.userAgent.indexOf('Mac') != -1
  }

  getSymbol(key) {
    var symbol
    switch (key) {
      case 'cmd':
      case 'ctrl':
        symbol = this._isMacOS() ? '⌘' : 'Ctrl'
        break
      case 'shift':
        symbol = this._isMacOS() ? '⇧' : 'Shift'
        break
      case 'alt':
      case 'option':
        symbol = this._isMacOS() ? '⌥' : 'Alt'
        break
      case 'backspace':
        symbol = this._isMacOS() ? '⌫' : 'BackSpace'
        break
      case 'delete':
        symbol = this._isMacOS() ? '⌦' : 'Del'
        break
      default:
        symbol = key.toUpperCase()
        break
    }

    return symbol
  }

  getShortcutString() {
    var symbols = []
    for (var i = 0; i < arguments.length; i++) {
      symbols.push(this.getSymbol(arguments[i]))
    }

    return symbols.join(this._isMacOS() ? '' : '+')
  }

  onShortcut(e, MacOS) {
    if (MacOS) var ctrlKey = e.metaKey
    else var ctrlKey = e.ctrlKey

    var altKey = e.altKey
    var shiftKey = e.shiftKey

    switch (e.code) {
      case 'KeyZ':
        if (ctrlKey && !shiftKey) this.onTapUndo()
        else if (ctrlKey && shiftKey) this.onTapRedo()
        break
      case 'KeyY':
        if (ctrlKey && !shiftKey) this.onTapRedo()
        else if (altKey && shiftKey) this.onTapSymmetryY()
        break
      case 'KeyC':
        if (ctrlKey && !shiftKey) this.onTapCopy()
        else if (altKey && shiftKey) this.onTapAlign('center')
        break
      case 'KeyX':
        if (ctrlKey && !shiftKey) this.onTapCut()
        else if (altKey && shiftKey) this.onTapSymmetryX()
        break
      case 'KeyV':
        if (ctrlKey && !shiftKey) this.onTapPaste()
        else if (altKey && shiftKey) this.onTapDistribute('VERTICAL')
        break
      case 'Delete':
      case 'Backspace':
        this.onTapDelete()
        break
      case 'KeyG':
        if (ctrlKey && !shiftKey) this.onTapGroup()
        else if (ctrlKey && shiftKey) this.onTapUngroup()
        break
      case 'KeyF':
        if (ctrlKey && !shiftKey) this.onTapZorder(forward)
        else if (ctrlKey && shiftKey) this.onTapZorder(front)
        break
      case 'KeyB':
        if (ctrlKey && !shiftKey) this.onTapZorder(backward)
        else if (ctrlKey && shiftKey) this.onTapZorder(back)
        else if (altKey && shiftKey) this.onTapAlign('bottom')
        break
      case 'Equal':
        if (ctrlKey) this.onTapZoom(zoomin)
        break
      case 'Minus':
        if (ctrlKey) this.onTapZoom(zoomout)
        break
      case 'KeyH':
        if (ctrlKey && !shiftKey) this.onTapToggle()
        else if (altKey && shiftKey) this.onTapDistribute('HORIZONTAL')
        break
      case 'F11':
        this.onTapFullscreen()
        break
      case 'KeyS':
        if (ctrlKey) {
          this.saveBoard()
          e.preventDefault()
        }
        break
      case 'KeyP':
        if (ctrlKey) this.onTapPreview()
        break
      case 'KeyA':
        if (ctrlKey) this.onTapSelectAll()
        break
      case 'KeyL':
        if (altKey && shiftKey) this.onTapAlign('left')
        break
      case 'KeyR':
        if (altKey && shiftKey) this.onTapAlign('right')
        break
      case 'KeyM':
        if (altKey && shiftKey) this.onTapAlign('middle')
        break
      case 'KeyT':
        if (altKey && shiftKey) this.onTapAlign('top')
        break
      case 'KeyY':
        if (altKey && shiftKey) this.onTapSymmetryY()
        break
      case 'KeyD':
        if (ctrlKey) this.onTapFitScene()
        break
      case 'KeyE':
        if (altKey && shiftKey) this.onTapRotateCW()
        else if (ctrlKey && shiftKey) this.onTapDownloadModel()
        break
      case 'KeyW':
        if (altKey && shiftKey) this.onTapRotateCCW()
        break
      case 'Digit1':
        if (ctrlKey) console.log('MODEL', this.scene && this.scene.model)
        break
      case 'Digit2':
        if (ctrlKey) console.log('SELECTED', this.scene && this.scene.selected)
        break
      case 'Digit3':
        // if (ctrlKey) console.log('RESIDENTS', Component.residents)
        break
    }
  }

  onExecute(command, undoable, redoable) {
    this.shadowRoot.getElementById('undo').disabled = !undoable
    this.shadowRoot.getElementById('redo').disabled = !redoable
  }

  onUndo(undoable, redoable) {
    this.shadowRoot.getElementById('undo').disabled = !undoable
    this.shadowRoot.getElementById('redo').disabled = !redoable
  }

  onRedo(undoable, redoable) {
    this.shadowRoot.getElementById('undo').disabled = !undoable
    this.shadowRoot.getElementById('redo').disabled = !redoable
  }

  onSceneChanged(after, before) {
    // if (before) {
    //   before.off('execute', this.onExecute, this)
    //   before.off('undo', this.onUndo, this)
    //   before.off('redo', this.onRedo, this)
    // }

    if (after) {
      after.on('execute', this.onExecute, this)
      after.on('undo', this.onUndo, this)
      after.on('redo', this.onRedo, this)
    }
  }

  onSelectedChanged(after, before) {
    var alignable = after.length > 1

    this.shadowRoot.getElementById('align-left').disabled = !alignable
    this.shadowRoot.getElementById('align-center').disabled = !alignable
    this.shadowRoot.getElementById('align-right').disabled = !alignable
    this.shadowRoot.getElementById('align-top').disabled = !alignable
    this.shadowRoot.getElementById('align-middle').disabled = !alignable
    this.shadowRoot.getElementById('align-bottom').disabled = !alignable

    var movable = after.length === 1

    /* forward, backward 이동은 한 컴포넌트만 가능하다. */
    this.shadowRoot.getElementById('forward').disabled = !movable
    this.shadowRoot.getElementById('backward').disabled = !movable

    /* 여러 컴포넌트는 front, back 이동이 가능하다. */
    this.shadowRoot.getElementById('front').disabled = !(alignable || movable)
    this.shadowRoot.getElementById('back').disabled = !(alignable || movable)
  }

  onTapUndo(e) {
    this.scene && this.scene.undo()
  }

  onTapRedo(e) {
    this.scene && this.scene.redo()
  }

  onTapCut(e) {
    this.scene && this.scene.cut()
  }

  onTapCopy(e) {
    var copied = this.scene && this.scene.copy()

    if (!copied) return

    var textArea = document.createElement('textarea')
    textArea.style.position = 'absolute'
    textArea.style.opacity = '0'
    textArea.value = copied
    document.body.appendChild(textArea)

    setTimeout(() => {
      textArea.select()

      let succeess = document.execCommand('copy')
      document.body.removeChild(textArea)
    }, 100)

    this.cliped = copied
  }

  onTapPaste(e) {
    setTimeout(() => {
      this.scene && this.scene.paste(this.cliped)
    }, 100)
  }

  onTapDelete(e) {
    this.scene && this.scene.remove()
  }

  onTapSelectAll(e) {
    this.scene.select('(child)')
  }

  onTapFontIncrease(e) {
    var selected = this.scene.selected

    this.scene.undoableChange(function() {
      selected.forEach(function(component) {
        var fontSize = component.get('fontSize')

        if (!fontSize) fontSize = '15'

        if (fontSize) {
          var size = parseInt(fontSize)
          component.set('fontSize', size + 1)
        }
      })
    })
  }

  onTapFontDecrease(e) {
    var selected = this.scene.selected

    this.scene.undoableChange(function() {
      selected.forEach(function(component) {
        var fontSize = component.get('fontSize')

        if (!fontSize) fontSize = '15'

        if (fontSize) {
          var size = parseInt(fontSize)
          if (size > 1) component.set('fontSize', size - 1)
        }
      })
    })
  }

  onTapAlign(e) {
    if (!this.scene) return

    var selected = this.scene.selected
    if (selected.length <= 1) return

    if (e.target) {
      var button = e.target

      while (!button.hasAttribute('data-align') && button !== document.body) button = button.parentElement

      var align = button.getAttribute('data-align')
    } else {
      var align = e
    }

    this.scene.align(align)
  }

  onTapZorder(e) {
    if (!this.scene) return

    var selected = this.scene.selected
    if (selected.length < 1) return
    if (e.target) {
      var button = e.target

      while (!button.hasAttribute('data-zorder') && button !== document.body) button = button.parentElement

      var zorder = button.getAttribute('data-zorder')
    } else {
      var zorder = e.getAttribute('data-zorder')
    }

    this.scene.zorder(zorder)
  }

  onTapSymmetryX(e) {
    this.scene && this.scene.symmetryX()
  }

  onTapSymmetryY(e) {
    this.scene && this.scene.symmetryY()
  }

  onTapRotateCW(e) {
    if (!this.scene) return

    var selected = this.scene.selected

    this.scene.undoableChange(function() {
      selected.forEach(function(component) {
        var rotation = component.get('rotation')

        if (!rotation) rotation = 0

        component.set('rotation', (rotation + Math.PI / 2) % (Math.PI * 2))
      })
    })
  }

  onTapRotateCCW(e) {
    if (!this.scene) return

    var selected = this.scene.selected

    this.scene.undoableChange(function() {
      selected.forEach(function(component) {
        var rotation = component.get('rotation')

        if (!rotation) rotation = 0

        component.set('rotation', (rotation - Math.PI / 2) % (Math.PI * 2))
      })
    })
  }

  onTapGroup(e) {
    this.scene && this.scene.group()
  }

  onTapUngroup(e) {
    this.scene && this.scene.ungroup()
  }

  onTapFullscreen(e) {
    this.dispatchEvent(new CustomEvent('modeler-fullscreen'))
  }

  onTapToggle(e) {
    this.hideProperty = !this.hideProperty
    this.dispatchEvent(
      new CustomEvent('hide-property-changed', {
        bubbles: true,
        composed: true,
        detail: { value: this.hideProperty }
      })
    )
  }

  onTapFitScene(e) {
    if (this.scene) {
      this.scene.resize()
      this.scene.fit('ratio')
    }
  }

  onTapPreview(e) {
    this.dispatchEvent(new CustomEvent('open-preview'))
  }

  onTapDownloadModel(e) {
    this.dispatchEvent(new CustomEvent('download-model'))
  }

  onTapDistribute(e) {
    if (!this.scene) return

    var selected = this.scene.selected
    if (selected.length <= 1) return
    if (e.target) {
      var button = e.target

      while (!button.hasAttribute('data-distribute') && button !== document.body) button = button.parentElement

      var distribute = button.getAttribute('data-distribute')
    } else {
      var distribute = e
    }

    this.scene.distribute(distribute)
  }

  createBoard() {
    try {
      store
        .dispatch(
          createBoard({
            ...this.boardCurrent,
            model: this.scene.model
          })
        )
        .then(dispatch => {
          var state = store.getState()
          dispatch(setRoute('modeler', state.boardCurrent.id))
        })
    } catch (e) {
      if (this.showToastMsg) this.showToastMsg(e)
    }
  }

  updateBoard() {
    try {
      store.dispatch(
        updateBoard({
          ...this.boardCurrent,
          model: this.scene.model
        })
      )
    } catch (e) {
      if (this.showToastMsg) this.showToastMsg(e)
    }
  }

  saveBoard() {
    if (!this.boardCurrent.name) {
      this.newBoardName = ''
      this.newBoardDescription = ''
      this.newBoardGroup = this.group.id

      this.shadowRoot.getElementById('save-new-dialog').open()
    } else {
      this.updateBoard()
    }
  }

  onSaveNewDialogClosed(e) {
    var dialog = e.target

    if (!dialog.closingReason.confirmed) return

    this.boardCurrent.name = this.newBoardName
    this.boardCurrent.description = this.newBoardDescription
    this.boardCurrent.group = this.newBoardGroup

    this.createBoard()
  }
}

customElements.define(EditToolbar.is, EditToolbar)
