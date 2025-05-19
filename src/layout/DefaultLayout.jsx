import { Outlet } from "react-router-dom";

import Header from "../components/header";

export default function DefaultLayout() {
    return (
        <div>
            <Header />
            <main>
                <Outlet />
            </main>
        </div>
    )
}
