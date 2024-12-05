import { Button, Spinner, Col, Form, InputGroup, Row, Alert } from "react-bootstrap";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import ESTADO from "../../../redux/estados";
import { editarCliente, registrarCliente } from "../../../redux/clienteReducer";

export default function FormCadCliente(props) {
    const { estadoCli, mensagemCli, listaClientes } = useSelector((state) => state.cliente);
    const despachante = useDispatch();

    const [cliente, setCliente] = useState(props.clienteSelecionado);
    const [validated, setValidated] = useState(false);

    function handleSubmit(evento) {
        const form = evento.currentTarget;
        if (form.checkValidity()) {
            if (props.modoAlterar) {
                despachante(editarCliente(cliente));
                if (estadoCli === ESTADO.ERRO) toast.error(mensagemCli);
                else toast.success(mensagemCli);
                props.setModoAlterar(false);
            }
            else {
                despachante(registrarCliente(cliente));
                if (estadoCli === ESTADO.ERRO) toast.error(mensagemCli);
                else toast.success(mensagemCli);
            }
            setCliente({
                id: "",
                nome: "",
                cpf: "",
                cep: "",
                endereco: "",
                numero: 0,
                telefone: "",
                usuario: {
                    username: ""
                }
            })
            props.setExibirTabela(true);
        }
        else {
            setValidated(true);
        }
        evento.preventDefault();
        evento.stopPropagation();
    }

    function manipularMudanca(evento) {
        const elemento = evento.target.name;
        const valor = evento.target.value;
        setCliente({ ...cliente, [elemento]: valor });
    }

    if (estadoCli === ESTADO.PENDENTE)
        return (
            <>
                <Alert variant="primary">{mensagemCli}</Alert>
                <Spinner className='mt-4' animation="border" variant="success" />
            </>
        );

    else if (estadoCli === ESTADO.ERRO)
        return (
            <>
                <Alert variant="danger">{mensagemCli}</Alert>
                <Col md={{ offset: 1 }}>
                    <Button onClick={() => {
                        props.setExibirTabela(true);
                    }}>Voltar</Button>
                </Col>
            </>
        );

    else if (estadoCli === ESTADO.OCIOSO)
        return (
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Form.Group as={Col} md="8" controlId="validationCustom01">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            id="nome"
                            name="nome"
                            value={cliente.nome}
                            onChange={manipularMudanca}
                        />

                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationCustom02">
                        <Form.Label>CPF</Form.Label>
                        <Form.Control
                            required
                            type='text'
                            id='cpf'
                            name='cpf'
                            disabled={
                                props.modoAlterar ?
                                    true :
                                    false
                            }
                            value={cliente.cpf}
                            onChange={manipularMudanca}
                        />
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md="6" controlId="validationCustom01">
                        <Form.Label>Endereço</Form.Label>
                        <Form.Control
                            type='text'
                            id='endereco'
                            name='endereco'
                            value={cliente.endereco}
                            onChange={manipularMudanca}
                        />
                    </Form.Group>
                    <Form.Group as={Col} md="2" controlId="validationCustom01">
                        <Form.Label>Número</Form.Label>
                        <Form.Control
                            required
                            type='text'
                            id='numero'
                            name='numero'
                            value={cliente.numero}
                            onChange={manipularMudanca}
                        />
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationCustom01">
                        <Form.Label>CEP</Form.Label>
                        <Form.Control
                            required
                            type='text'
                            id='cep'
                            name='cep'
                            value={cliente.cep}
                            onChange={manipularMudanca}
                        />
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md="6" controlId="validationCustom03">
                        <Form.Label>Usuario</Form.Label>
                        <Form.Control
                            type='text'
                            id='usuario.username'
                            name='usuario.username'
                            value={cliente.usuario.username}
                            onChange={manipularMudanca}
                        />
                    </Form.Group>
                    <Form.Group as={Col} md="6" controlId="validationCustom03">
                        <Form.Label>Telefone</Form.Label>
                        <Form.Control
                            required
                            type='text'
                            id='telefone'
                            name='telefone'
                            value={cliente.telefone}
                            onChange={manipularMudanca}
                        />
                    </Form.Group>
                </Row>
                <Row className='mt-2 mb-2'>
                    <Col md={1}>
                        {
                            props.modoAlterar ?
                                <Button type="submit">Alterar</Button> :
                                <Button type="submit">Cadastrar</Button>
                        }
                    </Col>
                    <Col md={{ offset: 1 }}>
                        <Button onClick={() => { props.setExibirTabela(true); }}>Voltar</Button>
                    </Col>
                </Row>
            </Form>
        )
}