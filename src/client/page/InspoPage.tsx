import * as Web from "@web";

export function InspoPage(): Web.React.ReactNode {
    return <>
        <Web.Page>
            <InspoPageInfiniteScroll
                style={{
                    width: "100%",
                    gap: "20px"
                }}
                load={async () => {
                    return [<>
                        <Web.Spring.animated.div
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: "10px",
                                width: "100%"
                            }}>
                            <Web.Reveal
                                delay={0}>
                                <InspoPageCard
                                    generateImageStyle={["gothic", "mid-century", "modern"]}
                                    generatedImagePath="../img/RomanOdinTsov.jpg"/>
                            </Web.Reveal>
                            <Web.Reveal
                                decay={1000}>
                                <InspoPageCard
                                    generateImageStyle={["gothic", "mid-century", "modern"]}
                                    generatedImagePath="../img/RomanOdinTsov.jpg"/>
                            </Web.Reveal>
                        </Web.Spring.animated.div>
                    </>];
                }}
                loader={<InspoPageLoader/>}
                footer={<InspoPageFooter/>}/>
        </Web.Page>
    </>;
}

export type InspoPageCardProps = {
    generateImageStyle: string[];
    generatedImagePath: string;
};
export function InspoPageCard({
    generateImageStyle,
    generatedImagePath}: InspoPageCardProps): Web.React.ReactNode {
    let [mode, setMode] = Web.React.useState<string>("idle");
    let size: string = "500px";
    let aspectRatio: string = "1.5/1";
    return <>
        <Web.Card
            style={{
                width: size,
                aspectRatio: aspectRatio
            }}>
            <Web.Conditional
                mode={mode}
                modes={{
                    idle: 
                        <InspoPageCardIdleMode
                            path={generatedImagePath}
                            styleTags={generateImageStyle}
                            size={size}
                            aspectRatio={aspectRatio}
                            setMode={setMode}/>,
                    exhibit:
                        <InspoPageCardExhibitMode
                            setMode={setMode}/>
                }}/>
        </Web.Card>
    </>;
}

export type InspoPageCardIdleModeProps = {
    styleTags: string[];
    path: string;
    size: string;
    aspectRatio: string;
    setMode: Web.React.Dispatch<Web.React.SetStateAction<string>>;
};
export function InspoPageCardIdleMode({
    styleTags,
    path,
    size,
    aspectRatio,
    setMode}: InspoPageCardIdleModeProps): Web.React.ReactNode {
    return <>
        <Web.Reveal>
            <Web.Sprite
                onClick={() => setMode("exhibit")}
                path={path}
                style={{
                    width: size,
                    aspectRatio: aspectRatio,
                    backgroundSize: "cover",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "center",
                    pointerEvents: "auto",
                    cursor: "pointer"
                }}>
                <Web.Spring.animated.div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "start",
                        alignItems: "center",
                        gap: "5px",
                        width: "100%",
                        padding: "10px"
                    }}>
                    <Web.RevealSet
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "10px"
                        }}
                        config={[{
                            delay: 0,
                            duration: 5000,
                            easing: Web.Spring.easings.easeOutExpo
                        }, {
                            delay: 100,
                            duration: 1000,
                            easing: Web.Spring.easings.easeOutExpo
                        }, {
                            delay: 200,
                            duration: 1000,
                            easing: Web.Spring.easings.easeOutExpo
                        }]}>
                        {styleTags.map((tag, key) =>
                        <Web.Spring.animated.div
                            key={key}
                            style={{
                                fontSize: "0.75em",
                                fontFamily: "suisse-intl-regular",
                                fontWeight: "bold",
                                color: "#171717",
                                background: "white",
                                borderRadius: "2.5px",
                                padding: "5px"
                            }}>
                            {tag}
                        </Web.Spring.animated.div>)}
                    </Web.RevealSet>
                </Web.Spring.animated.div>
            </Web.Sprite>
        </Web.Reveal>
    </>
}

export type InspoPageCardExhibitModeProps = {
    setMode: Web.React.Dispatch<Web.React.SetStateAction<string>>;
};
export function InspoPageCardExhibitMode({
    setMode}: InspoPageCardExhibitModeProps): Web.React.ReactNode {
    return <>
        <Web.RevealSet
            onMouseLeave={() => setMode("idle")}
            config={[{
                duration: 1000,
                easing: Web.Spring.easings.easeOutSine
            }, {
                delay: 100,
                duration: 1000,
                easing: Web.Spring.easings.easeOutSine
            }, {
                delay: 200,
                duration: 1000,
                easing: Web.Spring.easings.easeOutSine
            }]}
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                background: "white",
                gap: "10px"
            }}>
            <Web.Spring.animated.div
                style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "10px"
                }}>
                <InspoPageCardExhibitModeProductTag/>
                <InspoPageCardExhibitModeProductTag/>
            </Web.Spring.animated.div>
            <Web.Spring.animated.div
                style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "10px"
                }}>
                <InspoPageCardExhibitModeProductTag/>
                <InspoPageCardExhibitModeProductTag/>
            </Web.Spring.animated.div>
            <Web.Spring.animated.div
                style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "10px"
                }}>
                <InspoPageCardExhibitModeProductTag/>
                <InspoPageCardExhibitModeProductTag/>
            </Web.Spring.animated.div>
        </Web.RevealSet>
    </>;
}

export type InspoPageCardExhibitModeProductTagProps = {
    
};
export function InspoPageCardExhibitModeProductTag(): Web.React.ReactNode {
    return <>
        <Web.Spring.animated.div
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                padding: "10px",
                pointerEvents: "auto",
                cursor: "pointer",
                background: "whitesmoke",
                borderRadius: "5px",
                fontWeight: "bold",
                fontFamily: "suisse-intl-regular",
                color: "#171717"
            }}>
            Product Name 
        </Web.Spring.animated.div>
    </>;
}


export type InspoPageInfiniteScrollListener = Web.Function<void, Web.React.ReactNode[]>;
export type InspoPageInfiniteScrollProps = 
    & Omit<Web.Spring.ComponentPropsWithRef<typeof Web.Spring.animated.div>, "children"> 
    & {
    load: InspoPageInfiniteScrollListener;
    loader?: Web.React.ReactNode;
    footer?: Web.React.ReactNode;
};
export function InspoPageInfiniteScroll({load, loader, footer, style, ... more}: InspoPageInfiniteScrollProps): Web.React.ReactNode {
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
                background: "#whitesmoke",
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
                    width: "100%",
                    height: "1px"
                }}/>
        </Web.Spring.animated.div>
    </>;
}

export function InspoPageLoader(): Web.React.ReactNode {
    return <>
        Loading ...
    </>;
}

export function InspoPageFooter(): Web.React.ReactNode {
    return <>
        Footer ...
    </>;
}