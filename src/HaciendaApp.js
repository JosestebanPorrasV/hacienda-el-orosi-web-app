import React from "react";

import { AppRouter } from "./routers/AppRouter";
import { Provider } from "react-redux";
import { Store } from "./store/Store";
import { Dashboard } from "./components/ui/Dashboard";

export const HaciendaApp = () => {
    return (
        <Provider store = { Store } >
            <Dashboard />
        </Provider>
    )
}