import * as Web from "@web";

export type RevealSetProps =
    & Omit<Web.Spring.ComponentPropsWithRef<typeof Web.Spring.animated.div>, "children">
    & {
    config?: Omit<Web.RevealProps, "children">[];
    children?: Web.React.ReactNode[];
}
export function RevealSet({config, style, children, ... more}: RevealSetProps): Web.React.ReactNode {
    return <>
        <Web.Spring.animated.div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                ... style
            }}
            {... more}>
            {children?.map((child, key) =>
                <Web.Reveal
                    {... config && config[key]}>
                    {child}
                </Web.Reveal>)}
        </Web.Spring.animated.div>
    </>;
}