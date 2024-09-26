import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

export default function FormCadEntregador(props) {
    const [entregador, setEntregador] = useState({
        cpf: "",
        telefone: "",
        nome: "",
        sobrenome: "",
        endereco: "",
        dataNascimento: "",
        placaVeiculo: ""
    });

    const [validated, setFormValidated] = useState(false);

    function handleSubmit(evento) {
        const form = evento.currentTarget;
        if (form.checkValidity()) {
            if (props.modoAlterar) {
                props.setListaDeEntregador(props.listaEntregador.map((item) => {
                    return item.cpf !== props.entregadorSelecionado.cpf ? item : props.entregadorSelecionado;
                }));
                props.setModoAlterar(false);
            }
            else {
                //cadastra entregador
                props.setListaDeEntregador([...props.listaEntregador, entregador]);
            }
            // exibir a tabela do produto incluido/alterado
            props.setExibirTabela(true);
        }
        else {
            setFormValidated(true);
        }
        evento.preventDefault();
        evento.stopPropagation();
    }

    function manipularMudanca(evento) {
        const elemento = evento.target.name;
        const valor = evento.target.value;
        if (props.modoAlterar) {
            props.setEntregadorSelecionado({ ...props.entregadorSelecionado, [elemento]: valor });
        }
        else {
            setEntregador({ ...entregador, [elemento]: valor });
        }
    }
    // "..." => Operador de Espalhamento

    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
                <Form.Group as={Col} md="4">
                    <Form.Label>CPF</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="cpf"
                        name="cpf"
                        disabled={
                            props.modoAlterar ?
                                true :
                                false
                        }
                        value={
                            props.modoAlterar ?
                                props.entregadorSelecionado.cpf :
                                entregador.cpf
                        }
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="nome"
                        name="nome"
                        value={
                            props.modoAlterar ?
                                props.entregadorSelecionado.nome :
                                entregador.nome
                        }
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4">
                    <Form.Label>Sobrenome</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="sobrenome"
                        name="sobrenome"
                        value={
                            props.modoAlterar ?
                                props.entregadorSelecionado.sobrenome :
                                entregador.sobrenome
                        }
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="3">
                    <Form.Label>Telefone</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="telefone"
                        name="telefone"
                        value={
                            props.modoAlterar ?
                                props.entregadorSelecionado.telefone :
                                entregador.telefone
                        }
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="5">
                    <Form.Label>Endereço</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control
                            type="text"
                            id="endereco"
                            name="endereco"
                            required
                            value={
                                props.modoAlterar ?
                                    props.entregadorSelecionado.endereco :
                                    entregador.endereco
                            }
                            onChange={manipularMudanca}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please choose a username.
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
                <Form.Group as={Col} md="4">
                    <Form.Label>Data de Nascimento</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control
                            type="text"
                            id="dataNascimento"
                            name="dataNascimento"
                            required
                            value={
                                props.modoAlterar ?
                                    props.entregadorSelecionado.dataNascimento :
                                    entregador.dataNascimento
                            }
                            onChange={manipularMudanca}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please choose a username.
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="4">
                    <Form.Label>Placa do Veiculo</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control
                            type="text"
                            id="placaVeiculo"
                            name="placaVeiculo"
                            required
                            value={
                                props.modoAlterar ?
                                    props.entregadorSelecionado.placaVeiculo :
                                    entregador.placaVeiculo
                            }
                            onChange={manipularMudanca}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please choose a username.
                        </Form.Control.Feedback>
                    </InputGroup>
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
    );
}