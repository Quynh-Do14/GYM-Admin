import { Endpoint } from "../../../../core/common/apiLink";
import { RequestService } from "../../../utils/response";
import { saveToken } from "../../../utils/storage";

class EmployeeService {
    async getEmployee(params, setLoading) {
        setLoading(true)
        try {
            return await RequestService
                .get(Endpoint.Employee.List, {
                    ...params
                })
                .then(response => {
                    console.log("response", response);
                    if (response) {
                        return response
                    }
                    setLoading(false)
                    return response;
                });
        } catch (error) {
            // if (error?.response?.data?.errors[0]?.defaultMessage) {
            //     FailMessage(messageConfig(error?.response?.data?.errors[0]?.defaultMessage), "")
            // }
            // if (error.response.data.message) {
            //     FailMessage(messageConfig(error.response.data.message), "")
            // }
            // else {
            //     FailMessage("Đăng nhập không thành công", "Tài khoản của bạn chưa đúng")
            // }
            console.error(error)
        } finally {
            setLoading(false);
        }
    }


}

export default new EmployeeService();
