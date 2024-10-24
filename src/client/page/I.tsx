import * as Web from "@web";

export function InspoPage(): Web.React.ReactNode {
    return <>
        <Web.Page>
            <InspoPageInfiniteScroll
                load={async () => {
                    /// ... mock generated image
                    return <>
                        <InspoPageInfiniteScrollRow
                            images={[
                                Web.GeneratedImage({
                                    src: "../img/RomanOdinTsov.jpg",
                                    tags: [
                                        "gothic", 
                                        "roman", 
                                        "mid-century"
                                    ],
                                    products: [
                                        Web.Product({
                                            _name: "Wallpaper",
                                            _description: "",
                                            _price: 200n
                                        }),
                                        Web.Product({
                                            _name: "Paint",
                                            _description: "",
                                            _price: 200n
                                        }),
                                        Web.Product({
                                            _name: "Wood",
                                            _description: "",
                                            _price: 200n
                                        })
                                    ]
                                }), 
                                Web.GeneratedImage({
                                    src: "../img/RomanOdinTsov.jpg",
                                    tags: [
                                        "gothic", 
                                        "roman", 
                                        "mid-century"
                                    ],
                                    products: [
                                        Web.Product({
                                            _name: "Wallpaper",
                                            _description: "",
                                            _price: 200n
                                        }),
                                        Web.Product({
                                            _name: "Paint",
                                            _description: "",
                                            _price: 200n
                                        }),
                                        Web.Product({
                                            _name: "Wood",
                                            _description: "",
                                            _price: 200n
                                        })
                                    ]
                                })
                            ]}/>
                    </>;
                }}
                loader={<InspoPageInfiniteScrollLoader/>}
                footer={<InspoPageInfiniteScrollFooter/>}/>
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
};
export function InspoPageInfiniteScroll(props: InspoPageInfiniteScrollProps): Web.React.ReactNode {
    let {load, loader, footer, style, ... more} = props;
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
                width: "100%",
                gap: "10px",
                overflowX: "hidden",
                overflowY: "hidden",
                ... style
            }}
            {... more}>
            {mounted.map((row, key) =>
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
                background: "whitesmoke",
                borderRadius: "2.5px"
            }}>
            Oops, Looks like we are out of inspiration! Try again later.
        </Web.Spring.animated.div>
    </>;
}

export type InspoPageInfiniteScrollRowProps = {
    images: [Web.GeneratedImage, Web.GeneratedImage];
};
export function InspoPageInfiniteScrollRow(props: InspoPageInfiniteScrollRowProps) {
    let {images} = props;

    return <>
        <Web.Spring.animated.div
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: "5px"
            }}>
            <InspoPageInfiniteScrollCard
                image={images[0]}
                state="default"/>
            <InspoPageInfiniteScrollCard
                image={images[1]}
                state="default"/>
        </Web.Spring.animated.div>
    </>;
}

export type InspoPageInfiniteScrollCardProps = {
    image: Web.GeneratedImage;
    state?:
        | "hidden"
        | "active"
        | "default"
};
export function InspoPageInfiniteScrollCard(props: InspoPageInfiniteScrollCardProps): Web.React.ReactNode {
    let {image, state = "default"} = props;
    let [mode, setMode] = Web.React.useState<string>("idle");
    let [spring, setSpring] = Web.Spring.useSpring(() => ({
        opacity: "0",
        width: "0px",
        aspectRatio: "1.5/1"
    }));

    Web.React.useEffect(() => {
        const hide = () => 
            setSpring.start({
                opacity: "0",
                width: "0px"
            });
        
        const reveal = () =>
            setSpring.start({
                opacity: "1",
                width: "500px"
            });
    
        const activate = () =>
            setSpring.start({
                opacity: "1",
                width: "1000px"
            });

        const changeState = () =>
            state === "default" ? reveal() :
            state === "active" ? activate() :
            state === "hidden" ? hide() :
            state;

        changeState();
        return;
    }, [state]);

    return <>
        <Web.Spring.animated.div
            style={{
                ... spring
            }}>
            <Web.Conditional
                mode={mode}
                modes={{
                    idle: 
                    <InspoPageInfiniteScrollCardIdleMode
                        image={image}
                        spring={spring}/>
                }}/>
        </Web.Spring.animated.div>
    </>;
}

export type InspoPageInfiniteScrollCardIdleModeProps = {
    image: Web.GeneratedImage;
    spring: object;
};
export function InspoPageInfiniteScrollCardIdleMode(props: InspoPageInfiniteScrollCardIdleModeProps): Web.React.ReactNode {
    let {image, spring} = props;

    return <>
        <Web.Spring.animated.div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                ... spring
            }}>
            <Web.RevealSet
                config={[{
                    delay: 250,
                    easing: Web.Spring.easings.easeOutSine
                }, {
                    delay: 500,
                    easing: Web.Spring.easings.easeOutSine
                }, {
                    delay: 750,
                    easing: Web.Spring.easings.easeOutSine
                }, {
                    delay: 1000,
                    easing: Web.Spring.easings.easeOutSine
                }]}
                style={{
                    backgroundImage: `url(${image.src()})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPositionX: "center",
                    backgroundPositionY: "center",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "start",
                    alignItems: "center",
                    width: "100%",
                    height: "100%"
                }}>
                {image
                    .products()
                    .map(product => product.name())
                    .map(name => 
                    <Web.Spring.animated.div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            padding: "5px",
                            background: "white",
                            fontFamily: "suisse-intl-regular",
                            fontWeight: "bold",
                            fontSize: "1em",
                            opacity: 1
                        }}>
                        {name}
                    </Web.Spring.animated.div>)}
            </Web.RevealSet>
        </Web.Spring.animated.div>
    </>;
}