import React, { useEffect, useState } from 'react'
import MainLayout from '../../infrastructure/common/layouts/MainLayout'
import { Col, Row } from 'antd';
import { ROUTE_PATH } from '../../core/common/appRouter';
import InputTextCommon from '../../infrastructure/common/components/input/input-text';
import { ButtonCommon } from '../../infrastructure/common/components/button/button-common';
import { FullPageLoading } from '../../infrastructure/common/components/controls/loading';
import { useNavigate, useParams } from 'react-router-dom';
import InputSelectGenderCommon from '../../infrastructure/common/components/input/select-category';
import { WarningMessage } from '../../infrastructure/common/components/toast/notificationToast';
import UploadAvatar from '../../infrastructure/common/components/input/upload-file';
import InputSelectMemberCardCommon from '../../infrastructure/common/components/input/select-member-card';
import memberService from '../../infrastructure/repositories/member/service/member.service';
import InputSelectCommon from '../../infrastructure/common/components/input/select-common';
import Constants from '../../core/common/constant';

const ViewMemberManagement = () => {
    const [validate, setValidate] = useState({});
    const [loading, setLoading] = useState(false);
    const [submittedTime, setSubmittedTime] = useState();
    const [detailMember, setDetailMember] = useState({});
    const [imageUrl, setImageUrl] = useState(null);
    const [avatar, setAvatar] = useState(null);

    const [_data, _setData] = useState({});
    const dataMember = _data;
    const setDataMember = (data) => {
        Object.assign(dataMember, { ...data });
        _setData({ ...dataMember });
    };

    const param = useParams();

    const navigate = useNavigate();

    const onBack = () => {
        navigate(ROUTE_PATH.MEMBER)
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

    const onGetMemberByIdAsync = async () => {
        try {
            await memberService.getMemberById(
                param.id,
                setLoading
            ).then((res) => {
                setDetailMember(res)
            })
        }
        catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        onGetMemberByIdAsync().then(() => { })
    }, [])

    useEffect(() => {
        if (detailMember) {
            setDataMember({
                avatar: detailMember.avatar,
                name: detailMember.name,
                email: detailMember.user?.email,
                sex: detailMember.sex,
                address: detailMember.address,
                cccd: detailMember.cccd,
                phone: detailMember.phone,
                sdt: detailMember.sdt,
                memberCard: detailMember.memberCard?.id,
            });
        };
    }, [detailMember]);
    const onUpdateMember = async () => {
        await setSubmittedTime(Date.now());
        if (isValidData()) {
            await memberService.updateMember(
                param.id,
                {
                    name: dataMember.name,
                    email: dataMember.email,
                    sex: dataMember.sex,
                    address: dataMember.address,
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
        <MainLayout breadcrumb={"Quản lý thành viên"} title={"Xem thông tin thành viên"} redirect={ROUTE_PATH.MEMBER}>
            <div className='main-page h-100 flex-1 auto bg-white px-4 py-8'>
                <div className='bg-white'>
                    <Row>
                        <Col xs={24} sm={24} md={12} lg={8} xl={6} xxl={5} className='border-add flex justify-center'>
                            <div className='legend-title'>Cập nhật ảnh</div>
                            <UploadAvatar
                                attributeImg={dataMember.avatar}
                                imageUrl={imageUrl}
                                setAvatar={setAvatar}
                                setImageUrl={setImageUrl}
                            />
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={16} xl={18} xxl={19} className='border-add'>
                            <div className='legend-title'>Cập nhật thông tin</div>
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
                                        isRequired={false}
                                        dataAttribute={dataMember.email}
                                        setData={setDataMember}
                                        disabled={true}
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
                                        label={"Địa chỉ"}
                                        attribute={"address"}
                                        isRequired={false}
                                        dataAttribute={dataMember.address}
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
            <div className='container-btn main-page bg-white p-4 flex flex-col '>
                <Row justify={"center"}>
                    <Col className='mx-1'>
                        <ButtonCommon onClick={onBack} classColor="blue">Quay lại</ButtonCommon>
                    </Col>
                    <Col className='mx-1'>
                        <ButtonCommon onClick={onUpdateMember} classColor="orange">Cập nhật</ButtonCommon>
                    </Col>
                </Row>
            </div >
            <FullPageLoading isLoading={loading} />
        </MainLayout >
    )
}

export default ViewMemberManagement