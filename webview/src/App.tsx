import React, { FC } from 'react'
import useDecoder from './hooks/useDecoder'
import SoundPlayer from './SoundPlayer'
type Props = Record<string, never>

const App: FC<Props> = () => {
  const { loading, error, decodeResult } = useDecoder()
  if (loading) {
    return <div className="loader" />
  } else {
    if (decodeResult) {
      return <SoundPlayer data={decodeResult} />
    } else {
      return (
        <>
          <div className="warn" />
          {error}
        </>
      )
    }
  }
}

export default App
