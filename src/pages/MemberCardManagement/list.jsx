import React, { useEffect, useState } from 'react'
import MainLayout from '../../infrastructure/common/layouts/MainLayout'
import { Col, Row, Table } from 'antd'
import { TitleTableCommon } from '../../infrastructure/common/components/text/title-table-common'
import { ActionCommon } from '../../infrastructure/common/components/action/action-common'

import Column from 'antd/es/table/Column'
import { InputSearchCommon } from '../../infrastructure/common/components/input/input-text-search'
import { ButtonCommon } from '../../infrastructure/common/components/button/button-common'
import { PlusOutlined } from '@ant-design/icons'
import { PaginationCommon } from '../../infrastructure/common/components/pagination/Pagination'
import { FullPageLoading } from '../../infrastructure/common/components/controls/loading'
import Constants from '../../core/common/constant'
import { ButtonFilterCommon } from '../../infrastructure/common/components/button/button-filter-common'
import { ROUTE_PATH } from '../../core/common/appRouter'
import { useNavigate } from 'react-router-dom';
import DialogConfirmCommon from '../../infrastructure/common/components/modal/dialogConfirm'
import memberCardService from '../../infrastructure/repositories/memberCard/service/memberCard.service'

let timeout
const ListMemberCardManagement = () => {
    const [listMemberCard, setDataMemberCard] = useState([])
    const [total, setTotal] = useState(0)
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [searchText, setSearchText] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [idSelected, setIdSelected] = useState(null);
    const [isDeleteModal, setIsDeleteModal] = useState(false);


    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onGetMemberCardAsync = async ({ name = "", size = pageSize, page = currentPage, startDate = "", endDate = "" }) => {
        const param = {
            page: page - 1,
            size: size,
            // name: name,
            // startDate: startDate,
            // endDate: endDate,
        }
        try {
            // await memberCardService.getMemberCard(
            //     param,
            //     setLoading
            // ).then((res) => {
            //     setDataMemberCard(res.content)
            //     setTotal(res.totalElements)
            // })
        }
        catch (error) {
            console.error(error)
        }
    }
    const onSearch = async (name = "", size = pageSize, page = 1, startDate = "", endDate = "") => {
        await onGetMemberCardAsync({ name: name, size: size, page: page, startDate: startDate, endDate: endDate });
    };

    const onChangeSearchText = (e) => {
        setSearchText(e.target.value);
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            onSearch(e.target.value, pageSize, currentPage, startDate, endDate).then((_) => { });
        }, Constants.DEBOUNCE_SEARCH);
    };

    useEffect(() => {
        onSearch().then(_ => { });
    }, [])
    const onChangePage = async (value) => {
        setCurrentPage(value)
        await onSearch(searchText, pageSize, value, startDate, endDate).then(_ => { });
    }
    const onPageSizeChanged = async (value) => {
        setPageSize(value)
        setCurrentPage(1)
        await onSearch(searchText, value, 1, startDate, endDate).then(_ => { });
    }

    const onOpenModalDelete = (id) => {
        setIsDeleteModal(true);
        setIdSelected(id)
    };

    const onCloseModalDelete = () => {
        setIsDeleteModal(false);
    };
    const onDeleteMemberCard = async () => {
        setIsDeleteModal(false);
        try {
            await memberCardService.deleteMemberCard(
                idSelected,
                setLoading
            ).then((res) => {
                if (res) {
                    onSearch().then(() => { })
                }
            })
        }
        catch (error) {
            console.error(error)
        }
    }
    const onNavigate = (id) => {
        navigate(`${(ROUTE_PATH.VIEW_MEMBER_CARD).replace(`${Constants.UseParams.Id}`, "")}${id}`);
    }
    return (
        <MainLayout breadcrumb={"Quản lý thẻ thành viên"} title={"Danh sách thẻ thành viên"} redirect={""}>
            <div className='flex flex-col header-page'>
                <Row className='filter-page mb-2 py-2-5' gutter={[10, 10]} justify={"space-between"} align={"middle"}>
                    <Col xs={24} sm={24} lg={16}>
                        <Row align={"middle"} gutter={[10, 10]}>
                            <Col xs={24} sm={12} lg={8}>
                                <InputSearchCommon
                                    placeholder="Tìm kiếm theo tên..."
                                    value={searchText}
                                    onChange={onChangeSearchText}
                                    disabled={false}
                                />
                            </Col>
                            <Col xs={24} sm={8} lg={4}>
                                <ButtonFilterCommon icon={""} classColor="blue" onClick={() => { }} >Tìm kiếm</ButtonFilterCommon>
                            </Col>
                        </Row>

                    </Col>
                    <Col>
                        <ButtonCommon icon={<PlusOutlined />} classColor="orange" onClick={() => navigate(ROUTE_PATH.ADD_MEMBER_CARD)} >Thêm mới</ButtonCommon>
                    </Col>
                </Row>
            </div>
            <div className='flex-1 overflow-auto bg-[#FFFFFF] content-page'>
                <Table
                    dataSource={listMemberCard}
                    pagination={false}
                    className='table-common'
                >
                    <Column
                        title={"STT"}
                        dataIndex="stt"
                        key="stt"
                        width={"5%"}
                        render={(val, record, index) => (
                            <div style={{ textAlign: "center" }}>
                                {index + 1 + pageSize * (currentPage - 1)}
                            </div>
                        )}
                    />
                    <Column
                        title={
                            <TitleTableCommon
                                title="Thẻ thành viên"
                            />
                        }
                        key={"id"}
                        dataIndex={"id"}
                    />
                    <Column
                        title={
                            <TitleTableCommon
                                title="Ngày bắt đầu"
                            />
                        }
                        key={"startDay"}
                        dataIndex={"startDay"}
                    />
                    <Column
                        title={
                            <TitleTableCommon
                                title="Ngày kết thúc"
                            />
                        }
                        key={"endDay"}
                        dataIndex={"endDay"}
                    />
                    <Column
                        title={
                            <TitleTableCommon
                                title="Thao tác"
                                width={"60px"}
                            />
                        }
                        width={"60px"}
                        fixed="right"
                        align='center'
                        render={(action, record) => (
                            // <Space
                            //     size="small"
                            // >
                            //     <Dropdown
                            //         trigger={["hover"]}
                            //         placement="bottomRight"
                            //         overlay={listAction(record)}
                            //     >
                            //         <MenuOutlined className="pointer" />
                            //     </Dropdown>
                            // </Space>
                            <ActionCommon
                                onClickDetail={() => onNavigate(record.id)}
                                onClickDelete={() => onOpenModalDelete(record.id)}
                            />
                        )}
                    />
                </Table>
            </div>
            <div className='flex flex-col'>
                <PaginationCommon
                    total={total}
                    currentPage={currentPage}
                    onChangePage={onChangePage}
                    pageSize={pageSize}
                    onChangeSize={onPageSizeChanged}
                    disabled={false}
                />
            </div>
            <DialogConfirmCommon
                message={"Bạn có muốn xóa thẻ thành viên này ra khỏi hệ thống"}
                titleCancel={"Bỏ qua"}
                titleOk={"Xóa thẻ thành viên"}
                visible={isDeleteModal}
                handleCancel={onCloseModalDelete}
                handleOk={onDeleteMemberCard}
                title={"Xác nhận"}
            />
            <FullPageLoading isLoading={loading} />
        </MainLayout >
    )
}

export default ListMemberCardManagement