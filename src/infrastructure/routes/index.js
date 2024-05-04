import { ROUTE_PATH } from "../../core/common/appRouter";
import LoginPage from "../../pages/Login";
import AddEmployeeManagement from "../../pages/EmployeeManagement/add";
import ListEmployeeManagement from "../../pages/EmployeeManagement/list";
import ViewEmployeeManagement from "../../pages/EmployeeManagement/view";
import AddEquipTypeManagement from "../../pages/EquipTypeManagement/add";
import ListEquipTypeManagement from "../../pages/EquipTypeManagement/list";
import ViewEquipTypeManagement from "../../pages/EquipTypeManagement/view";
import AddEquipmentManagement from "../../pages/EquipmentsManagement/add";
import ListEquipmentManagement from "../../pages/EquipmentsManagement/list";
import ViewEquipmentManagement from "../../pages/EquipmentsManagement/view";
import AddMemberCardManagement from "../../pages/MemberCardManagement/add";
import ListMemberCardManagement from "../../pages/MemberCardManagement/list";
import ViewMemberCardManagement from "../../pages/MemberCardManagement/view";
import AddMemberManagement from "../../pages/MemberManagement/add";
import ListMemberManagement from "../../pages/MemberManagement/list";
import ViewMemberManagement from "../../pages/MemberManagement/view";
import AddPositionManagement from "../../pages/PositionManagement/add";
import ListPositonManagement from "../../pages/PositionManagement/list";
import ViewPositionManagement from "../../pages/PositionManagement/view";
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
        path: ROUTE_PATH.EMPLOYEE,
        component: ListEmployeeManagement,
        private: true,
    },
    {
        path: ROUTE_PATH.ADD_EMPLOYEE,
        component: AddEmployeeManagement,
        private: true,
    },
    {
        path: ROUTE_PATH.VIEW_EMPLOYEE,
        component: ViewEmployeeManagement,
        private: true,
    },

    {
        path: ROUTE_PATH.POSITION,
        component: ListPositonManagement,
        private: true,
    },
    {
        path: ROUTE_PATH.ADD_POSITION,
        component: AddPositionManagement,
        private: true,
    },
    {
        path: ROUTE_PATH.VIEW_POSITION,
        component: ViewPositionManagement,
        private: true,
    },
    {
        path: ROUTE_PATH.EQUIPMENT,
        component: ListEquipmentManagement,
        private: true,
    },
    {
        path: ROUTE_PATH.ADD_EQUIPMENT,
        component: AddEquipmentManagement,
        private: true,
    },
    {
        path: ROUTE_PATH.VIEW_EQUIPMENT,
        component: ViewEquipmentManagement,
        private: true,
    },
    {
        path: ROUTE_PATH.EQUIP_TYPE,
        component: ListEquipTypeManagement,
        private: true,
    },
    {
        path: ROUTE_PATH.ADD_EQUIP_TYPE,
        component: AddEquipTypeManagement,
        private: true,
    },
    {
        path: ROUTE_PATH.VIEW_EQUIP_TYPE,
        component: ViewEquipTypeManagement,
        private: true,
    },
    {
        path: ROUTE_PATH.MEMBER_CARD,
        component: ListMemberCardManagement,
        private: true,
    },
    {
        path: ROUTE_PATH.ADD_MEMBER_CARD,
        component: AddMemberCardManagement,
        private: true,
    },
    {
        path: ROUTE_PATH.VIEW_MEMBER_CARD,
        component: ViewMemberCardManagement,
        private: true,
    },
    {
        path: ROUTE_PATH.MEMBER,
        component: ListMemberManagement,
        private: true,
    },
    {
        path: ROUTE_PATH.ADD_MEMBER,
        component: AddMemberManagement,
        private: true,
    },
    {
        path: ROUTE_PATH.VIEW_MEMBER,
        component: ViewMemberManagement,
        private: true,
    },
]