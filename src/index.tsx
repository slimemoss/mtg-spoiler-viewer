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
                <li><a href="#/">ダスクモーン：戦慄の館</a></li>
            </ul>
        </div>

        <Alert variant="warning" hidden={false}>
            プレビュー期間のため、一部カードは未掲載です。
        </Alert>
        <Alert variant="warning" hidden={false}>
            プレイブースターに収録されるカードを掲載しています。(通常絵のみ) (スペシャルゲストを除く)<a href='https://magic.wizards.com/ja/products/foundations/card-image-gallery?cigproduct=fdn-products-play-boosters&cigtreatment=all-treatments&cigcolor=all-colors&cigfreshness=all-cards&cigset=SPG&cigsubset=all-subsets&cigsubtype=all-subtypes&cigtype=all-types&cigrarity=all-rarities'>スペシャルゲストは公式ページをご覧ください。</a>
        </Alert>
        <Alert variant="warning" hidden={false}>
            <a href="https://magic.wizards.com/ja/products/foundations/card-image-gallery">プレイブースターでない商品のカードは公式サイトをご覧ください。</a>
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
