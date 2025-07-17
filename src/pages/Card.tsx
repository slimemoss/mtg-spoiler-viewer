import * as React from 'react'

import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { TbRepeat } from 'react-icons/tb'
import { AiOutlineRotateRight } from "react-icons/ai"
import {isMobile} from 'react-device-detect'

import { MtgCard } from '../data/Schema'
import { ToggleQuizI } from './quiz/ToggleQuiz'
import { ToggleLangI } from './toggleLang'
import { CardImage } from './CardImage'
import { cardurl } from './cardurl'

interface Props {
  card: MtgCard
  count: number
  toggleQuiz: ToggleQuizI
  toggleLang: ToggleLangI
}

export const Card = (props: Props) => {
  const {card, count, toggleQuiz, toggleLang} = props
  const hasBack = card.language.ja.back != null
  const [isFace, setIsFace] = React.useState(true)

  const isSplit = card.layout == 'split'
  const [showModal, setShowModal] = React.useState(false)
  const needModal = isSplit && !isMobile

  return (
    <>
      <CardImage card={card} toggleQuiz={toggleQuiz} isFace={isFace} toggleLang={toggleLang} />

      {needModal ? (
        <Modal show={showModal} onHide={() => setShowModal(!showModal)} style={{transform: 'rotate(0deg)'}}>
          <Modal.Body style={{transform: 'rotate(90deg) translate(-20%)'}}>
            <img src={cardurl(card, isFace, toggleLang.lang)}
                 style={{minWidth: '300px', width: '100%', height: 'auto'}} />
          </Modal.Body>
        </Modal>
      ) : (
        <div/>
      )}

      <div style={{display: 'flex'}}>
        <div style={{fontSize: '70%'}}>{count}</div>
        <div style={{flex: 'auto', textAlign: 'center'}}>{card.language.ja.name}</div>

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
