export class Endpoint {
    static Auth = class {
        // static Login = "/auth/login";
        static Login = "/api/login-username"
    }
    static User = class {
        static User = "/api/admin"
    }
    static Employee = class {
        static List = "/employees"
    }
    static Module = class {
        static Tour = "/tour";
        static User = "/user";
        static Category = "/danhmuc";
        static CategoryByParentId = "/danhmuc/parentId";
        static Location = "/diadiem";
        static News = "/tintuc";
        static Evaluate = "/danhgia";
        static District = "/quanhuyen";
        static Upload = "/files/upload";
        static MultiUpload = "/files/upload-multi";
        static Files = "/files/hinh-anh"
    }
};