import { Action, Dispatch } from "redux";
import { useSelector, useDispatch } from "react-redux";

export interface APIMiddleware<S extends {}, A extends Action> {
  getState: () => S;
  dispatch: Dispatch<A>;
}

/** Parameters for the async function. */
export type AsyncParams<S extends {}, A extends Action> = APIMiddleware<
  S,
  A
> & {
  action: A;
};

/** An async middleware function that can go into the middleware generator. */
export type AsyncMiddleware<S extends {}, A extends Action> = (
  params: AsyncParams<S, A>
) => Promise<void>;

/** Generates Redux middleware using the async API.  */
export function generateMiddleware<S extends {}, A extends Action>(
  middleware: AsyncMiddleware<S, A>
) {
  return (params: APIMiddleware<S, A>) => (next: Dispatch<A>) => async (
    action: A
  ) => {
    const result = next(action);
    await middleware({ action, ...params });
    return result;
  };
}

// custom hooks

export function createUseRootSelector<S extends {}>() {
  return <U = unknown>(
    selector: (state: S) => U,
    equalityFn?: (left: U, right: U) => boolean
  ) => useSelector(selector, equalityFn);
}

export function createUseRootDispatch<A extends Action>() {
  return () => useDispatch<Dispatch<A>>();
}
