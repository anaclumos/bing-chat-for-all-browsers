import React from 'react'
import ReactDOM from 'react-dom'
// @ts-ignore
import BingIcon from '../public/icon1024.png'

const Popup = () => {
  return (
    <>
      <a
        style={{ textDecoration: 'none', cursor: 'pointer' }}
        onClick={() => {
          chrome.tabs.create({
            url: 'https://bing.com/chat',
          })
        }}
      >
        <div style={{ display: 'grid', placeItems: 'center', width: '300px', height: '100px' }}>
          <button
            style={{
              backgroundColor: 'white',
              color: 'black',
              border: '1px solid rgb(126 133 145)',
              padding: '10px 20px',
              borderRadius: '5px',
              fontSize: '1rem',
              cursor: 'pointer',
              boxShadow: '0 0 0 1px rgb(126 133 145), 0 1px 3px 0 rgb(126 133 145)',
            }}
          >
            <img src={BingIcon} style={{ width: '1rem', height: '1rem', padding: 'auto', verticalAlign: 'middle' }} />
            <span style={{ margin: 'auto auto auto 5px', fontSize: '0.8rem' }}>Open Bing Chat</span>
          </button>
        </div>
      </a>
      <p
        style={{
          margin: '0 10px',
          width: '300px',
          fontFamily:
            "ui-rounded, 'SF Pro Rounded', 'SF NS Rounded', ui-sans-serif, -apple-system, BlinkMacSystemFont, system-ui, -system-ui, sans-serif",
          fontSize: '0.8rem',
          fontWeight: 400,
          lineHeight: '1.5',
          color: 'rgb(126 133 145)',
        }}
      >
        Leave me a review for{' '}
        <a
          style={{ color: 'black', textDecoration: 'underline', cursor: 'pointer' }}
          onClick={() => {
            chrome.tabs.create({
              url:
                'https://chrome.google.com/webstore/detail/bing-chat-for-all-browser/jofbglonpbndadajbafmmaklbfbkggpo',
            })
          }}
        >
          Chrome
        </a>{' '}
        or{' '}
        <a
          style={{ color: 'black', textDecoration: 'underline', cursor: 'pointer' }}
          onClick={() => {
            chrome.tabs.create({
              url: 'https://addons.mozilla.org/en-US/firefox/addon/bing-chat-for-all-browsers/',
            })
          }}
        >
          Firefox
        </a>
        . <br />
        <br />
        Please check out{' '}
        <a
          style={{ color: 'black', textDecoration: 'underline', cursor: 'pointer' }}
          onClick={() => {
            chrome.tabs.create({
              url: 'https://hn.cho.sh/?ref=bingchat&utm_source=bingchat&utm_medium=extension&utm_campaign=bingchat',
            })
          }}
        >
          Oneliner News
        </a>{' '}
        — my newsletter AI that reads 3M+ words a day and gives you an <strong>one-liner</strong> explanation.
        <br />
        <br />
        <br />
        <strong>Solution for common problems.</strong> Clear Cache and Cookies on Bing. Disable VPN or Adblock on Bing.
        Make sure you are logged-in with Microsoft account with Bing Chat enabled. If you still have problems,{' '}
        <a
          style={{ color: 'black', textDecoration: 'underline', cursor: 'pointer' }}
          onClick={() => {
            chrome.tabs.create({
              url: 'https://github.com/anaclumos/bing-chat-for-all-browsers',
            })
          }}
        >
          Let me know on GitHub
        </a>
        {'. '}
      </p>
    </>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>,
  document.getElementById('root')
)
