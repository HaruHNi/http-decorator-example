import React, { useState, useEffect } from 'react'
import { Global, css } from '@emotion/react'

import ListItem from './components/ListItem'
import PhotosService, { Photo } from './services/photos'

const App: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([])

  useEffect(() => {
    const fetchPhotos = async () => {
      const result = await new PhotosService().getPhotos()
      if (result) {
        setPhotos(result.slice(0, 499))
      }
    }

    fetchPhotos()
  }, [])

  return (
    <>
      <Global styles={globalStyle} />
      <div>
        <h1 css={headerStyle}>Fake API Sample!!</h1>
      </div>
      <ul css={listStyle}>
        {photos.map((photo, index) => {
          return <ListItem key={index} {...photo} />
        })}
      </ul>
    </>
  )
}

export default App

const globalStyle = css`
  body {
    margin: 0;
  }
`

const headerStyle = css`
  padding: 10px 0;
  margin: 0;
  text-align: center;
  background-color: #ededed;
`

const listStyle = css`
  list-style-type: none;
  margin: 10px 0 0 0;
  padding: 0;
`
