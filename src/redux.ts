import { Action, Dispatch } from "redux";
// MIDDLEWARE FACTORY

export interface APIMiddleware<S extends {}, A extends Action> {
  getState: () => S;
  dispatch: Dispatch<A>;
}

/** Parameters for the Async function. */
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
