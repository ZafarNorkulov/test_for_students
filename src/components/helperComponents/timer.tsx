import { useState, useEffect, Dispatch, SetStateAction } from "react";

const Timer = ({ time, setRemaindTime }: { time: number; setRemaindTime: Dispatch<SetStateAction<number>> }) => {
  const [delay, setDelay] = useState(time);
  const minutes = Math.floor(delay / 60);
  const seconds = Math.floor(delay % 60);
  useEffect(() => {
    const timer = setInterval(() => {
      setDelay(delay - 1);
    }, 1000);

    if (delay === 0) {
      clearInterval(timer);
    }

    return () => {
      clearInterval(timer);
    };
  });
  setRemaindTime(delay);

  return (
    <>
      <span className="text-black text-lg">
        {minutes < 10 ? `0${minutes}` : minutes}:
        {seconds < 10 ? `0${seconds}` : seconds}
      </span>
    </>
  );
};

export default Timer;
