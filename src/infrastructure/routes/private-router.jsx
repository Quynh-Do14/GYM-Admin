import { Navigate } from 'react-router-dom';
import Constants from '../../core/common/constant';
import { isTokenStoraged } from '../utils/storage';
import { ROUTE_PATH } from '../../core/common/appRouter';

export const PrivateRoute = ({ component: RouteComponent, roles }) => {
    let storage = isTokenStoraged();

    if (storage) {
        return RouteComponent
    }

    return <Navigate to={ROUTE_PATH.LOGIN} />
}