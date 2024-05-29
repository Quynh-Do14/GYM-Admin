import React, { useEffect, useState } from 'react'
import MainLayout from '../../infrastructure/common/layouts/MainLayout'
import { Col, Row } from 'antd';
import { ROUTE_PATH } from '../../core/common/appRouter';
import InputTextCommon from '../../infrastructure/common/components/input/input-text';
import { ButtonCommon } from '../../infrastructure/common/components/button/button-common';
import { FullPageLoading } from '../../infrastructure/common/components/controls/loading';
import { useNavigate, useParams } from 'react-router-dom';
import InputDateCommon from '../../infrastructure/common/components/input/input-date';
import InputSelectGenderCommon from '../../infrastructure/common/components/input/select-category';
import InputSelectPositionCommon from '../../infrastructure/common/components/input/select-position';
import employeeService from '../../infrastructure/repositories/employee/service/employee.service';
import { WarningMessage } from '../../infrastructure/common/components/toast/notificationToast';
import { convertDate } from '../../infrastructure/helper/helper';
import UploadAvatar from '../../infrastructure/common/components/input/upload-file';
import Constants from '../../core/common/constant';
import InputSelectCommon from '../../infrastructure/common/components/input/select-common';
import InputPasswordCommon from '../../infrastructure/common/components/input/input-password';

const ViewEmployeeManagement = () => {
    const [validate, setValidate] = useState({});
    const [loading, setLoading] = useState(false);
    const [submittedTime, setSubmittedTime] = useState();
    const [detailEmployee, setDetailEmployee] = useState({});
    const [imageUrl, setImageUrl] = useState(null);
    const [avatar, setAvatar] = useState(null);

    const [_data, _setData] = useState({});
    const dataEmployee = _data;
    const setDataEmployee = (data) => {
        Object.assign(dataEmployee, { ...data });
        _setData({ ...dataEmployee });
    };

    const param = useParams();

    const navigate = useNavigate();

    const onBack = () => {
        navigate(ROUTE_PATH.EMPLOYEE)
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

    const onGetEmployeeByIdAsync = async () => {
        try {
            await employeeService.getEmployeeById(
                param.id,
                setLoading
            ).then((res) => {
                setDetailEmployee(res)
            })
        }
        catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        onGetEmployeeByIdAsync().then(() => { })
    }, [])

    useEffect(() => {
        if (detailEmployee) {
            setDataEmployee({
                image: detailEmployee.image,
                avatar: detailEmployee.avatar,
                name: detailEmployee.name,
                username: detailEmployee.username,
                email: detailEmployee.email,
                dob: detailEmployee.dob,
                sex: detailEmployee.sex,
                role: detailEmployee.role,
                cccd: detailEmployee.cccd,
                phone: detailEmployee.phone,
                lastName: detailEmployee.lastName,
                sdt: detailEmployee.sdt,
                address: detailEmployee.address,
                position: detailEmployee.position?.id,
                startWork: detailEmployee.startWork
            });
        };
    }, [detailEmployee]);

    const onUpdateEmployee = async () => {
        await setSubmittedTime(Date.now());
        if (isValidData()) {
            await employeeService.updateEmployee(
                param.id,
                {
                    image: avatar,
                    name: dataEmployee.name,
                    email: dataEmployee.email,
                    username: dataEmployee.username,
                    dob: dataEmployee.dob !== detailEmployee.dob ? convertDate(dataEmployee.dob) : dataEmployee.dob,
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
                    startWork: dataEmployee.startWork !== detailEmployee.startWork ? convertDate(dataEmployee.startWork) : dataEmployee.startWork,
                },
                onBack,
                setLoading
            )
        }
        else {
            WarningMessage("Nhập thiếu thông tin", "Vui lòng nhập đầy đủ thông tin")
        };
    };
    console.log("dataEmployee", dataEmployee.position);
    return (
        <MainLayout breadcrumb={"Quản lý nhân viên"} title={"Xem thông tin nhân viên"} redirect={ROUTE_PATH.EMPLOYEE}>
            <div className='main-page h-full flex-1 overflow-auto bg-white px-4 py-8'>
                <div className='bg-white scroll-auto'>
                    <Row>
                        {/* <Col xs={24} sm={24} md={12} lg={8} xl={6} xxl={5} className='border-add flex justify-center'>
                            <div className='legend-title'>Cập nhật ảnh</div>
                            <UploadAvatar
                                attributeImg={dataEmployee.image}
                                imageUrl={imageUrl}
                                setAvatar={setAvatar}
                                setImageUrl={setImageUrl}
                            />
                        </Col> */}
                        <Col span={24} className='border-add'>
                            <div className='legend-title'>Cập nhật thông tin</div>
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
                                        isRequired={false}
                                        dataAttribute={dataEmployee.email}
                                        setData={setDataEmployee}
                                        disabled={true}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <InputTextCommon
                                        label={"Tên đăng nhập"}
                                        attribute={"username"}
                                        isRequired={false}
                                        dataAttribute={dataEmployee.username}
                                        setData={setDataEmployee}
                                        disabled={true}
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
            <div className='container-btn main-page bg-white p-4 flex flex-col '>
                <Row justify={"center"}>
                    <Col className='mx-1'>
                        <ButtonCommon onClick={onBack} classColor="blue">Quay lại</ButtonCommon>
                    </Col>
                    <Col className='mx-1'>
                        <ButtonCommon onClick={onUpdateEmployee} classColor="orange">Cập nhật</ButtonCommon>
                    </Col>
                </Row>
            </div >
            <FullPageLoading isLoading={loading} />
        </MainLayout >
    )
}

export default ViewEmployeeManagement