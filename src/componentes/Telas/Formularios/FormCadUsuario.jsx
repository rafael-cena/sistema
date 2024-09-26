import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

export default function FormCadUsuario(props) {
    const [usuario, setUsuario] = useState({
        userName: "",
        Nome: "",
        Sobrenome: "",
        Email: "",
        Senha: "",
        dataNascimento: ""
    });

    const [validated, setFormValidated] = useState(false);

    function handleSubmit(evento) {
        const form = evento.currentTarget;
        if (form.checkValidity()) {
            if (props.modoAlterar) {
                props.setListaDeUsuario(props.listaUsuario.map((item) => {
                    return item.userName !== props.usuarioSelecionado.userName ? item : props.usuarioSelecionado;
                }));
                props.setModoAlterar(false);
            }
            else {
                //cadastra usuario
                props.setListaDeUsuario([...props.listaUsuario, usuario]);
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
            props.setUsuarioSelecionado({ ...props.usuarioSelecionado, [elemento]: valor });
        }
        else {
            setUsuario({ ...usuario, [elemento]: valor });
        }
    }
    // "..." => Operador de Espalhamento

    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
                <Form.Group as={Col} md="3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="userName"
                        name="userName"
                        disabled={
                            props.modoAlterar ?
                                true :
                                false
                        }
                        value={
                            props.modoAlterar ?
                                props.usuarioSelecionado.userName :
                                usuario.userName
                        }
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="3">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="Nome"
                        name="Nome"
                        value={
                            props.modoAlterar ?
                                props.usuarioSelecionado.Nome :
                                usuario.Nome
                        }
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="3">
                    <Form.Label>Sobrenome</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="Sobrenome"
                        name="Sobrenome"
                        value={
                            props.modoAlterar ?
                                props.usuarioSelecionado.Sobrenome :
                                usuario.Sobrenome
                        }
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="6">
                    <Form.Label>Email</Form.Label>
                    <InputGroup hasValidation>
                        <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                        <Form.Control
                            type="text"
                            id="Email"
                            name="Email"
                            aria-describedby="inputGroupPrepend"
                            required
                            value={
                                props.modoAlterar ?
                                    props.usuarioSelecionado.Email :
                                    usuario.Email
                            }
                            onChange={manipularMudanca}
                        />
                    </InputGroup>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="3">
                    <Form.Label>Senha</Form.Label>
                    <Form.Control
                        type="text"
                        id="Senha"
                        name="Senha"
                        aria-describedby="inputGroupPrepend"
                        required
                        value={
                            props.modoAlterar ?
                                props.usuarioSelecionado.Senha :
                                usuario.Senha
                        }
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please choose a username.
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="3">
                    <Form.Label>Data de Nascimento</Form.Label>
                    <Form.Control
                        type="text"
                        id="dataNascimento"
                        name="dataNascimento"
                        required
                        value={
                            props.modoAlterar ?
                                props.usuarioSelecionado.dataNascimento :
                                usuario.dataNascimento
                        }
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please choose a username.
                    </Form.Control.Feedback>
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