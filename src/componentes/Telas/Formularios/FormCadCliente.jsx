import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

export default function FormCadCliente(props) {
    const [cliente, setCliente] = useState(props.clienteSelecionado);

    const [validated, setValidated] = useState(false);

    function handleSubmit(evento) {
        const form = evento.currentTarget;
        if (form.checkValidity()) {
            if (props.modoAlterar) {
                props.setListaDeClientes(props.listaClientes.map((cli) => {
                    return cli.id !== props.clienteSelecionado.id ? cli : props.clienteSelecionado;
                }));
                props.setModoAlterar(false);
            }
            else {
                props.setListaDeClientes([...props.listaClientes, cliente]);
            }
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
        if (props.modoAlterar) {
            props.setClienteSelecionado({ ...props.clienteSelecionado, [elemento]: valor });
        }
        else {
            setCliente({ ...cliente, [elemento]: valor });
        }
    }

    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="validationCustom01">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="nome"
                        name="nome"
                        value={
                            props.modoAlterar ?
                                props.clienteSelecionado.nome :
                                cliente.nome
                        }
                        onChange={manipularMudanca}
                    />

                </Form.Group>
                <Form.Group as={Col} md="6" controlId="validationCustom02">
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
                        value={
                            props.modoAlterar ?
                                props.clienteSelecionado.cpf :
                                cliente.cpf
                        }
                        onChange={manipularMudanca}
                    />
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="8" controlId="validationCustom01">
                    <Form.Label>Endereço</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        id='endereco'
                        name='endereco'
                        value={
                            props.modoAlterar ?
                                props.clienteSelecionado.endereco :
                                cliente.endereco
                        }
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
                        value={
                            props.modoAlterar ?
                                props.clienteSelecionado.cep :
                                cliente.cep
                        }
                        onChange={manipularMudanca}
                    />
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="3" controlId="validationCustom03">
                    <Form.Label>Telefone</Form.Label>
                    <Form.Control 
                        required
                        type='text'
                        id='telefone'
                        name='telefone'
                        value={
                            props.modoAlterar ?
                                props.clienteSelecionado.telefone :
                                cliente.telefone
                        }
                        onChange={manipularMudanca}
                    />
                </Form.Group>
                <Form.Group as={Col} md="9" controlId="validationCustom04">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        id='email'
                        name='email'
                        value={
                            props.modoAlterar ?
                                props.clienteSelecionado.email :
                                cliente.email
                        }
                        onChange={manipularMudanca}
                    />
                </Form.Group>
            </Row>
            <Button type="submit">Cadastrar</Button>
        </Form>
    )
}