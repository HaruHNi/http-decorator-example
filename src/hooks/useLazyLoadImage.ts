import { useRef, useState, useEffect } from 'react'

const DEFAULT_IMAGE =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABLCAYAAAA4TnrqAAAFG0lEQVR4Xu3cSyg9URgA8O9GkUfezyiJkGSLsmDBhrKQR1HYIRaUrChFKRtlwQaJEknJOwvEgixECSHyTnks5Bn/vqN7//d953HOzBnmlNKdme+e7+c730yajmFra+s7MDAQPDw8QB/2Bd7e3uD+/h4MJycn3/hLXFwc+Pn56V5WAk9PT3B0dARYUIbLy8tvb29v8oEOZillhEKX5+fnH6zIyEgwP6BXGNh4XF1d/cdCUx3sp7LsOdhg6WCOC8Yu1l8Gc7ayHGL9RTBXLcgp1l8CcwWFFi6x/gKYECjBWL8ZTCiUKKzfCCYGSjTWbwITCyUJ6zeASYGSjKVlMKlQsrC0CCYHSjaWlsDkQlHB0gIYDShqWDyD0YKiisUjGE0o6lg8gdGGYoLFAxgLKGZYaoKxgmKKpQYYSyjmWEqCsYZSBEsJMCWgFMNiCaYUlKJYLMCUhFIciyaY0lCqYNEAUwNKNSw5YGpBqYolBUxNKNWxxICpDcUFlhAwHqC4wXIGxgsUV1j2wHiC4g7LHCwiIgKur6+5ehNR0LsOmISSAyeFUAiGbyTyMrjDMi49vbJclIh1j9J7lgMwRzA8gXGxDF2BuDquVE9THUsohNDzWMKpiiUWQOz5tOFUw5KauNTraMCpgiU3YbnXS4VTHItWorTiiIFTFIt2grTjuYJTDItVYqzi2oNTBIt1QqzjG+GYYymViBLfwxRLiQTMlwvr72OGxXrijpoxy+9lgsVywq7uWEL+py8khiINXm0oY5Is5kG1slhMUGoVsKgwali8QbGoMCpYvELRBpONxTsUTTBZWFqBogUmGUtrUDTAJGFpFUoumGgsrUPJAROFxSvU19cX4I/5cHNzA4PB4PQxzV4+zmIJxlIbqq6uDnp6emySf3h4gNHRUaiurrY4dnh4CPHx8XaxJiYmoLCw0ObY7OwsnJ2dOYwlCEttKMzq9fUVPj4+TAl2d3fD/Pw8rK2tQUdHB7y8vEBra6vpuLPKwjgYzzhWVlYgPz8fTk9PYWRkxGEsl1g8QFmXwPv7O0RHR0NfXx8UFBRAY2MjxMTEAFaf+RgeHobe3l5YXFwELy8vqK2thbCwMGhpabE4r7S0lGwkVlVVBQMDA5CQkGATCy/Q5F40iIBVdHBwAO7u7lBZWQmrq6vg6elJll5TUxNkZGTA5+cnZGZmQnp6OuTl5QGi7O/vQ0BAgAnr+PiYvNaEG60FBwdDeXk57O7uElzzWE6xeKwonDA24JSUFFIlNTU1JOn19XUIDw8nDX18fByam5vh5uaGVBEiYNK+vr5kieFyMx/19fXk3LGxMfLxwsICWaJYqbjMzWPZrSxeoTCZubk5KC4uJkvCx8fHpkkjJr6u1NXVRaoEqys1NRX29vbIO1+Iahx3d3cQGhpKsLESrR8rYmNjITEx0RTLBotnKEwmKyuLLCts6vbG7e0tAZmcnCT9rL29HZaWlkiPe3x8hKmpKdNlbW1tMD09DZubmzah0AE/z8nJMcWywOIdamNjA9LS0uD8/ByioqJIgoiDCZWUlAA2/qGhIQgKCiJ3yZ2dHcjOzobt7W3w9/eHpKQk6OzshIqKCrLZIVZgf3+/6THCOtbg4CDpXcvLyxASEvK/wWthN0mc9MXFBZSVlVlUAsIgJC6r5ORkKCoqInuuzszMkGSxGnFgpeDzF16PjR2ftxoaGshNwjisY+Xm5pI/jmk3SX2fUrsr2qaHkX1K9R1wnWPhUeMOuP8A7H9W4Cv/IrsAAAAASUVORK5CYII='

export function useLazyLoadImage(src: string) {
  const [imgSrc, setImgSrc] = useState<string>(DEFAULT_IMAGE)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    let observer: IntersectionObserver

    if (imgRef) {
      observer = new IntersectionObserver(
        ([entry]: IntersectionObserverEntry[], io: IntersectionObserver) => {
          if (entry.isIntersecting) {
            setImgSrc(src)
            io.unobserve(entry.target)
          }
        },
        {
          threshold: 0.5
        }
      )

      if (imgRef.current) {
        observer.observe(imgRef.current)
      }
    }

    return () => observer && observer.disconnect()
  }, [imgRef, imgSrc, src])

  return { imgSrc, imgRef }
}
