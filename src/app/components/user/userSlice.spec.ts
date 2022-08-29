import userReducer, { loginAction, UserState } from "./userSlice";

describe("user reducer", () => {
  const initialState: UserState = {
    currentUser: undefined,
    token: undefined,
    error: undefined,
  };

  const token = "1234";
  const user = "user1@gmail.com";

  it("should handle initial state", () => {
    expect(userReducer(undefined, { type: "unknown" })).toEqual({
      currentUser: undefined,
      token: undefined,
      error: undefined,
    });
  });

  it("loginAction.fulfilled should return token", () => {
    const actual = userReducer(
      initialState,
      loginAction.fulfilled(token, "", { username: user, password: "" })
    );
    expect(actual.currentUser?.username).toEqual(user);
    expect(actual.token).toEqual(token);
  });

  it("loginAction.fulfilled handle error", () => {
    const actual = userReducer(
      initialState,
      loginAction.rejected(
        null,
        "",
        { username: user, password: "" },
        { code: "500" }
      )
    );
    expect(actual.error).toEqual("Wrong username or password");
  });
});
