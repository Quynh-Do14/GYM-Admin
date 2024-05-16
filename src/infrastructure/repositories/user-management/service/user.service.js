import { Endpoint } from "../../../../core/common/apiLink";
import { RequestService } from "../../../utils/response";
import { saveToken } from "../../../utils/storage";

class UserService {
    async getUser(params, setLoading) {
        setLoading(true)
        try {
            return await RequestService
                .get(Endpoint.User.Get, {
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
    }


}

export default new UserService();
