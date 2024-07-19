import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { Route, Routes, HashRouter } from 'react-router-dom'
import { Helmet } from "react-helmet"
import Alert from 'react-bootstrap/Alert'
import {Page} from './pages'
import BLB from './data/BLB.json'

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

        <Alert variant="warning" hidden>
            プレビュー期間のため、一部カードは未実装です。
        </Alert>

        <HashRouter>
            <Routes>
                <Route path="*" element={<Page data={BLB} setName="ブルームバロウ" />}/>
            </Routes>
        </HashRouter>

        <footer style={{marginTop: '5rem', padding: '1rem'}}>
            本サイトはファンコンテンツ・ポリシーに沿った非公式のファンコンテンツです。ウィザーズ社の認可/許諾は得ていません。題材の一部に、ウィザーズ・オブ・ザ・コースト社の財産を含んでいます。©Wizards of the Coast LLC.
        </footer>

    </div>,
)
