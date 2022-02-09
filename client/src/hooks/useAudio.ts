import { useState, useEffect } from "react";

export default function useAudio(url: string) {
  const _url = `http://localhost:3000/sounds/${url}`;
  const [audio] = useState(new Audio(_url));
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
    console.log(audio);
    playing ? audio.play() : audio.pause();
  }, [playing]);

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
