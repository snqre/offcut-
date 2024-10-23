import * as Web from "@web";

export type ConditionalProps<Mode extends string> =
    & Omit<Web.Spring.ComponentPropsWithRef<typeof Web.Spring.animated.div>, "children">
    & {
    mode: Mode;
    modes: Record<Mode, Web.React.ReactNode>;
};
export function Conditional<Mode extends string>({mode, modes, style, ... more}: ConditionalProps<Mode>): Web.React.ReactNode {
    return <>
        <Web.Spring.animated.div
            style={{
                ... style
            }}
            {... more}>
            {modes[mode]}
        </Web.Spring.animated.div>
    </>;
}