import * as Web from "@web";

export type HideSetProps =
    & Omit<Web.Spring.ComponentPropsWithRef<typeof Web.Spring.animated.div>, "children">
    & {
    config?: Omit<Web.HideProps, "children">[];
    children?: Web.React.ReactNode[];
}
export function HideSet({config, style, children, ... more}: HideSetProps): Web.React.ReactNode {
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
                <Web.Hide
                    {... config && config[key]}>
                    {child}
                </Web.Hide>)}
        </Web.Spring.animated.div>
    </>;
}