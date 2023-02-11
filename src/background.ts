import { browser } from "webextension-polyfill-ts"

browser.webRequest.onBeforeSendHeaders.addListener(
  (details) => {
    const { requestHeaders } = details
    if (requestHeaders) {
      const newHeaders = requestHeaders.map((header) => {
        if (header.name.toLowerCase() === 'user-agent') {
          console.log('Changing user agent from', header.value)
          header.value = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36 Edg/110.0.100.0'
          console.log('Changing user agent to', header.value)
        }
        return header
      })
      return { requestHeaders: newHeaders }
    }
    return undefined
  },
  { urls: ['*://*.bing.com/*'] },
  ['blocking', 'requestHeaders'],
)

