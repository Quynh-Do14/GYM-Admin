import React, { useState } from 'react'
import MainLayout from '../../infrastructure/common/layouts/MainLayout'
import { Col, Row } from 'antd';
import { ROUTE_PATH } from '../../core/common/appRouter';
import InputTextCommon from '../../infrastructure/common/components/input/input-text';
import { ButtonCommon } from '../../infrastructure/common/components/button/button-common';
import { FullPageLoading } from '../../infrastructure/common/components/controls/loading';
import { useNavigate } from 'react-router-dom';
import { WarningMessage } from '../../infrastructure/common/components/toast/notificationToast';
import InputSelectGenderCommon from '../../infrastructure/common/components/input/select-category';
import UploadAvatar from '../../infrastructure/common/components/input/upload-file';
import memberService from '../../infrastructure/repositories/member/service/member.service';
import InputSelectMemberCardCommon from '../../infrastructure/common/components/input/select-member-card';
import Constants from '../../core/common/constant';
import InputSelectCommon from '../../infrastructure/common/components/input/select-common';
import InputPasswordCommon from '../../infrastructure/common/components/input/input-password';

const AddMemberManagement = () => {
    const [validate, setValidate] = useState({});
    const [loading, setLoading] = useState(false);
    const [submittedTime, setSubmittedTime] = useState();
    const [imageUrl, setImageUrl] = useState(null);
    const [avatar, setAvatar] = useState(null);

    const [_data, _setData] = useState({});
    const dataMember = _data;

    const navigate = useNavigate();

    const onBack = () => {
        navigate(ROUTE_PATH.MEMBER)
    };
    const setDataMember = (data) => {
        Object.assign(dataMember, { ...data });
        _setData({ ...dataMember });
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

    const onAddMember = async () => {
        await setSubmittedTime(Date.now());
        if (isValidData()) {
            await memberService.addMember({
                name: dataMember.name,
                email: dataMember.email,
                password: dataMember.password,
                sex: dataMember.sex,
                role: dataMember.role,
                cccd: dataMember.cccd,
                phone: dataMember.phone,
                status: true,
            },
                onBack,
                setLoading
            )
        }
        else {
            WarningMessage("Nhập thiếu thông tin", "Vui lòng nhập đầy đủ thông tin")
        };
    };

    return (
        <MainLayout breadcrumb={"Quản lý thành viên"} title={"Thêm thành viên"} redirect={ROUTE_PATH.MEMBER}>
            <div className='main-page h-full flex-1 overflow-auto bg-white px-4 py-8'>
                <div className='bg-white scroll-auto'>
                    <Row>
                        <Col xs={24} sm={24} md={12} lg={8} xl={6} xxl={5} className='border-add flex justify-center'>
                            <div className='legend-title'>Thêm mới ảnh</div>
                            <UploadAvatar
                                attributeImg={dataMember.avatar}
                                imageUrl={imageUrl}
                                setAvatar={setAvatar}
                                setImageUrl={setImageUrl}
                            />
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={16} xl={18} xxl={19} className='border-add'>
                            <div className='legend-title'>Thêm thông tin mới</div>
                            <Row gutter={[30, 0]}>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <InputTextCommon
                                        label={"Tên thành viên"}
                                        attribute={"name"}
                                        isRequired={true}
                                        dataAttribute={dataMember.name}
                                        setData={setDataMember}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>
                                {/* <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <InputSelectMemberCardCommon
                                        label={"Thẻ thành viên"}
                                        attribute={"memberCard"}
                                        isRequired={true}
                                        dataAttribute={dataMember.memberCard}
                                        setData={setDataMember}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col> */}
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <InputTextCommon
                                        label={"Email"}
                                        attribute={"email"}
                                        isRequired={true}
                                        dataAttribute={dataMember.email}
                                        setData={setDataMember}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <InputPasswordCommon
                                        label={"Mật khẩu"}
                                        attribute={"password"}
                                        isRequired={true}
                                        dataAttribute={dataMember.password}
                                        setData={setDataMember}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <InputSelectCommon
                                        label={"Giới tính"}
                                        attribute={"sex"}
                                        isRequired={true}
                                        dataAttribute={dataMember.sex}
                                        setData={setDataMember}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                        listDataOfItem={Constants.Gender.List}
                                    />
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <InputTextCommon
                                        label={"Căn cước công dân"}
                                        attribute={"cccd"}
                                        isRequired={true}
                                        dataAttribute={dataMember.cccd}
                                        setData={setDataMember}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <InputTextCommon
                                        label={"Số điện thoại"}
                                        attribute={"phone"}
                                        isRequired={true}
                                        dataAttribute={dataMember.phone}
                                        setData={setDataMember}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </div>
            <div className='container-btn main-page bg-white p-4 flex flex-col'>
                <Row justify={"center"}>
                    <Col className='mx-1'>
                        <ButtonCommon onClick={onBack} classColor="blue">Quay lại</ButtonCommon>
                    </Col>
                    <Col className='mx-1'>
                        <ButtonCommon onClick={onAddMember} classColor="orange">Thêm mới</ButtonCommon>
                    </Col>
                </Row>
            </div >
            <FullPageLoading isLoading={loading} />
        </MainLayout >
    )
}

export default AddMemberManagement