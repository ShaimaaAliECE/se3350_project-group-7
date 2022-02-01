export default function generateSteps(items: number[]): number[][][] {
  let steps: number[][][] = [];
  steps.push([items]);
  divide(items);
  return steps;

  function addCombineStep(low: number[], high: number[], combined: number[]) {
    let latest = steps[steps.length - 1];
    let newStep: number[][] = [];
    latest.forEach((item) => {
      if (item.toString() == low.toString()) {
        newStep.push(combined);
      } else if (item.toString() != high.toString()) {
        newStep.push(item);
      } else {
      }
    });
    steps.push(newStep);
  }

  function addSplitStep(left: number[], right: number[]) {
    let start = left[0];
    let end = right[right.length - 1];
    let latest = steps[steps.length - 1];

    const newStep: number[][] = [];
    latest.forEach((item) => {
      if (item[0] === start && item[item.length - 1] === end) {
        newStep.push(left);
        newStep.push(right);
      } else newStep.push(item);
    });
    steps.push(newStep);
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
