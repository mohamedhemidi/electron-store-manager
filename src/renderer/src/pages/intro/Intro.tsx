import { useEffect } from 'react'
import LogoIcon from '../../assets/logo.png'
import gsap from 'gsap'
const Intro = (): JSX.Element => {
  useEffect(() => {
    const t1 = gsap.timeline()
    t1.to('#intro-slider', {
      xPercent: '-100',
      delay: 2,
      duration: 2
    })
  }, [])

  return (
    <div
      id="intro-slider"
      className="h-screen bg-white absolute top-0 left-0 w-screen flex justify-center items-center p-4"
    >
      <div className="intro-container flex flex-col p-2 justify-center items-center gap-8">
        <img id="intro-logo" className="w-32 h-32" src={LogoIcon} />
        <h1 id="intro-title" className="text-4xl">
          Store Manager
        </h1>
        <h1 id="intro-version" className="text-xl">
          V 1.0.0
        </h1>
      </div>
    </div>
  )
}

export default Intro
