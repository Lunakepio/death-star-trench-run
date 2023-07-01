import { useState, useRef, useEffect, useContext} from "react";
import { GameContext } from "./main";

import gsap from "gsap";


export const Web = () => {
  const overlay = useRef();
  const body = useRef();
  const subtext = useRef();
  const h1 = useRef();
  const layer = useRef();
  const button = useRef();
  const active = useRef(false);
  const border = useRef(false);
  const one = useRef(false);
  const two = useRef(false);
  const three = useRef(false);
  const four = useRef(false);
  const five = useRef(false);
  const six = useRef(false);
  const config = useRef();
  const intro = useRef();
  const { setup, setSetup, status, setStatus } = useContext(GameContext);

  const [showControls, setShowControls] = useState(false);



  const welcome = useRef();

  const handleButtonClick = () => {
    active.current = !active.current;
    const tl = gsap.timeline();
    tl.add("start4");
    tl.to(
      overlay.current,
      {
        duration: 1,
        opacity: 0,
        ease: "expo.out",
      },
      "start4"
    );
    tl.to(
      body.current,
      {
        duration: 1,
        opacity: 0,
        ease: "expo.out",
      },
      "start4"
    );

    tl.add("start5");
    tl.set(overlay.current, { display: "none" }, "start5");
    tl.set(body.current, { display: "none" }, "start5");
;
    gsap.set(welcome.current, { visibility: "visible" });
    gsap.set(welcome.current, { opacity: 1 });
    gsap.to(intro.current, {
      duration: 2,
      opacity: 1,
      delay: 5,
      ease: "expo.out",
    });
    setStatus("active")
  };

  const handleContinue = () => {
    gsap.to(intro.current, {
      duration: 2,
      opacity: 0,
      ease: "expo.out",
    });
    gsap.to(config.current, {
      duration: 2,
      opacity: 1,
      delay: 5,
      ease: "expo.out",
    });
    setStatus("config");
  };

  const handleTakeOff = () => {
    gsap.to(welcome.current, {
      duration: 2,
      opacity: 0,
      ease: "expo.out",
    });
    gsap.set(welcome.current, { display: "none", delay: 2 });
    setStatus("takeOff");
  };

  useEffect(() => {
    const elements = [
      one.current,
      two.current,
      three.current,
      four.current,
      five.current,
      six.current,
    ];

    gsap.set(one.current, { y: "100%" });
    gsap.set(two.current, { y: "100%" });
    gsap.set(three.current, { y: "100%" });
    gsap.set(four.current, { y: "100%" });
    gsap.set(five.current, { y: "100%" });
    gsap.set(six.current, { y: "100%" });
    gsap.set(h1.current, { y: "100%" });
    const tl = gsap.timeline({ delay: 1 });
    tl.add("start");
    tl.to(
      overlay.current,
      {
        duration: 1,
        opacity: 1,
        ease: "expo.out",
      },
      "start"
    );
    tl.to(
      body.current,
      {
        duration: 2,
        opacity: 1,
        ease: "expo.out",
      },
      "start"
    );
    tl.to(
      border.current,
      {
        duration: 2,
        width: "100%",
        ease: "expo.out",
        delay: 0.5,
      },
      "start"
    );
    tl.add("start2");
    tl.to(
      subtext.current,
      {
        duration: 1,
        opacity: 1,
        ease: "expo.out",
      },
      "start2"
    );

    tl.add("start3");
    const staggerDelay = 0.1; // Adjust the stagger delay as desired
    elements.forEach((element, index) => {
      const delay = staggerDelay * index;
      tl.to(
        h1.current,
        {
          duration: 3,
          y: "0%",
          ease: "expo.out",
        },
        "start3"
      );
      tl.to(
        element,
        {
          duration: 1.5,
          y: "0%",
          opacity: 1,
          ease: "expo.out",
        },
        `start3+=${delay}`
      );
    });
    tl.to(
      button.current,
      {
        duration: 1,
        opacity: 1,
        ease: "expo.out",
      },
      "start3+=1.5"
    );
  }, []);

  return (
    <>
      <div className="overlay" ref={overlay}></div>

      <div className="body" ref={body}>
        <header>
          <img src="/svg/Rebel_Alliance_logo.png" />
          <div className="title">X - WING</div>
          <div className="test"></div>
        </header>
        <div ref={border} className="border"></div>
        <div className="container">
          <p ref={subtext}>The Empire strikes. Yavin needs a Hero.</p>
          <h1 ref={h1}>
            <span ref={layer} className="layer">
              <span ref={one}>Galaxy's</span> <span ref={two}>fate</span>{" "}
              <span ref={three}>lies</span> <span ref={four}>in</span>{" "}
              <span ref={five}>your</span> <span ref={six}>hands.</span>
            </span>
          </h1>
          <button ref={button} onClick={() => handleButtonClick()}>
            ENTER
          </button>
        </div>
      </div>
      <div className="welcome" ref={welcome}>
        <div ref={config} className="col configuration">
          <h1>Configure your experience.</h1>
          <div className="setup">
            <div className="row">
              <p>CONTROLS</p>
              <div className="options">
                <div
                  className={`option ${setup.mouse ? "active" : ""}`}
                  onClick={() => setSetup({ ...setup, mouse: true })}
                >
                  MOUSE
                </div>
                <div
                  className={`option ${!setup.mouse ? "active" : ""}`}
                  onClick={() => setSetup({ ...setup, mouse: false })}
                >
                  KEYBOARD
                </div>
              </div>
            </div>
            <div className="row">
              <p>INVERT LOOK</p>
              <div className="options">
                <div
                  className={`option ${setup.invertLook ? "active" : ""}`}
                  onClick={() => setSetup({ ...setup, invertLook: true })}
                >
                  YES
                </div>
                <div
                  className={`option ${!setup.invertLook ? "active" : ""}`}
                  onClick={() => setSetup({ ...setup, invertLook: false })}
                >
                  NO
                </div>
              </div>
            </div>
            <div className="row">
              <p>GRAPHICS</p>
              <div className="options">
                <div
                  className={`option ${
                    setup.graphics === 0 ? "active" : ""
                  }`}
                  onClick={() => setSetup({ ...setup, graphics: 0 })}
                >
                  LOW
                </div>
                <div
                  className={`option ${
                    setup.graphics === 1 ? "active" : ""
                  }`}
                  onClick={() => setSetup({ ...setup, graphics: 1 })}
                >
                  MEDIUM
                </div>
                <div
                  className={`option ${
                    setup.graphics === 2 ? "active" : ""
                  }`}
                  onClick={() => setSetup({ ...setup, graphics: 2 })}
                >
                  HIGH
                </div>
              </div>
            </div>
            <div className="row">
              <p>SOUND</p>
              <div className="options">
                <div
                  className={`option ${setup.sound === true ? "active" : ""}`}
                  onClick={() => setSetup({ ...setup, sound: true })}
                >
                  ON
                </div>
                <div
                  className={`option ${setup.sound === false ? "active" : ""}`}
                  onClick={() => setSetup({ ...setup, sound: false })}
                >
                  OFF
                </div>
              </div>
            </div>
          </div>
          <div className="setup map">
            <div className="row">
              <p>PITCH UP/DOWN</p>
              <div className="options">
                <div className="option">
                  <img src="/svg/z.svg" />
                </div>
                <div className="option">
                  <img src="/svg/s.svg" />
                </div>
                <div className="option">
                  <img src="/svg/arrowsUp.svg" />
                </div>
                <div className="option">
                  <img src="/svg/arrowsDown.svg" />
                </div>
              </div>
            </div>
            <div className="row">
              <p>ROLL LEFT</p>
              <div className="options">
                <div className="option">
                  <img src="/svg/q.svg" />
                </div>
                <div className="option">
                  <img src="/svg/arrowsLeft.svg" />
                </div>
              </div>
            </div>
            <div className="row">
              <p>ROLL RIGHT</p>
              <div className="options">
                <div className="option">
                  <img src="/svg/d.svg" />
                </div>
                <div className="option">
                  <img src="/svg/arrowsRight.svg" />
                </div>
              </div>
            </div>
            <div className="row">
              <p>SHOOT</p>
              <div className="options">
                <div className="option">
                  <img src="/svg/click.svg" />
                </div>
                <div className="option">
                  <img src="/svg/e.svg" />
                </div>
              </div>
            </div>
            <div className="row">
              <p>OPEN/CLOSE WINGS</p>
              <div className="options">
                <div className="option">
                  <img src="/svg/space.svg" />
                </div>
              </div>
            </div>
            <div className="row">
              <p>SLOW DOWN</p>
              <div className="options">
                <div className="option">
                  <img src="/svg/shift.svg" />
                </div>
              </div>
            </div>
          </div>
          <button onClick={() => handleTakeOff()}>TAKE OFF</button>
        </div>
        <div className="col container" ref={intro}>
          <h1>Welcome to the Rebellion, Pilot!</h1>
          <p>
            The Empire has constructed a terrible weapon, capable of destroying
            entire planets.
          </p>
          <p className="death">
            THE
            <br />
            <br />
            <span>DEATH STAR</span>
          </p>
          <img src="/svg/death.png" />
          <p>
            With its unimaginable destructive capabilities, the Death Star poses
            an unparalleled threat to our galaxy. The Empire seeks to instill
            fear and crush any flicker of rebellion. However, we are determined
            to defy their reign and restore peace in the universe.
          </p>
          <p>Your force is crucial for the impending Battle of Yavin.</p>
          <button onClick={() => handleContinue()}>CONTINUE</button>
        </div>
      </div>
    </>
  );
};
