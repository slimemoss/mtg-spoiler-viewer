import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { Helmet } from "react-helmet"
import Alert from 'react-bootstrap/Alert'

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
    <a href="https://magic.wizards.com/ja">
      公式サイトのカードギャラリー
    </a>

    が見やすくなったため、本サービスは終了しました。
    ご利用いただきありがとうございました。
  </Alert>

  </div>,
)
