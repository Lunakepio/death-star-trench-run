import { useProgress } from "@react-three/drei";
import { useRef } from "react";
import gsap from "gsap";
import { useEffect } from "react";
export const LoadingScreen = () => {
  const ref = useRef();
  
  const { progress } = useProgress();

  useEffect(() => {
    if (progress === 100) {
      gsap.to(ref.current, {
        duration: 1,
        opacity: 0,
        onComplete: () => {
          ref.current.style.display = "none";
        },
      });
    }
  }, [progress]);
  return (
    <div ref={ref} className="loading" style={{width: "100vw", height: "100vh", position: "fixed", top:0}}>
      <div className="logo"><img src="/svg/Rebel_Alliance_logo.png"/></div>
      <div className="row">
        <div className="trails" style={{width: `${progress}%`}}>
          <div className="trail"></div>
          <div className="trail"></div>
        </div>
        <div className="ship">
          <img src="/svg/xwingsilhouette.png" />
        </div>
      </div>
    </div>
  );
};
