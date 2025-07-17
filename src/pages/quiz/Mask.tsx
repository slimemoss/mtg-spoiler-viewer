import * as React from 'react'

interface Props {
  hide: boolean
  coord: {
    top: string
    height: string
    left: string
    right: string
  }
}

export const Mask = (props: Props) => {
  const [hide, setHide] = React.useState(props.hide)
  React.useEffect(() => {
    setHide(props.hide)
  }, [props.hide])

  return (
    <div
      onClick={() => setHide(false)}
      style={{
        position: 'absolute',
        backgroundColor: '#181a1b',
        border: '3px solid white',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.2em',
        fontWeight: 'bold',
        color: 'white',
        cursor: 'pointer',
        pointerEvents: hide ? 'auto' : 'none',
        transition: 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out',
        transformOrigin: 'right center',
        transform: hide ? 'rotateY(0deg)' : 'rotateY(90deg)',
        opacity: hide ? 1 : 0,
        ...props.coord,
      }}
    >
      ?
    </div>
  )
}
