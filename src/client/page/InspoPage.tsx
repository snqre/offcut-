import * as Web from "@web";

export function InspoPage(): Web.React.ReactNode {
    return <>
        <Web.Page>
            <InspoPageInfiniteScroll
                load={async () => {
                    (await Web.Axios.get("/generate/ai")).data;
                    return [];
                }}
                loader={<InspoPageInfiniteScrollLoader/>}
                footer={<InspoPageInfiniteScrollFooter/>}
                rowLength={2n}/>
        </Web.Page>
    </>;
}

export type InspoPageInfiniteScrollListener = Web.Function<void, Web.React.ReactNode | null>;
export type InspoPageInfiniteScrollProps =
    & Omit<Web.Spring.ComponentPropsWithRef<typeof Web.Spring.animated.div>, "children">
    & {
    load: InspoPageInfiniteScrollListener;
    loader: Web.React.ReactNode;
    footer: Web.React.ReactNode;
    rowLength: bigint;
};
export function InspoPageInfiniteScroll(props: InspoPageInfiniteScrollProps): Web.React.ReactNode {
    let {load, loader, footer, rowLength, style, ... more} = props;
    let [mounted, setMounted] = Web.React.useState<Web.React.ReactNode[]>([]);
    let [loading, setLoading] = Web.React.useState<boolean>(true);
    let [hasMore, setHasMore] = Web.React.useState<boolean>(true);
    let rows: Web.React.ReactNode[][] = Web.ArrayUtil.split<Web.React.ReactNode>(mounted, rowLength);

    return <>
        <Web.Spring.animated.div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                alignItems: "center",
                width: "100%",
                overflowX: "hidden",
                overflowY: "hidden",
                ... style
            }}
            {... more}>
            {rows.map((row, key) =>
            <Web.Spring.animated.div
                key={key}
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    overflowX: "hidden",
                    overflowY: "hidden"
                }}>
                {row}
            </Web.Spring.animated.div>)}
            <Web.Spring.animated.div
                style={{
                    display: "flex",
                    flexDirection: "column",
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
                        let row: Web.React.ReactNode | null = await load();
                        if (row === null) {
                            setHasMore(false);
                            setLoading(false);
                            return;
                        }
                        setMounted(mounted => [... mounted, row]);
                        setLoading(false);
                        return;
                    },
                    onHidden: async () => setLoading(false)
                })}
                style={{
                    width: "100%",
                    height: "1px"
                }}/>
        </Web.Spring.animated.div>
    </>;
}

export function InspoPageInfiniteScrollLoader(): Web.React.ReactNode {
    return <>
        <Web.Spring.animated.div
            style={{
                backgroundImage: "url()",
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain",
                backgroundPosition: "center",
                width: "25px",
                aspectRatio: "1/1"
            }}/>
    </>;
}

export function InspoPageInfiniteScrollFooter(): Web.React.ReactNode {
    return <>
        <Web.Spring.animated.div
            style={{
                fontSize: "1em",
                fontWeight: "bold",
                fontFamily: "suisse-intl-regular",
                color: "#171717",
                padding: "5px",
                background: "whitesmoke"
            }}>
            Oops, Looks like we are out of inspiration! Try again later.
        </Web.Spring.animated.div>
    </>;
}

export type InspoPageInfiniteScrollRowProps = {
    cards: Web.React.ReactNode[];
};
export function InspoPageInfiniteScrollRow(props: InspoPageInfiniteScrollRowProps) {
    let {cards} = props;

    return <>
        <Web.Spring.animated.div
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: "5px"
            }}>
            {cards.map(card =>
            <>
                {card}
            </>)}
        </Web.Spring.animated.div>
    </>;
}