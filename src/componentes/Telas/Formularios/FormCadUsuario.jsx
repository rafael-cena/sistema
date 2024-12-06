import { Button, Spinner, Col, Form, InputGroup, Row, Alert } from "react-bootstrap";
import { useState, useEffect } from "react";
import { buscarPrivilegios } from "../../../redux/privilegioReducer"
import toast, { Toaster } from "react-hot-toast";
import { editarUsuario, registrarUsuario } from "../../../redux/usuarioReducer";
import { useSelector, useDispatch } from "react-redux";
import ESTADO from "../../../redux/estados";

export default function FormCadUsuario(props) {
    const { estadoU, mensagemU } = useSelector((state) => state.usuario);
    const { estadoP, mensagemP, listaDePrivilegios } = useSelector((state) => state.privilegio);
    const despachante = useDispatch();

    const [usuario, setUsuario] = useState(props.usuarioSelecionado);
    const [validated, setFormValidated] = useState(false);
    const [temPrivilegios, setTemPrivilegios] = useState(false);

    useEffect(() => {
        if (estadoP === ESTADO.OCIOSO && listaDePrivilegios.length > 0) {
            setTemPrivilegios(true);
            if (mensagemP !== "")
                toast.success(mensagemP);
        }
        else if (estadoP === ESTADO.PENDENTE)
            toast(mensagemP, {
                icon: '⏳'
            });
    }, [estadoP]);

    useEffect(() => {
        despachante(buscarPrivilegios());
    }, []);

    function selecionarPrivilegio(evento) {
        setUsuario({ ...usuario, privilegio: { codigo: evento.currentTarget.value } });
    }

    function handleSubmit(evento) {
        const form = evento.currentTarget;
        if (form.checkValidity()) {
            if (props.modoAlterar) {
                if (usuario.senha === document.getElementById('confSenha').value) {
                    despachante(editarUsuario(usuario));
                    if (estadoU === ESTADO.ERRO) toast.error(mensagemU);
                    else toast.success(mensagemU);
                    props.setModoAlterar(false);
                }
                else toast.error('Erro ao confirmar a senha!');
            }
            else {
                if (usuario.senha === document.getElementById('confSenha').value) {
                    despachante(registrarUsuario(usuario));
                    if (estadoU === ESTADO.ERRO) toast.error(mensagemU);
                    else toast.success(mensagemU);
                }
                else toast.error('Erro ao confirmar a senha!');
            }
            setUsuario({
                id: "",
                username: "",
                senha: "",
                nome: "",
                email: "",
                privilegio: {}
            });
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
        setUsuario({ ...usuario, [elemento]: valor });
    }

    if (estadoU === ESTADO.PENDENTE)
        return (
            <>
                <Alert variant="primary">{mensagemU}</Alert>
                <Spinner className='mt-4' animation="border" variant="success" />
            </>
        );

    else if (estadoU === ESTADO.ERRO)
        return (
            <>
                <Alert variant="danger">{mensagemU}</Alert>
                <Col md={{ offset: 1 }}>
                    <Button onClick={() => {
                        props.setExibirTabela(true);
                    }}>Voltar</Button>
                </Col>
            </>
        );

    else if (estadoU === ESTADO.OCIOSO)
        return (
            <>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="6">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                id="username"
                                name="username"
                                disabled={
                                    props.modoAlterar ?
                                        true :
                                        false
                                }
                                value={usuario.username}
                                onChange={manipularMudanca}
                            />
                            <Form.Control.Feedback type="invalid">Por favor, informe a um nome de usuário!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="3">
                            <Form.Label>Senha</Form.Label>
                            <Form.Control
                                required
                                type="password"
                                id="senha"
                                name="senha"
                                value={usuario.senha}
                                onChange={manipularMudanca}
                            />
                            <Form.Control.Feedback type="invalid">Por favor, informe uma senha!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="3">
                            <Form.Label>Confirmar Senha</Form.Label>
                            <Form.Control
                                required
                                type="password"
                                id="confSenha"
                                name="confSenha"
                            />
                            <Form.Control.Feedback type="invalid">A confirmacao de senha deve ser igual a sua senha!</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Col} md="5">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                id="nome"
                                name="nome"
                                value={usuario.nome}
                                onChange={manipularMudanca}
                            />
                            <Form.Control.Feedback>Por favor, informe o seu nome!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="5">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="text"
                                id="email"
                                name="email"
                                required
                                value={usuario.email}
                                onChange={manipularMudanca}
                            />
                            <Form.Control.Feedback>Por favor, informe o seu email!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md={temPrivilegios ? 2 : 0}>
                            <Form.Label>Privilegio: </Form.Label>
                            <Form.Select
                                id='privilegio'
                                name='privilegio'
                                value={usuario.privilegio.descricao}
                                onChange={selecionarPrivilegio}>
                                <option selected value={null} disabled>Selecione um Privilegio</option>
                                {
                                    listaDePrivilegios.map((privilegio) => {
                                        return <option value={privilegio.codigo}>
                                            {privilegio.descricao}
                                        </option>
                                    })
                                }
                            </Form.Select>
                        </Form.Group>
                        <Form.Group as={Col} md={2}>
                            {
                                temPrivilegios ? "" : <Spinner className='mt-4' animation="border" variant="success" />
                            }
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
                <Toaster position="top-right" reverseOrder={false} />
            </>
        );

}