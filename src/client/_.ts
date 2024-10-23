import * as Web from "@web";

export function render(app: Web.React.ReactNode): void {
    let element: HTMLElement | null = document.getElementById("root");
    if (element) return Web.ReactDomClient.createRoot(element).render(app);
    return;
}

export * from "@common";
export {default as React} from "react";
export * as ReactDomClient from "react-dom/client";
export * as ReactRouterDom from "react-router-dom";
export * as Spring from "react-spring";
export * from "./animation/Hide";
export * from "./animation/HideSet";
export * from "./animation/Reveal";
export * from "./animation/RevealSet";
export * from "./card/Card";
export * from "./card/InspoCard";
export * as BoxShadow from "./css/BoxShadow";
export * from "./page/HomePage";
export * from "./page/InspoPage";
export * from "./page/Page";
export * from "./page/SignInPage";
export * from "./page/SignUpPage";
export * from "./util/Conditional";
export * from "./util/InfiniteScroll";
export * as Device from "./util/Device";
export * from "./util/Sprite";
export * from "./util/VisibilityObserver";