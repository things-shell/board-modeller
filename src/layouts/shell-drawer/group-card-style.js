import { css } from 'lit-element'

export const GroupCardStyle = css`
  :host {
    display: block;
    padding: 0px;
  }

  .card {
    padding: 6px 5px 6px 10px;
    border-left: 2px solid transparent;
    border-bottom: 1px solid var(--primary-dark-opacity15-color);
    font-size: 15px;
    color: rgba(255, 255, 255, 8);
    position: relative;
  }

  :host([active='true']) .card {
    border-left: 2px solid var(--primary-accent-color);
    background-color: var(--primary-dark-opacity15-color);
  }

  h1 {
    display: inline;
    margin: 16px 0;
    color: #212121;
    font-size: 15px;
    vertical-align: middle;
  }

  a,
  p {
    display: inline-block;
    font-size: 0.8em;
    margin: 0;
    min-width: 40px;
    min-height: 20px;
    vertical-align: middle;
    color: white;
    text-decoration: none;
  }

  :host([add]) div {
    text-align: center;
  }

  mwc-icon {
    position: absolute;
    top: 0;
    right: 0;
    padding: 9px;
    margin: 1px;

    --mdc-icon-size: 1em;
  }

  mwc-icon:hover {
    background-color: var(--secondary-color);
    color: white;
  }
`
