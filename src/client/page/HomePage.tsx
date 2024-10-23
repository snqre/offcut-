import * as Web from "@web";

export function HomePage(): Web.React.ReactNode {
    return <>
        <Web.Page>
            <Web.InfiniteScroll
                style={{
                    width: "500px",
                    height: "800px"
                }}
                load={() => {
                    return [<>
                        HelloWorld
                    </>];
                }}
                loader={<>
                    Loading ...
                </>}
                footer={<>
                    Footer
                </>}/>
        </Web.Page>
    </>;
}