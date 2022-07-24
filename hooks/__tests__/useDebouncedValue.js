import { act, renderHook } from "@testing-library/react";
import useDebouncedValue from "../useDebouncedValue";

describe("useDebouncedValue", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  it("Should return debounced value", () => {
    const { result } = renderHook(
      (props) => useDebouncedValue(props.value, 500),
      {
        initialProps: { value: "a" },
      }
    );

    expect(result.current).toEqual("a");
  });

  it("Should update debounced value only after delay", () => {
    const { result, rerender } = renderHook(
      (props) => useDebouncedValue(props.value, 500),
      { initialProps: { value: "a" } }
    );

    expect(result.current).toEqual("a");

    act(() => {
      jest.advanceTimersByTime(250);
    });

    rerender({ value: "b" });

    expect(result.current).toEqual("a");

    act(() => {
      jest.advanceTimersByTime(600);
    });
    rerender({ value: "b" });

    expect(result.current).toEqual("b");
  });
});
