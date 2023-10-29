import * as React from 'react'

import Button from 'react-bootstrap/Button'
import { TbRepeat } from 'react-icons/tb'

import { MtgCard } from '../data/LTR'

interface Props {
  card: MtgCard
}

const CardWithoutBack = (props: Props) => {
  const card = props.card

  return (
    <>
      <img src={card.imageurl} loading="lazy"
           style={{minWidth: '300px', width: '100%', height: 'auto'}} />
      <div style={{textAlign: 'center'}}>{card.jname}</div>
    </>
  )
}

const CardWithBack = (props: Props) => {
  const card = props.card
  const [isFace, setIsFace] = React.useState(true)

  const geturl = (card: MtgCard, isFace: boolean): string => {
    const fblthp = 'https://mtg-jp.com//img_sys/cardImages/M19/448622/cardimage.png'
    if(isFace) {
      return card.imageurl
    }
    if(card.backimageurl) {
      return card.backimageurl
    }
    return fblthp
  }
  
  return (
    <>
      <img src={geturl(card, isFace)} loading="lazy"
           style={{minWidth: '300px', maxWidth: '100%', height: 'auto'}} />
      <div style={{display: 'flex'}}>
        <div style={{flex: 'auto', textAlign: 'center'}}>{card.jname}</div>
        <div>
          <Button size="sm" onClick={() => {setIsFace(!isFace)}}>
            <TbRepeat/>
          </Button>
        </div>
      </div>
    </>
  )
}

export const Card = (props: Props) => {
  const card = props.card

  const hasBack = (card: MtgCard): boolean => {
    return card.backimageurl != null
  }

  if (hasBack(card)) {
    return <CardWithBack card={card} />
  } else {
    return <CardWithoutBack card={card} />
  }

}
