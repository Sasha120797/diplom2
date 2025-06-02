import React, { useEffect } from "react"
import Header from "../header/header"
import Footer from "../footer/footer";
import ErrorNotification from "../errorManager/errorManager";
import ModalManager from "../modal/modalManager";
import { useAppDispatch } from "../../store/storeHooks";
import { checkAuth } from "../../store/user/user";

const AppContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(checkAuth())
    }, [])

    return (
        <>
            <Header />
            {children}
            <Footer />
            <ErrorNotification />
            <ModalManager />
        </>
    )
}

export default AppContainer;