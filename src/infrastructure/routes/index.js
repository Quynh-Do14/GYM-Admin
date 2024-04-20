import { ROUTE_PATH } from "../../core/common/appRouter";
import AddEmployeeManagement from "../../pages/EmployeeManagement/add";
import ListEmployeeManagement from "../../pages/EmployeeManagement/list";
import ViewEmployeeManagement from "../../pages/EmployeeManagement/view";
import LoginPage from "../../pages/Login";
import AddShiftManagement from "../../pages/UserManagement/add";
import AddUserManagement from "../../pages/UserManagement/add";
import ListShiftManagement from "../../pages/UserManagement/list";
import ListUserManagement from "../../pages/UserManagement/list";
import ViewShiftManagement from "../../pages/UserManagement/view";
import ViewUserManagement from "../../pages/UserManagement/view";
import MainLayout from "../common/layouts/MainLayout";

export const privateRoutes = [
    {
        path: ROUTE_PATH.LOGIN,
        component: LoginPage,
        private: false,
    },
    {
        path: ROUTE_PATH.MAINLAYOUT,
        component: MainLayout,
        private: true,
    },
    {
        path: ROUTE_PATH.USER,
        component: ListUserManagement,
        private: true,
    },
    {
        path: ROUTE_PATH.ADD_USER,
        component: AddUserManagement,
        private: true,
    },
    {
        path: ROUTE_PATH.VIEW_USER,
        component: ViewUserManagement,
        private: true,
    },

    {
        path: ROUTE_PATH.SHIFT,
        component: ListShiftManagement,
        private: true,
    },
    {
        path: ROUTE_PATH.ADD_SHIFT,
        component: AddShiftManagement,
        private: true,
    },
    {
        path: ROUTE_PATH.VIEW_SHIFT,
        component: ViewShiftManagement,
        private: true,
    },

    {
        path: ROUTE_PATH.EMPOYEE,
        component: ListEmployeeManagement,
        private: true,
    },
    {
        path: ROUTE_PATH.ADD_EMPOYEE,
        component: AddEmployeeManagement,
        private: true,
    },
    {
        path: ROUTE_PATH.VIEW_EMPOYEE,
        component: ViewEmployeeManagement,
        private: true,
    },
]