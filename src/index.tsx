import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { Route, Routes, HashRouter } from 'react-router-dom'
import {Page} from './pages'
import DataLTR from './data/LTR.json'
import DataWOE from './data/WOE.json'

const container = document.getElementById('app')
if (!container) throw new Error('Failed to find the root element')
const root = createRoot(container)

root.render(
  <>
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
