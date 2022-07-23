import humanizeDateShort from "../humanizeDateShort";

describe("humanizeDateShort", () => {
  it("should return a humanized date in short form", () => {
    let dateISOStr = "2020-01-01T00:00:00.000Z";
    let humanizedDate = humanizeDateShort(dateISOStr);
    expect(humanizedDate).toBe("1st Jan, 2020");
  });

  it("should return a placeholder string when the input is invalid", () => {
    let dateISOStr = "-2020-01-01T00:00:00.000Z";
    let humanizedDate = humanizeDateShort(dateISOStr);
    expect(humanizedDate).toBe("[date unknown]");

    dateISOStr = "2020-01-32T00:00:00.000Z";
    humanizedDate = humanizeDateShort(dateISOStr);
    expect(humanizedDate).toBe("[date unknown]");
  });
});
