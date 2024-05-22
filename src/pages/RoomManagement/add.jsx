import React, { useState } from 'react'
import MainLayout from '../../infrastructure/common/layouts/MainLayout'
import { Col, Row } from 'antd';
import { ROUTE_PATH } from '../../core/common/appRouter';
import InputTextCommon from '../../infrastructure/common/components/input/input-text';
import { ButtonCommon } from '../../infrastructure/common/components/button/button-common';
import { FullPageLoading } from '../../infrastructure/common/components/controls/loading';
import { useNavigate } from 'react-router-dom';
import { WarningMessage } from '../../infrastructure/common/components/toast/notificationToast';
import roomService from '../../infrastructure/repositories/room/service/room.service';
import InputNumberArrayCommon from '../../infrastructure/common/components/input/input-array/input-number';
import InputSelectEquipmentArrayCommon from '../../infrastructure/common/components/input/input-array/select-multi-equipment';
import { DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons';

const AddRoomManagement = () => {
    const [validate, setValidate] = useState({});
    const [loading, setLoading] = useState(false);
    const [submittedTime, setSubmittedTime] = useState();

    const [listEquipment, setListEquipment] = useState([
        {
            index: 0,
            equipmentId: null,
            amount: null
        }

    ])

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
    const onAddRoomAsync = async () => {
        await setSubmittedTime(Date.now());
        if (isValidData()) {
            await roomService.addRoom({
                name: dataRoom.name,
                equipmentAmounts: convertListEquipment()
            },
                onBack,
                setLoading
            )
        }
        else {
            WarningMessage("Nhập thiếu thông tin", "Vui lòng nhập đầy đủ thông tin")
        };
    };

    const onAddEquipment = () => {
        setListEquipment([
            ...listEquipment,
            {
                index: Number(listEquipment.length - 1) + 1,
                equipmentId: "",
                amount: 0
            },
        ])
    }

    const onDeleteOption = (index) => {
        const spliceOption = [...listEquipment];
        spliceOption.splice(index, 1)
        setListEquipment(spliceOption)
    }
    const convertListEquipment = () => {
        const arr = listEquipment.map((it) => {
            return {
                equipment: {
                    id: it.equipmentId
                },
                amount: it.amount
            }
        })
        return arr
    }


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
                                    <div
                                        className='flex gap-2 items-center cursor-pointer bg-[#e1e1e1] p-2 rounded-[4px]'
                                        onClick={onAddEquipment}
                                    >
                                        <div className='text-[#094174] font-semibold text-[15px] '>Thêm thiết bị </div>
                                        <PlusCircleOutlined className='text-[20px]' />
                                    </div>
                                    {
                                        listEquipment && listEquipment.length ?
                                            listEquipment.map((it, index) => {
                                                return (
                                                    <div key={index}>
                                                        <div className='flex gap-2 items-center justify-between'>
                                                            <div
                                                                className='text-[#094174] 
                                                                font-semibold text-[15px] py-2'
                                                            >
                                                                Thiết bị {index + 1}
                                                            </div>
                                                            <button
                                                                disabled={Number(index) == 0 ? true : false}
                                                                onClick={() => onDeleteOption(index)}

                                                            >
                                                                <DeleteOutlined
                                                                    className={`${Number(index) == 0 ? "cursor-not-allowed" : "cursor-pointer"} text-[24px]`}
                                                                />
                                                            </button>
                                                        </div>
                                                        <Row gutter={[30, 0]}>
                                                            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                                                <InputSelectEquipmentArrayCommon
                                                                    dataAttribute={it.equipmentId}
                                                                    label={"Thiết bị"}
                                                                    attribute={"equipmentId"}
                                                                    isRequired={true}
                                                                    data={listEquipment}
                                                                    setData={setListEquipment}
                                                                    disabled={false}
                                                                    validate={validate}
                                                                    setValidate={setValidate}
                                                                    submittedTime={submittedTime}
                                                                    index={index}
                                                                />
                                                            </Col>
                                                            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                                                <InputNumberArrayCommon
                                                                    dataAttribute={it.amount}
                                                                    label={"Số lượng"}
                                                                    attribute={"amount"}
                                                                    isRequired={true}
                                                                    data={listEquipment}
                                                                    setData={setListEquipment}
                                                                    disabled={false}
                                                                    validate={validate}
                                                                    setValidate={setValidate}
                                                                    submittedTime={submittedTime} index={index}
                                                                />
                                                            </Col>
                                                        </Row>
                                                    </div>

                                                )
                                            })
                                            :
                                            null
                                    }
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
                        <ButtonCommon onClick={onAddRoomAsync} classColor="orange">Thêm mới</ButtonCommon>
                    </Col>
                </Row>
            </div >
            <FullPageLoading isLoading={loading} />
        </MainLayout >
    )
}

export default AddRoomManagement