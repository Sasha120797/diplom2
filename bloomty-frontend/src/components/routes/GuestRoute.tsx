import { Redirect } from "react-router-dom";
import { useAppSelector } from "../../store/storeHooks";

const GuestRoute: React.FC<{ children: React.ReactNode, redirectPath: string }> = ({
    children,
    redirectPath = '/',
}) => {

    const { isAuth, isLoaded } = useAppSelector(state => state.user)

    if (!isLoaded) {
        return <div>Загрузка...</div>;
    }

    if (isAuth && isLoaded) {
        return <Redirect to={redirectPath} />;
    }

    return <>{children}</>;
};

export default GuestRoute;