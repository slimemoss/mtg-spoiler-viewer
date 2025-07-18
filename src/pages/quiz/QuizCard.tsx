import * as React from 'react'
import { Mask } from './Mask'

interface Props {
  hideMana: boolean
  hideStats: boolean
}

export const QuizCard = (props: Props) => {
  return (
    <>
      <Mask hide={props.hideMana} coord={{
        top: '5%',
        height: '5.5%',
        left: '65%',
        right: '7%',
      }} />
      <Mask hide={props.hideStats} coord={{
        top: '89%',
        height: '8%',
        left: '71%',
        right: '4%',
      }} />
    </>
  )
}
