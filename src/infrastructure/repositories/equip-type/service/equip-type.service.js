import { Endpoint } from "../../../../core/common/apiLink";
import { FailMessage, SuccessMessage } from "../../../common/components/toast/notificationToast";
import { RequestService } from "../../../utils/response";
import { saveToken } from "../../../utils/storage";

class EquipTypeService {
    async getEquipType(params, setLoading) {
        setLoading(true)
        try {
            return await RequestService
                .get(Endpoint.EquipType.Get, {
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
    async getEquipTypeById(id, setLoading) {
        setLoading(true)
        try {
            return await RequestService
                .get(`${Endpoint.EquipType.Get}/${id}`)
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
    async addEquipType(data, onBack, setLoading) {
        setLoading(true)
        try {
            return await RequestService
                .post(Endpoint.EquipType.Add,
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
    async updateEquipType(id, data, onBack, setLoading) {
        setLoading(true)
        try {
            return await RequestService
                .put(`${Endpoint.EquipType.Update}/${id}`,
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
    async deleteEquipType(id, setLoading) {
        setLoading(true)
        try {
            return await RequestService
                .delete(`${Endpoint.EquipType.Delete}/${id}`)
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

export default new EquipTypeService();
