import React, { useState } from 'react'
import MainLayout from '../../infrastructure/common/layouts/MainLayout'
import { Col, Row } from 'antd';
import { ROUTE_PATH } from '../../core/common/appRouter';
import InputTextCommon from '../../infrastructure/common/components/input/input-text';
import { ButtonCommon } from '../../infrastructure/common/components/button/button-common';
import { FullPageLoading } from '../../infrastructure/common/components/controls/loading';
import { useNavigate } from 'react-router-dom';
import employeeService from '../../infrastructure/repositories/employee/service/employee.service';
import { WarningMessage } from '../../infrastructure/common/components/toast/notificationToast';
import InputDateCommon from '../../infrastructure/common/components/input/input-date';
import InputSelectGenderCommon from '../../infrastructure/common/components/input/select-category';
import { convertDate, convertDateOnly } from '../../infrastructure/helper/helper';
import InputSelectPositionCommon from '../../infrastructure/common/components/input/select-position';
import UploadAvatar from '../../infrastructure/common/components/input/upload-file';
import InputSelectCommon from '../../infrastructure/common/components/input/select-common';
import Constants from '../../core/common/constant';
import InputPasswordCommon from '../../infrastructure/common/components/input/input-password';

const AddEmployeeManagement = () => {
    const [validate, setValidate] = useState({});
    const [loading, setLoading] = useState(false);
    const [submittedTime, setSubmittedTime] = useState();
    const [imageUrl, setImageUrl] = useState(null);
    const [avatar, setAvatar] = useState(null);

    const [_data, _setData] = useState({});
    const dataEmployee = _data;

    const navigate = useNavigate();

    const onBack = () => {
        navigate(ROUTE_PATH.EMPLOYEE)
    };
    const setDataEmployee = (data) => {
        Object.assign(dataEmployee, { ...data });
        _setData({ ...dataEmployee });
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
    const onAddEmployee = async () => {
        await setSubmittedTime(Date.now());
        if (isValidData()) {
            await employeeService.addEmployee({
                // image: avatar,
                name: dataEmployee.name,
                // fullName: dataEmployee.fullName,
                username: dataEmployee.username,
                password: dataEmployee.password,
                email: dataEmployee.email,
                dob: convertDate(dataEmployee.dob),
                sex: dataEmployee.sex,
                role: dataEmployee.role,
                cccd: dataEmployee.cccd,
                phone: dataEmployee.phone,
                lastName: dataEmployee.lastName,
                sdt: dataEmployee.sdt,
                address: dataEmployee.address,
                position: {
                    id: dataEmployee.position
                },
                startWork: convertDate(dataEmployee.startWork)
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
        <MainLayout breadcrumb={"Quản lý nhân viên"} title={"Thêm nhân viên"} redirect={ROUTE_PATH.EMPLOYEE}>
            <div className='main-page h-full flex-1 overflow-auto bg-white px-4 py-8'>
                <div className='bg-white scroll-auto'>
                    <Row>
                        {/* <Col xs={24} sm={24} md={12} lg={8} xl={6} xxl={5} className='border-add flex justify-center'>
                            <div className='legend-title'>Thêm mới ảnh</div>
                            <UploadAvatar
                                attributeImg={dataEmployee.image}
                                imageUrl={imageUrl}
                                setAvatar={setAvatar}
                                setImageUrl={setImageUrl}
                            />
                        </Col> */}
                        <Col span={24} className='border-add'>
                            <div className='legend-title'>Thêm thông tin mới</div>
                            <Row gutter={[30, 0]}>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <InputTextCommon
                                        label={"Tên nhân viên"}
                                        attribute={"name"}
                                        isRequired={true}
                                        dataAttribute={dataEmployee.name}
                                        setData={setDataEmployee}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <InputTextCommon
                                        label={"Email"}
                                        attribute={"email"}
                                        isRequired={true}
                                        dataAttribute={dataEmployee.email}
                                        setData={setDataEmployee}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <InputTextCommon
                                        label={"Tên đăng nhập"}
                                        attribute={"username"}
                                        isRequired={true}
                                        dataAttribute={dataEmployee.username}
                                        setData={setDataEmployee}
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
                                        dataAttribute={dataEmployee.password}
                                        setData={setDataEmployee}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <InputDateCommon
                                        label={"Ngày sinh"}
                                        attribute={"dob"}
                                        isRequired={true}
                                        dataAttribute={dataEmployee.dob}
                                        setData={setDataEmployee}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                        disabledToDate={false}
                                    />
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <InputSelectCommon
                                        label={"Giới tính"}
                                        attribute={"sex"}
                                        isRequired={true}
                                        dataAttribute={dataEmployee.sex}
                                        setData={setDataEmployee}
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
                                        dataAttribute={dataEmployee.cccd}
                                        setData={setDataEmployee}
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
                                        dataAttribute={dataEmployee.phone}
                                        setData={setDataEmployee}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <InputSelectPositionCommon
                                        label={"Chức vụ"}
                                        attribute={"position"}
                                        isRequired={true}
                                        dataAttribute={dataEmployee.position}
                                        setData={setDataEmployee}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <InputTextCommon
                                        label={"Địa chỉ"}
                                        attribute={"address"}
                                        isRequired={true}
                                        dataAttribute={dataEmployee.address}
                                        setData={setDataEmployee}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <InputDateCommon
                                        label={"Ngày làm việc"}
                                        attribute={"startWork"}
                                        isRequired={true}
                                        dataAttribute={dataEmployee.startWork}
                                        setData={setDataEmployee}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                        disabledToDate={true}
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
                        <ButtonCommon onClick={onAddEmployee} classColor="orange">Thêm mới</ButtonCommon>
                    </Col>
                </Row>
            </div >
            <FullPageLoading isLoading={loading} />
        </MainLayout >
    )
}

export default AddEmployeeManagement