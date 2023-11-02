import * as React from 'react'

import Button from 'react-bootstrap/Button'
import { TbRepeat } from 'react-icons/tb'

import { MtgCard } from '../data/LTR'

interface Props {
  card: MtgCard
}

export const Card = (props: Props) => {
  const card = props.card
  const hasBack = card.backimageurl != null
  const [isFace, setIsFace] = React.useState(true)

  const geturl = (card: MtgCard, isFace: boolean): string => {
    const fblthp = 'https://mtg-jp.com//img_sys/cardImages/M19/448622/cardimage.png'
    if(isFace) {
      return card.imageurl
    } else {
      return card.backimageurl ? card.backimageurl : fblthp
    }
  }
  
  return (
    <>
      <img src={geturl(card, isFace)} loading="lazy"
           style={{minWidth: '300px', width: '100%', height: 'auto'}} />
      <div style={{display: 'flex'}}>
        <div style={{flex: 'auto', textAlign: 'center'}}>{card.jname}</div>
        <div hidden={!hasBack}>
          <Button size="sm" variant="outline-dark"
                  onClick={() => {setIsFace(!isFace)}}
                  className="d-flex align-items-center justify-content-center">
            <TbRepeat/>
          </Button>
        </div>
      </div>
    </>
  )
}
