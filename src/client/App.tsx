import {default as React} from "react";
import * as Web from "./_";

function App(): Web.React.ReactNode {
    return <>
        <Web.ReactRouterDom.BrowserRouter>
            <Web.ReactRouterDom.Routes>
                <Web.ReactRouterDom.Route path="/" element={<Web.InspoPage/>}/>
            </Web.ReactRouterDom.Routes>
        </Web.ReactRouterDom.BrowserRouter>
    </>;
}

Web.render(<App/>);