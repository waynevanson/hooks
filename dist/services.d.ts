import React, { PropsWithChildren } from "react";
export interface ServiceProviderProps<T> {
    /** If provided, overrides the `useValue` hook originally used to generate this service. */
    useTest?: (props: PropsWithChildren<{
        value: T;
    }>) => T;
}
/**
 * Creates a service. Saves rewriting the same hooks over and over.
 * @param useValue The value for your global state
 * @param defaultValue the default value. You can make this whatever you like, but it defaults to null and throws.
 * @returns `[use[Service], [Service]provider, [service]Context]`, where `[service]` is the name of your service.
 */
export declare function createService<T>(useValue: (props: PropsWithChildren<{}>) => T, defaultValue?: T | null): readonly [() => NonNullable<T>, React.FC<ServiceProviderProps<T>>, React.Context<T | null>];
//# sourceMappingURL=services.d.ts.map