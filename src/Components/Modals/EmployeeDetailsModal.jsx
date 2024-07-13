import React, { useState } from 'react';
import { Divider, Layout, Modal, Typography } from 'antd';
import styled from '@emotion/styled';


const EmployeeDetailsModal = ({ modal, setModal }) => {

    const { data } = modal;

  return (
    <>
      <Modal
        title={<ModalTitle>Employee Detail</ModalTitle>}
        footer={null}
        centered
        open={modal?.open}
        onCancel={() => setModal({open: false, data: {}})}
        width={455}
        bodyStyle={{ minHeight: '360px' }}
      >
        <Divider style={{marginTop: '10px', marginBottom: '15px'}} />

        <NameText>{data.name}</NameText>
        <label style={{fontSize: 'clamp(10px, 3vw, 12px)'}}>id: {data.id}</label>

        <div style={{margin: '15px 0px 10px', display: 'flex', gap: '20px 125px', flexWrap: 'wrap', marginBottom: '20px'}}>
            <Section>
                <DetailHead>Designation</DetailHead>
                <DetailText>{data?.designation?.title}</DetailText>
            </Section>

            <Section>
                <DetailHead>Contact</DetailHead>
                <DetailText>{data?.contact}</DetailText>
            </Section>

            <Section>
                <DetailHead>CNIC</DetailHead>
                <DetailText>{data?.cnic}</DetailText>
            </Section>

            <Section>
                <DetailHead>Created By</DetailHead>
                <DetailText>{data?.createdBy}</DetailText>
            </Section>
        </div>

        <DetailHead>Email</DetailHead>
        <DetailText>{data?.email}</DetailText>

      </Modal>
    </>
  );
};
export default EmployeeDetailsModal;

const ModalTitle = styled(Typography)(() => ({
    fontSize: 'clamp(14px, 3vw, 16px)',
    fontFamily: 'GeneralSans-Medium',
    color: '#141433',
}));

const NameText = styled(Typography)(() => ({
    fontSize: 'clamp(14px, 3vw, 16px)',
    fontFamily: 'GeneralSans-Semibold',
    color: '#141433',
}));

const DetailHead = styled(Typography)(() => ({
    fontSize: 'clamp(10px, 3vw, 12px)',
    fontFamily: 'GeneralSans-Regular',
    color: '#989898',
}));

const DetailText = styled(Typography)(() => ({
    fontSize: 'clamp(12px, 3vw, 14px)',
    fontFamily: 'GeneralSans-Regular',
    color: '#141433',
}));

const Section = styled(Typography)(() => ({
    width: '120px'
}));

