import { Button, Space, Typography } from 'antd'
import React from 'react'
import { logout } from '../../Redux/Slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled from '@emotion/styled';

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    }
  return (
    <>
        <Container>
            <WebTitle>
                Employees App
            </WebTitle>
            <LogButton onClick={handleLogout}>
                Logout
            </LogButton>
        </Container>
    </>
  )
}

export default Header;

const Container = styled(Space)(() => ({
    display: 'flex',
    justifyContent: 'space-between',
    paddingInline: '5%',
    height: '80px'
  }));
const WebTitle = styled(Typography)(() => ({
    fontSize: 'clamp(18px, 3vw, 26px)',
    fontFamily: 'GeneralSans-Semibold',
  }));
const LogButton = styled(Button)(() => ({
    height: '40px',
    backgroundColor: '#3B3EC2',
    color: 'white !important',
    '&:hover': {
        backgroundColor: '#282cc7 !important',
      }
  }));