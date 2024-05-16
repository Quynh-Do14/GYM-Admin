import { Endpoint } from "../../../../core/common/apiLink";
import { FailMessage, SuccessMessage } from "../../../common/components/toast/notificationToast";
import { RequestService } from "../../../utils/response";
import { saveToken } from "../../../utils/storage";

class EquipmentService {
    async getEquipment(params, setLoading) {
        setLoading(true)
        try {
            return await RequestService
                .get(Endpoint.Equipment.Get, {
                    ...params
                })
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
    async getEquipmentById(id, setLoading) {
        setLoading(true)
        try {
            return await RequestService
                .get(`${Endpoint.Equipment.Get}/${id}`)
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
    async addEquipment(data, onBack, setLoading) {
        setLoading(true)
        try {
            return await RequestService
                .post(Endpoint.Equipment.Add,
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
    async updateEquipment(id, data, onBack, setLoading) {
        setLoading(true)
        try {
            return await RequestService
                .put(`${Endpoint.Equipment.Update}/${id}`,
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
    async deleteEquipment(id, setLoading) {
        setLoading(true)
        try {
            return await RequestService
                .delete(`${Endpoint.Equipment.Delete}/${id}`)
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

export default new EquipmentService();
