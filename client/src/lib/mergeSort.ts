export interface Step {
  value: number[][];
  type: "split" | "combine" | "initial";
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
  steps.push({ value: [items], type: "initial" });
  divide(items);
  return steps;

  function addCombineStep(low: number[], high: number[], combined: number[]) {
    // If one of low or high is empty, then combining
    // is trivial and shouldn't be considered a step
    if (low.length === 0 || high.length === 0) return;
    let latest = steps[steps.length - 1];
    let newStep: number[][] = [];
    latest.value.forEach((item) => {
      if (isEqualArr(item, low)) {
        newStep.push(combined);
      } else if (!isEqualArr(item, high)) {
        newStep.push(item);
      }
    });
    steps.push({ value: newStep, type: "combine" });
  }

  function addSplitStep(low: number[], high: number[]) {
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
    steps.push({ value: newStep, type: "split" });
  }

  function divide(items: number[]): number[] {
    let halfLength = Math.ceil(items.length / 2);
    let low = items.slice(0, halfLength);
    let high = items.slice(halfLength);
    addSplitStep(low, high);
    if (halfLength > 1) {
      low = divide(low);
      high = divide(high);
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
