import * as Web from "@web";

export type HideProps = 
    & Web.Spring.SpringConfig
    & {
    delay?: number;
    children?: Web.React.ReactNode;
};
export function Hide({children, ... more}: HideProps): Web.React.ReactNode {
    let [spring, setSpring] =
        Web.Spring.useSpring(() => ({
            opacity: 1
        }));
    
    Web.React.useEffect(() => {
        setSpring.start({
            opacity: 0,
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