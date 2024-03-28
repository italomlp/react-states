import { act, cleanup, renderHook, waitFor } from "@testing-library/react"
import { UseBoundStore } from "zustand"
import { StoreApi } from "zustand/vanilla"

import JestMatchers = jest.JestMatchers

type ExpectedState<State, T = unknown> = {
  state: (state: State) => T
  expected?: T
  customEqualityTest?: Exclude<
    keyof JestMatchers<unknown>,
    "not" | "rejects" | "resolves"
  >
}

type ZustandTest<S, T extends StoreApi<S>> = {
  storeApi: UseBoundStore<T>
  action?: (store: S) => void
  expectedStates: ExpectedState<ReturnType<T["getState"]>>[]
  timeout?: number
}

/**
 * Testing helper that checks for Zustand states.
 */
export const testZustand = async <S>(
  zustand: ZustandTest<S, StoreApi<S>>
): Promise<boolean> => {
  // eslint-disable-next-line jest/valid-title
  const store = renderHook(() => zustand.storeApi()).result.current

  let stateCount = 0

  const unsubscribe = zustand.storeApi.subscribe((state) => {
    const expectedState = zustand.expectedStates[stateCount]

    if (!expectedState) {
      throw new Error(
        `Expected state not found ${JSON.stringify(
          state
        )}. State Index: ${stateCount}`
      )
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(expectedState.state(state))[
      expectedState.customEqualityTest ?? "toBe"
    ](expectedState.expected)

    stateCount++
  })

  await act(async () => zustand.action?.(store))

  await waitFor(
    () => {
      expect(stateCount).toBe(zustand.expectedStates.length)
    },
    { timeout: zustand.timeout ?? 10000 }
  )

  unsubscribe()

  return true
}

/**
 * Testing helper that mocks Zustand store.
 */
export const mockStoreState =
  <T>(hook: UseBoundStore<StoreApi<T>>) =>
  (initialState: Partial<T>) =>
    (() => {
      // cleanup here is from react-testing: if components are still "alive" after a test, resetting the state of the hook
      // causes warnings that changes are happening without having it wrapped in "act"
      cleanup()
      hook.setState({ ...hook.getState(), ...initialState })
    })()
