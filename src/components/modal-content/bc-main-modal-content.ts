import {customElement} from 'lit/decorators.js';
import {BitcoinConnectElement} from '../BitcoinConnectElement';
import {withTwind} from '../twind/withTwind';
import {css, html} from 'lit';
import '../internal/bci-button';
import '../internal/bci-connecting';
import '../bc-modal-header';
import '../bc-router-outlet';
import {bcLogo} from '../icons/bcLogo';
import {bcCircleIcon} from '../icons/bcCircleIcon';
import {classes} from '../css/classes';

// TODO: rename: bc-connect-flow?
@customElement('bc-main-modal-content')
export class MainModalContent extends withTwind()(BitcoinConnectElement) {
  static override styles = [
    ...super.styles,
    css`
      :host {
        display: flex;
        justify-content: center;
        width: 100%;
      }
    `,
  ];

  override render() {
    return html`<div class="w-full flex-col justify-center items-center">
      <bc-modal-header class="flex w-full" showHelp>
        <div class="${classes['text-brand-mixed']} mr-[2px]">
          ${bcCircleIcon}
        </div>
        <div class="${classes['text-foreground']}">${bcLogo}</div>
      </bc-modal-header>
      <div class="flex w-full pt-8">
        ${this._connecting
          ? html`<bci-connecting class="flex w-full"></bci-connecting>`
          : html` <bc-router-outlet class="flex w-full"></bc-router-outlet>`}
      </div>
      ${this._error
        ? html`<p class="mt-4 font-sans text-red-500">${this._error}</p>`
        : null}
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bc-main-modal-content': MainModalContent;
  }
}
