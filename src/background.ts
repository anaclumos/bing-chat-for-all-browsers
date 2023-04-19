// ** How this works ** //
/*
Microsoft Bing checks if the user agent is a represents a Chromium Browser (as Microsoft Edge is based on Chromium),
then it checks if it is the Microsoft Edge Browser by using the suffix Microsoft Bing adds to the user agent to enable Bing Chat.

This limitation of Bing Chat to only Microsoft Edge users is a synthetic limitation, as it is possible to spoof the user agent to make Bing Chat work on other browsers.

On Chrome (and other chromium based browsers): it will simply append the Microsoft Edge useragent suffix to the user agent
On Firefox it will replace the entire user agent with a hard coded Chrome user agent with the Microsoft Edge useragent suffix appended to it.
*/

const IS_FIREFOX = navigator.userAgent.toLowerCase().includes('firefox')

//Microsoft Edge has two user agent suffixes, one for mobile and one for desktop
const MOBILE_UA_SUFFIX = 'EdgA/42.0.0.2057'
const DESKTOP_UA_SUFFIX = 'Edg/112.0.1722.48'

const DESKTOP_UA_PREFIX =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36'
const MOBILE_UA_PREFIX =
  'Mozilla/5.0 (Linux; Android 8.1.0; Pixel Build/OPM4.171019.021.D1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.109 Mobile Safari/537.36'

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
    return `${navigator.userAgent} ${suffix}`
  }
}

if (IS_FIREFOX) {
  chrome.webRequest.onBeforeSendHeaders.addListener(
    (details) => {
      const { requestHeaders } = details
      console.log(requestHeaders)
      if (!requestHeaders) return undefined
      const newHeaders = requestHeaders.map((header) => {
        if (header.name.toLowerCase() === 'user-agent') {
          if (header.value?.toLowerCase().includes('mobile')) header.value = uaMaker(MOBILE_UA_SUFFIX, true)
          else header.value = uaMaker(DESKTOP_UA_SUFFIX, false)
        }
        return header
      })
      return { requestHeaders: newHeaders }
    },
    { urls: ['*://*.bing.com/*'] },
    ['blocking', 'requestHeaders']
  )
}

chrome.runtime.onInstalled.addListener((object) => {
  let install = 'http://github.com/anaclumos/bing-chat-for-all-browsers/tree/main/install.md'
  if (object.reason.toLowerCase().includes('install')) {
    chrome.tabs.create({ url: install })
  }
})

chrome.runtime.setUninstallURL('http://github.com/anaclumos/bing-chat-for-all-browsers/tree/main/uninstall.md')
