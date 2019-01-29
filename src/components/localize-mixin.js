/**
 * @license Copyright © HatioLab Inc. All rights reserved.
 */

let _i18nextInitialized = false

export const localize = i18next => baseElement =>
  class extends baseElement {
    shouldUpdate() {
      return _i18nextInitialized
    }

    // _shouldRender(props, changedProps, old) {
    //   // Also check active property used by PageViewElement
    //   return changedProps && changedProps.active
    //     ? props.active && _i18nextInitialized
    //     : _i18nextInitialized
    // }

    connectedCallback() {
      if (!_i18nextInitialized) {
        i18next.on('initialized', options => {
          _i18nextInitialized = true
          this.requestUpdate()
        })
      }

      i18next.on('languageChanged', () => {
        this.requestUpdate()
      })

      if (super.connectedCallback) {
        super.connectedCallback()
      }
    }
  }
