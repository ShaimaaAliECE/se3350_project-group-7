export interface Step {
  value: number[][];
  type: "split" | "combine" | "initial";
  instruction: string;
}

enum Direction {
  LEFT = 0,
  RIGHT = 1,
}

/**
 * Checks whether two arrays are equal by value.
 * @param arr1
 * @param arr2
 * @returns True if arrays are equal. False if arrays are not equal.
 */
export function isEqualArr(arr1: number[], arr2: number[]): boolean {
  if (arr1.length !== arr2.length) return false;
  return arr1.every((val, index) => val === arr2[index]);
}

export default function generateSteps(items: number[]): Step[] {
  let steps: Step[] = [];
  // TODO: Remove hardcode for 10 and dynamically change the number depending on what level the user is on
  steps.push({
    value: [items],
    type: "initial",
    instruction: "Generate an unsorted array of 10 numbers.",
  });
  divide(items, Direction.LEFT);
  return steps;

  function addCombineStep(low: number[], high: number[], combined: number[]) {
    // If one of low or high is empty, then combining
    // is trivial and shouldn't be considered a step
    if (low.length === 0 || high.length === 0) return;
    let latest = steps[steps.length - 1];
    let newStep: number[][] = [];
    let seenLow = false;
    latest.value.forEach((item) => {
      // If we've already seen the low element once,
      // this element must be a duplicate of the low
      // and the combined node has already been added as a
      // value in the step
      if (isEqualArr(item, low) && !seenLow) {
        newStep.push(combined);
        seenLow = true;
      } else if (!isEqualArr(item, high)) {
        newStep.push(item);
      }
    });

    const instruction = `Compare the elements of the left array: [${low}], with the elements of the right array: [${high}], and combine them in sorted order.`;

    steps.push({
      value: newStep,
      type: "combine",
      instruction: instruction,
    });
  }

  function addSplitStep(low: number[], high: number[], direction: Direction) {
    // If one of low or high is empty, then splitting
    // is trivial and shouldn't be considered a step
    if (low.length === 0 || high.length === 0) return;
    let start = low[0];
    let end = high[high.length - 1];
    let latest = steps[steps.length - 1];

    const newStep: number[][] = [];
    latest.value.forEach((item) => {
      if (item[0] === start && item[item.length - 1] === end) {
        newStep.push(low);
        newStep.push(high);
      } else newStep.push(item);
    });

    const instruction = `Split the array in half between ${
      low[low.length - 1]
    } and ${high[0]}. Check the ${
      direction === Direction.LEFT ? "left" : "right"
    } side array.`;

    steps.push({ value: newStep, type: "split", instruction: instruction });
  }

  function divide(items: number[], direction: Direction): number[] {
    let halfLength = Math.ceil(items.length / 2);
    let low = items.slice(0, halfLength);
    let high = items.slice(halfLength);
    addSplitStep(low, high, direction);
    if (halfLength > 1) {
      low = divide(low, Direction.LEFT);
      high = divide(high, Direction.RIGHT);
    }
    return combine(low, high);
  }

  function combine(low: number[], high: number[]): number[] {
    let indexLow = 0;
    let indexHigh = 0;
    let lengthLow = low.length;
    let lengthHigh = high.length;
    let combined = [];
    while (indexLow < lengthLow || indexHigh < lengthHigh) {
      let lowItem = low[indexLow];
      let highItem = high[indexHigh];
      if (lowItem !== undefined) {
        if (highItem === undefined) {
          combined.push(lowItem);
          indexLow++;
        } else {
          if (lowItem <= highItem) {
            combined.push(lowItem);
            indexLow++;
          } else {
            combined.push(highItem);
            indexHigh++;
          }
        }
      } else {
        if (highItem !== undefined) {
          combined.push(highItem);
          indexHigh++;
        }
      }
    }

    addCombineStep(low, high, combined);
    return combined;
  }
}
