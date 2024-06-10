import { ContainerOutlined, DatabaseOutlined, EnvironmentOutlined, LineChartOutlined, MessageOutlined, OneToOneOutlined, ProjectOutlined, ScheduleOutlined, TagsOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";
import { ROUTE_PATH } from "./appRouter";

export default class Constants {
    static Menu = class {
        static List = [
            {
                label: "Dashboard",
                link: ROUTE_PATH.DASHBOARD,
                icon: <LineChartOutlined />
            },
            {
                label: "Quản lý chi nhánh",
                link: ROUTE_PATH.BRANCH,
                icon: <EnvironmentOutlined />
            },
            {
                label: "Quản lý phòng",
                link: ROUTE_PATH.ROOM,
                icon: <TagsOutlined />
            },
            {
                label: "Quản lý nhân viên",
                link: ROUTE_PATH.EMPLOYEE,
                icon: <UserOutlined />
            },
            {
                label: "Quản lý chức vụ",
                link: ROUTE_PATH.POSITION,
                icon: <ProjectOutlined />
            },
            {
                label: "Quản lý gói thành viên",
                link: ROUTE_PATH.PACKAGE,
                icon: <ContainerOutlined />
            },
            {
                label: "Quản lý thành viên",
                link: ROUTE_PATH.MEMBER,
                icon: <TeamOutlined />
            },
            {
                label: "Quản lý loại thiết bị",
                link: ROUTE_PATH.EQUIP_TYPE,
                icon: <TagsOutlined />
            },
            {
                label: "Quản lý thiết bị",
                link: ROUTE_PATH.EQUIPMENT,
                icon: < DatabaseOutlined />
            },
            {
                label: "Quản lý đặt lịch",
                link: ROUTE_PATH.BOOKING,
                icon: <ScheduleOutlined />
            },
        ]
    };
    static TOKEN = "token";
    static DEBOUNCE_SEARCH = 800;

    static Params = class {
        static limit = "limit";
        static page = "page";
        static searchName = "searchName";
        static search = "search";
        static idQuanHuyen = "idQuanHuyen";
        static idDanhMuc = "idDanhMuc";
        static parentId = "parentId"
    }

    static PaginationConfigs = class {
        static Size = 10;
        static SizeSearchPage = 8;
        static LimitSize = 60;
        static AllSize = 9000;
        static PageSizeList = [
            { label: "10", value: 10 },
            { label: "20", value: 20 },
            { label: "50", value: 50 },
        ]
    };

    static UseParams = class {
        static Id = ":id"
    }

    static PaginationConfigs = class {
        static Size = 10;
        static SizeSearchPage = 8;
        static LimitSize = 60;
        static AllSize = 9000;
        static PageSizeList = [
            { label: "10", value: 10 },
            { label: "20", value: 20 },
            { label: "50", value: 50 },
        ]
    };
    static Gender = class {
        static MALE = class {
            static value = "MALE";
            static label = "Nam";
        }
        static FEMALE = class {
            static value = "FEMALE";
            static label = "Nữ";
        }
        static List = [
            { label: "Nam", value: "MALE" },
            { label: "Nữ", value: "FEMALE" },
        ]
    }
};