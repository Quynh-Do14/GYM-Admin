import React, { useEffect, useState } from 'react'
import MainLayout from '../../infrastructure/common/layouts/MainLayout'
import { Col, Row } from 'antd';
import { ROUTE_PATH } from '../../core/common/appRouter';
import InputTextCommon from '../../infrastructure/common/components/input/input-text';
import { ButtonCommon } from '../../infrastructure/common/components/button/button-common';
import { FullPageLoading } from '../../infrastructure/common/components/controls/loading';
import { useNavigate, useParams } from 'react-router-dom';
import { WarningMessage } from '../../infrastructure/common/components/toast/notificationToast';
import equipTypeService from '../../infrastructure/repositories/equip-type/service/equip-type.service';

const ViewEquipTypeManagement = () => {
    const [validate, setValidate] = useState({});
    const [loading, setLoading] = useState(false);
    const [submittedTime, setSubmittedTime] = useState();
    const [detailEquipType, setDetailEquipType] = useState({});

    const [_data, _setData] = useState({});
    const dataEquipType = _data;
    const setDataEquipType = (data) => {
        Object.assign(dataEquipType, { ...data });
        _setData({ ...dataEquipType });
    };

    const param = useParams();

    const navigate = useNavigate();

    const onBack = () => {
        navigate(ROUTE_PATH.EQUIP_TYPE)
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

    const onGetEquipTypeByIdAsync = async () => {
        try {
            await equipTypeService.getEquipTypeById(
                param.id,
                setLoading
            ).then((res) => {
                setDetailEquipType(res)
            })
        }
        catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        onGetEquipTypeByIdAsync().then(() => { })
    }, [])
    useEffect(() => {
        if (detailEquipType) {
            setDataEquipType({
                name: detailEquipType.name,
            });
        };
    }, [detailEquipType]);
    const onUpdateEquipType = async () => {
        await setSubmittedTime(Date.now());
        if (isValidData()) {
            await equipTypeService.updateEquipType(
                param.id,
                {
                    name: dataEquipType.name,
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
        <MainLayout breadcrumb={"Quản lý loại thiết bị"} title={"Xem thông tin loại thiết bị"} redirect={ROUTE_PATH.EQUIP_TYPE}>
            <div className='main-page h-100 flex-1 auto bg-white px-4 py-8'>
                <div className='bg-white scroll-auto'>
                    <Row>
                        <Col span={24} className='border-add'>
                            <div className='legend-title'>Cập nhật thông tin</div>
                            <Row gutter={[30, 0]}>
                                <Col span={24}>
                                    <InputTextCommon
                                        label={"Loại thiết bị"}
                                        attribute={"name"}
                                        isRequired={true}
                                        dataAttribute={dataEquipType.name}
                                        setData={setDataEquipType}
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
                        <ButtonCommon onClick={onUpdateEquipType} classColor="orange">Cập nhật</ButtonCommon>
                    </Col>
                </Row>
            </div >
            <FullPageLoading isLoading={loading} />
        </MainLayout >
    )
}

export default ViewEquipTypeManagement