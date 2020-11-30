import "./style/index.scss";

import { runDemo } from './demos/demo';

export * from "./dom/util/index";
export * from "./dom/ArowKeyInput";
export * from "./dom/Button";
export * from "./dom/Canvas";
export * from "./dom/Div";
export * from "./dom/DomElement";
export * from "./dom/Img";
export * from "./dom/Input";
export * from "./dom/InputWithLabel";
export * from "./dom/Label";
export * from "./dom/requestInit";
export * from "./dom/Select";
export * from "./dom/TextArea";

window.onload = () => runDemo()
