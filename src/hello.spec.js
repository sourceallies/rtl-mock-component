"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("@testing-library/react");
const react_2 = __importDefault(require("react"));
function HelloWorld() {
    return (react_2.default.createElement("h1", null, "Hello World"));
}
test('render works', () => {
    (0, react_1.render)(react_2.default.createElement(HelloWorld, null));
    expect(react_1.screen.getByRole('heading', { name: 'Hello World' })).not.toBeNull();
});
