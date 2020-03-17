import React from 'react';
import {Form, Input, Button, Col} from "antd";
import {UserOutlined, LockOutlined} from "@ant-design/icons";
import {Link} from 'react-router-dom';
import './loginForm.css';
import {Login} from "../../utils/HttpRequests";

const loginForm = (props) => {
    console.log('PROPSSSSS', props.signUp);

    const onFinish = values => {
        Login(values, props.signUp);
    };

    const onFinishFailed = errorInfo => {
      console.log('errorInfo', errorInfo);
    };



    return (
        <Col xs={{ span: 11, offset: 6 }} lg={{ span: 11, offset: 6 }}  style={{ paddingTop: '50px' }}>
        <Form
            name="normal_login"
            className="login-form"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                name="enrollment"
                rules={[
                    {
                        required: true,
                        message: 'Ingresa tu matricula!',
                    },
                    {
                        pattern: /^[0-9]+$/,
                        message: 'No es una matricula valida',
                    },
                    ()=> ({
                        validator(rule, value) {
                            if (value != null) {
                                const enrollment = value.toString();
                                if (enrollment.length === 9){
                                    return Promise.resolve();
                                }
                            }
                            return Promise.reject('La matricula debe de ser de 9 digitos');
                        },
                    })
                ]}
            >
                <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="matricula"
                    autoFocus={true}
                />
            </Form.Item>

            <Form.Item
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Ingresa tu contraseña!',
                    },
                    () => ({
                        validator(rule, value) {
                            if (typeof(value) !== "undefined") {
                                if (value.length >= 8){
                                    return Promise.resolve();
                                }
                            }
                            return Promise.reject('La contreseña debe ser de minimo 8 caracteres');
                        },
                    }),
                ]}
                hasFeedback
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Contraseña"
                />
            </Form.Item>

            <Form.Item>
                {/*<Link to="/games">*/}
                <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                >
                    Iniciar sesion
                </Button>
                {/*</Link>*/}
            </Form.Item>
        </Form>
        </Col>
  )
};

export default loginForm;