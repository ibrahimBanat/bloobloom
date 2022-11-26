import React from "react";
import {FunctionComponent} from 'react';
import Home from "./layouts/Main/Layout";
import { QueryClient, QueryClientProvider } from "react-query";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import NotFound from "./pages/404/NotFound";

const App: FunctionComponent = () => {
    const queryClient: QueryClient = new QueryClient();

  return (
    <Router>
        <QueryClientProvider client={queryClient}>
            <Routes>
                <Route path={'/'} element={<Home />} />
                <Route path={'/collections'}/>
                <Route path={'*'} element={<NotFound />} />
            </Routes>
        </QueryClientProvider>
    </Router>
  );
}

export default App;
