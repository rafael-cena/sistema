import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

export default function FormCadCategoria(props) {
    const [categoria, setCategoria] = useState({
        codigo: 0,
        nome: "",
        descricao: "",
        status: ""
    });

    const [validated, setFormValidated] = useState(false);

    function handleSubmit(evento) {
        const form = evento.currentTarget;
        if (form.checkValidity()) {
            if (props.modoAlterar) {
                // Atualiza a categoria selecionada
                props.setListaDeCategorias(props.listaCategorias.map((item) => {
                    return item.codigo !== props.categoriaSelecionada.codigo ? item : props.categoriaSelecionada;
                }));
                props.setModoAlterar(false);
            } else {
                // Cadastra nova categoria
                props.setListaDeCategorias([...props.listaCategorias, categoria]);
            }
            // Exibir a tabela de categorias
            props.setExibirTabela(true);
        } else {
            setFormValidated(true);
        }
        evento.preventDefault();
        evento.stopPropagation();
    }

    function manipularMudanca(evento) {
        const elemento = evento.target.name;
        const valor = evento.target.value;
        if (props.modoAlterar) {
            props.setCategoriaSelecionada({ ...props.categoriaSelecionada, [elemento]: valor });
        } else {
            setCategoria({ ...categoria, [elemento]: valor });
        }
    }

    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
                <Form.Group as={Col} md="3">
                    <Form.Label>Código</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="codigo"
                        name="codigo"
                        disabled={props.modoAlterar ? true : false}
                        value={props.modoAlterar ? props.categoriaSelecionada.codigo : categoria.codigo}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="9">
                    <Form.Label>Nome da Categoria</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="nome"
                        name="nome"
                        value={props.modoAlterar ? props.categoriaSelecionada.nome : categoria.nome}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="9">
                    <Form.Label>Descrição</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="descricao"
                        name="descricao"
                        value={props.modoAlterar ? props.categoriaSelecionada.descricao : categoria.descricao}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="3">
                    <Form.Label>Status</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="status"
                        name="status"
                        value={props.modoAlterar ? props.categoriaSelecionada.status : categoria.status}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
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
