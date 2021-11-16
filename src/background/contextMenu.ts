function openNewTab() {
  return chrome.tabs.create({
    url: 'popup.html#/'
  })
}

export function initContextMenuActions() {
  chrome.contextMenus.removeAll()

  chrome.contextMenus.create({
    title: 'Open Vite Wallet in a new tab',
    contexts: ['browser_action'],
    async onclick() {
      await openNewTab()
    }
  })
}
