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
import branchService from '../../infrastructure/repositories/branch/service/branch.service';
import InputMultiEquipmentCommon from '../../infrastructure/common/components/input/select-multi-equipment';
import InputSectArrayCommon from '../../infrastructure/common/components/input/input-array/select-multi-room';
import { DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons';
import InputNumberArrayCommon from '../../infrastructure/common/components/input/input-array/input-number';
import InputSelectEmployeeByPositionCommon from '../../infrastructure/common/components/input/select-employee-by-position';
import UploadAvatar from '../../infrastructure/common/components/input/upload-file';
import InputTextAreaCommon from '../../infrastructure/common/components/input/input-text-area';

const AddBranchManagement = () => {
    const [validate, setValidate] = useState({});
    const [loading, setLoading] = useState(false);
    const [submittedTime, setSubmittedTime] = useState();
    const [imageUrl, setImageUrl] = useState(null);
    const [avatar, setAvatar] = useState(null);

    const [listRoom, setListRoom] = useState([
        {
            index: 0,
            roomId: null,
            amount: null
        }
    ])

    const [_data, _setData] = useState({});
    const dataBranch = _data;

    const navigate = useNavigate();

    const onBack = () => {
        navigate(ROUTE_PATH.BRANCH)
    };
    const setDataBranch = (data) => {
        Object.assign(dataBranch, { ...data });
        _setData({ ...dataBranch });
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
    const onAddBranch = async () => {
        const gymBranch_RoomDTO = {
            branchGymName: dataBranch.branchGymName,
            address: dataBranch.address,
            description: dataBranch.description,
            manager: {
                id: Number(dataBranch.manager)
            },
            roomAndAmounts: convertListRoom()
        }
        await setSubmittedTime(Date.now());
        if (isValidData()) {
            await branchService.addBranch({
                file: avatar,
                gymBranch_RoomDTO: JSON.stringify(gymBranch_RoomDTO)
            },
                onBack,
                setLoading
            )
        }
        else {
            WarningMessage("Nhập thiếu thông tin", "Vui lòng nhập đầy đủ thông tin")
        };
    };

    const onAddRoom = () => {
        setListRoom([
            ...listRoom,
            {
                index: Number(listRoom.length - 1) + 1,
                roomId: "",
                amount: 0
            },
        ])
    }

    const onDeleteOption = (index) => {
        const spliceOption = [...listRoom];
        spliceOption.splice(index, 1)
        setListRoom(spliceOption)
    }
    const convertListRoom = () => {
        const arr = listRoom.map((it) => {
            return {
                room: {
                    id: it.roomId
                },
                amount: it.amount
            }
        })
        return arr
    }

    return (
        <MainLayout breadcrumb={"Quản lý chi nhánh"} title={"Thêm chi nhánh"} redirect={ROUTE_PATH.BRANCH}>
            <div className='main-page h-full flex-1 overflow-auto bg-white px-4 py-8'>
                <div className='bg-white scroll-auto'>
                    <Row>
                        <Col xs={24} sm={24} md={12} lg={8} xl={6} xxl={5} className='border-add flex justify-center'>
                            <div className='legend-title'>Thêm mới ảnh</div>
                            <UploadAvatar
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
                                        label={"Tên chi nhánh"}
                                        attribute={"branchGymName"}
                                        isRequired={true}
                                        dataAttribute={dataBranch.branchGymName}
                                        setData={setDataBranch}
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
                                        dataAttribute={dataBranch.address}
                                        setData={setDataBranch}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <InputSelectEmployeeByPositionCommon
                                        label={"Quản lý"}
                                        attribute={"manager"}
                                        isRequired={true}
                                        dataAttribute={dataBranch.manager}
                                        setData={setDataBranch}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                        disabledToDate={false}
                                    />
                                </Col>
                                <Col span={24}>
                                    <InputTextAreaCommon
                                        label={"Mô tả"}
                                        attribute={"description"}
                                        isRequired={true}
                                        dataAttribute={dataBranch.description}
                                        setData={setDataBranch}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>
                                <Col span={24}>
                                    <div
                                        className='flex gap-2 items-center cursor-pointer bg-[#e1e1e1] p-2 rounded-[4px]'
                                        onClick={onAddRoom}
                                    >
                                        <div className='text-[#094174] font-semibold text-[15px] '>Thêm phòng </div>
                                        <PlusCircleOutlined className='text-[20px]' />
                                    </div>
                                    {
                                        listRoom.length ?
                                            listRoom.map((it, index) => {
                                                return (
                                                    <div key={index}>
                                                        <div className='flex gap-2 items-center justify-between'>
                                                            <div
                                                                className='text-[#094174] 
                                                                font-semibold text-[15px] py-2'
                                                            >
                                                                Phòng {index + 1}
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
                                                                <InputSectArrayCommon
                                                                    dataAttribute={it.roomId}
                                                                    label={"Phòng"}
                                                                    attribute={"roomId"}
                                                                    isRequired={true}
                                                                    data={listRoom}
                                                                    setData={setListRoom}
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
                                                                    data={listRoom}
                                                                    setData={setListRoom}
                                                                    disabled={false}
                                                                    validate={validate}
                                                                    setValidate={setValidate}
                                                                    submittedTime={submittedTime}
                                                                    index={index}
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
                        <ButtonCommon onClick={onAddBranch} classColor="orange">Thêm mới</ButtonCommon>
                    </Col>
                </Row>
            </div >
            <FullPageLoading isLoading={loading} />
        </MainLayout >
    )
}

export default AddBranchManagement