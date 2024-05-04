import React, { useEffect, useState } from 'react'
import MainLayout from '../../infrastructure/common/layouts/MainLayout'
import { Col, Row } from 'antd';
import { ROUTE_PATH } from '../../core/common/appRouter';
import InputTextCommon from '../../infrastructure/common/components/input/input-text';
import { ButtonCommon } from '../../infrastructure/common/components/button/button-common';
import { FullPageLoading } from '../../infrastructure/common/components/controls/loading';
import { useNavigate, useParams } from 'react-router-dom';
import { WarningMessage } from '../../infrastructure/common/components/toast/notificationToast';
import InputDateCommon from '../../infrastructure/common/components/input/input-date';
import memberCardService from '../../infrastructure/repositories/memberCard/service/memberCard.service';

const ViewMemberCardManagement = () => {
    const [validate, setValidate] = useState({});
    const [loading, setLoading] = useState(false);
    const [submittedTime, setSubmittedTime] = useState();
    const [detailMemberCard, setDetailMemberCard] = useState({});

    const [_data, _setData] = useState({});
    const dataMemberCard = _data;
    const setDataMemberCard = (data) => {
        Object.assign(dataMemberCard, { ...data });
        _setData({ ...dataMemberCard });
    };

    const param = useParams();

    const navigate = useNavigate();

    const onBack = () => {
        navigate(ROUTE_PATH.MEMBER_CARD)
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

    const onGetMemberByIdAsync = async () => {
        try {
            await memberCardService.getMemberCardById(
                param.id,
                setLoading
            ).then((res) => {
                setDetailMemberCard(res)
            })
        }
        catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        onGetMemberByIdAsync().then(() => { })
    }, [])
    useEffect(() => {
        if (detailMemberCard) {
            setDataMemberCard({
                name: detailMemberCard.name,
            });
        };
    }, [detailMemberCard]);
    const onUpdateMember = async () => {
        await setSubmittedTime(Date.now());
        if (isValidData()) {
            await memberCardService.updateMemberCard(
                param.id,
                {
                    name: dataMemberCard.name,
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
        <MainLayout breadcrumb={"Quản lý thẻ thành viên"} title={"Xem thông tin thẻ thành viên"} redirect={ROUTE_PATH.MEMBER_CARD}>
            <div className='main-page h-100 flex-1 auto bg-white px-4 py-8'>
                <div className='bg-white scroll-auto'>
                    <Row>
                        <Col span={24} className='border-add'>
                            <div className='legend-title'>Cập nhật thông tin</div>
                            <Row gutter={[30, 0]}>
                                <Col span={24}>
                                    <InputTextCommon
                                        label={"Tên thẻ thành viên"}
                                        attribute={"name"}
                                        isRequired={true}
                                        dataAttribute={dataMemberCard.name}
                                        setData={setDataMemberCard}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <InputDateCommon
                                        label={"Ngày bắt đầu"}
                                        attribute={"startDay"}
                                        isRequired={true}
                                        dataAttribute={dataMemberCard.startDay}
                                        setData={setDataMemberCard}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <InputDateCommon
                                        label={"Ngày kết thúc"}
                                        attribute={"endDay"}
                                        isRequired={true}
                                        dataAttribute={dataMemberCard.endDay}
                                        setData={setDataMemberCard}
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
                        <ButtonCommon onClick={onUpdateMember} classColor="orange">Cập nhật</ButtonCommon>
                    </Col>
                </Row>
            </div >
            <FullPageLoading isLoading={loading} />
        </MainLayout >
    )
}

export default ViewMemberCardManagement