import { Action, Dispatch } from "redux";
export interface APIMiddleware<S extends {}, A extends Action> {
    getState: () => S;
    dispatch: Dispatch<A>;
}
/** Parameters for the Async function. */
export declare type AsyncParams<S extends {}, A extends Action> = APIMiddleware<S, A> & {
    action: A;
};
/** An async middleware function that can go into the middleware generator. */
export declare type AsyncMiddleware<S extends {}, A extends Action> = (params: AsyncParams<S, A>) => Promise<void>;
/** Generates Redux middleware using the async API.  */
export declare function generateMiddleware<S extends {}, A extends Action>(middleware: AsyncMiddleware<S, A>): (params: APIMiddleware<S, A>) => (next: Dispatch<A>) => (action: A) => Promise<A>;
//# sourceMappingURL=redux.d.ts.map