import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { Route, Routes, HashRouter } from 'react-router-dom'
import { Helmet } from "react-helmet"
import Alert from 'react-bootstrap/Alert'
import {Page} from './pages'
import DATA from './data/EOE.json'

const container = document.getElementById('app')
if (!container) throw new Error('Failed to find the root element')
const root = createRoot(container)

root.render(
  <div>
    <Helmet
      title={'カードギャラリー | slimemoss'}
    />

    <div hidden>
      <ul>
        <li><a href="#/">タイトル</a></li>
      </ul>
    </div>

    <Alert variant="warning" hidden={true}>
      プレビュー期間のため、一部カードは未掲載です。
    </Alert>

    <Alert variant="info">
      <a href="https://magic.wizards.com/ja/products/edge-of-eternities/card-image-gallery?cigproduct=eoe-products-play-boosters&cigset=SPG&cigset=EOS&cigset=EOC"
         target="_blank" rel="noopener noreferrer">
        その他のプレイブースター産カードはこちら(公式サイト)</a>
    </Alert>

    <HashRouter>
      <Routes>
        <Route path="*" element={<Page data={DATA} setName="久遠の終端" />}/>
      </Routes>
    </HashRouter>

    <footer style={{marginTop: '5rem', padding: '1rem'}}>
      本サイトはファンコンテンツ・ポリシーに沿った非公式のファンコンテンツです。ウィザーズ社の認可/許諾は得ていません。題材の一部に、ウィザーズ・オブ・ザ・コースト社の財産を含んでいます。©Wizards of the Coast LLC.
    </footer>

  </div>,
)
