/**
 * @license Copyright © HatioLab Inc. All rights reserved.
 */

import { LitElement, html, css } from 'lit-element'

import '@polymer/paper-radio-group/paper-radio-group'
import '@polymer/paper-dropdown-menu/paper-dropdown-menu'

// import '../../../../components/things-i18n-msg'
import '../../editors/things-editor-buttons-radio'
import '../../editors/things-editor-angle-input'
import '../../editors/things-editor-color'
import '../../editors/things-editor-color-style'

import { PropertySharedStyle } from '../property-shared-style'

class PropertyStyles extends LitElement {
  static get is() {
    return 'property-style'
  }

  static get properties() {
    return {
      value: Object,
      selected: Array,
      fonts: Array
    }
  }

  static get styles() {
    return [
      PropertySharedStyle,
      css`
        paper-slider {
          width: 100%;
        }

        .btn-group paper-button {
          width: 30px;
          height: 25px;
          min-width: initial;
          margin: 0 4px 0 0;
          padding: 0;
          border-radius: 0;
          display: inline-block;
          border-bottom: 2px solid #fff;

          background: url(./assets/images/icon-properties.png) no-repeat;
          background-size: 70%;
        }

        .btn-group paper-button.tbold {
          background-position: 50% -170px;
        }

        .btn-group paper-button.titalic {
          background-position: 50% -205px;
        }

        .btn-group paper-button.tunderline {
          background-position: 50% -240px;
        }

        .btn-group paper-button.tstrikethrough {
          background-position: 50% -415px;
        }

        .btn-group paper-button[active] {
          border-color: #f2471c;
        }

        .line-type paper-listbox {
          overflow: hidden;
          max-width: 100px;
        }
        .line-type paper-item {
          background: url(./assets/images/icon-properties-line-type.png) 50% 0 no-repeat;
          min-height: 25px;
          padding: 3px 9px;
          width: 80px;
        }

        .line-type paper-item.solid {
          background-position: 50% 10px;
        }
        .line-type paper-item.round-dot {
          background-position: 50% -40px;
        }
        .line-type paper-item.square-dot {
          background-position: 50% -90px;
        }
        .line-type paper-item.dash {
          background-position: 50% -140px;
        }
        .line-type paper-item.dash-dot {
          background-position: 50% -190px;
        }
        .line-type paper-item.long-dash {
          background-position: 50% -240px;
        }
        .line-type paper-item.long-dash-dot {
          background-position: 50% -290px;
        }
        .line-type paper-item.long-dash-dot-dot {
          background-position: 50% -340px;
        }

        .line-type .paper-input-container input {
          background: url(./assets/images/icon-properties-line-type.png) 50% 0 no-repeat !important;
        }
        .line-type.solid .paper-input-container input {
          background-position: 50% 5px !important;
        }
        .line-type.round-dot .paper-input-container input {
          background-position: 50% -45px !important;
        }
        .line-type.square-dot .paper-input-container input {
          background-position: 50% -85px !important;
        }
        .line-type.dash .paper-input-container input {
          background-position: 50% -145px !important;
        }
        .line-type.dash-dot .paper-input-container input {
          background-position: 50% -185px !important;
        }
        .line-type.long-dash .paper-input-container input {
          background-position: 50% -245px !important;
        }
        .line-type.long-dash-dot .paper-input-container input {
          background-position: 50% -285px !important;
        }
        .line-type.long-dash-dot-dot .paper-input-container input {
          background-position: 50% -345px !important;
        }

        .arrow-type paper-menu {
          overflow: hidden;
          max-width: 140px;
        }
        .arrow-type paper-item {
          background: url(./assets/images/icon-properties-arrow-type.png) 50% 0 no-repeat;
          min-height: 30px;
          padding: 3px 7px;
          width: 30px;
          float: left;
        }
        .arrow-type paper-item.begin-no {
          background-position: 50% 16px;
        }
        .arrow-type paper-item.begin-arrow {
          background-position: 50% -39px;
        }
        .arrow-type paper-item.begin-open-arrow {
          background-position: 50% -89px;
        }
        .arrow-type paper-item.begin-stealth-arrow {
          background-position: 50% -139px;
        }
        .arrow-type paper-item.begin-diamond-arrow {
          background-position: 50% -190px;
        }
        .arrow-type paper-item.begin-oval-arrow {
          background-position: 50% -238px;
        }
        .arrow-type paper-item.begin-size1 {
          background-position: 50% -286px;
        }
        .arrow-type paper-item.begin-size2 {
          background-position: 50% -336px;
        }
        .arrow-type paper-item.begin-size3 {
          background-position: 50% -386px;
        }
        .arrow-type paper-item.begin-size4 {
          background-position: 50% -436px;
        }
        .arrow-type paper-item.begin-size5 {
          background-position: 50% -486px;
        }
        .arrow-type paper-item.begin-size6 {
          background-position: 50% -536px;
        }
        .arrow-type paper-item.begin-size7 {
          background-position: 50% -589px;
        }
        .arrow-type paper-item.begin-size8 {
          background-position: 50% -639px;
        }
        .arrow-type paper-item.begin-size9 {
          background-position: 50% -689px;
        }
        .arrow-type paper-item.end-no {
          background-position: 50% 16px;
        }
        .arrow-type paper-item.end-arrow {
          background-position: 50% -739px;
        }
        .arrow-type paper-item.end-open-arrow {
          background-position: 50% -789px;
        }
        .arrow-type paper-item.end-stealth-arrow {
          background-position: 50% -839px;
        }
        .arrow-type paper-item.end-diamond-arrow {
          background-position: 50% -890px;
        }
        .arrow-type paper-item.end-oval-arrow {
          background-position: 50% -938px;
        }
        .arrow-type paper-item.end-size1 {
          background-position: 50% -986px;
        }
        .arrow-type paper-item.end-size2 {
          background-position: 50% -1036px;
        }
        .arrow-type paper-item.end-size3 {
          background-position: 50% -1086px;
        }
        .arrow-type paper-item.end-size4 {
          background-position: 50% -1136px;
        }
        .arrow-type paper-item.end-size5 {
          background-position: 50% -1186px;
        }
        .arrow-type paper-item.end-size6 {
          background-position: 50% -1236px;
        }
        .arrow-type paper-item.end-size7 {
          background-position: 50% -1289px;
        }
        .arrow-type paper-item.end-size8 {
          background-position: 50% -1339px;
        }
        .arrow-type paper-item.end-size9 {
          background-position: 50% -1389px;
        }

        .arrow-type .paper-input-container input {
          background: url(./assets/images/icon-properties-arrow-type.png) 110% 0 no-repeat !important;
        }
        .arrow-type.begin-no .paper-input-container input {
          background-position: 110% 5px !important;
        }
        .arrow-type.begin-arrow .paper-input-container input {
          background-position: 110% -50px !important;
        }
        .arrow-type.begin-open-arrow .paper-input-container input {
          background-position: 110% -100px !important;
        }
        .arrow-type.begin-stealth-arrow .paper-input-container input {
          background-position: 110% -150px !important;
        }
        .arrow-type.begin-diamond-arrow .paper-input-container input {
          background-position: 110% -200px !important;
        }
        .arrow-type.begin-oval-arrow .paper-input-container input {
          background-position: 110% -250px !important;
        }
        .arrow-type.begin-size1 .paper-input-container input {
          background-position: 110% -298px !important;
        }
        .arrow-type.begin-size2 .paper-input-container input {
          background-position: 110% -348px !important;
        }
        .arrow-type.begin-size3 .paper-input-container input {
          background-position: 110% -398px !important;
        }
        .arrow-type.begin-size4 .paper-input-container input {
          background-position: 110% -448px !important;
        }
        .arrow-type.begin-size5 .paper-input-container input {
          background-position: 110% -498px !important;
        }
        .arrow-type.begin-size6 .paper-input-container input {
          background-position: 110% -548px !important;
        }
        .arrow-type.begin-size7 .paper-input-container input {
          background-position: 110% -600px !important;
        }
        .arrow-type.begin-size8 .paper-input-container input {
          background-position: 110% -650px !important;
        }
        .arrow-type.begin-size9 .paper-input-container input {
          background-position: 110% -700px !important;
        }
        .arrow-type.end-no .paper-input-container input {
          background-position: 110% 5px !important;
        }
        .arrow-type.end-arrow .paper-input-container input {
          background-position: 110% -750px !important;
        }
        .arrow-type.end-open-arrow .paper-input-container input {
          background-position: 110% -800px !important;
        }
        .arrow-type.end-stealth-arrow .paper-input-container input {
          background-position: 110% -850px !important;
        }
        .arrow-type.end-diamond-arrow .paper-input-container input {
          background-position: 110% -900px !important;
        }
        .arrow-type.end-oval-arrow .paper-input-container input {
          background-position: 110% -950px !important;
        }
        .arrow-type.end-size1 .paper-input-container input {
          background-position: 110% -998px !important;
        }
        .arrow-type.end-size2 .paper-input-container input {
          background-position: 110% -1048px !important;
        }
        .arrow-type.end-size3 .paper-input-container input {
          background-position: 110% -1098px !important;
        }
        .arrow-type.end-size4 .paper-input-container input {
          background-position: 110% -1148px !important;
        }
        .arrow-type.end-size5 .paper-input-container input {
          background-position: 110% -1198px !important;
        }
        .arrow-type.end-size6 .paper-input-container input {
          background-position: 110% -1248px !important;
        }
        .arrow-type.end-size7 .paper-input-container input {
          background-position: 110% -1300px !important;
        }
        .arrow-type.end-size8 .paper-input-container input {
          background-position: 110% -1350px !important;
        }
        .arrow-type.end-size9 .paper-input-container input {
          background-position: 110% -1400px !important;
        }
      `
    ]
  }

  constructor() {
    super()

    this.value = {}
    this.selected = []
    this.fonts = []
  }

  firstUpdated() {
    this.shadowRoot.addEventListener('change', this._onValueChange.bind(this))
  }

  render() {
    return html`
      <fieldset>
        <legend><things-i18n-msg msgid="label.opacity">opacity</things-i18n-msg></legend>
        <paper-slider min="0" max="1" step="0.1" value-key="alpha" .value=${this.value.alpha || 1} editable>
        </paper-slider>
      </fieldset>

      <fieldset>
        <legend><things-i18n-msg msgid="label.text-style">text style</things-i18n-msg></legend>

        <div class="property-grid">
          <label class="property-full-label">
            <things-i18n-msg msgid="label.font-family">Font Family</things-i18n-msg>
          </label>

          <select value-key="fontFamily" .value=${this.value.fontFamily} class="property-full-input">
            <option value=""></option>
            ${
              this.fonts.map(
                font => html`
                  <option value=${font.name}>${font.name}</option>
                `
              )
            }
          </select>

          <label class="property-half-label icon-only-label font-size"></label>
          <input type="number" value-key="fontSize" .value=${this.value.fontSize} class="property-half-input" />

          <label class="property-half-label icon-only-label lineHeight"></label>
          <input type="number" value-key="lineHeight" .value=${this.value.lineHeight} class="property-half-input" />

          <label class="property-half-label icon-only-label color"></label>
          <things-editor-color value-key="fontColor" .value=${this.value.fontColor} class="property-half-input">
          </things-editor-color>

          <label class="property-half-label"></label>
          <div class="property-half-input btn-group">
            <paper-button toggles value-key="bold" ?active=${this.value.bold} class="tbold"> </paper-button>
            <paper-button toggles value-key="italic" ?active=${this.value.italic} class="titalic"> </paper-button>
          </div>
        </div>
      </fieldset>

      <fieldset>
        <legend><things-i18n-msg msgid="label.fill-style">fill style</things-i18n-msg></legend>
        <things-editor-color-style value-key="fillStyle" .value=${this.value.fillStyle}> </things-editor-color-style>
      </fieldset>

      <fieldset>
        <legend><things-i18n-msg msgid="label.line-style">line style</things-i18n-msg></legend>

        <div class="property-grid">
          <label class="property-half-label icon-only-label linewidth"></label>
          <input type="number" value-key="lineWidth" .value=${this.value.lineWidth} class="property-half-input" />

          <label class="property-half-label icon-only-label color"></label>
          <things-editor-color value-key="strokeStyle" .value=${this.value.strokeStyle} class="property-half-input">
          </things-editor-color>

          <label class="property-full-label">
            <things-i18n-msg msgid="label.line-type">line type</things-i18n-msg>
          </label>
          <paper-dropdown-menu no-label-float="true" class="property-full-input line-type solid">
            <!-- solid는 선택된 항목 보여주기위한 class로 하위 paper-item의 class와 동일하게 -->
            <paper-listbox
              value-key="lineDash"
              @selected-changed=${e => this._onValueChange(e)}
              slot="dropdown-content"
              .selected=${this.value.lineDash}
              attr-for-selected="name"
            >
              <paper-item class="solid" name="solid"></paper-item>
              <paper-item class="round-dot" name="round-dot"></paper-item>
              <paper-item class="square-dot" name="square-dot"></paper-item>
              <paper-item class="dash" name="dash"></paper-item>
              <paper-item class="dash-dot" name="dash-dot"></paper-item>
              <paper-item class="long-dash" name="long-dash"></paper-item>
              <paper-item class="long-dash-dot" name="long-dash-dot"></paper-item>
              <paper-item class="long-dash-dot-dot" name="long-dash-dot-dot"></paper-item>
            </paper-listbox>
          </paper-dropdown-menu>

          <label class="property-full-label">
            <things-i18n-msg msgid="label.cap-type">cap type</things-i18n-msg>
          </label>
          <select class="property-full-input select-content" value-key="lineCap" .value=${this.value.lineCap}>
            <option value="butt"> <things-i18n-msg msgid="label.square">square</things-i18n-msg> </option>
            <option value="round"> <things-i18n-msg msgid="label.round">round</things-i18n-msg> </option>
          </select>

          <label class="property-full-label">
            <things-i18n-msg msgid="label.join-type">join type</things-i18n-msg>
          </label>
          <select class="property-full-input select-content" value-key="lineJoin" .value=${this.value.lineJoin}>
            <option value="miter"> <things-i18n-msg msgid="label.miter">miter</things-i18n-msg> </option>
            <option value="round"> <things-i18n-msg msgid="label.round">round</things-i18n-msg> </option>
            <option value="bevel"> <things-i18n-msg msgid="label.bevel">bevel</things-i18n-msg> </option>
          </select>

          ${
            this._isLine(this.selected)
              ? html`
                  <label class="property-full-label">
                    <things-i18n-msg msgid="label.begin-type">begin type</things-i18n-msg>
                  </label>
                  <paper-dropdown-menu no-label-float="true" class="property-full-input arrow-type begin-no">
                    <!-- begin-no는 선택된 항목 보여주기위한 class로 하위 paper-item의 class와 동일하게 -->
                    <paper-listbox
                      value-key="begin"
                      @selected-changed=${e => this._onValueChange(e)}
                      slot="dropdown-content"
                      .selected=${this.value.begin}
                      attr-for-selected="name"
                    >
                      <paper-item class="begin-no" name="none"></paper-item>
                      <paper-item class="begin-arrow" name="arrow"></paper-item>
                      <paper-item class="begin-open-arrow" name="open-arrow"></paper-item>
                      <paper-item class="begin-stealth-arrow" name="sharp-arrow"></paper-item>
                      <paper-item class="begin-diamond-arrow" name="diamond"></paper-item>
                      <paper-item class="begin-oval-arrow" name="oval"></paper-item>
                    </paper-listbox>
                  </paper-dropdown-menu>

                  <label class="property-full-label">
                    <things-i18n-msg msgid="label.begin-size">begin size</things-i18n-msg>
                  </label>
                  <paper-dropdown-menu no-label-float="true" class="property-full-input arrow-type begin-size1">
                    <!-- begin-size1는 선택된 항목 보여주기위한 class로 하위 paper-item의 class와 동일하게 -->
                    <paper-listbox
                      value-key="beginSize"
                      @selected-changed=${e => this._onValueChange(e)}
                      slot="dropdown-content"
                      .selected=${this.value.beginSize}
                      attr-for-selected="name"
                    >
                      <paper-item class="begin-size1" name="size1"></paper-item>
                      <paper-item class="begin-size2" name="size2"></paper-item>
                      <paper-item class="begin-size3" name="size3"></paper-item>
                      <paper-item class="begin-size4" name="size4"></paper-item>
                      <paper-item class="begin-size5" name="size5"></paper-item>
                      <paper-item class="begin-size6" name="size6"></paper-item>
                      <paper-item class="begin-size7" name="size7"></paper-item>
                      <paper-item class="begin-size8" name="size8"></paper-item>
                      <paper-item class="begin-size9" name="size9"></paper-item>
                    </paper-listbox>
                  </paper-dropdown-menu>

                  <label class="property-full-label">
                    <things-i18n-msg msgid="label.end-type">end type</things-i18n-msg>
                  </label>
                  <paper-dropdown-menu no-label-float="true" class="property-full-input arrow-type end-no">
                    <!-- end-no는 선택된 항목 보여주기위한 class로 하위 paper-item의 class와 동일하게 -->
                    <paper-listbox
                      value-key="end"
                      @selected-changed=${e => this._onValueChange(e)}
                      slot="dropdown-content"
                      .selected=${this.value.end}
                      attr-for-selected="name"
                    >
                      <paper-item class="end-no" name="none"></paper-item>
                      <paper-item class="end-arrow" name="arrow"></paper-item>
                      <paper-item class="end-open-arrow" name="open-arrow"></paper-item>
                      <paper-item class="end-stealth-arrow" name="sharp-arrow"></paper-item>
                      <paper-item class="end-diamond-arrow" name="diamond"></paper-item>
                      <paper-item class="end-oval-arrow" name="oval"></paper-item>
                    </paper-listbox>
                  </paper-dropdown-menu>

                  <label class="property-full-label">
                    <things-i18n-msg msgid="label.end-size">end size</things-i18n-msg>
                  </label>
                  <paper-dropdown-menu no-label-float="true" class="property-full-input arrow-type end-size1">
                    <!-- end-size1는 선택된 항목 보여주기위한 class로 하위 paper-item의 class와 동일하게 -->
                    <paper-listbox
                      value-key="endSize"
                      @selected-changed=${e => this._onValueChange(e)}
                      slot="dropdown-content"
                      .selected=${this.value.endSize}
                      attr-for-selected="name"
                    >
                      <paper-item class="end-size1" name="size1"></paper-item>
                      <paper-item class="end-size2" name="size2"></paper-item>
                      <paper-item class="end-size3" name="size3"></paper-item>
                      <paper-item class="end-size4" name="size4"></paper-item>
                      <paper-item class="end-size5" name="size5"></paper-item>
                      <paper-item class="end-size6" name="size6"></paper-item>
                      <paper-item class="end-size7" name="size7"></paper-item>
                      <paper-item class="end-size8" name="size8"></paper-item>
                      <paper-item class="end-size9" name="size9"></paper-item>
                    </paper-listbox>
                  </paper-dropdown-menu>
                `
              : html``
          }
        </div>
      </fieldset>
    `
  }

  _onValueChange(e) {
    var element = e.target
    var key = element.getAttribute('value-key')

    if (!key) {
      return
    }

    var value = element.value

    switch (element.tagName) {
      case 'PAPER-BUTTON':
        value = element.active
        break
      case 'PAPER-LISTBOX':
        value = element.selected
        break
    }

    this.dispatchEvent(
      new CustomEvent('property-change', {
        bubbles: true,
        composed: true,
        detail: {
          [key]: value
        }
      })
    )
  }

  _isLine(selected) {
    var isLine = false

    for (var i = 0; i < selected.length; i++) {
      var comp = selected[i]

      if (!comp.isLine || !comp.isLine()) {
        isLine = false
        return isLine
      }

      isLine = true
    }

    return isLine
  }
}

window.customElements.define(PropertyStyles.is, PropertyStyles)
