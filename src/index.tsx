import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { Route, Routes, HashRouter } from 'react-router-dom'
import { Helmet } from "react-helmet"
import {Page} from './pages'
import DataLTR from './data/LTR.json'
import DataWOE from './data/WOE.json'
import DataWOT from './data/WOT.json'
import DataLCI from './data/LCI.json'

const container = document.getElementById('app')
if (!container) throw new Error('Failed to find the root element')
const root = createRoot(container)

root.render(
  <>
    <Helmet
      title={'カードギャラリー | slimemoss'}
    />

    <div>
      <ul>
        <li>
          <a href="#/lci">イクサラン：失われし洞窟</a>
        </li>
      </ul>
    </div>

    <HashRouter>
      <Routes>
        <Route path="/" element={<Page data={DataLCI} setName="イクサラン：失われし洞窟" />}/>
        <Route path="/ltr" element={<Page data={DataLTR} setName="" />}/>
        <Route path="/woe" element={<Page data={DataWOE} setName="" />}/>
        <Route path="/wot" element={<Page data={DataWOT} setName="" />}/>
        <Route path="/lci" element={<Page data={DataLCI} setName="イクサラン：失われし洞窟" />}/>
      </Routes>
    </HashRouter>
  </>,
)
