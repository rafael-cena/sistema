import { Button, Spinner, Col, Form, InputGroup, Row, Alert, Container } from "react-bootstrap";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import ESTADO from "../../../redux/estados";
import { editarPrivilegio, registrarPrivilegio } from "../../../redux/privilegioReducer";

export default function FormCadPrivilegios(props) {
    const { estadoP, mensagemP } = useSelector((state) => state.privilegio);
    const despachante = useDispatch();

    const [privilegio, setPrivilegio] = useState(props.privilegioSelecionado);
    const [formValidado, setFormValidado] = useState(false);

    function manipularSubmissao(evento) {
        const form = evento.currentTarget;
        if (form.checkValidity()) {

            if (!props.modoEdicao) {
                despachante(registrarPrivilegio(privilegio));
                if (estadoP === ESTADO.ERRO) toast.error(mensagemP);
                else toast.success(mensagemP);
            }
            else {
                despachante(editarPrivilegio(privilegio));
                if (estadoP === ESTADO.ERRO) toast.error(mensagemP);
                else toast.success(mensagemP);
                props.setModoEdicao(false);
            }
            setPrivilegio({
                codigo: 0,
                descricao: ""
            });
            props.setExibirTabela(true);
        }
        else {
            setFormValidado(true);
        }
        evento.preventDefault();
        evento.stopPropagation();

    }

    function manipularMudanca(evento) {
        const elemento = evento.target.name;
        const valor = evento.target.value;
        setPrivilegio({ ...privilegio, [elemento]: valor });
    }

    if (estadoP === ESTADO.PENDENTE)
        return (
            <>
                <Alert variant="primary">{mensagemP}</Alert>
                <Spinner className='mt-4' animation="border" variant="success" />
            </>
        );

    else if (estadoP === ESTADO.ERRO)
        return (
            <>
                <Alert variant="danger">{mensagemP}</Alert>
                <Col md={{ offset: 1 }}>
                    <Button onClick={() => {
                        props.setExibirTabela(true);
                    }}>Voltar</Button>
                </Col>
            </>
        );

    else if (estadoP === ESTADO.OCIOSO)
        return (
            <Container>
                <Form noValidate validated={formValidado} onSubmit={manipularSubmissao}>
                    <Row className="mb-4">
                        <Form.Group as={Col} md="2">
                            <Form.Label>Código</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                id="codigo"
                                name="codigo"
                                value={privilegio.codigo}
                                disabled
                                onChange={manipularMudanca}
                            />
                            <Form.Control.Feedback type='invalid'>Por favor, informe o código do privilegio!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="10">
                            <Form.Label>Descrição</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                id="descricao"
                                name="descricao"
                                value={privilegio.descricao}
                                onChange={manipularMudanca}
                            />
                            <Form.Control.Feedback type="invalid">Por favor, informe a descrição do privilegio!</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className='mt-2 mb-2'>
                        <Col md={1}>
                            <Button type="submit">{props.modoEdicao ? "Alterar" : "Confirmar"}</Button>
                        </Col>
                        <Col md={{ offset: 1 }}>
                            <Button onClick={() => {
                                props.setExibirTabela(true);
                            }}>Voltar</Button>
                        </Col>
                    </Row>
                </Form>
            </Container>
        );

}