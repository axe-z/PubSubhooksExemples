import React, { useState, useEffect } from "react";
import PICTURES from "./data/pictures";
// import { useDynamicTransition } from "./hooks";

const SECONDS = 1000;
const minimumDelay = 1 * SECONDS;
const minimumIncrement = 1;

function Gallery() {
  const [delay, setDelay] = useState(SECONDS);
  const [increment, setIncrement] = useState(1);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const int = setInterval(index => {
      setIndex(prevIndex => (prevIndex + 1) % PICTURES.length); //cool shit peut importe tu peux modulus le max et ca retombe
    }, delay);
    return () => clearInterval(int);
  }, [delay, increment]);
  // const index = useDynamicTransition({
  //   delay,
  //   increment,
  //   length: PICTURES.length
  // });

  const updateDelay = event => {
    const delay = Number(event.target.value) * SECONDS;
    // console.log(delay);
    setDelay(delay < minimumDelay ? minimumDelay : delay);
  };

  const updateIncrement = event => {
    const increment = Number(event.target.value);
    // console.log(increment);
    setIncrement(increment < minimumIncrement ? minimumIncrement : increment);
  };

  return (
    <div className="Gallery">
      <img src={PICTURES[index].image} alt="gallery" />
      <div className="multiform">
        <div>
          Gallerie delay de transition (secondes):
          <input type="number" onChange={updateDelay} />
        </div>
        <div>
          Gallerie incremente:
          <input type="number" onChange={updateIncrement} />
        </div>
      </div>
    </div>
  );
}

export default Gallery;
