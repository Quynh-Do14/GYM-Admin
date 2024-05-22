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
import branchService from '../../infrastructure/repositories/branch/service/branch.service';
import InputMultiEquipmentCommon from '../../infrastructure/common/components/input/select-multi-equipment';
import roomService from '../../infrastructure/repositories/room/service/room.service';

const ViewRoomManagement = () => {
    const [validate, setValidate] = useState({});
    const [loading, setLoading] = useState(false);
    const [submittedTime, setSubmittedTime] = useState();
    const [detailRoom, setDetailRoom] = useState({});

    const [_data, _setData] = useState({});
    const dataRoom = _data;
    const setDataRoom = (data) => {
        Object.assign(dataRoom, { ...data });
        _setData({ ...dataRoom });
    };

    const param = useParams();

    const navigate = useNavigate();

    const onBack = () => {
        navigate(ROUTE_PATH.BRANCH)
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

    const onGetRoomByIdAsync = async () => {
        try {
            await roomService.getRoomById(
                param.id,
                setLoading
            ).then((res) => {
                setDetailRoom(res)
            })
        }
        catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        onGetRoomByIdAsync().then(() => { })
    }, [])

    useEffect(() => {
        if (detailRoom) {
            setDataRoom({
                name: detailRoom.name,
            });
        };
    }, [detailRoom]);

    const onUpdateRoom = async () => {
        await setSubmittedTime(Date.now());
        if (isValidData()) {
            await roomService.updateRoom(
                param.id,
                {
                    name: dataRoom.name,
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
        <MainLayout breadcrumb={"Quản lý chi nhánh"} title={"Xem thông tin chi nhánh"} redirect={ROUTE_PATH.BRANCH}>
            <div className='main-page h-full flex-1 overflow-auto bg-white px-4 py-8'>
                <div className='bg-white scroll-auto'>
                    <Row>
                        <Col xs={24} sm={24} md={12} lg={16} xl={18} xxl={19} className='border-add'>
                            <div className='legend-title'>Cập nhật thông tin</div>
                            <Row gutter={[30, 0]}>
                                <Col span={24}>
                                    <InputTextCommon
                                        label={"Tên phòng"}
                                        attribute={"name"}
                                        isRequired={true}
                                        dataAttribute={dataRoom.name}
                                        setData={setDataRoom}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>
                                <Col span={24}>
                                    <InputMultiEquipmentCommon
                                        label={"Thiết bị"}
                                        attribute={"equipmentAmounts"}
                                        isRequired={true}
                                        dataAttribute={dataRoom.equipmentAmounts}
                                        setData={setDataRoom}
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
                        <ButtonCommon onClick={onUpdateRoom} classColor="orange">Cập nhật</ButtonCommon>
                    </Col>
                </Row>
            </div >
            <FullPageLoading isLoading={loading} />
        </MainLayout >
    )
}

export default ViewRoomManagement