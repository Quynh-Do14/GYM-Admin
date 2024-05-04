import React, { useEffect, useState } from 'react'
import MainLayout from '../../infrastructure/common/layouts/MainLayout'
import { Col, Row } from 'antd';
import { ROUTE_PATH } from '../../core/common/appRouter';
import InputTextCommon from '../../infrastructure/common/components/input/input-text';
import { ButtonCommon } from '../../infrastructure/common/components/button/button-common';
import { FullPageLoading } from '../../infrastructure/common/components/controls/loading';
import { useNavigate, useParams } from 'react-router-dom';
import { WarningMessage } from '../../infrastructure/common/components/toast/notificationToast';
import positionService from '../../infrastructure/repositories/position/service/position.service';

const ViewPositionManagement = () => {
    const [validate, setValidate] = useState({});
    const [loading, setLoading] = useState(false);
    const [submittedTime, setSubmittedTime] = useState();
    const [detailPosition, setDetailPosition] = useState({});

    const [_data, _setData] = useState({});
    const dataPosition = _data;
    const setDataPosition = (data) => {
        Object.assign(dataPosition, { ...data });
        _setData({ ...dataPosition });
    };

    const param = useParams();

    const navigate = useNavigate();

    const onBack = () => {
        navigate(ROUTE_PATH.POSITION)
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

    const onGetPositionByIdAsync = async () => {
        try {
            await positionService.getPositionById(
                param.id,
                setLoading
            ).then((res) => {
                setDetailPosition(res)
            })
        }
        catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        onGetPositionByIdAsync().then(() => { })
    }, [])
    useEffect(() => {
        if (detailPosition) {
            setDataPosition({
                name: detailPosition.name,
            });
        };
    }, [detailPosition]);
    const onUpdatePosition = async () => {
        await setSubmittedTime(Date.now());
        if (isValidData()) {
            await positionService.updatePosition(
                param.id,
                {
                    name: dataPosition.name,
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
        <MainLayout breadcrumb={"Quản lý vị trí"} title={"Xem thông tin vị trí"} redirect={ROUTE_PATH.POSITION}>
            <div className='main-page h-100 flex-1 auto bg-white px-4 py-8'>
                <div className='bg-white scroll-auto'>
                    <Row>
                        <Col span={24} className='border-add'>
                            <div className='legend-title'>Cập nhật thông tin</div>
                            <Row gutter={[30, 0]}>
                                <Col span={24}>
                                    <InputTextCommon
                                        label={"Tên chức vụ"}
                                        attribute={"name"}
                                        isRequired={true}
                                        dataAttribute={dataPosition.name}
                                        setData={setDataPosition}
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
                        <ButtonCommon onClick={onUpdatePosition} classColor="orange">Cập nhật</ButtonCommon>
                    </Col>
                </Row>
            </div >
            <FullPageLoading isLoading={loading} />
        </MainLayout >
    )
}

export default ViewPositionManagement