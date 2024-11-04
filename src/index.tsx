import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { Route, Routes, HashRouter } from 'react-router-dom'
import { Helmet } from "react-helmet"
import Alert from 'react-bootstrap/Alert'
import {Page} from './pages'
import FDN from './data/FDN.json'

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
    <Alert variant="secondary" hidden={false}>
      プレイブースター収録の通常絵を掲載しています。 (スペシャルゲストを除く)<a href='https://magic.wizards.com/ja/products/foundations/card-image-gallery?cigproduct=fdn-products-play-boosters&cigtreatment=all-treatments&cigcolor=all-colors&cigfreshness=all-cards&cigset=SPG&cigsubset=all-subsets&cigsubtype=all-subtypes&cigtype=all-types&cigrarity=all-rarities'>スペシャルゲストは公式ページをご覧ください。</a>
    </Alert>
    <Alert variant="secondary" hidden={false}>
      その他のスタンダードリーガルのカードは、こちらをご覧ください。(外部サイトが開きます。)
      <ul style={{margin: "0"}}>
        <li><a href="https://scryfall.com/search?order=set&q=e%3Afdn+cn%E2%89%A5728+cn%E2%89%A4729&unique=prints" target="_blank">プロモ</a></li>
        <li><a href="https://scryfall.com/search?order=set&q=e%3Afdn+%28%28cn%E2%89%A5488+cn%E2%89%A4564%29+OR+cn%3A%22730%22%29&unique=prints" target="_blank">ビギナー・ボックス</a></li>
        <li><a href="https://scryfall.com/search?order=set&q=e%3Afdn+cn%E2%89%A5565+cn%E2%89%A4727&unique=prints" target="_blank">Starter Collection</a></li>
      </ul>
    </Alert>

    <HashRouter>
      <Routes>
        <Route path="*" element={<Page data={FDN} setName="ファウンデーションズ" />}/>
      </Routes>
    </HashRouter>

    <footer style={{marginTop: '5rem', padding: '1rem'}}>
      本サイトはファンコンテンツ・ポリシーに沿った非公式のファンコンテンツです。ウィザーズ社の認可/許諾は得ていません。題材の一部に、ウィザーズ・オブ・ザ・コースト社の財産を含んでいます。©Wizards of the Coast LLC.
    </footer>

  </div>,
)
