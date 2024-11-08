import { useState } from 'react';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import { alterarCategoria, gravarCategoria } from '../../../servicos/servicoCategoria';
import toast from 'react-hot-toast';

export default function FormCadCategorias(props) {
    const [categoria, setCategoria] = useState(props.categoriaSelecionado);
    const [formValidado, setFormValidado] = useState(false);

    function manipularSubmissao(evento) {
        const form = evento.currentTarget;
        if (form.checkValidity()) {

            if (!props.modoEdicao) {
                //cadastrar o categoria
                gravarCategoria(categoria).then((resultado) => {
                    if (resultado.status) {
                        //exibir tabela com o Categoria incluído
                        props.setExibirTabela(true);
                    }
                    else {
                        toast.error(resultado.mensagem);
                    }
                });
            }
            else {
                alterarCategoria(categoria).then((resultado) => {
                    if (resultado.status) {
                        toast.success(resultado.mensagem);
                    }
                    else {
                        toast.error(resultado.mensagem);
                    }
                });

                //voltar para o modo de inclusão
                props.setModoEdicao(false);
                props.setCategoriaSelecionado({
                    codigo: 0,
                    descricao: ""
                });
                props.setExibirTabela(true);
            }

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