import React, { FC, useMemo } from 'react'
import useDecoder from './hooks/useDecoder'
import { SoundObject } from './SoundObject'
import SoundPlayer from './SoundPlayer'
type Props = Record<string, never>

const App: FC<Props> = () => {
  const { loading, error, decodeResult } = useDecoder()
  const soundObject = useMemo(() => {
    if (decodeResult) {
      return new SoundObject(decodeResult)
    } else {
      return null
    }
  }, [decodeResult])
  if (loading) {
    return <div className="loader" />
  } else {
    if (soundObject) {
      return <SoundPlayer source={soundObject} />
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
