import React from 'react'

import { useLazyLoadImage } from '../hooks/useLazyLoadImage'

interface ImageProps {
  src: string
  alt?: string
}

const LazyImage: React.FC<ImageProps> = ({ src, alt }) => {
  const { imgSrc, imgRef } = useLazyLoadImage(src)
  return <img ref={imgRef} src={imgSrc} alt={alt} />
}

export default React.memo(LazyImage)
