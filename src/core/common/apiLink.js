export class Endpoint {
    static Auth = class {
        // static Login = "/auth/login";
        static Login = "/login"
        static Profile = "/profile"
        static UpdateProfile = "/profile/update"
    }
    static User = class {
        static Get = "/users"
    }
    static Dashboard = class {
        static Get = "/reports/revenue"
    }
    static Employee = class {
        static Get = "/employees"
        static GetById = "/employees/admin"
        static Add = "/employees/admin/add"
        static Update = "/employees/admin/update"
        static Delete = "/employees/delete"
    }
    static Branch = class {
        static Get = "/gym-branches"
        static GetById = "/gym-branches/admin"
        static Add = "/gym-branches/admin/add"
        static Update = "/gym-branches/admin/update"
        static Delete = "/gym-branches/admin/delete"
    }
    static Room = class {
        static Get = "/rooms"
        static GetById = "/rooms/admin"
        static Add = "/rooms/admin/add"
        static Update = "/rooms/admin/update"
        static Delete = "/rooms/delete"
    }
    static Position = class {
        static Get = "/positions"
        static Add = "/positions/add"
        static Update = "/positions/update"
        static Delete = "/positions/delete"
    }
    static Equipment = class {
        static Get = "/equipments"
        static Add = "/equipments/admin/add"
        static Update = "equipments/admin/update"
        static Delete = "/equipments/delete"
    }
    static EquipType = class {
        static Get = "/equip-types"
        static Add = "/equip-types/add"
        static Update = "/equip-types/update"
        static Delete = "/equip-types/delete"
    }
    static Member = class {
        static Get = "/members"
        static Add = "/members/admin/add"
        static AddUser = "/members/admin/add"
        static Update = "/members/update"
        static Delete = "/members/delete"
    }
    static Packages = class {
        static Get = "/packages"
        static Add = "/packages/admin/add"
        static Update = "/packages/admin/update"
        static Delete = "/packages/admin/delete"
    }
    static Booking = class {
        static Get = "/bookings/admin/all"
        static GetById = "/bookings"
        static GetPT = "/bookings/add"
        static Add = "/bookings/add"
        static Update = "/bookings/update"
        static Delete = "/bookings/delete"
    }
};