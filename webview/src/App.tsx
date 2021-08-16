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
        <div className="warn">
          <svg
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64z m0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" />
            <path d="M512 688m-48 0a48 48 0 1 0 96 0 48 48 0 1 0-96 0Z" />
            <path d="M488 576h48c4.4 0 8-3.6 8-8V296c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8z" />
          </svg>
          {error}
        </div>
      )
    }
  }
}

export default App
