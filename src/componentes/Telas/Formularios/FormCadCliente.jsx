import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

export default function FormCadCliente(props) {
    const { estadoC, mensagemC, listaClientes } = useSelector((state) => state.cliente);

    const [cliente, setCliente] = useState(props.clienteSelecionado);

    const [validated, setValidated] = useState(false);

    function handleSubmit(evento) {
        const form = evento.currentTarget;
        if (form.checkValidity()) {
            if (props.modoAlterar) {
                props.setListaDeClientes(props.listaClientes.map((cli) => {
                    return cli.cpf !== props.clienteSelecionado.cpf ? cli : props.clienteSelecionado;
                }));
                props.setClienteSelecionado({
                    id: "",
                    nome: "",
                    cpf: "",
                    cep: "",
                    endereco: "",
                    numero: 0,
                    telefone: "",
                    usuario: ""
                });
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
                        value={
                            props.modoAlterar ?
                                props.clienteSelecionado.endereco :
                                cliente.endereco
                        }
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
                        id='usuario'
                        name='usuario'
                        value={cliente.usuario}
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