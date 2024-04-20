import { Breadcrumb } from 'antd';
import React from 'react'
import "../../../assets/styles/components/breadcumb.css"
import { useNavigate } from 'react-router-dom';
import { RightOutlined, CaretRightOutlined, PlusOutlined } from '@ant-design/icons';

export const BreadcrumbCommon = (props) => {
  const { title, breadcrumb, redirect } = props;
  const navigate = useNavigate();
  const onNavigate = () => {
    navigate(redirect);
  }
  return (
    <div>
      <div className='breadcumb-container py-3 flex justify-between align-center'>
        <div>
          <div className='page-name mb-4'>{title} </div>
          <Breadcrumb separator={<CaretRightOutlined />} className='flex align-center'>
            <Breadcrumb.Item
              onClick={onNavigate}
              className='breadcumb cursor-pointer'>{breadcrumb}</Breadcrumb.Item>
            <Breadcrumb.Item className='breadcumb-title'>{title}</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
    </div>
  )
}
