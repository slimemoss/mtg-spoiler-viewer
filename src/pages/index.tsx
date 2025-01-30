import * as React from 'react'
import { Helmet } from "react-helmet"

import { MtgCard } from '../data/LTR'
import { Card } from './Card'
import { Classify } from './classify/Classify'
import { useClassify } from './classify/ClassifyHooks'
import { useDelay } from './delayHooks'
import { QuizCard } from './quiz/QuizCard'
import { ToggleQuiz, useToggleQuiz } from './quiz/ToggleQuiz'


interface ImageComponentProps{
  url: string
  card: MtgCard
}

interface Props {
  data: MtgCard[]
  setName: string
}
export const Page = (props: Props) => {
  const [config, classifyHooks] = useClassify()
  const [toggleQuiz, toggleQuizHooks] = useToggleQuiz()
  const [shown, setShown] = React.useState<MtgCard[]>(props.data)
  const wating = useDelay(200)

  //スマホ表示のための分割描写
  const displayDiv: number = 20

  React.useEffect(() => {
    let c = classifyHooks.classify(props.data)
    setShown(c)
  }, [config, props.data])

  React.useEffect(() => {
    let c = classifyHooks.classify(props.data)
    setShown(c)
  }, [])

  const ImageComponent = (props: ImageComponentProps) => {
    const exists = props.card.jname != ''
    return (
      <QuizCard url={props.url}
                hideMana={toggleQuiz.mana && exists}
                hideStats={toggleQuiz.stats && exists && props.card.power != null } />
    )
  }

  return (<>
    <Helmet
      title={props.setName + ' カードギャラリー | slimemoss'}
    />
    
    <div style={{ display: 'flex', gap: '100px'}}>
      <Classify config={config} hooks={classifyHooks} />
      <ToggleQuiz value={toggleQuiz} hooks={toggleQuizHooks} />
    </div>

    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill,minmax(300px, 1fr))'}}>
      {shown.map((card, i) => (
        <div key={card.number} style={{margin: '0.2rem'}}>
          <Card card={card} count={i + 1} ImageComponent={ImageComponent}/>
        </div>
      ))}
    </div>
    </>)
}
