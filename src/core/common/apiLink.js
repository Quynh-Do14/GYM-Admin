export class Endpoint {
    static Auth = class {
        // static Login = "/auth/login";
        static Login = "/login"
        static Profile = "/profile"
    }
    static User = class {
        static Get = "/users"
    }
    static Employee = class {
        static Get = "/employees"
        static Add = "/employees/add"
        static Update = "/employees/update"
        static Delete = "/employees/delete"
    }
    static Branch = class {
        static Get = "/gym-branches"
        static GetById = "/gym-branches/admin"
        static Add = "/gym-branches/add"
        static Update = "/gym-branches/update"
        static Delete = "/gym-branches/delete"
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
        static Add = "/packages/add"
        static Update = "/packages/update"
        static Delete = "/packages/delete"
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