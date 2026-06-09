import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { Route, Routes, HashRouter } from 'react-router-dom'
import { Helmet } from "react-helmet"
import Alert from 'react-bootstrap/Alert'
import {Page} from './pages'
import DATA from './data/MSH.json'

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
    <Alert variant="warning" hidden={true}>
      以下のカードが英語になっています。ご了承ください。(公式ギャラリー未掲載のため。2026-06-10 04:00)
      <ul>
				<li>MSH0267 Gleaming Bastion</li>
      </ul>
    </Alert>

    <Alert variant="info" hidden={true}>
      このページはプレイブースター産のカードのみを掲載しています。
    </Alert>

    <HashRouter>
      <Routes>
        <Route path="*" element={<Page data={DATA} setName="マーベル スーパー・ヒーローズ" />}/>
      </Routes>
    </HashRouter>

    <footer style={{marginTop: '5rem', padding: '1rem'}}>
      本サイトはファンコンテンツ・ポリシーに沿った非公式のファンコンテンツです。ウィザーズ社の認可/許諾は得ていません。題材の一部に、ウィザーズ・オブ・ザ・コースト社の財産を含んでいます。©Wizards of the Coast LLC.
    </footer>

  </div>,
)
