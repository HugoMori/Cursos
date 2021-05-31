import "antd/dist/antd.css";
import { Form, Button, message, DatePicker, Layout, Menu, Input, InputNumber, Select } from 'antd';
import { Link } from 'react-router-dom';
import { FormInstance } from 'antd/lib/form';
import React, { useEffect, useState } from 'react';
import InvestimentoService from "../../service/InvestimentoService";
import CategoriaService from "../../service/CategoriaService";

const { Header, Content, Footer } = Layout;
const { Option } = Select;

export default function CadastrarInvestimento() {

    const [categorias, setCategorias] = useState([]);
    const [categoria, setCategoria] = useState(null);
    var formRef = React.createRef(FormInstance);

    useEffect(() => {
        refreshCategorias();
    }, [])

    async function refreshCategorias() {
        CategoriaService.retrieveAllCategorias()
            .then(
                response => {
                    setCategorias(response.data)
                }
            )
    }

    const onFinish = (values) => {
        InvestimentoService.saveInvestimento(values).then(r => {
            message.success('Investimento salvo com sucesso!');
        });
        onReset();
    }

    const onReset = () => {
        formRef.current.resetFields();
    }

    const onFinishFailed = (erroInfo) => {
        message.danger("Investimento não cadastrado!")
        console.log('Failed:', erroInfo)
    }

    function handleChange(value) {
        setCategoria(value);
    }

    const layout = {
        labelCol: {
            span: 4,
        },
        wrapperCol: {
            span: 3,
        },
    };

    const tailLayout = {
        wrapperCol: {
            offset: 4,
        },
    };



    return (
        <div className="container">
            <Layout className="layout">
                <Header>
                    <div className="logo" />
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                        <Menu.Item key="1">
                            <Link to="/cadastrar-investimento">
                                Cadastrar Investimento
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link to="/listar-investimentos">
                                Listar Investimento
                            </Link>
                        </Menu.Item>
                    </Menu>
                </Header>
                <Content style={{ padding: '0 50px' }}>
                    <div className="site-layout-content">
                        <h2>Cadastrar Investimento</h2>
                        <Form ref={formRef} {...layout} name="basic"
                            initialValues={{ remember: true, }}
                            onFinish={onFinish}
                        // onFinishFailed={onFinishFailed}
                        >
                            <Form.Item
                                label="Código do ativo"
                                name="codigoAtivo"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Insira o código do ativo!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Valor"
                                name="valor"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Insira o valor do ativo!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Quantidade de cotas"
                                name="qtdCotas"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Insira a quantidade de cotas do ativo!',
                                    },
                                ]}
                            >
                                <InputNumber />
                            </Form.Item>

                            <Form.Item
                                label="Data da compra"
                                name="dataCompra"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Insira a data de compra!',
                                    },
                                ]}
                            >
                                <DatePicker />
                            </Form.Item>

                            <Form.Item
                                label="Categoria"
                                name="categoria"
                            // rules={[
                            //     {
                            //         //required: true,
                            //         message: 'Insira a categoria!',
                            //     },
                            // ]}
                            >
                                <Select onChange={handleChange}>
                                    {categorias.map((categoria) => {
                                        return (
                                            <Option key={categoria.id} value={categoria.id}>
                                                {categoria.nome}
                                            </Option>
                                        )
                                    })}
                                </Select>
                            </Form.Item>

                            <Form.Item {...tailLayout}>
                                <Button type="primary" htmlType="submit">
                                    Salvar
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>My Invest ©2021</Footer>
            </Layout>
        </div>
    );
}