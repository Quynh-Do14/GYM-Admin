export class Endpoint {
    static Auth = class {
        // static Login = "/auth/login";
        static Login = "/login"
    }
    static User = class {
        static User = "/admin"
    }
    static Employee = class {
        static Get = "/employees"
        static Add = "/employees/add"
        static Update = "/employees/update"
        static Delete = "/employees/delete"
    }
    static Position = class {
        static Get = "/positions"
        static Add = "/positions/add"
        static Update = "/positions/update"
        static Delete = "/positions/delete"
    }
    static Equipment = class {
        static Get = "/equipments"
        static Add = "/equipments/add"
        static Update = "equipments/update"
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
        static Add = "/members/add"
        static Update = "/members/update"
        static Delete = "/members/delete"
    }
    static MemberCard = class {
        static Get = "/member-cards"
        static Add = "/member-cards/add"
        static Update = "/member-cards/update"
        static Delete = "/member-cards/delete"
    }
};