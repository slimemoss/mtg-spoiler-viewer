import * as React from 'react'

export const useDelay = (msec: number) => {
  const [waiting, setWaiting] = React.useState(true);
  React.useEffect(()=>{
    setTimeout(()=> setWaiting(false), msec);
  }, []);
  return waiting
}
