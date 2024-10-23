import * as Web from "@web";

export type SpriteProps =
    & Web.Spring.ComponentPropsWithRef<typeof Web.Spring.animated.div>
    & {
    path: string;
};
export function Sprite({path, style, children, ... more}: SpriteProps): Web.React.ReactNode {
    return <>
        <Web.Spring.animated.div
            style={{
                backgroundImage: `url(${path})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain",
                backgroundPosition: "center",
                ... style
            }}
            {... more}>
            {children}
        </Web.Spring.animated.div>
    </>;
}