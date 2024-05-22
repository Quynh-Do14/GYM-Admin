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
import { convertDateOnly, genderConfig } from '../../infrastructure/helper/helper'
import { FullPageLoading } from '../../infrastructure/common/components/controls/loading'
import Constants from '../../core/common/constant'
import { ButtonFilterCommon } from '../../infrastructure/common/components/button/button-filter-common'
import { ROUTE_PATH } from '../../core/common/appRouter'
import { useNavigate } from 'react-router-dom';
import DialogConfirmCommon from '../../infrastructure/common/components/modal/dialogConfirm'
import branchService from '../../infrastructure/repositories/branch/service/branch.service'

let timeout
const ListBranchManagement = () => {
    const [listEmployee, setListEmployee] = useState([])
    const [total, setTotal] = useState(0)
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [searchText, setSearchText] = useState("");
    const [searchAddress, setSearchAddress] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [idSelected, setIdSelected] = useState(null);
    const [isDeleteModal, setIsDeleteModal] = useState(false);


    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onGetBranchAsync = async ({ name = "", address = "", size = pageSize, page = currentPage }) => {
        const param = {
            page: page - 1,
            address: address,
            size: size,
            name: name,
        }
        try {
            await branchService.getBranch(
                param,
                setLoading
            ).then((res) => {
                setListEmployee(res.content)
                setTotal(res.totalElements)
            })
        }
        catch (error) {
            console.error(error)
        }
    }

    const onSearch = async (name = "", address = "", size = pageSize, page = 1,) => {
        await onGetBranchAsync({ name: name, address: address, size: size, page: page });
    };

    const onChangeSearchText = (e) => {
        setSearchText(e.target.value);
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            onSearch(e.target.value, searchAddress, pageSize, currentPage).then((_) => { });
        }, Constants.DEBOUNCE_SEARCH);
    };

    const onChangeSearchAddress = (e) => {
        setSearchAddress(e.target.value);
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            onSearch(searchText, e.target.value, pageSize, currentPage).then((_) => { });
        }, Constants.DEBOUNCE_SEARCH);
    };


    useEffect(() => {
        onSearch().then(_ => { });
    }, [])
    const onChangePage = async (value) => {
        setCurrentPage(value)
        await onSearch(searchText, searchAddress, pageSize, value).then(_ => { });
    }
    const onPageSizeChanged = async (value) => {
        setPageSize(value)
        setCurrentPage(1)
        await onSearch(searchText, searchAddress, value, 1).then(_ => { });
    }

    const onOpenModalDelete = (id) => {
        setIsDeleteModal(true);
        setIdSelected(id)
    };

    const onCloseModalDelete = () => {
        setIsDeleteModal(false);
    };
    const onDeleteBranch = async () => {
        setIsDeleteModal(false);
        try {
            await branchService.deleteBranch(
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
        navigate(`${(ROUTE_PATH.VIEW_BRANCH).replace(`${Constants.UseParams.Id}`, "")}${id}`);
    }
    return (
        <MainLayout breadcrumb={"Quản lý chi nhánh"} title={"Danh sách chi nhánh"} redirect={""}>
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
                            <Col xs={24} sm={12} lg={8}>
                                <InputSearchCommon
                                    placeholder="Tìm kiếm theo địa chỉ..."
                                    value={searchAddress}
                                    onChange={onChangeSearchAddress}
                                    disabled={false}
                                />
                            </Col>
                        </Row>

                    </Col>
                    <Col>
                        <ButtonCommon icon={<PlusOutlined />} classColor="orange" onClick={() => navigate(ROUTE_PATH.ADD_BRANCH)} >Thêm mới</ButtonCommon>
                    </Col>
                </Row>
            </div>
            <div className='flex-1 overflow-auto bg-[#FFFFFF] content-page'>
                <Table
                    dataSource={listEmployee}
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
                                title="Tên chi nhánh"
                                width="300px"
                            />
                        }
                        key={"name"}
                        dataIndex={"name"}
                    />
                    <Column
                        title={
                            <TitleTableCommon
                                title="Địa chỉ"
                                width="300px"
                            />
                        }
                        key={"address"}
                        dataIndex={"address"}
                    />
                    <Column
                        title={
                            <TitleTableCommon
                                title="Quản lý"
                                width="200px"
                            />
                        }
                        key={"manager"}
                        dataIndex={"manager"}
                        render={(val) => {
                            return (
                                <div>{val.name} </div>
                            )
                        }}
                    />
                    <Column
                        title={
                            <TitleTableCommon
                                title="SĐT quản lý"
                                width="100px"
                            />
                        }
                        key={"manager"}
                        dataIndex={"manager"}
                        render={(val) => {
                            return (
                                <div>{val.phone} </div>
                            )
                        }}
                    />
                    <Column
                        title={
                            <TitleTableCommon
                                title="Thao tác"
                                width={"60px"}
                            />
                        }
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
                message={"Bạn có muốn xóa chi nhánh này ra khỏi hệ thống"}
                titleCancel={"Bỏ qua"}
                titleOk={"Xóa chi nhánh"}
                visible={isDeleteModal}
                handleCancel={onCloseModalDelete}
                handleOk={onDeleteBranch}
                title={"Xác nhận"}
            />
            <FullPageLoading isLoading={loading} />
        </MainLayout >
    )
}

export default ListBranchManagement