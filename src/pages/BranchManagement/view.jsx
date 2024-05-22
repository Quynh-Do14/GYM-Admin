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
import InputSectArrayCommon from '../../infrastructure/common/components/input/input-array/select-multi-room';
import InputNumberArrayCommon from '../../infrastructure/common/components/input/input-array/input-number';
import { DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons';
import InputSelectEmployeeByPositionCommon from '../../infrastructure/common/components/input/select-employee-by-position';

const ViewBranchManagement = () => {
    const [validate, setValidate] = useState({});
    const [loading, setLoading] = useState(false);
    const [submittedTime, setSubmittedTime] = useState();
    const [detailBranch, setDetailBranch] = useState({});

    const [listRoom, setListRoom] = useState([
        {
            index: 0,
            roomId: null,
            amount: null
        }

    ])

    const [_data, _setData] = useState({});
    const dataBranch = _data;
    const setDataBranch = (data) => {
        Object.assign(dataBranch, { ...data });
        _setData({ ...dataBranch });
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

    const onGetEmployeeByIdAsync = async () => {
        try {
            await branchService.getBranchById(
                param.id,
                setLoading
            ).then((res) => {
                setDetailBranch(res)
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
        if (detailBranch) {
            setDataBranch({
                branchGymName: detailBranch.branchGymName,
                address: detailBranch.address,
                manager: detailBranch?.manager?.id
            });
            const newArr = detailBranch.roomAndAmounts?.map((it) => {
                return {
                    roomId: it.room?.id,
                    amount: it.amount,
                }

            })
            setListRoom(newArr)
        };
    }, [detailBranch]);

    const onUpdateEmployee = async () => {
        await setSubmittedTime(Date.now());
        if (isValidData()) {
            await branchService.updateBranch(
                param.id,
                {
                    branchGymName: dataBranch.branchGymName,
                    address: dataBranch.address,
                    manager: {
                        id: Number(dataBranch.manager)
                    },
                    roomAndAmounts: convertListRoom()
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
        <MainLayout breadcrumb={"Quản lý chi nhánh"} title={"Xem thông tin chi nhánh"} redirect={ROUTE_PATH.BRANCH}>
            <div className='main-page h-full flex-1 overflow-auto bg-white px-4 py-8'>
                <div className='bg-white scroll-auto'>
                    <Row>
                        <Col span={24} className='border-add'>
                            <div className='legend-title'>Cập nhật thông tin</div>
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
                                    <div
                                        className='flex gap-2 items-center cursor-pointer bg-[#e1e1e1] p-2 rounded-[4px]'
                                        onClick={onAddRoom}
                                    >
                                        <div className='text-[#094174] font-semibold text-[15px] '>Thêm phòng </div>
                                        <PlusCircleOutlined className='text-[20px]' />
                                    </div>
                                    {
                                        listRoom && listRoom.length ?
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

export default ViewBranchManagement