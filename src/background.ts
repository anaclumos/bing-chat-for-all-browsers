import { browser } from 'webextension-polyfill-ts'

browser.webRequest.onBeforeSendHeaders.addListener(
  (details) => {
    const { requestHeaders } = details
    if (requestHeaders) {
      const newHeaders = requestHeaders.map((header) => {
        if (header.name.toLowerCase() === 'user-agent') {
          console.log('Changing user agent from', header.value)
          if (header?.value?.includes('Mobile')) {
            header.value =
              'Mozilla/5.0 (Linux; Android 13; Pixel 6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Mobile Safari/537.36 EdgA/110.0.1587.41'
          } else {
            header.value =
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36 Edg/110.0.100.0'
          }
          console.log('Changing user agent to', header.value)
        }
        return header
      })
      return { requestHeaders: newHeaders }
    }
    return undefined
  },
  { urls: ['*://*.bing.com/*'] },
  ['blocking', 'requestHeaders']
)

browser.runtime.onInstalled.addListener((object) => {
  let externalUrl = 'http://github.com/anaclumos/bing-chat-for-all-browsers'
  if (object.reason.toLowerCase().includes('install')) {
    browser.tabs.create({ url: externalUrl })
  }
})
