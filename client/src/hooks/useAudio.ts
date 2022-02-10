import { useState, useEffect } from "react";

export default function useAudio(url: string) {
  const _url = `http://localhost:3000/sounds/${url}`; // FIXME: The url should change depending on the environment...
  const [audio] = useState(new Audio(_url));
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [playing, audio]);

  function play() {
    audio.play();
  }

  useEffect(() => {
    audio.addEventListener("ended", () => setPlaying(false));
    return () => {
      audio.removeEventListener("ended", () => setPlaying(false));
    };
  }, []);

  return { playing, toggle, play };
}
