import React from "react";
import {FunctionComponent} from 'react';
import Home from "./layouts/Main/Layout";

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";
import NotFound from "./pages/404/NotFound";

const App: FunctionComponent = () => {
  return (
    <Router>
        <Routes>
            <Route path={'/'} element={<Home />} />
            <Route path={'/collections'}/>
            <Route path={'*'} element={<NotFound />} />
        </Routes>
    </Router>
  );
}

export default App;
