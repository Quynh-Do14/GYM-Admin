import { Endpoint } from "../../../../core/common/apiLink";
import { FailMessage, SuccessMessage } from "../../../common/components/toast/notificationToast";
import { messageConfig } from "../../../helper/message";
import { RequestService } from "../../../utils/response";
import { saveToken } from "../../../utils/storage";

class BranchService {
    async getBranch(params, setLoading) {
        setLoading(true)
        try {
            return await RequestService
                .get(Endpoint.Branch.Get, {
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
    async getBranchById(id, setLoading) {
        setLoading(true)
        try {
            return await RequestService
                .get(`${Endpoint.Branch.GetById}/${id}`)
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
    async addBranch(data, onBack, setLoading) {
        setLoading(true)
        try {
            return await RequestService
                .postForm(Endpoint.Branch.Add,
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
            FailMessage("Thêm mới không thành công", messageConfig(error.response.data.message))
            console.error(error)
        } finally {
            setLoading(false);
        }
    }
    async updateBranch(id, data, onBack, setLoading) {
        setLoading(true)
        try {
            return await RequestService
                .putForm(`${Endpoint.Branch.Update}/${id}`,
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
            FailMessage("Cập nhật không thành công", messageConfig(error.response.data.message))
            console.error(error)
        } finally {
            setLoading(false);
        }
    }
    async deleteBranch(id, setLoading) {
        setLoading(true)
        try {
            return await RequestService
                .delete(`${Endpoint.Branch.Delete}/${id}`)
                .then(response => {
                    if (response) {
                        SuccessMessage("Xóa thành công", "")
                        return response
                    }
                    setLoading(false)
                    return response;
                });
        } catch (error) {
            FailMessage("Xóa không thành công", "Vui lòng kiểm tra thông tin")
            console.error(error)
        } finally {
            setLoading(false);
        }
    };
    async getAvatar(id, setLoading) {
        setLoading(true)

        try {
            return await RequestService.
                getFile(`${Endpoint.Branch.Get}/${id}/image`).then(response => {
                    return response;
                });
        }
        catch (error) {
            console.error(error)
        } finally {
            setLoading(false);
        }
    }

}

export default new BranchService();
