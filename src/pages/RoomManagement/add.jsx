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
import branchService from '../../infrastructure/repositories/branch/service/branch.service';
import InputMultiEquipmentCommon from '../../infrastructure/common/components/input/select-multi-equipment';
import roomService from '../../infrastructure/repositories/room/service/room.service';

const AddRoomManagement = () => {
    const [validate, setValidate] = useState({});
    const [loading, setLoading] = useState(false);
    const [submittedTime, setSubmittedTime] = useState();
    const [imageUrl, setImageUrl] = useState(null);
    const [avatar, setAvatar] = useState(null);

    const [_data, _setData] = useState({});
    const dataRoom = _data;

    const navigate = useNavigate();

    const onBack = () => {
        navigate(ROUTE_PATH.ROOM)
    };
    const setDataRoom = (data) => {
        Object.assign(dataRoom, { ...data });
        _setData({ ...dataRoom });
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
    const onAddRoom = async () => {
        await setSubmittedTime(Date.now());
        if (isValidData()) {
            await roomService.addRoom({
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
        <MainLayout breadcrumb={"Quản lý phòng"} title={"Thêm phòng"} redirect={ROUTE_PATH.ROOM}>
            <div className='main-page h-full flex-1 overflow-auto bg-white px-4 py-8'>
                <div className='bg-white scroll-auto'>
                    <Row>
                        <Col span={24} className='border-add'>
                            <div className='legend-title'>Thêm thông tin mới</div>
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
            <div className='container-btn main-page bg-white p-4 flex flex-col'>
                <Row justify={"center"}>
                    <Col className='mx-1'>
                        <ButtonCommon onClick={onBack} classColor="blue">Quay lại</ButtonCommon>
                    </Col>
                    <Col className='mx-1'>
                        <ButtonCommon onClick={onAddRoom} classColor="orange">Thêm mới</ButtonCommon>
                    </Col>
                </Row>
            </div >
            <FullPageLoading isLoading={loading} />
        </MainLayout >
    )
}

export default AddRoomManagement