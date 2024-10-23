import * as Web from "@web";

export type CardProps = 
    & Web.Spring.ComponentPropsWithRef<typeof Web.Spring.animated.div> 
    & {}
export function Card({style, children, ... more}: CardProps): Web.React.ReactNode {
    return <>
        <Web.Spring.animated.div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: Web.BoxShadow.TRELLO_1,
                borderRadius: "5px",
                overflowX: "hidden",
                overflowY: "hidden",
                ... style
            }}
            {... more}>
            {children}
        </Web.Spring.animated.div>
    </>;
}