import React, { useEffect, useState } from 'react'
import MainLayout from '../../infrastructure/common/layouts/MainLayout'
import { Col, Row } from 'antd';
import { ROUTE_PATH } from '../../core/common/appRouter';
import InputTextCommon from '../../infrastructure/common/components/input/input-text';
import { ButtonCommon } from '../../infrastructure/common/components/button/button-common';
import { FullPageLoading } from '../../infrastructure/common/components/controls/loading';
import { useNavigate, useParams } from 'react-router-dom';
import InputSelectGenderCommon from '../../infrastructure/common/components/input/select-category';
import InputSelectPositionCommon from '../../infrastructure/common/components/input/select-position';
import employeeService from '../../infrastructure/repositories/employee/service/employee.service';
import { WarningMessage } from '../../infrastructure/common/components/toast/notificationToast';
import { convertDate, convertDateBooking } from '../../infrastructure/helper/helper';
import UploadAvatar from '../../infrastructure/common/components/input/upload-file';
import Constants from '../../core/common/constant';
import InputSelectCommon from '../../infrastructure/common/components/input/select-common';
import InputSelectEmployeeCommon from '../../infrastructure/common/components/input/select-employee';
import InputSelectUserCommon from '../../infrastructure/common/components/input/select-user';
import bookingService from '../../infrastructure/repositories/booking/service/booking.service';
import InputDateBookingCommon from '../../infrastructure/common/components/input/input-date-booking';

const ViewBookingManagement = () => {
    const [validate, setValidate] = useState({});
    const [loading, setLoading] = useState(false);
    const [submittedTime, setSubmittedTime] = useState();
    const [detailBooking, setDetailBooking] = useState({});
    const [imageUrl, setImageUrl] = useState(null);
    const [avatar, setAvatar] = useState(null);

    const [_data, _setData] = useState({});
    const dataBooking = _data;
    const setDataBooking = (data) => {
        Object.assign(dataBooking, { ...data });
        _setData({ ...dataBooking });
    };

    const param = useParams();

    const navigate = useNavigate();

    const onBack = () => {
        navigate(ROUTE_PATH.BOOKING)
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

    const onGetBookingByIdAsync = async () => {
        try {
            await bookingService.getBookingById(
                param.id,
                setLoading
            ).then((res) => {
                setDetailBooking(res)
            })
        }
        catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        onGetBookingByIdAsync().then(() => { })
    }, [])

    useEffect(() => {
        if (detailBooking) {
            setDataBooking({
                bookingTime: detailBooking.bookingTime,
                employee: detailBooking.employee?.id,
                endTime: detailBooking.endTime,
            });
        };
    }, [detailBooking]);

    const onUpdateBooking = async () => {
        await setSubmittedTime(Date.now());
        if (isValidData()) {
            await bookingService.updateBooking(
                param.id,
                {
                    bookingTime: convertDateBooking(dataBooking.bookingTime),
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
        <MainLayout breadcrumb={"Quản lý đặt lịch"} title={"Xem thông tin đặt lịch"} redirect={ROUTE_PATH.BOOKING}>
            <div className='main-page h-full flex-1 overflow-auto bg-white px-4 py-8'>
                <div className='bg-white scroll-auto'>
                    <Row>
                        <Col span={24} className='border-add'>
                            <div className='legend-title'>Thêm thông tin mới</div>
                            <Row gutter={[30, 0]}>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <InputDateBookingCommon
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
                                    <InputDateBookingCommon
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
                        <ButtonCommon onClick={onUpdateBooking} classColor="orange">Cập nhật</ButtonCommon>
                    </Col>
                </Row>
            </div >
            <FullPageLoading isLoading={loading} />
        </MainLayout >
    )
}

export default ViewBookingManagement