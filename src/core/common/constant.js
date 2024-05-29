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

    static StatusUser = class {
        static ADMIN = class {
            static value = "ADMIN";
            static label = "Quản trị viên";
        }
        static COMMITTEE = class {
            static value = "COMMITTEE";
            static label = "Ủy ban nhân dân Tỉnh";
        }
        static DEPARTMENT = class {
            static value = "DEPARTMENT";
            static label = "Sở VHTT&DL";
        }
        static USER = class {
            static value = "USER";
            static label = "Người dùng";
        }
        static List = [
            { label: "Quản trị viên", value: "ADMIN" },
            { label: "Ủy ban nhân dân Tỉnh", value: "COMMITTEE" },
            { label: "Sở VHTT&DL", value: "DEPARTMENT" },
            { label: "Người dùng", value: "USER" },
        ]
    }
    static DefaultImage = "1"
    static CategoryConfig = class {
        static Destination = class {
            static label = "Destination";
            static value = 1;
        }
        static Stay = class {
            static value = 2;
            static label = "Lưu Trú";
        }
        static Cuisine = class {
            static value = 3;
            static label = "Ẩm Thức";
        }
        static Vehicle = class {
            static value = 4;
            static label = "Phương Tiện";
        }
        static Specialty = class {
            static value = 5;
            static label = "Đặc Sản";
        }
        static Tour = class {
            static value = 6;
            static label = "Tour";
        }
        static Festival = class {
            static value = 23;
            static label = "Lễ hội";
        }
        static News = class {
            static value = 8;
            static label = "Bài viết";
        }
        static Restaurant = class {
            static value = 24;
            static label = "Nhà hàng";
        }
        static Hotel = class {
            static value = 26;
            static label = "Khách sạn";
        }
        static list = [
            { label: "Địa Điểm Du Lịch", value: 1 },
            { label: "Lưu Trú", value: 2 },
            { label: "Ẩm Thức", value: 3 },
            { label: "Phương Tiện", value: 4 },
            { label: "Đặc Sản", value: 5 },
            { label: "Tour", value: 6 },
            { label: "Lễ hội", value: 7 },
            { label: "Bài viết", value: 8 },
        ]
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