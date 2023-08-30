import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { Route, Routes, HashRouter } from 'react-router-dom'
import { Helmet } from "react-helmet"

import {Page} from './pages'
import DataLTR from './data/LTR.json'
import DataWOE from './data/WOE.json'
import DataWOT from './data/WOT.json'

const container = document.getElementById('app')
if (!container) throw new Error('Failed to find the root element')
const root = createRoot(container)

root.render(
  <>
    <Helmet
      title={'エルドレインの森 カードギャラリー | slimemoss'}
    />

    <div hidden={true}>
      <a href="#/ltr">ltr</a>
    </div>

    <div>
      <ul>
        <li>
          <a href="#/woe">エルドレインの森</a>
        </li>
        <li>
          <a href="#/wot">エルドレインの森 おとぎ話</a>
        </li>
      </ul>
    </div>

    <HashRouter>
      <Routes>
        <Route path="/" element={<Page data={DataLTR} />}/>
        <Route path="/ltr" element={<Page data={DataLTR} />}/>
        <Route path="/woe" element={<Page data={DataWOE} />}/>
        <Route path="/wot" element={<Page data={DataWOT} />}/>
      </Routes>
    </HashRouter>
  </>,
)
