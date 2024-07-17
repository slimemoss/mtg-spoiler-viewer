import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { Route, Routes, HashRouter } from 'react-router-dom'
import { Helmet } from "react-helmet"
import {Page} from './pages'
import MH3 from './data/MH3.json'
import BLB from './data/BLB.json'
import { Alert } from 'react-bootstrap'

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
                <li><a href="#/">モダンホライゾン３</a></li>
            </ul>
        </div>

        <Alert variant='warning'>
            プレイブースターのうち、MH3のカードのみを扱っています。
            <a href='https://magic.wizards.com/ja/products/modern-horizons-3/card-image-gallery'
               target="_blank" rel="noopener noreferrer">スペシャルゲスト・統率者カードは公式ページをご覧ください。</a>
        </Alert>

        <HashRouter>
            <Routes>
                <Route path="/blb" element={<Page data={BLB} setName="ブルームバロウ" />}/>
                <Route path="*" element={<Page data={MH3} setName="モダンホライゾン３" />}/>
            </Routes>
        </HashRouter>

        <footer style={{marginTop: '5rem', padding: '1rem'}}>
            本サイトはファンコンテンツ・ポリシーに沿った非公式のファンコンテンツです。ウィザーズ社の認可/許諾は得ていません。題材の一部に、ウィザーズ・オブ・ザ・コースト社の財産を含んでいます。©Wizards of the Coast LLC.
        </footer>

    </div>,
)
