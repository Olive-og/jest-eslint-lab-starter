const { capitalizeWords, filterActiveUsers, logAction } = require("../index");

describe("capitalizeWords", () => {
  test("capitalizes each word in a normal string", () => {
    expect(capitalizeWords("hello world")).toBe("Hello World");
  });

  test("returns an empty string for empty input", () => {
    expect(capitalizeWords("")).toBe("");
  });

  test("capitalizes after special characters like hyphens", () => {
    expect(capitalizeWords("hello-world")).toBe("Hello-World");
  });

  test("capitalizes a single word", () => {
    expect(capitalizeWords("hello")).toBe("Hello");
  });
});

describe("filterActiveUsers", () => {
  test("filters active users from a mixed array", () => {
    const users = [
      { name: "Alice", isActive: true },
      { name: "Bob", isActive: false },
      { name: "Carol", isActive: true },
    ];
    expect(filterActiveUsers(users)).toEqual([
      { name: "Alice", isActive: true },
      { name: "Carol", isActive: true },
    ]);
  });

  test("returns an empty array when all users are inactive", () => {
    const users = [
      { name: "Bob", isActive: false },
      { name: "Dave", isActive: false },
    ];
    expect(filterActiveUsers(users)).toEqual([]);
  });

  test("returns an empty array for an empty array", () => {
    expect(filterActiveUsers([])).toEqual([]);
  });
});

describe("logAction", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2024-01-01T12:00:00.000Z"));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test("generates the correct log string for valid inputs", () => {
    expect(logAction("login", "alice")).toBe(
      "User alice performed login at 2024-01-01T12:00:00.000Z"
    );
  });

  test("handles empty strings", () => {
    expect(logAction("", "")).toBe(
      "User  performed  at 2024-01-01T12:00:00.000Z"
    );
  });

  test("handles a missing username", () => {
    expect(logAction("login")).toBe(
      "User undefined performed login at 2024-01-01T12:00:00.000Z"
    );
  });

  test("handles a missing action", () => {
    expect(logAction(undefined, "alice")).toBe(
      "User alice performed undefined at 2024-01-01T12:00:00.000Z"
    );
  });
});

