import { Button, Spinner, Col, Form, InputGroup, Row, Alert, Container } from "react-bootstrap";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import ESTADO from "../../../redux/estados";
import { editarCategoria, registrarCategoria } from '../../../redux/categoriaReducer';

export default function FormCadCategorias(props) {
    const { estadoCat, mensagemCat } = useSelector((state) => state.categoria);
    const despachante = useDispatch();

    const [categoria, setCategoria] = useState(props.categoriaSelecionado);
    const [formValidado, setFormValidado] = useState(false);

    function manipularSubmissao(evento) {
        const form = evento.currentTarget;
        if (form.checkValidity()) {

            if (!props.modoEdicao) {
                despachante(registrarCategoria(categoria));
                if (estadoCat === ESTADO.ERRO) toast.error(mensagemCat);
                else toast.success(mensagemCat);
            }
            else {
                despachante(editarCategoria(categoria));
                if (estadoCat === ESTADO.ERRO) toast.error(mensagemCat);
                else toast.success(mensagemCat);
                props.setModoEdicao(false);
            }
            setCategoria({
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
        setCategoria({ ...categoria, [elemento]: valor });
    }

    if (estadoCat === ESTADO.PENDENTE)
        return (
            <>
                <Alert variant="primary">{mensagemCat}</Alert>
                <Spinner className='mt-4' animation="border" variant="success" />
            </>
        );

    else if (estadoCat === ESTADO.ERRO)
        return (
            <>
                <Alert variant="danger">{mensagemCat}</Alert>
                <Col md={{ offset: 1 }}>
                    <Button onClick={() => {
                        props.setExibirTabela(true);
                    }}>Voltar</Button>
                </Col>
            </>
        );

    else if (estadoCat === ESTADO.OCIOSO)
        return (
            <Container>
                <Form noValidate validated={formValidado} onSubmit={manipularSubmissao}>
                    <Row className="mb-4">
                        <Form.Group as={Col} md="4">
                            <Form.Label>Código</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                id="codigo"
                                name="codigo"
                                value={categoria.codigo}
                                disabled
                                onChange={manipularMudanca}
                            />
                            <Form.Control.Feedback type='invalid'>Por favor, informe o código da categoria!</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-4">
                        <Form.Group as={Col} md="12">
                            <Form.Label>Descrição</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                id="descricao"
                                name="descricao"
                                value={categoria.descricao}
                                onChange={manipularMudanca}
                            />
                            <Form.Control.Feedback type="invalid">Por favor, informe a descrição do categoria!</Form.Control.Feedback>
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