import { LitElement, html } from 'lit-element'

import Sortable from './sortable'

export class ThingsSortable extends LitElement {
  static get is() {
    return 'things-sortable'
  }

  static get properties() {
    return {
      group: { type: Object },
      sort: { type: Boolean },
      disabled: { type: Boolean },
      store: { type: Object },
      handle: { type: String },
      scrollSensitivity: { type: Number },
      scrollSpeed: { type: Number },
      ghostClass: { type: String },
      chosenClass: { type: String },
      ignore: { type: String },
      filter: { type: Object },
      animation: { type: Number },
      dropBubble: { type: Boolean },
      dragoverBubble: { type: Boolean },
      dataIdAttr: { type: String },
      delay: { type: Number },
      forceFallback: { type: Boolean },
      fallbackClass: { type: String },
      fallbackOnBody: { type: Boolean },
      swapThreshold: { type: Number },
      invertSwap: { type: Boolean },
      invertedSwapThreshold: { type: Number },
      draggable: { type: String, reflect: true },
      scroll: { type: Boolean, reflect: true }
    }
  }

  constructor() {
    super()

    this.group = 'things-tree'
    this.sort = true
    this.disabled = false
    this.store = null
    this.handle = null
    this.scrollSensitivity = 30
    this.scrollSpeed = 10
    this.ghostClass = 'sortable-ghost'
    this.chosenClass = 'sortable-chosen'
    this.ignore = 'a, img'
    this.filter = null
    this.animation = 500
    this.dropBubble = true
    this.dragoverBubble = true
    this.dataIdAttr = 'data-id'
    this.delay = 0
    this.forceFallback = false
    this.fallbackClass = 'sortable-fallback'
    this.fallbackOnBody = false
    this.swapThreshold = 0.5
    this.invertSwap = false // invert always
    this.invertedSwapThreshold = null // will be set to same as swapThreshold if default
    this.draggable = '>*'
    this.scroll = true
  }

  updated(change) {
    if (!this.sortable) return

    for (var [key, value] of change) {
      this.sortable.option(key, this[key])
    }
  }

  render() {
    return html`
      <slot></slot>
    `
  }

  connectedCallback() {
    super.connectedCallback()

    var options = {}

    for (var key in ThingsSortable.properties) {
      options[key] = this[key]
    }

    ;[
      'onUpdate',
      'onAdd',
      'onRemove',
      'onChoose',
      'onStart',
      'onEnd',
      'onSort',
      'onFilter',
      'onMove',
      'onClone'
    ].forEach(name => {
      options[name] = this[name].bind(this)
    })

    this.sortable = Sortable.create(this, options)
  }

  disconnectedCallback() {
    super.disconnectedCallback()

    if (this.sortable) {
      this.sortable.destroy()
    }
  }

  onUpdate(e) {
    console.log('onUpdate')

    // let who = this.childNodes[e.oldIndex]
    // let before = this.childNodes[e.newIndex]

    // this.insertBefore(who, before)

    // this.data = data.splice(e.oldIndex, 1, e.newIndex, datum)

    this.dispatchEvent(new CustomEvent('update', { bubbles: true, composed: true, detail: e }))
  }

  onAdd(e) {
    console.log('onAdd')

    // var froms = e.from.childNodes
    // var who = froms[froms.length - 1]
    // var before = this.childNodes[e.newIndex]

    // this.insertBefore(who, before)

    this.dispatchEvent(new CustomEvent('add', { bubbles: true, composed: true, detail: e }))
  }

  onRemove(e) {
    // Donot remove if group.pull is clone
    // if (e.target.group.pull === 'clone') {
    //   return false
    // }

    // if (template) {
    //   var item = template.splice('items', e.oldIndex, 1)[0]
    //   e.model = { item: item }
    // }

    // console.log('onRemove')
    // var who = this.childNodes[e.oldIndex]
    // this.removeChild(who)

    this.dispatchEvent(new CustomEvent('remove', { bubbles: true, composed: true, detail: e }))
  }

  onChoose(e) {
    this.dispatchEvent(new CustomEvent('choose', { bubbles: true, composed: true, detail: e }))
  }

  onStart(e) {
    this.dispatchEvent(new CustomEvent('start', { bubbles: true, composed: true, detail: e }))
  }

  onEnd(e) {
    this.dispatchEvent(new CustomEvent('end', { bubbles: true, composed: true, detail: e }))
  }

  onSort(e) {
    this.dispatchEvent(new CustomEvent('sort', { bubbles: true, composed: true, detail: e }))
  }

  onFilter(e) {
    this.dispatchEvent(new CustomEvent('filter', { bubbles: true, composed: true, detail: e }))
  }

  onMove(e) {
    this.dispatchEvent(new CustomEvent('move', { bubbles: true, composed: true, detail: e }))
  }

  onClone(e) {
    this.dispatchEvent(new CustomEvent('clone', { bubbles: true, composed: true, detail: e }))
  }
}

customElements.define(ThingsSortable.is, ThingsSortable)
