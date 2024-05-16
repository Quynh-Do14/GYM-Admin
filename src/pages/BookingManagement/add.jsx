import React, { useState } from 'react'
import MainLayout from '../../infrastructure/common/layouts/MainLayout'
import { Col, Row } from 'antd';
import { ROUTE_PATH } from '../../core/common/appRouter';
import InputTextCommon from '../../infrastructure/common/components/input/input-text';
import { ButtonCommon } from '../../infrastructure/common/components/button/button-common';
import { FullPageLoading } from '../../infrastructure/common/components/controls/loading';
import { useNavigate } from 'react-router-dom';
import { WarningMessage } from '../../infrastructure/common/components/toast/notificationToast';
import InputDateCommon from '../../infrastructure/common/components/input/input-date';
import InputSelectGenderCommon from '../../infrastructure/common/components/input/select-category';
import { convertDateBooking } from '../../infrastructure/helper/helper';
import InputSelectPositionCommon from '../../infrastructure/common/components/input/select-position';
import UploadAvatar from '../../infrastructure/common/components/input/upload-file';
import InputSelectCommon from '../../infrastructure/common/components/input/select-common';
import Constants from '../../core/common/constant';
import bookingService from '../../infrastructure/repositories/booking/service/booking.service';
import InputSelectEmployeeCommon from '../../infrastructure/common/components/input/select-employee';
import InputSelectUserCommon from '../../infrastructure/common/components/input/select-user';

const AddBookingManagement = () => {
    const [validate, setValidate] = useState({});
    const [loading, setLoading] = useState(false);
    const [submittedTime, setSubmittedTime] = useState();
    const [imageUrl, setImageUrl] = useState(null);
    const [avatar, setAvatar] = useState(null);

    const [_data, _setData] = useState({});
    const dataBooking = _data;

    const navigate = useNavigate();

    const onBack = () => {
        navigate(ROUTE_PATH.BOOKING)
    };
    const setDataBooking = (data) => {
        Object.assign(dataBooking, { ...data });
        _setData({ ...dataBooking });
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
    const onBooking = async () => {
        await setSubmittedTime(Date.now());
        if (isValidData()) {
            await bookingService.addBooking({
                bookingTime: convertDateBooking(dataBooking.bookingTime),
                member: {
                    id: dataBooking.member
                },
                employee: {
                    id: dataBooking.employee
                },
                endTime: convertDateBooking(dataBooking.endTime)
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
        <MainLayout breadcrumb={"Quản lý đặt lịch"} title={"Thêm đặt lịch"} redirect={ROUTE_PATH.BOOKING}>
            <div className='main-page h-full flex-1 overflow-auto bg-white px-4 py-8'>
                <div className='bg-white scroll-auto'>
                    <Row>
                        <Col span={24} className='border-add'>
                            <div className='legend-title'>Thêm thông tin mới</div>
                            <Row gutter={[30, 0]}>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <InputDateCommon
                                        label={"Ngày đặt"}
                                        attribute={"bookingTime"}
                                        isRequired={true}
                                        dataAttribute={dataBooking.bookingTime}
                                        data={dataBooking}
                                        setData={setDataBooking}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                        disabledToDate={true}
                                        showTime={true}
                                        showHour={true}
                                    />
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <InputDateCommon
                                        label={"Ngày kết thúc"}
                                        attribute={"endTime"}
                                        isRequired={true}
                                        dataAttribute={dataBooking.endTime}
                                        data={dataBooking}
                                        setData={setDataBooking}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                        disabledToDate={true}
                                        showTime={true}
                                        showHour={true}
                                    />
                                </Col>
                                <Col span={24}>
                                    <InputSelectEmployeeCommon
                                        label={"Người hướng dẫn"}
                                        attribute={"employee"}
                                        isRequired={true}
                                        dataAttribute={dataBooking.employee}
                                        data={dataBooking}
                                        setData={setDataBooking}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                        listDataOfItem={Constants.Gender.List}
                                    />
                                </Col>
                                <Col span={24}>
                                    <InputSelectUserCommon
                                        label={"Người thành viên"}
                                        attribute={"member"}
                                        isRequired={true}
                                        dataAttribute={dataBooking.member}
                                        data={dataBooking}
                                        setData={setDataBooking}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                        listDataOfItem={Constants.Gender.List}
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
                        <ButtonCommon onClick={onBooking} classColor="orange">Thêm mới</ButtonCommon>
                    </Col>
                </Row>
            </div >
            <FullPageLoading isLoading={loading} />
        </MainLayout >
    )
}

export default AddBookingManagement