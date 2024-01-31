import { arrayDestructuring } from "@/utils/arrayDestructuring";

describe("arrayDestructuring function", () => {
  it("returns the first element of a valid array", () => {
    const array = [1, 2, 3];
    const result = arrayDestructuring(array, "defaultValue");
    expect(result).toBe(1);
  });

  it("returns the default value for an empty array", () => {
    const emptyArray: number[] = [];
    const defaultValue = "defaultValue";
    const result = arrayDestructuring(emptyArray, defaultValue);
    expect(result).toBe(defaultValue);
  });

  it("returns the default value for an invalid array", () => {
    const invalidArray = { key: "value" }; // Not an array
    const defaultValue = "defaultValue";
    const result = arrayDestructuring(invalidArray, defaultValue);
    expect(result).toBe(defaultValue);
  });

  it("returns the value at the specified initial position", () => {
    const array = [1, 2, 3];
    const initialPosition = 1;
    const result = arrayDestructuring(array, "defaultValue", initialPosition);
    expect(result).toBe(2);
  });

  it("returns the default value if initial position is out of bounds", () => {
    const array = [1, 2, 3];
    const initialPosition = 10; // Out of bounds
    const defaultValue = "defaultValue";
    const result = arrayDestructuring(array, defaultValue, initialPosition);
    expect(result).toBe(defaultValue);
  });
});
