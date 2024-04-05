import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { Route, Routes, HashRouter } from 'react-router-dom'
import { Helmet } from "react-helmet"
import {Page} from './pages'
import OTJ from './data/OTJ.json'
import BIG from './data/BIG.json'

const container = document.getElementById('app')
if (!container) throw new Error('Failed to find the root element')
const root = createRoot(container)

root.render(
  <div>
    <Helmet
      title={'カードギャラリー | slimemoss'}
    />

    <div>
      <ul>
        <li><a href="#/">サンダー・ジャンクションの無法者 (OTJ)</a></li>
        <li><a href="#/big">サンダー・ジャンクションの無法者 ビッグスコア (BIG)</a></li>
      </ul>
    </div>

    <HashRouter>
      <Routes>
        <Route path="/big" element={<Page data={BIG} setName="サンダー・ジャンクションの無法者 ビッグスコア" />}/>
        <Route path="*" element={<Page data={OTJ} setName="サンダー・ジャンクションの無法者" />}/>
      </Routes>
    </HashRouter>
  </div>,
)
