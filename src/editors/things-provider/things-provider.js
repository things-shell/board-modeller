import { LitElement } from 'lit-element'
import gql from 'graphql-tag'

import { ReferenceMap, create, error } from '../../things-real'

// TODO fetch-client 를 좀더 공통적인 곳으로 옮길 것.
import client from '../../reducer/actions/fetch-client'

class ThingsProvider extends LitElement {
  static get is() {
    return 'things-provider'
  }

  static get properties() {
    return {
      refProvider: Object
    }
  }

  connectedCallback() {
    super.connectedCallback()

    this.refProvider = new ReferenceMap(
      async (boardId, resolve, reject) => {
        try {
          const response = await client.query({
            query: gql`{ 
              board(
                id: "${boardId}"
              ) { id name description model createdAt updatedAt }
            }`
          })

          var board = response.data.board
          var model = (board.model = JSON.parse(board.model))

          var scene

          try {
            scene = await this.refProvider.get(boardId)
            console.warn('Board fetched more than twice.', boardId)
          } catch (e) {
            scene = create({
              model,
              mode: 0,
              refProvider: this.refProvider
            })

            // s.app.baseUrl = undefined;
          }

          resolve(scene, board)
        } catch (e) {
          error(e)
          reject(e)
        }
      },
      async (id, ref) => {
        ref.dispose()
      }
    )

    this.dispatchEvent(new CustomEvent('change', { bubbles: true, composed: true }))
  }
}

customElements.define(ThingsProvider.is, ThingsProvider)
