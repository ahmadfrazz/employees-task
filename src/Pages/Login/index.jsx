import React, { useEffect } from 'react';
import { Button, Checkbox, Form, Input, Space, Typography, message } from 'antd';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userlogin } from '../../Redux/Slices/authSlice';
import { useMutation } from '@apollo/client';
import { LOGIN_MUTATION } from '../../GraphQL/Mutations';


const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { token } = useSelector(state => state?.auth?.user);

    const [login, { data, loading, error }] = useMutation(LOGIN_MUTATION);
  
    useEffect(() => {
      token && navigate('/dashboard');
    }, [])

    if(token){
        return
    }

    const onFinish = async  (values) => {
        try {
          const { data } = await login({ variables: values });
          dispatch(userlogin({token: data.login.token}));
          navigate('/dashboard')
        } catch (error) {
          message.error('Error logging in')
          console.error('Error logging in', error);
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
  

    return (
        <Container>
            <LoginForm
                layout="vertical"
                onFinish={onFinish}
                onFinishFailed={({ errorFields }) => onFinishFailed(errorFields)}
                autoComplete="off"
            >
                  <Heading>
                      Login
                  </Heading>
                  <Description>
                    Enter credentials to get access
                  </Description>
                  <Form.Item
                      label="Email"
                      name="username"
                      rules={[
                          {
                            whitespace: true,
                            required: true,
                            validator: (_, value) => {
                              if (!value || value.trim() === "") {
                                return Promise.reject("please enter email/username");
                              } else if (/\s{2,}/.test(value)) {
                                return Promise.reject(
                                  "please remove consecutive spaces"
                                );
                              }
                              return Promise.resolve();
                            },
                          },
                        ]}
                  >
                      <InputUsername placeholder='Enter email' />
                  </Form.Item>
              
                  <Form.Item
                      label="Password"
                      name="password"
                      rules={[
                          {
                          required: true,
                          message: 'Please input your password',
                          },
                      ]}
                  >
                    <InputPassword placeholder='Enter password' />
                  </Form.Item>

                  <Checkbox>Save credentials</Checkbox>
            
                <Form.Item>
                    <LogButton type="primary" htmlType="submit">
                        Login
                    </LogButton>
                </Form.Item>
            </LoginForm>
        </Container>
    )
};
export default Login;

const LoginForm = styled(Form)(() => ({
  maxWidth: 399,
  width: 'auto',
  height: '503px',
  margin: '0 auto',
  padding: '40px 59px',
  background: '#FFFFFF',
  boxShadow: '0px 5px 15px #B7B7B733',
  border: '1px solid #F1F1F1',
  borderRadius: '6px',
  }));

const Heading = styled(Typography)(() => ({
  fontSize: 'clamp(20px, 3vw, 26px)',
  textAlign: 'center',
  margin: '0px auto 5px',
  fontFamily: 'GeneralSans-Semibold',
  color: '#3D3D3D'
  }));

const Description = styled(Typography)(() => ({
  fontSize: 'clamp(12px, 3vw, 14px)',
  textAlign: 'center',
  margin: '0px auto 50px',
  fontFamily: 'GeneralSans-Regular',
  color: '#707070'
  }));

const Container = styled(Space)(() => ({
    display: 'grid',
    height: '100vh',
    marginInline: '20px',
    background: '#FFFFFF'
  }));

const inputStyle = {
  height: '40px',
  background: '#F9F9F8 !important',
  border: '1px solid #EFEFEF',
  borderRadius: '2px',
  '&:hover': {
      borderColor: '#3b3ec2',
    },
    "&:focus, &:active, &:focus-within": {
      borderColor: '#3b3ec2',
      boxShadow: 'none !important',
    }
}
const InputUsername = styled(Input)(() => (inputStyle));
const InputPassword = styled(Input.Password)(() => (inputStyle));

const LogButton = styled(Button)(() => ({
    marginTop: '50px',
    width: '100%',
    height: '40px',
    backgroundColor: '#3b3ec2',
    borderRadius: '2px',
    color: 'white',
    '&:hover': {
        backgroundColor: '#282cc7 !important',
      }
  }));