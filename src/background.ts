// ** How this works ** //
/*
Microsoft Bing checks if the user agent is a represents a Chromium Browser (as Microsoft Edge is based on Chromium),
then it checks if it is the Microsoft Edge Browser by using the suffix Microsoft Bing adds to the user agent to enable Bing Chat.

This limitation of Bing Chat to only Microsoft Edge users is a synthetic limitation, as it is possible to spoof the user agent to make Bing Chat work on other browsers.

On Chrome (and other chromium based browsers): it will simply append the Microsoft Edge useragent suffix to the user agent
On Firefox it will replace the entire user agent with a hard coded Chrome user agent with the Microsoft Edge useragent suffix appended to it.
*/

//Microsoft Edge has two user agent suffixes, one for mobile and one for desktop
const MOBILE_UA_SUFFIX = 'EdgA/110.0.1587.41'
const DESKTOP_UA_SUFFIX = 'Edg/110.0.100.0'

const DESKTOP_UA_PREFIX =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36'
const MOBILE_UA_PREFIX =
  'Mozilla/5.0 (Linux; Android 13; Pixel 6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Mobile Safari/537.36'

//formulate the UserAgent
const uaMaker = (suffix: string, isMobile: boolean): string => {
  if (navigator.userAgent.includes('Firefox')) {
    //on Firefox, we replace the entire user agent with a hard coded Chrome user agent with the Microsoft Edge useragent suffix appended to it.
    if (isMobile) {
      return `${MOBILE_UA_PREFIX} ${suffix}`
    } else {
      return `${DESKTOP_UA_PREFIX} ${suffix}`
    }
  } else {
    //on Chrome (and other chromium based browsers): it will simply append the Microsoft Edge useragent suffix to the user agent
    return `${navigator.userAgent}${suffix}`
  }
}

chrome.webRequest.onBeforeSendHeaders.addListener(
  (details) => {
    const { requestHeaders } = details
    if (!requestHeaders) return undefined
    const newHeaders = requestHeaders.map((header) => {
      if (header.name.toLowerCase() === 'user-agent') {
        if (header.value?.toLowerCase().includes('mobile')) header.value = uaMaker(MOBILE_UA_SUFFIX, true)
        else header.value = uaMaker(MOBILE_UA_SUFFIX, false)
      }
      return header
    })
    return { requestHeaders: newHeaders }
  },
  { urls: ['*://*.bing.com/*'] },
  ['blocking', 'requestHeaders']
)

chrome.runtime.onInstalled.addListener((object) => {
  let externalUrl = 'http://github.com/anaclumos/bing-chat-for-all-browsers#firefox'
  console.log(object.reason)
  if (object.reason.toLowerCase().includes('install')) {
    chrome.tabs.create({ url: externalUrl })
  }
})
