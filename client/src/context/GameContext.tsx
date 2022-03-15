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
    nums: 4,
  },
  {
    start: 0,
    min: 1,
    max: 20,
    nums: 5,
  },
  {
    start: 0,
    min: 1,
    max: 20,
    nums: 4,
  },
  {
    start: 0,
    min: 1,
    max: 50,
    nums: 20,
  },
  {
    start: 0,
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
  maxLevelSeen: number;
  nextStep: () => void;
  prevStep: () => void;
  attempts: number;
  hasFailed: boolean;
  jumpToLevel: (level: number) => void;
  handleInput: (index: number, value: string) => void;
  restartLevel: () => void;
  hasSeenLevel: (lastLevel: number) => boolean;
  values: Record<number, string>;
  correct: Record<number, boolean>;
  readOnly: Record<number, boolean>;
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
  const [level, setLevel] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [numElems, setNumElems] = useState(10);
  const [[min, max], setMinMax] = useState([0, 20]);
  const [maxLevelSeen, setMaxLevelSeen] = useState(0);

  // FIXME: All of these states should be put into one state. They all relate to the input.
  const [values, setValues] = useState<Record<number, string>>({});
  const [correct, setCorrect] = useState<Record<number, boolean>>({});
  const [readOnly, setReadOnly] = useState<Record<number, boolean>>({});

  const inputCorrectSound = useAudio("shortSuccess.mp3");
  const nextLevelSound = useAudio("celebration.mp3");
  const wrongSound = useAudio("wrong.mp3");

  const [attempts, setAttempts] = useState(0);

  const steps: Step[] = useMemo(
    () => generateSteps(generateArray(numElems, { min, max })),
    [min, max, numElems]
  );

  const currStep = steps[stepIndex];

  function handleInput(index: number, value: string) {
    // Avoid index out of bounds error, should never have to check
    // input for the array when the sort is done
    if (stepIndex >= steps.length - 1) return;
    setValues((prev) => ({ ...prev, [index]: value }));
    // Check stepIndex + 1 because the user will be inputting
    // the answer for the NEXT step based on the given instruction
    const answer = steps[stepIndex + 1].value[index];

    const isCorrect = checkInput(value, answer.toString());
    if (isCorrect) {
      inputCorrectSound.play();
    }
    setCorrect((prev) => ({
      ...prev,
      [index]: isCorrect,
    }));
  }

  function checkInput(value: string, target: string) {
    // For now, just compare strings... but in the future, it'd be nice to parse the user input to compensate for spacing or different separators (spaces, periods, etc.)
    return value === target;
  }

  function nextStep() {
    if (level === 0) {
      if (stepIndex === steps.length - 2) {
        nextLevelSound.play();
      }
      if (stepIndex < steps.length - 1) {
        setStepIndex(stepIndex + 1);
      }
    } else {
      // check if all inputs are correct
      const isCorrect = steps[stepIndex + 1].value.every((arr, index) =>
        checkInput(values[index], arr.toString())
      );

      if (isCorrect) {
        if (stepIndex === steps.length - 2) {
          nextLevelSound.play();
        }
        if (stepIndex < steps.length - 1) {
          setStepIndex(stepIndex + 1);
        }

        if (stepIndex < steps.length - 2) {
        // determine which input's should remain constant for the next step
        const persistentValues = steps[stepIndex + 2].value.reduce<
          Record<number, string>
        >((acc, val, index) => {
          console.log(val);
          if (steps[stepIndex + 1].value.includes(val)) {
            acc[index] = val.toString();
            return acc;
          }
          return acc;
        }, {});

        setValues(persistentValues);

        // all of the persistent values should be read only
        setReadOnly(
          Object.keys(persistentValues).reduce((accumulator, key) => {
            return { ...accumulator, [key]: true };
          }, {})
        );
        }

        setCorrect({});
      } else {
        // not correct
        wrongSound.play();
        setAttempts(attempts + 1);
      }
    }
  }

  function prevStep() {
    if (stepIndex > 0) {
      setStepIndex(stepIndex - 1);
    }
  }

  function restartLevel() {
    setStepIndex(0);
    setAttempts(0);
    setValues({});
    setCorrect({});
  }

  function hasSeenLevel(lastLevel: number) {
    return lastLevel < maxLevelSeen;
  }

  function jumpToLevel(dest: number) {
    const { start, nums, min, max } = LEVELS[dest];
    setStepIndex(start);
    setNumElems(nums);
    setMinMax([min, max]);
    setLevel(dest);
    setAttempts(0);
    setValues({});
    setCorrect({});
    if (dest > maxLevelSeen) {
      setMaxLevelSeen(dest);
    }
  }

  return (
    <GameContext.Provider
      value={{
        level,
        stepIndex,
        steps,
        maxLevelSeen,
        nextStep,
        prevStep,
        currStep,
        attempts,
        hasFailed: attempts === ATTEMPTS,
        handleInput,
        jumpToLevel,
        restartLevel,
        hasSeenLevel,
        values,
        correct,
        readOnly,
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
