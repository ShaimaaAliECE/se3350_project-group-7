import { useMemo, useState } from "react";
import generateSteps, { Step } from "../lib/mergeSort";

interface Options {
  min?: number;
  max?: number;
  unique?: boolean;
}

function generateArray(n: number, options?: Options) {
  const {
    min = 0,
    max = Number.MAX_SAFE_INTEGER,
    unique = false,
  } = options || {};
  const result = [];
  const seen = new Set<number>();
  for (let i = 0; i < n; i++) {
    let num;

    while (!num || (unique && seen.has(num))) {
      num = Math.floor(Math.random() * (max - min) + min);
    }
    if (unique) {
      seen.add(num);
    }
    result.push(num);
  }
  return result;
}

export default function useGame() {
  const [level, setLevel] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);

  const [[min, max], setMinMax] = useState([0, 20]);
  const steps: Step[] = useMemo(() => {
    const items = generateArray(5, { min, max });
    return generateSteps(items);
  }, [level, min, max]);

  const curr = steps[stepIndex];

  function next() {
    if (stepIndex < steps.length - 1) {
      setStepIndex(stepIndex + 1);
    }
  }

  function restart() {
    setStepIndex(0);
  }

  function prev() {
    if (stepIndex > 0) {
      setStepIndex(stepIndex - 1);
    }
  }

  return {
    steps,
    stepIndex,
    curr,
    next,
    prev,
    restart
  };
}
