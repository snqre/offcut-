import * as Web from "@web";

export type RevealProps =
    & Web.Spring.SpringConfig
    & {
    delay?: number;
    children?: Web.React.ReactNode;
};
export function Reveal({children, ... more}: RevealProps): Web.React.ReactNode {
    let [spring, setSpring] =
        Web.Spring.useSpring(() => ({
            opacity: 0
        }));

    Web.React.useEffect(() => {
        setSpring.start({
            opacity: 1,
            ... more
        });
        return;
    }, []);

    return <>
        <Web.Spring.animated.div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                ... spring
            }}>
            {children}
        </Web.Spring.animated.div>
    </>;
}