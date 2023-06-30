import { PositionPoint, Text, PositionalAudio } from "@react-three/drei"
import { useEffect, useRef, useContext} from "react"
import gsap from "gsap"
import { GameContext } from "./main"

export const Opening = () => {
  const galaxy = useRef();
  const starwars = useRef();
  const star = useRef();
  const wars = useRef();
  const text = useRef();
  const audio = useRef();
  const { setup } = useContext(GameContext);


  useEffect(() => {
    const tl = gsap.timeline({repeat: 0, delay: 1});

    tl.add('start')
    tl.to(galaxy.current, {fillOpacity: 1, duration: 1, ease: 'power1.inOut'}, 'start')
    tl.add('start2');
    tl.to(galaxy.current, {fillOpacity: 0, duration: 1, delay:5, ease: 'power1.inOut'}, 'start2')
    tl.add('start3');
    tl.set(starwars.current, {visible: true, delay:2}, 'start3')
    setup.sound &&     tl.set(audio.current, {play:true, delay: 0}, 'start3');
    tl.set(galaxy.current, {visible: false}, 'start3')
    tl.to(starwars.current.position, {z: 40, duration: 50, ease: 'power1.inOut'}, 'start3')
    tl.to(text.current.position, {y: 40, duration: 200, delay: 5}, 'start3')
    tl.to(star.current, {fillOpacity: 0, duration: 4, delay: 20 }, 'start3')
    tl.to(wars.current, {fillOpacity: 0, duration: 4, delay: 20}, 'start3')
    tl.set(starwars.current, {visible: false, delay: 24}, 'start3')

    gsap.to(text.current, {fillOpacity: 0, duration: 3, delay: 85})

  }, []);
  return(
    <>
      <Text ref={galaxy} transparent font={'/trade.ttf'} color="#59c0e3" fontSize={1} position={[0, 0, 0]} fillOpacity={0} rotation-y={Math.PI} anchorX="center" anchorY="middle">
        {'A long time ago in a galaxy far,\nfar away....'}
      </Text>
      <group ref={starwars} visible={false} position={[0,0.5,-17]}>
      <Text ref={star} font={'/galaxy.ttf'} color="#f7eb39" fontSize={1} position={[0, 0, 0]} fillOpacity={1} transparent rotation-y={Math.PI} anchorX="center" anchorY="middle">
        {'STAR'}
      </Text>
      <Text ref={wars} font={'/galaxy.ttf'}  color="#f7eb39" fontSize={1} position={[0, -0.8, 0]} fillOpacity={1} transparent rotation-y={Math.PI} anchorX="center" anchorY="middle">
        {'WARS'}
      </Text>
      </group>
      <group rotation-x ={Math.PI / 4}>
      <Text ref={text} font={'/news.otf'} color="#f7eb39" transparent fontSize={1} position={[0,-25, 0]} rotation-y={Math.PI} anchorX="center" anchorY="middle" textAlign="justify" maxWidth={20}>
        {'It is a period of civil war. Rebel spaceships, striking from a hidden base, have won their first victory against the evil Galactic Empire.'}
        {'\n\nDuring the battle, Rebel spies managed to steal secret plans to the Empire\'s ultimate weapon, the DEATH STAR, an armored space station with enough power to destroy an entire planet.'}
        {'\n\nThe fate of the galaxy hangs in the balance, and the weight of its salvation rests solely upon your shoulders. You, courageous warrior, are now entrusted with a perilous mission of monumental proportions: to annihilate the dreaded DEATH STAR and usher in a new era of hope and freedom.'}
        {'\n\nMay the Force guide your path as you embark on this perilous journey to dismantle the DEATH STAR and carve your name into the stars as the savior of the galaxy!'}

      </Text>
      </group>
      <PositionalAudio ref={audio} loop={false} url="/intro.mp3" distance={50} />
    </>
  )
}