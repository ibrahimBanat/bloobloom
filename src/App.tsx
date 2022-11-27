import React, {useState} from "react";
import {FunctionComponent} from 'react';
import Home from "./layouts/Main/Layout";
import { QueryClient, QueryClientProvider } from "react-query";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import NotFound from "./pages/404/NotFound";
import Collection from "./pages/collection/Collection";
import Header from "./layouts/Header/Header";
import Menu from "./layouts/Menu/Menu";
import {MenuContext} from "./context/MenuContext";

const App: FunctionComponent = () => {
    const queryClient: QueryClient = new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
            },
        },
    });
    const [outer, setOuter] = useState(false);
    const [inner, setInner] = useState(false);

    return (
        <Router>
            <QueryClientProvider client={queryClient}>
                <MenuContext.Provider value={{outer, setOuter, inner, setInner}}>
                    <Header />
                    <Menu />
                </MenuContext.Provider>
                <Routes>
                    <Route path={"/"} element={<Home />} />
                    <Route path={"/collections"} element={<Collection />} />
                    <Route path={"/collections/:id"} element={<Collection />} />
                    <Route path={"*"} element={<NotFound />} />
                </Routes>
            </QueryClientProvider>
        </Router>
    );
};

export default App;

