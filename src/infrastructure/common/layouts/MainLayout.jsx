import { Col, Dropdown, Layout, Menu, Row, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { BreadcrumbCommon } from './Breabcumb';
import { DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons';
import Constants from '../../../core/common/constant';
import "../../../assets/styles/components/MainLayout.css";
import profile from "../../../assets/images/profile.png";
import DialogConfirmCommon from '../components/modal/dialogConfirm';
import { ROUTE_PATH } from '../../../core/common/appRouter';
import authService from '../../repositories/auth/service/auth.service';
import { useNavigate, useLocation } from 'react-router-dom';
import positionService from '../../repositories/position/service/position.service';
import { useRecoilState } from 'recoil';
import { PositionState } from '../../../core/atoms/position/positionState';
import { MemberCardState } from '../../../core/atoms/memberCard/memberCardState';
import ProfileModal from './Profile';

const { Header, Content, Sider } = Layout;

const MainLayout = ({ ...props }) => {
    const { pageName, title, breadcrumb, redirect } = props
    const [isOpenModalLogout, setIsOpenModalLogout] = useState(false);
    const [isOpenModalProfile, setIsOpenModalProfile] = useState(false);

    const [collapsed, setCollapsed] = useState(false);

    const [loading, setLoading] = useState(false);
    const [, setDataPosition] = useRecoilState(PositionState);
    const [, setDataMemberCard] = useRecoilState(MemberCardState);
    const [dataProfile, setDataProfile] = useState();

    const navigate = useNavigate();
    const location = useLocation();

    const openModalLogout = () => {
        setIsOpenModalLogout(true);
    };

    const closeModalLogout = () => {
        setIsOpenModalLogout(false);
    };

    const onLogOut = async () => {
        setIsOpenModalLogout(false);
        try {
            await authService.logout(
                setLoading
            ).then(() => {
                navigate(ROUTE_PATH.LOGIN);
                window.location.reload();
            });
        } catch (error) {
            console.error(error);
        }
    }

    const getProfileUser = async () => {
        try {
            await authService.profile(
                () => { }
            ).then((response) => {
                if (response) {
                    setDataProfile(response)
                }
            })
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        getProfileUser().then(() => { })
    }, [])

    const onGetPositionAsync = async () => {
        const param = {}
        try {
            await positionService.getPosition(
                param,
                setLoading
            ).then((res) => {
                setDataPosition({
                    data: res.content
                })
            })
        }
        catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        onGetPositionAsync().then(_ => { });
    }, []);


    const openModalProfile = () => {
        setIsOpenModalProfile(true);
    };

    const closeModalProfile = () => {
        setIsOpenModalProfile(false);
    };
    const listAction = () => {
        return (
            <Menu className='action-admin'>
                <Menu.Item className='info-admin' onClick={openModalProfile}>
                    <div className='info-admin-title px-1 py-2 flex align-middle hover:text-[#5e5eff]'>
                        <svg className='mr-1-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="5" r="4" />
                            <path d="M12 9a9 9 0 0 1 9 9H3a9 9 0 0 1 9-9z" />
                        </svg>

                        Thông tin cá nhân
                    </div>
                </Menu.Item>
                <Menu.Item className='info-admin' onClick={openModalLogout}>
                    <div className='info-admin-title px-1 py-2 flex align-middle hover:text-[#fc5a5a]' o >
                        <svg className='mr-1-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M15 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10" />
                            <polyline points="10 17 15 12 10 7" />
                            <line x1="15" y1="12" x2="3" y2="12" />
                        </svg>
                        Đăng xuất
                    </div>
                </Menu.Item>
            </Menu>
        )
    };

    return (
        <div className="main-layout">
            <Layout>
                <Row className='header pl-16 pr-16' justify={"space-between"} align={"middle"}>
                    <Col className='flex align-middle'>
                        {/* <img src={logo} alt='' height={60} /> */}
                    </Col>
                    <Col>
                        <Row align={"middle"} >
                            <Col className='mr-2 flex flex-col align-bottom'>
                                <div className='user-name'>
                                    {dataProfile?.name}
                                </div>
                                {/* <div className='role'>
                                    {dataProfile.roles[0]?.name}
                                </div> */}
                            </Col>
                            <Col>
                                <Dropdown overlay={listAction} trigger={['click']}>
                                    <a onClick={(e) => e.preventDefault()}>
                                        <Space>
                                            <img className='avatar cursor-pointe' width={50} height={50} src={profile} alt='' />
                                        </Space>
                                    </a>
                                </Dropdown>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Layout>
                    <Sider className='sider' trigger={null} collapsible collapsed={collapsed}>
                        <Menu className='menu'>
                            {Constants.Menu.List.map((it, index) => {
                                return (
                                    <Menu.Item
                                        className={`${location.pathname.includes(it.link) ? "menu-title active" : "menu-title"}`}
                                        key={index} icon={it.icon}>
                                        <a href={it.link}>
                                            {it.label}
                                        </a>
                                    </Menu.Item>
                                )
                            })}
                        </Menu>
                        <div className='btn-collap flex align-center justify-center pointer'
                            onClick={() => setCollapsed(!collapsed)}
                        > {collapsed ?
                            <DoubleRightOutlined />
                            :
                            <DoubleLeftOutlined />
                            }
                        </div>
                    </Sider>
                    <Layout className='bg-white'>
                        <div className='flex flex-col px-6 py-2'>
                            <BreadcrumbCommon
                                pageName={pageName}
                                breadcrumb={breadcrumb}
                                title={title}
                                redirect={redirect}
                            />
                        </div>
                        <Content className='content flex flex-col mx-6 mb-2 bg-white'>
                            {props.children}
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
            <DialogConfirmCommon
                message={"Bạn có muốn đăng xuất khỏi hệ thống"}
                titleCancel={"Bỏ qua"}
                titleOk={"Đăng xuất"}
                visible={isOpenModalLogout}
                handleCancel={closeModalLogout}
                handleOk={onLogOut}
                title={"Xác nhận"}
            />
            <ProfileModal
                visible={isOpenModalProfile}
                handleCancel={closeModalProfile}
                isLoading={setLoading}
            />
        </div>
    )
}

export default MainLayout