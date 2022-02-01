import generateSteps, { isEqualArr } from "./mergeSort";

describe("Given two arrays", () => {
  test("isEqualArr returns True when arrays are equal", () => {
    const arrOne = [1, 2, 3];
    const arrTwo = [1, 2, 3];
    expect(isEqualArr(arrOne, arrTwo)).toBeTruthy();
  });
  test("isEqualArr returns False when arrays are unequal", () => {
    const arrOne = [1, 2, 3];
    const arrTwo = [1, 2, 4];
    expect(isEqualArr(arrOne, arrTwo)).toBeFalsy();
  });
});

describe("Given an unsorted array", () => {
  test("generateSteps correctly generates steps of merge sort for an array with an even number of elements", () => {
    const items = [3, 5, 2, 4];
    const mergeSortSteps = generateSteps(items);
    expect(mergeSortSteps).toEqual([
      {
        value: [[3, 5, 2, 4]],
        type: "initial",
      },
      {
        value: [
          [3, 5],
          [2, 4],
        ],
        type: "split",
      },
      {
        value: [[3], [5], [2, 4]],
        type: "split",
      },
      {
        value: [
          [3, 5],
          [2, 4],
        ],
        type: "combine",
      },
      {
        value: [[3, 5], [2], [4]],
        type: "split",
      },
      {
        value: [
          [3, 5],
          [2, 4],
        ],
        type: "combine",
      },
      {
        value: [[2, 3, 4, 5]],
        type: "combine",
      },
    ]);
  });
  test("generateSteps correctly generates steps of merge sort for an array with an odd number of elements", () => {
    const items = [1, 3, 5, 2, 4];
    const mergeSortSteps = generateSteps(items);
    expect(mergeSortSteps).toEqual([
      {
        value: [[1, 3, 5, 2, 4]],
        type: "initial",
      },
      {
        value: [
          [1, 3, 5],
          [2, 4],
        ],
        type: "split",
      },
      {
        value: [[1, 3], [5], [2, 4]],
        type: "split",
      },
      {
        value: [[1], [3], [5], [2, 4]],
        type: "split",
      },
      {
        value: [[1, 3], [5], [2, 4]],
        type: "combine",
      },
      {
        value: [
          [1, 3, 5],
          [2, 4],
        ],
        type: "combine",
      },
      {
        value: [[1, 3, 5], [2], [4]],
        type: "split",
      },
      {
        value: [
          [1, 3, 5],
          [2, 4],
        ],
        type: "combine",
      },
      {
        value: [[1, 2, 3, 4, 5]],
        type: "combine",
      },
    ]);
  });
  // test("generateSteps correctly generates steps of merge sort for an array with one duplicate element", () => {
  //   const items = [1, 3, 5, 2, 2];
  //   const mergeSortSteps = generateSteps(items);
  //   expect(mergeSortSteps).toEqual([
  //     {
  //       value: [[1, 3, 5, 2, 2]],
  //       type: "initial",
  //     },
  //     {
  //       value: [
  //         [1, 3, 5],
  //         [2, 2],
  //       ],
  //       type: "split",
  //     },
  //     {
  //       value: [[1, 3], [5], [2, 2]],
  //       type: "split",
  //     },
  //     {
  //       value: [[1], [3], [5], [2, 2]],
  //       type: "split",
  //     },
  //     {
  //       value: [[1, 3], [5], [2, 2]],
  //       type: "combine",
  //     },
  //     {
  //       value: [
  //         [1, 3, 5],
  //         [2, 2],
  //       ],
  //       type: "combine",
  //     },
  //     {
  //       value: [[1, 3, 5], [2], [2]],
  //       type: "split",
  //     },
  //     {
  //       value: [
  //         [1, 3, 5],
  //         [2, 2],
  //       ],
  //       type: "combine",
  //     },
  //     {
  //       value: [[1, 2, 2, 3, 5]],
  //       type: "combine",
  //     },
  //   ]);
  // });
});
