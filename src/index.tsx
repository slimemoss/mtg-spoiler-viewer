import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { Route, Routes, HashRouter } from 'react-router-dom'
import { Helmet } from "react-helmet"

import {Page} from './pages'
import DataLTR from './data/LTR.json'
import DataWOE from './data/WOE.json'

const container = document.getElementById('app')
if (!container) throw new Error('Failed to find the root element')
const root = createRoot(container)

root.render(
  <>
    <Helmet
      title={'エルドレインの森 カードギャラリー | slimemoss'}
      meta={[
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:image', content: 'https://raw.githubusercontent.com/slimemoss/mtg-spoiler-viewer/master/src/image/woe.png' },
        { name: 'twitter:title', content: 'エルドレインの森 カードギャラリー' },
        { name: 'twitter:description', content: '色とレアのフィルターができる、シンプルなカードギャラリーです。' }
      ]}
    />

    <div hidden={true}>
      <a href="#/ltr">ltr</a>
    </div>

    <HashRouter>
      <Routes>
        <Route path="/" element={<Page data={DataLTR} />}/>
        <Route path="/ltr" element={<Page data={DataLTR} />}/>
        <Route path="/woe" element={<Page data={DataWOE} />}/>
      </Routes>
    </HashRouter>
  </>,
)
