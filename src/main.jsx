import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Landing from './landing'
import EngagementPage from './page-engagement'
import AboutPage from './page-about'

// Path-based routing. netlify.toml rewrites every path to index.html.
const path = window.location.pathname.replace(/\/+$/, '') || '/';
const Page = path === '/hr-analytics' ? Landing
  : path === '/about' ? AboutPage
  : EngagementPage;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Page />
  </React.StrictMode>
)
