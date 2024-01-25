import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { Route, Routes, HashRouter } from 'react-router-dom'
import { Helmet } from "react-helmet"
import {Page} from './pages'
import Data from './data/MKM.json'

const container = document.getElementById('app')
if (!container) throw new Error('Failed to find the root element')
const root = createRoot(container)

root.render(
  <>
    <Helmet
      title={'カードギャラリー | slimemoss'}
    />

    <HashRouter>
      <Routes>
        <Route path="/" element={<Page data={Data} setName="カルロフ邸殺人事件" />}/>
        <Route path="/mkm" element={<Page data={Data} setName="カルロフ邸殺人事件" />}/>
      </Routes>
    </HashRouter>
  </>,
)
