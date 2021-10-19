chrome.runtime.sendMessage({ action: 'GET_TAB_ID_INNER_EVENT_REQUEST' }, () => {
  injectScript()
})

function injectScript() {
  try {
    const node = document.head || document.documentElement
    const script = document.createElement('script')
    script.setAttribute('type', 'text/javascript')
    script.setAttribute('src', chrome.extension.getURL('inject-script.js'))
    node.appendChild(script)
    console.info('✅ ViteWallet provider injected')
  } catch (e) {
    console.error('🚨 ViteWallet provider injection failed', e)
  }
}
