import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Landing from './landing'
import EngagementPage from './page-engagement'
import AboutPage from './page-about'

// Path-based routing. netlify.toml rewrites every path to index.html.
const path = window.location.pathname.replace(/\/+$/, '') || '/';
const hash = window.location.hash.slice(1);
const Page = path === '/hr-analytics' ? Landing
  : path === '/about' ? AboutPage
  : EngagementPage;
// /book-a-demo opens the Engagement Surveys page at the demo form (used by the LinkedIn button).
const startAt = path === '/book-a-demo' ? 'book' : (Page === EngagementPage && hash) || undefined;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Page startAt={startAt} />
  </React.StrictMode>
)
