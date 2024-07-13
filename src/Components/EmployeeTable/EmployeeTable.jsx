import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Table, Typography, Button } from 'antd';
import styled from '@emotion/styled';
import EmployeeDetailsModal from '../Modals/EmployeeDetailsModal';

function EmployeeTable({ data, loading, hasNext, handleLoadMore }) {

    const [modal, setModal] = useState({
        open: false,
        data: {}
    });

    const handleModalOpen = (data) => {
        setModal({
            open: true,
            data
        });
      };

    const commonWidth = '14%';

    const columns = [
        {
            title: '#',
            dataIndex: 'index',
            width: '6%',
            render: (text, record, index) => index + 1,
          },
        {
          title: 'Name',
          dataIndex: 'name',
          width: commonWidth,
          render: (text, record) => (
            <NameText
                onClick={() => handleModalOpen(record)}
            >
                {text}
            </NameText>
            ),
        },
        {
          title: 'Designation',
          dataIndex: 'designation',
          width: commonWidth,
          render: (text, record) => (
            <label className='longText'>
                {record?.designation?.title}
            </label>
            ),
        },
        {
          title: 'Contact',
          dataIndex: 'contact',
          width: commonWidth,
        },
        {
          title: 'CNIC',
          dataIndex: 'cnic',
          width: commonWidth,
        },
        {
          title: 'Email',
          dataIndex: 'email',
          width: commonWidth,
        },
        {
          title: 'Created By',
          dataIndex: 'createdBy',
          width: commonWidth,
        },
      ];

  return (
    <>
        <div className="table-responsive">
            <Table
                className="customTable"
                columns={columns} 
                dataSource={data}
                pagination={false}
                loading={loading} 
                rowKey="id"
            />

            {hasNext && (
                <LoadButton onClick={handleLoadMore} disabled={loading}>
                    Load more
                </LoadButton>
            )}

        </div>
        

        <EmployeeDetailsModal
            modal={modal}
            setModal={setModal}
        />
    </>
  )
}

export default EmployeeTable;

const NameText = styled(Typography)(() => ({
    color: '#3b3ec2',
    textDecoration: 'underline',
    cursor: 'pointer'
}));

const LoadButton = styled(Button)(() => ({
    fontSize: 'clamp(13px, 3vw, 15px)',
    width: '143px',
    height: '40px',
    display: 'flex',
    margin: '20px auto',
    backgroundColor: '#3B3EC2 !important',
    borderRadius: '4px',
    color: 'white !important',
    '&:hover': {
      backgroundColor: '#282cc7 !important',
    }
  }));