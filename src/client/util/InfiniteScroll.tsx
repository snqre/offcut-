import * as Web from "@web";

export type InfiniteScrollListener = Web.Function<void, Web.React.ReactNode[]>;
export type InfiniteScrollProps = 
    & Web.Spring.ComponentPropsWithRef<typeof Web.Spring.animated.div> 
    & {
    load: InfiniteScrollListener;
    loader?: Web.React.ReactNode;
    footer?: Web.React.ReactNode;
};
export function InfiniteScroll({load, loader, footer, style, children, ... more}: InfiniteScrollProps): Web.React.ReactNode {
    let [mounted, setMounted] = Web.React.useState<Web.React.ReactNode[]>([]);
    let [loading, setLoading] = Web.React.useState<boolean>(true);
    let [hasMore, setHasMore] = Web.React.useState<boolean>(true);

    return <>
        <Web.Spring.animated.div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                alignItems: "center",
                ... style
            }}
            {... more}>
            {mounted.map((component, key) =>
                <Web.Spring.animated.div
                    key={key}
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%"
                    }}>
                    {component}
                </Web.Spring.animated.div>)}
            <Web.Spring.animated.div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%"
                }}>
                {loading ? loader : footer}
            </Web.Spring.animated.div>
            <Web.Spring.animated.div
                ref={Web.useVisibilityObserver({
                    onVisible: async () => {
                        if (!hasMore) return;
                        setLoading(true);
                        let components: Web.React.ReactNode[] = await load();
                        if (components.length === 0) {
                            setHasMore(false);
                            setLoading(false);
                            return;
                        }
                        setMounted(mounted => [... mounted, ... components]);
                        setLoading(false);
                        return;
                    },
                    onHidden: async () => setLoading(false)
                })}
                style={{
                    width: "100%"
                }}/>
        </Web.Spring.animated.div>
    </>;
}