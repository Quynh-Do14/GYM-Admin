import { Endpoint } from "../../../../core/common/apiLink";
import { FailMessage, SuccessMessage } from "../../../common/components/toast/notificationToast";
import { RequestService } from "../../../utils/response";
import { saveToken } from "../../../utils/storage";

class PositionService {
    async getPosition(params, setLoading) {
        setLoading(true)
        try {
            return await RequestService
                .get(Endpoint.Position.Get, {
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
            console.error(error)
        } finally {
            setLoading(false);
        }
    };
    async getPositionById(id, setLoading) {
        setLoading(true)
        try {
            return await RequestService
                .get(`${Endpoint.Position.Get}/${id}`)
                .then(response => {
                    if (response) {
                        return response
                    }
                    setLoading(false)
                    return response;
                });
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false);
        }
    };
    async addPosition(data, onBack, setLoading) {
        setLoading(true)
        try {
            return await RequestService
                .post(Endpoint.Position.Add,
                    data
                )
                .then(response => {
                    if (response) {
                        onBack()
                        SuccessMessage("Thêm mới thành công", "")
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
            FailMessage("Thêm mới không thành công", "Xem lại thông tin thêm mới")
            console.error(error)
        } finally {
            setLoading(false);
        }
    }
    async updatePosition(id, data, onBack, setLoading) {
        setLoading(true)
        try {
            return await RequestService
                .put(`${Endpoint.Position.Update}/${id}`,
                    data
                )
                .then(response => {
                    if (response) {
                        onBack()
                        SuccessMessage("Cập nhật thành công", "")
                        return response
                    }
                    setLoading(false)
                    return response;
                });
        } catch (error) {
            FailMessage("Cập nhật không thành công", "Vui lòng kiểm tra thông tin")
            console.error(error)
        } finally {
            setLoading(false);
        }
    }
    async deletePosition(id, setLoading) {
        setLoading(true)
        try {
            return await RequestService
                .delete(`${Endpoint.Position.Delete}/${id}`)
                .then(response => {
                    if (response) {
                        SuccessMessage("Xóa thành công", "")
                        return response
                    }
                    setLoading(false)
                    return response;
                });
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false);
        }
    }
}

export default new PositionService();
