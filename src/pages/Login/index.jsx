import { Col, Input, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import "../../assets/styles/components/Login.css"
import authService from '../../infrastructure/repositories/auth/service/auth.service';
import { isTokenStoraged } from '../../infrastructure/utils/storage';
import { ROUTE_PATH } from '../../core/common/appRouter';
import { useNavigate } from 'react-router-dom';
import { FullPageLoading } from '../../infrastructure/common/components/controls/loading';
import { WarningMessage } from '../../infrastructure/common/components/toast/notificationToast';
import InputTextCommon from '../../infrastructure/common/components/input/input-text';
import InputPasswordCommon from '../../infrastructure/common/components/input/input-password';
const LoginPage = () => {
    const [validate, setValidate] = useState({});
    const [loading, setLoading] = useState(false);
    const [submittedTime, setSubmittedTime] = useState();

    const [_data, _setData] = useState({});
    const dataLogin = _data;

    const setDataLogin = (data) => {
        Object.assign(dataLogin, { ...data });
        _setData({ ...dataLogin });
    };

    const isValidData = () => {
        let allRequestOK = true;

        setValidate({ ...validate });

        Object.values(validate).forEach((it) => {
            if (it.isError === true) {
                allRequestOK = false;
            }
        });

        return allRequestOK;
    };

    const navigate = useNavigate();

    const storage = isTokenStoraged()
    useEffect(() => {
        if (storage) {
            navigate(ROUTE_PATH.MAINLAYOUT);
        };
    }, [])

    const onLogin = async () => {
        await setSubmittedTime(new Date())
        if (isValidData()) {
            try {
                await authService.login(
                    {
                        username: dataLogin.username,
                        password: dataLogin.password,
                    },
                    setLoading
                ).then((response) => {
                    if (response) {
                        navigate(ROUTE_PATH.MAINLAYOUT)
                    }
                });
            } catch (error) {
                console.error(error);
            }
        }
        else {
            WarningMessage("Nhập thiếu thông tin", "Vui lòng nhập đầy đủ thông tin")
        };
    }

    return (
        <div>
            <div className='login'>
                <div className={"container"} id="container">
                    <div className="form-container sign-in-container">
                        <div className='form-flex'>
                            <h1 style={{ marginBottom: 12 }}>Quản lý phòng GYM</h1>
                            <Row gutter={[10, 10]}>
                                <Col span={24}>
                                    <InputTextCommon
                                        label={"Tên đăng nhập"}
                                        attribute={"username"}
                                        isRequired={true}
                                        dataAttribute={dataLogin.username}
                                        setData={setDataLogin}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>
                                <Col span={24}>
                                    <InputPasswordCommon
                                        label={"Mật khẩu"}
                                        attribute={"password"}
                                        isRequired={true}
                                        dataAttribute={dataLogin.password}
                                        setData={setDataLogin}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>
                                <Col span={24}>
                                    <button className='w-full cursor-pointer mt-4' onClick={onLogin}>Đăng nhập</button>
                                </Col>
                            </Row>
                        </div>
                    </div>
                    <div className="overlay-container">
                        <div className="overlay">
                        </div>
                    </div>
                </div>

            </div>
            <FullPageLoading isLoading={loading} />
        </div>
    )
}

export default LoginPage