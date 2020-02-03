import React, { createContext, FC, PropsWithChildren, useContext } from "react";

export interface ServiceProviderProps<T> {
  /** If provided, overrides the `useValue` hook originally used to generate this service. */
  useTest?: (props: PropsWithChildren<{ value: T }>) => T;
}

/**
 * Creates a service. Saves rewriting the same hooks over and over.
 * @param useValue The value for your global state
 * @param defaultValue the default value. You can make this whatever you like, but it defaults to null and throws.
 * @returns `[use[Service], [Service]provider, [service]Context]`, where `[service]` is the name of your service.
 */
export function createService<T>(
  useValue: (props: PropsWithChildren<{}>) => T,
  defaultValue: T | null = null
) {
  const serviceContext = createContext(defaultValue);

  const ServiceProvider: FC<ServiceProviderProps<T>> = ({
    useTest = () => {
      return undefined;
    },
    children
  }) => {
    const value = useValue({ children });
    const tests = useTest({ children, value });

    return (
      <serviceContext.Provider value={tests || value}>
        {children}
      </serviceContext.Provider>
    );
  };

  //@todo - put a prop/option in here?
  const useService = () => {
    const service = useContext(serviceContext);
    if (!service)
      throw new Error(
        `'Your "useContext" in the service generator returned the invalid value "${service}"`
      );
    return service as NonNullable<T>;
  };

  return [useService, ServiceProvider, serviceContext] as const;
}
