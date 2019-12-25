"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
/**
 * Creates a service. Saves reqriting the same hooks over and over.
 * @param useValue The value for your global state
 * @param defaultValue the default value. You can make this whatever you like, but it defaults to null and throws.
 * @returns `[use[Service], [Service]provider, [service]Context]`, where `[service]` is the name of your service.
 */
function createService(useValue, defaultValue) {
    if (defaultValue === void 0) { defaultValue = null; }
    var serviceContext = react_1.createContext(defaultValue);
    var ServiceProvider = function (_a) {
        var useTest = _a.useTest, props = __rest(_a, ["useTest"]);
        var value = useValue(props);
        var tests = useTest(props);
        return (react_1.default.createElement(serviceContext.Provider, { value: props.test || tests || value }, props.children));
    };
    //@todo - put a prop/option in here?
    var useService = function () {
        var service = react_1.useContext(serviceContext);
        if (!service)
            throw new Error("'Your \"useContext\" in the service generator returned the invalid value \"" + service + "\"");
        return service;
    };
    return [useService, ServiceProvider, serviceContext];
}
exports.createService = createService;
//# sourceMappingURL=services.js.map