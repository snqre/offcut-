import * as Web from "@web";

export function InspoCard(): Web.React.ReactNode {
    return <>
        <Web.Card
            style={{
                width: "300px",
                aspectRatio: "1/1"
            }}>
            <Web.Conditional<
                | "idle">
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyItems: "center",
                    alignItems: "center",
                    width: "100%",
                    height: "100%"
                }}
                mode="idle"
                modes={{
                    idle: <>
                        <Web.Spring.animated.div /// wrapper
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundImage: "whitesmoke",
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                width: "100%",
                                height: "100%",
                                padding: "8px"
                            }}>
                            <Web.Spring.animated.div /// layer
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "end",
                                    alignItems: "center",
                                    width: "100%",
                                    height: "100%",
                                    padding: "8px"
                                }}>
                                <Web.Spring.animated.div /// button
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        width: "80%",
                                        aspectRatio: "4/1",
                                        background: "whitesmoke",
                                        borderRadius: "4px",
                                        boxShadow: Web.BoxShadow.TRELLO_0,
                                        pointerEvents: "auto",
                                        cursor: "pointer"
                                    }}/>
                            </Web.Spring.animated.div>
                        </Web.Spring.animated.div>
                    </>
                }}/>
        </Web.Card>
    </>;
}