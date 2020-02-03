import { Action, Dispatch } from "redux";
export interface APIMiddleware<S extends {}, A extends Action> {
    getState: () => S;
    dispatch: Dispatch<A>;
}
/** Parameters for the async function. */
export declare type AsyncParams<S extends {}, A extends Action> = APIMiddleware<S, A> & {
    action: A;
};
/** An async middleware function that can go into the middleware generator. */
export declare type AsyncMiddleware<S extends {}, A extends Action> = (params: AsyncParams<S, A>) => Promise<void>;
/** Generates Redux middleware using the async API.  */
export declare function generateMiddleware<S extends {}, A extends Action>(middleware: AsyncMiddleware<S, A>): (params: APIMiddleware<S, A>) => (next: Dispatch<A>) => (action: A) => Promise<A>;
export declare function createUseRootSelector<S extends {}>(): <U = unknown>(selector: (state: S) => U, equalityFn?: ((left: U, right: U) => boolean) | undefined) => U;
export declare function createUseRootDispatch<A extends Action>(): () => Dispatch<A>;
//# sourceMappingURL=redux.d.ts.map