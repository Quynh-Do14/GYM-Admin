import { Col, Modal, Row } from 'antd';
import InputTextCommon from '../components/input/input-text';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../repositories/auth/service/auth.service';
import { WarningMessage } from '../components/toast/notificationToast';
import { ButtonCommon } from '../components/button/button-common';
import { useRecoilState, useRecoilValue } from 'recoil';
import { ProfileState } from '../../../core/atoms/profile/profileState';
import { arrayBufferToBase64 } from '../../helper/helper';
import UploadAvatar from '../components/input/upload-file';

const ProfileModal = (props) => {
  const { handleCancel, visible, isLoading } = props;
  const [validate, setValidate] = useState({});
  const [submittedTime, setSubmittedTime] = useState();
  const [detailProfile, setDetailProfile] = useState({});

  const [imageUrl, setImageUrl] = useState(null);
  const [avatar, setAvatar] = useState(null);

  const [_data, _setData] = useState({});
  const dataProfile = _data;

  const setDataProfile = (data) => {
    Object.assign(dataProfile, { ...data });
    _setData({ ...dataProfile });
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

  const onGetUserByIdAsync = async () => {
    try {
      await authService.profile(
        isLoading
      ).then((response) => {
        setDetailProfile(response)
      })
    }
    catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    onGetUserByIdAsync().then(() => { })
  }, [])

  const onGetUserAvatarsync = async () => {
    try {
      await authService.getAvatar(
        isLoading
      ).then((response) => {
        const base64String = arrayBufferToBase64(response);
        const imageSrc = `data:image/jpeg;base64,${base64String}`;
        setImageUrl(imageSrc)
      })
    }
    catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    onGetUserAvatarsync().then(() => { })
  }, [])
  useEffect(() => {
    if (detailProfile) {
      setDataProfile({
        avatar: detailProfile.image?.data,
        name: detailProfile.name,
        email: detailProfile.email,
        username: detailProfile.username,
        phone: detailProfile.phone,
      });
    }
  }, [detailProfile]);

  const onUpdateProfile = async () => {
    await setSubmittedTime(Date.now());
    if (isValidData()) {
      await authService.updateProfile(
        {
          file: avatar ? avatar : imageUrl,
          email: dataProfile.email,
          username: dataProfile.username,
          name: dataProfile.name,
          phone: dataProfile.phone,
        },
        () => {
          onGetUserByIdAsync();
          onGetUserAvatarsync();
          handleCancel();
        },
        isLoading
      )
    }
    else {
      WarningMessage("Nhập thiếu thông tin", "Vui lòng nhập đầy đủ thông tin")
    };
  };

  return (
    <Modal
      key={"f-0"}
      centered
      visible={visible}
      closable={false}
      footer={false}
      onCancel={() => handleCancel()}
      width={"90%"}
    >
      <div className='main-page h-full flex-1 overflow-auto bg-white px-4 py-8'>
        <div className='bg-white scroll-auto'></div>
        <Row>
          <Col xs={24} sm={24} md={12} lg={8} xl={6} xxl={5} className='border-add flex justify-center'>
            <div className='legend-title'>Cập nhật ảnh</div>
            <UploadAvatar
              attributeImg={imageUrl}
              imageUrl={imageUrl}
              setAvatar={setAvatar}
              setImageUrl={setImageUrl}
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={16} xl={18} xxl={19} className='border-add'>
            <div className='legend-title'>Cập nhật thông tin</div>
            <Row gutter={[30, 0]}>

              <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                <InputTextCommon
                  label={"Tên đăng nhập"}
                  attribute={"username"}
                  isRequired={false}
                  dataAttribute={dataProfile.username}
                  setData={setDataProfile}
                  disabled={true}
                  validate={validate}
                  setValidate={setValidate}
                  submittedTime={submittedTime}
                />
              </Col>
              <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                <InputTextCommon
                  label={"Email"}
                  attribute={"email"}
                  isRequired={false}
                  dataAttribute={dataProfile.email}
                  setData={setDataProfile}
                  disabled={true}
                  validate={validate}
                  setValidate={setValidate}
                  submittedTime={submittedTime}
                />
              </Col>
              <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                <InputTextCommon
                  label={"Tên người dùng"}
                  attribute={"name"}
                  isRequired={true}
                  dataAttribute={dataProfile.name}
                  setData={setDataProfile}
                  disabled={false}
                  validate={validate}
                  setValidate={setValidate}
                  submittedTime={submittedTime}
                />
              </Col>
              <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                <InputTextCommon
                  label={"Số điện thoại"}
                  attribute={"phone"}
                  isRequired={true}
                  dataAttribute={dataProfile.phone}
                  setData={setDataProfile}
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
      <div className='container-btn main-page bg-white p-4 flex flex-col'>
        <Row justify={"center"}>
          <Col className='mx-1'>
            <ButtonCommon onClick={handleCancel} classColor="blue">Quay lại</ButtonCommon>
          </Col>
          <Col className='mx-1'>
            <ButtonCommon onClick={onUpdateProfile} classColor="orange">Cập nhật</ButtonCommon>
          </Col>
        </Row>
      </div >
    </Modal >
  )
}

export default ProfileModal