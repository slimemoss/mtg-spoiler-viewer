import * as React from 'react'
import { Helmet } from "react-helmet"
import { isMobile } from 'react-device-detect'

import { MtgCard } from '../data/Schema'
import { Card } from './Card'
import { Classify } from './classify/Classify'
import { useClassify } from './classify/ClassifyHooks'
import { ToggleQuiz, useToggleQuiz } from './quiz/ToggleQuiz'
import { useToggleLang } from './toggleLang'


interface Props {
  data: MtgCard[]
  setName: string
}
export const Page = (props: Props) => {
  const [config, classifyHooks] = useClassify()
  const [toggleQuiz, toggleQuizHooks] = useToggleQuiz()
  const [shown, setShown] = React.useState<MtgCard[]>(props.data)
  const {ToggleLang, toggleLang, toggleLangHooks} = useToggleLang()

  React.useEffect(() => {
    let c = classifyHooks.classify(props.data)
    setShown(c)
  }, [config, props.data])

  React.useEffect(() => {
    let c = classifyHooks.classify(props.data)
    setShown(c)
  }, [])

  return (<>
    <Helmet
      title={props.setName + ' カードギャラリー | slimemoss'}
    />

    <div style={{display: 'flex', flexWrap: 'wrap', columnGap: '100px'}}>
      <Classify config={config} hooks={classifyHooks} />
      <ToggleLang toggleLang={toggleLang} hooks={toggleLangHooks} />
      <div hidden={isMobile}>
        <ToggleQuiz value={toggleQuiz} hooks={toggleQuizHooks} />
      </div>
    </div>

    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill,minmax(300px, 1fr))'}}>
      {shown.map((card, i) => (
        <div key={String(i) + "_" + card.collector_number} style={{margin: '0.2rem'}}>
          <Card card={card} count={i + 1} toggleQuiz={toggleQuiz} toggleLang={toggleLang} />
        </div>
      ))}
    </div>
  </>)
}
