import { SessionKit } from '@wharfkit/session'
import { WalletPluginAnchor } from '@wharfkit/wallet-plugin-anchor'
import { WebRenderer } from '@wharfkit/web-renderer'

export const CONTRACT_NAME = 'testunicrypt'
export const ENDPOINT = 'https://jungle4.greymass.com'
export const contractAccount = 'testunicrypt'
export const contractName = 'studentreg'

export const sessionKit = new SessionKit({
  appName: 'Student Registration App',
  chains: [{
    id: '73e4385a2708e6d7048834fbc1079f2fabb17b3c125b146af438971e90716c4d',
    url: ENDPOINT
  }],
  walletPlugins: [new WalletPluginAnchor()],
  ui: new WebRenderer()
})

const config = {
  contractAccount,
  contractName,
  endpoint: ENDPOINT
}

export default config
