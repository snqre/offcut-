import * as Web from "@web";

export type Device = "laptop" | "tablet" | "mobile";

export function useDevice(): Device {
    const [device, setDevice] = Web.React.useState<Device>("laptop");

    Web.React.useEffect(() => {
        const resize = () =>
            window.innerWidth >= 1024 ? setDevice("laptop") :
            window.innerWidth >= 768 ? setDevice("tablet") :
            window.innerWidth >= 320 ? setDevice("mobile") :
            null;
        
        resize();
        window.addEventListener("resize", resize);
        return () => window.removeEventListener("resize", resize);
    }, []);

    return device;
}