import React, { createContext, useContext, useState, useMemo } from "react";
import generateSteps, { Step } from "../lib/mergeSort";
import useAudio from "../hooks/useAudio";

const ATTEMPTS = 3;

interface LevelConfig {
  start: number;
  min: number;
  max: number;
  nums: number;
}
const LEVELS: LevelConfig[] = [
  {
    start: 0,
    min: 1,
    max: 20,
    nums: 10,
  },
  {
    start: 1,
    min: 1,
    max: 20,
    nums: 10,
  },
  {
    start: 1,
    min: 1,
    max: 20,
    nums: 10,
  },
  {
    start: 1,
    min: 1,
    max: 50,
    nums: 20,
  },
  {
    start: 1,
    min: 1,
    max: 100,
    nums: 50,
  },
];
interface ContextType {
  steps: Step[];
  currStep: Step;
  stepIndex: number;
  level: number;
  nextStep: () => void;
  prevStep: () => void;
  attempts: number;
  hasFailed: boolean;
  jumpToLevel: (level: number) => void;
  handleInput: (index: number, value: string) => void;
  values: Record<number, string>;
  correct: Record<number, boolean>;
}

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

export const GameContext = createContext<ContextType | null>(null);

export const GameProvider: React.FC = ({ children }) => {
  const [level, setLevel] = useState<number>(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [numElems, setNumElems] = useState(10);
  const [[min, max], setMinMax] = useState([0, 20]);

  const [values, setValues] = useState<Record<number, string>>({});
  const [correct, setCorrect] = useState<Record<number, boolean>>({});
  const audio = useAudio("shortSuccess.mp3");

  const [attempts, setAttempts] = useState(0);
  const steps: Step[] = useMemo(
    () => generateSteps(generateArray(numElems, { min, max })),
    [min, max, numElems]
  );

  const currStep = steps[stepIndex];

  function handleInput(index: number, value: string) {
    setValues((prev) => ({ ...prev, [index]: value }));
    const answer = steps[stepIndex].value[index];
    const isCorrect = checkInput(value, answer.toString());
    setCorrect((prev) => ({
      ...prev,
      [index]: isCorrect,
    }));
    if (isCorrect) {
      audio.play();
    }
  }

  function checkInput(value: string, target: string) {
    if (value === target) {
      audio.play();
      return true;
    } else {
      return false;
    }
  }

  function nextStep() {
    if (level === 0) {
      if (stepIndex < steps.length - 1) {
        setStepIndex(stepIndex + 1);
      }
    }
    // check if all inputs are correct
    const isCorrect = currStep.value.every(
      (arr, index) => values[index] === arr.toString()
    );

    if (isCorrect) {
      if (stepIndex < steps.length - 1) {
        setStepIndex(stepIndex + 1);
      }

      // clear input values
      setValues({});
      setCorrect({});
    } else {
      // not correct
      setAttempts(attempts + 1);
    }
  }

  function prevStep() {
    if (stepIndex > 0) {
      setStepIndex(stepIndex - 1);
    }
  }

  function jumpToLevel(dest: number) {
    const { start, nums, min, max } = LEVELS[dest];
    setStepIndex(start);
    setNumElems(nums);
    setMinMax([min, max]);
    setLevel(dest);
  }

  return (
    <GameContext.Provider
      value={{
        level,
        stepIndex,
        steps,
        nextStep,
        prevStep,
        currStep,
        attempts,
        hasFailed: attempts === ATTEMPTS,
        handleInput,
        jumpToLevel,
        values,
        correct,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined || !context) {
    throw new Error("useGame must be used within GameProvider");
  }

  return context;
};
