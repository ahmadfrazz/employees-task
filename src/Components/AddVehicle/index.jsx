import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Radio, Select, Upload, Modal, message } from 'antd';
import styled from '@emotion/styled';

const AddVehicle = () => {
    const [form] = Form.useForm();

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [showUpload, setShowUpload] = useState(true);
  const [fileList, setFileList] = useState([]);

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

    const normFile = (e) => {
        if (Array.isArray(e)) {
          return e;
        }
        return e?.fileList;
      };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    handleShowUpload();
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handleShowUpload = () => {
    (fileList.length > form.getFieldValue('copies') || fileList.length === form.getFieldValue('copies'))
    ? setShowUpload(false) : setShowUpload(true)
  }

  const onFinish = (data) => {
    if(data?.images?.length > data?.copies){
        message.error('Uploaded images cannot be greater than no. of copies!')
    }else{
        console.log(data);
        form.resetFields();
        message.success('Car details added successfully!');
    }
};

const onFinishFailed = (errorFields) => {
    const consecutiveSpacesError = errorFields.find((field) =>
        field.errors.toString().includes("consecutive spaces")
    );
    consecutiveSpacesError
    ? message.error("Please Remove Consecutive Spaces!")
    : message.error("Please Fill Required Fields!");
};

const options = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <>
      <Form
        form={form}
        layout="vertical"
        style={{
          maxWidth: 600,
          width: '100%'
        }}
        onFinish={onFinish}
        onFinishFailed={({ errorFields }) => onFinishFailed(errorFields)}
      >
        <Form.Item
            label="Car Model"
            name="carModel"
            rules={[
                {
                    required: true,
                    message: 'Please input car model',
                },
                {
                    min: 3,
                    message: "model length must be at least 3 characters long",
                },
            ]}
        >
          <InputText />
        </Form.Item>
        <Form.Item
            label="Price"
            name="price"
            rules={[
                {
                required: true,
                message: 'Please input price',
                },
            ]}
        >
          <InputText
            onKeyPress={(e) => {
                if ( (e.which !== 46 && (e.which < 48 || e.which > 57)) ) {
                  e.preventDefault();
                }
            }}
          />
        </Form.Item>
        <Form.Item
            label="Phone"
            name="phone"
            rules={[
                {
                    required: true,
                    message: 'Please input phone',
                },
                {
                    min: 11,
                    message: "phone length must be at least 11 digits long",
                },
            ]}
        >
          <InputText
            onKeyPress={(e) => {
                if ((e.which >= 65 && e.which <= 90) || (e.which >= 97 && e.which <= 122) || (e.which >= 33 &&  e.which <= 47) || (e.which >= 58 && e.which <= 64) || (e.which >= 91 && e.which <= 96) || (e.which >= 123 && e.which <= 126) ) {
                  e.preventDefault();
                }
            }}
            maxLength={11}
          />
        </Form.Item>
        <Form.Item
            label="City"
            name="city"
            rules={[
                {
                required: true,
                message: 'Please select city',
                },
            ]}
        >
          <Radio.Group>
            <Radio value="apple"> Lahore </Radio>
            <Radio value="pear"> Karachi </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
            label="No. of Copies"
            name="copies"
            rules={[
                {
                required: true,
                message: 'Please select no. of copies',
                },
            ]}
        >
            <Select
                onChange={handleShowUpload}
            >
                {options.map(value => (
                    <Select.Option key={value} value={value}>
                    {value}
                    </Select.Option>
                ))}
            </Select>
        </Form.Item>
        <Form.Item
            name="images"
            rules={[
                {
                required: true,
                message: 'Please upload images',
                },
            ]}
            valuePropName="fileList"
            getValueFromEvent={normFile}
        >
          <Upload
            action="/"
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
          >
            {!showUpload ? null : uploadButton}
          </Upload>
        </Form.Item>
        <Form.Item>
            <LogButton type="primary" htmlType="submit">
                Add Car
            </LogButton>
        </Form.Item>
      </Form>
      <Modal open={previewOpen} footer={null} onCancel={() => setPreviewOpen(false)}>
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  );
};

export default AddVehicle;

const inputStyle = {
    height: '40px',
    '&:hover': {
        borderColor: '#553E97',
      },
      "&:focus, &:active, &:focus-within": {
        borderColor: '#553E97',
        boxShadow: 'none !important',
      }
  }
const InputText = styled(Input)(() => (inputStyle));

const LogButton = styled(Button)(() => ({
    marginTop: '20px',
    width: '100%',
    height: '40px',
    backgroundColor: '#553E97',
    color: 'white',
    '&:hover': {
        backgroundColor: '#432F7A !important',
      }
  }));
