import {html} from 'lit';
import {customElement, state} from 'lit/decorators.js';
import {BitcoinConnectElement} from './BitcoinConnectElement.js';
import {withTwind} from './twind/withTwind.js';
import {classes} from './css/classes.js';
import store from '../state/store.js';

/**
 * Displays the balance of the connected wallet (could be sats or fiat)
 */
@customElement('bc-balance')
export class Balance extends withTwind()(BitcoinConnectElement) {
  @state()
  _balance: string | undefined;

  constructor() {
    super();
  }

  override connectedCallback(): void {
    super.connectedCallback();
    (async () => {
      try {
        const provider = store.getState().provider;
        if (!provider) {
          throw new Error('WebLN not enabled');
        }
        if (!provider.getBalance) {
          throw new Error(
            'The current WebLN provider does not support getBalance'
          );
        }
        const balance = await provider.getBalance();
        // TODO: do not rely on global window
        //const balance = store.getState().provider.getBalance();

        this._balance = balance?.balance.toLocaleString(undefined, {
          useGrouping: true,
        });
      } catch (error) {
        this._balance = '⚠️';
        // FIXME: better error handling
        console.error(error);
      }
    })();
  }

  override render() {
    // TODO: if balance is still loading, show skeleton loader
    return html` <span
      class="font-medium font-sans mr-2 flex justify-center items-center gap-0.5 ${classes[
        'text-brand-mixed'
      ]}"
    >
      <span class="font-mono">${this._balance || 0} </span>&nbsp;sats</span
    >`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bc-balance': Balance;
  }
}
