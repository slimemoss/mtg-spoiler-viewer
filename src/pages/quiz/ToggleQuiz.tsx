import * as React from 'react'
import { Form } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'

export interface ToggleQuizI {
  mana: boolean
  stats: boolean
}

export interface ToggleQuizHooksI {
  setMana: (v: boolean) => void
  setStats: (v: boolean) => void
}


function useQuery() {
  return new URLSearchParams(useLocation().search)
}
export const useToggleQuiz = (): [ToggleQuizI, ToggleQuizHooksI] => {
  const defaultQuiz = useQuery().get('quiz') == "true"
  const [toggleQuiz, setToggleQuiz] = React.useState<ToggleQuizI>({mana: defaultQuiz, stats: defaultQuiz})


  return [toggleQuiz, {
    setMana: (v: boolean) => {
      setToggleQuiz({...toggleQuiz, mana: v})
    },
    setStats: (v: boolean) => {
      setToggleQuiz({...toggleQuiz, stats: v})
    },
  }]
}

interface ToggleQuizProps{
  value: ToggleQuizI
  hooks: ToggleQuizHooksI
}
export const ToggleQuiz = (props: ToggleQuizProps) => {
  const value= props.value
  const hooks = props.hooks
  return (
    <div>
      <Form.Label>マスク</Form.Label>
      <div className="d-flex">
        <Form.Check
          type="switch"
          label="Mana"
          checked={value.mana}
          onChange={e => hooks.setMana(e.target.checked)}
        />
        <Form.Check
          type="switch"
          label="Stats"
          checked={value.stats}
          onChange={e => hooks.setStats(e.target.checked)}
        />
      </div>
    </div>
  )
}
