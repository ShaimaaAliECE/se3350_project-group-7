import { isEqualArr } from "./mergeSort";

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
