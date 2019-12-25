import React, { PropsWithChildren } from "react";
export interface ServiceProps<T> extends PropsWithChildren<{}> {
    /** Use if you'd like to use some dummy data for your service */
    test?: T;
}
export interface ServiceProviderProps<T> extends ServiceProps<T> {
    /** If provided, overrides the `useValue` hook originally used to generate this service. */
    useTest: (props: ServiceProps<T>) => T;
}
/**
 * Creates a service. Saves reqriting the same hooks over and over.
 * @param useValue The value for your global state
 * @param defaultValue the default value. You can make this whatever you like, but it defaults to null and throws.
 * @returns `[use[Service], [Service]provider, [service]Context]`, where `[service]` is the name of your service.
 */
export declare function createService<T>(useValue: (props: ServiceProps<T>) => T, defaultValue?: T | null): readonly [() => NonNullable<T>, React.FC<ServiceProviderProps<T>>, React.Context<T | null>];
//# sourceMappingURL=services.d.ts.map