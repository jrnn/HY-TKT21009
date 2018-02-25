import deepFreeze from "deep-freeze"
import unicafeReducer from "./reducer"

describe("unicafe reducer", () => {
  let i
  const initState = {
    good : 0,
    okay : 0,
    bad : 0
  }

  it("returns proper initial state when called with undefined state", () => {
    let state = unicafeReducer(undefined, { type : "JUST_TESTING" })
    expect(state).toEqual(initState)
  })

  it("action type 'GOOD' increments 'good' count by one", () => {
    let state = initState
    let action = { type : "GOOD" }
    deepFreeze(state)

    for (i = 1; i <= 10; i++) {
      state = unicafeReducer(state, action)
      expect(state).toEqual({ good : i, okay : 0, bad : 0 })
    }
  })

  it("action type 'OKAY' increments 'okay' count by one", () => {
    let state = initState
    let action = { type : "OKAY" }
    deepFreeze(state)

    for (i = 1; i <= 10; i++) {
      state = unicafeReducer(state, action)
      expect(state).toEqual({ good : 0, okay : i, bad : 0 })
    }
  })

  it("action type 'BAD' increments 'bad' count by one", () => {
    let state = initState
    let action = { type : "BAD" }
    deepFreeze(state)

    for (i = 1; i <= 10; i++) {
      state = unicafeReducer(state, action)
      expect(state).toEqual({ good : 0, okay : 0, bad : i })
    }
  })

  it("action type 'RESET' resets everything to zero", () => {
    let state = { good : 42, okay : 666, bad : 1337 }
    deepFreeze(state)

    state = unicafeReducer(state, { type : "RESET" })
    expect(state).toEqual({ good : 0, okay : 0, bad : 0 })
  })
})
