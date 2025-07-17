import * as React from 'react'
import { MtgCard } from '../data/Schema'
import { Lang, ToggleLangI } from './toggleLang'
import { cardurl } from './cardurl'
import { ToggleQuizI } from './quiz/ToggleQuiz'
import { Mask } from './quiz/Mask'

interface Props{
  card: MtgCard
  isFace: boolean
  toggleQuiz: ToggleQuizI
  toggleLang: ToggleLangI
}
export const CardImage = (props: Props) => {
  const {card, isFace, toggleQuiz, toggleLang} = props

  const exists = card.language.ja.name != ''

  const [lang, setLang] = React.useState<Lang>(toggleLang.lang)

  React.useEffect(() => {
    setLang(toggleLang.lang)
  }, [toggleLang.lang])

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <img
	src={cardurl(card, isFace, lang)}
	style={{ minWidth: '300px', width: '100%', height: 'auto' }}
	onClick={() => {
	  if(toggleLang.clickToSwitch) {
	    setLang(lang == Lang.JA ? Lang.EN : Lang.JA)
	  }
	}}
      />
    </div>
  )
}
