import * as React from 'react'

import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { TbRepeat } from 'react-icons/tb'
import { AiOutlineRotateRight } from "react-icons/ai"
import {isMobile} from 'react-device-detect'

import { MtgCard } from '../data/LTR'

interface Props {
  card: MtgCard
  count: number
  ImageComponent: React.ComponentType<{url: string, card: MtgCard}>
}

export const Card = (props: Props) => {
  const card = props.card
  const hasBack = card.backimageurl != null
  const [isFace, setIsFace] = React.useState(true)

  const isSplit = card.layout == 'split'
  const [showModal, setShowModal] = React.useState(false)
  const needModal = isSplit && !isMobile

  const geturl = (card: MtgCard, isFace: boolean): string => {
    const fblthp = 'https://cards.scryfall.io/large/front/c/3/c36f01a5-82bf-4fc6-9396-4410067c351b.jpg?1702429424'

    const url = isFace ? card.imageurl : (card.backimageurl ? card.backimageurl : '')
    if (url == '') {
      return fblthp
    }
    if (url == 'https://cards.scryfall.io/back.png') {
      return url
    }

    const fname = url.split('/').slice(-1)[0]
    return './dist/image/card/' + encodeURIComponent(fname) + '.webp'
  }
  
  return (
    <>
      <props.ImageComponent url={geturl(card, isFace)} card={card} />

      {needModal ? (
        <Modal show={showModal} onHide={() => setShowModal(!showModal)} style={{transform: 'rotate(0deg)'}}>
          <Modal.Body style={{transform: 'rotate(90deg) translate(-20%)'}}>
            <img src={geturl(card, isFace)}
                 style={{minWidth: '300px', width: '100%', height: 'auto'}} />
          </Modal.Body>
        </Modal>
      ) : (
        <div/>
      )}

      <div style={{display: 'flex'}}>
        <div style={{fontSize: '70%'}}>{props.count}</div>
        <div style={{flex: 'auto', textAlign: 'center'}}>{card.jname}</div>

      {hasBack ? (
        <div>
          <Button size="sm"
                  onClick={() => {setIsFace(!isFace)}}
                  className="d-flex align-items-center justify-content-center">
            <TbRepeat/>
          </Button>
        </div>
      ) : (
        <div/>
      )}

      {needModal ? (
        <div>
          <Button size="sm"
                  onClick={() => {setShowModal(!showModal)}}
                  className="d-flex align-items-center justify-content-center">
            <AiOutlineRotateRight />
          </Button>
        </div>
      ) : (
        <div/>
      )}
      
    </div>
    </>
  )
}
