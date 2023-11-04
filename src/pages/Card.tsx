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
    var url = fblthp
    if(isFace) {
      url = card.imageurl
    } else {
      url = card.backimageurl ? card.backimageurl : fblthp
    }

    const fname = url.split('/').slice(-1)[0]
    const base = 'https://raw.githubusercontent.com/slimemoss/mtg-spoiler-viewer/master/src/image/card/'
    return base + fname
  }
  
  return (
    <>
      <img src={geturl(card, isFace)} loading="lazy"
           style={{minWidth: '300px', width: '100%', height: 'auto'}} />
      <div style={{display: 'flex'}}>
        <div style={{fontSize: '70%'}}>{card.number}</div>
        <div style={{flex: 'auto', textAlign: 'center'}}>{card.jname}</div>
        <div hidden={!hasBack}>
          <Button size="sm"
                  onClick={() => {setIsFace(!isFace)}}
                  className="d-flex align-items-center justify-content-center">
            <TbRepeat/>
          </Button>
        </div>
      </div>
    </>
  )
}
