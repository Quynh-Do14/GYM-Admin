import { Col, Input, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import "../../assets/styles/components/Login.css"
import authService from '../../infrastructure/repositories/auth/service/auth.service';
import { isTokenStoraged } from '../../infrastructure/utils/storage';
import { ROUTE_PATH } from '../../core/common/appRouter';
import { useNavigate } from 'react-router-dom';
const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const storage = isTokenStoraged()
    useEffect(() => {
        if (storage) {
            navigate(ROUTE_PATH.MAINLAYOUT);
        };
    }, [])

    const onLogin = async () => {
        try {
            await authService.login(
                {
                    username: username,
                    password: password,
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

    return (
        <div>
            <div className='login'>
                <div className={"container"} id="container">
                    <div className="form-container sign-in-container">
                        <div className='form-flex'>
                            <h1 className='mb-4'>Đăng nhập</h1>
                            <Row>
                                <Col span={24}>
                                    <Input
                                        size={"middle"}
                                        value={username ? username : ""}
                                        onChange={(e) => setUsername(e.target.value)}

                                    />
                                </Col>
                                <Col span={24}>
                                    <Input.Password
                                        size={"middle"}
                                        value={password ? password : ""}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </Col>
                            </Row>
                            <button onClick={onLogin}>Đăng nhập</button>
                        </div>
                    </div>
                    <div className="overlay-container">
                        <div className="overlay">
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default LoginPage