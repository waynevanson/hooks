import React, { createContext, useContext } from "react";
/**
 * Creates a service. Saves rewriting the same hooks over and over.
 * @param useValue The value for your global state
 * @param defaultValue the default value. You can make this whatever you like, but it defaults to null and throws.
 * @returns `[use[Service], [Service]provider, [service]Context]`, where `[service]` is the name of your service.
 */
export function createService(useValue, defaultValue) {
    if (defaultValue === void 0) { defaultValue = null; }
    var serviceContext = createContext(defaultValue);
    var ServiceProvider = function (_a) {
        var _b = _a.useTest, useTest = _b === void 0 ? function () {
            return undefined;
        } : _b, children = _a.children;
        var value = useValue({ children: children });
        var tests = useTest({ children: children, value: value });
        return (React.createElement(serviceContext.Provider, { value: tests || value }, children));
    };
    //@todo - put a prop/option in here?
    var useService = function () {
        var service = useContext(serviceContext);
        if (!service)
            throw new Error("'Your \"useContext\" in the service generator returned the invalid value \"" + service + "\"");
        return service;
    };
    return [useService, ServiceProvider, serviceContext];
}
//# sourceMappingURL=services.js.map