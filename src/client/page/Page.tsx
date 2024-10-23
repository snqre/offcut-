import * as Web from "@web";

export type PageProps = 
    & Web.Spring.ComponentPropsWithRef<typeof Web.Spring.animated.div>
    & {};
export function Page({style, children, ... more}: PageProps): Web.React.ReactNode {
    const device: Web.Device.Device = Web.Device.useDevice();

    return <>
        <Web.Spring.animated.div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                alignItems: "center",
                width: "100vw",
                overflowX: "hidden",
                overflowY: "hidden",
                ... style
            }}
            {... more}>
            <Web.Spring.animated.div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "start",
                    alignItems: "center",
                    width:
                        device === "laptop" ? "1024px" :
                        device === "tablet" ? "768px" :
                        device === "mobile" ? "320px" :
                        device,
                    minHeight: "100vh",
                    overflowX: "hidden",
                    overflowY: "hidden"
                }}>
                {children}
            </Web.Spring.animated.div>
        </Web.Spring.animated.div>
    </>;
}