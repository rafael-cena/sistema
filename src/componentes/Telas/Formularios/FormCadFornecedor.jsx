import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

export default function FormCadFornecedor(props) {
    const [fornecedor, setFornecedor] = useState({
        codigo: 0,
        descricao: "",
        cnpj: "",
        cidade: "",
        endereco: "",
        cep: "",
        prazoEntrega: ""
    });

    const [validated, setValidated] = useState(false);

    function handleSubmit(evento) {
        const form = evento.currentTarget;
        if (form.checkValidity()) {
            if (props.modoAlterar) {
                props.setListaDeFornecedores(props.listaFornecedores.map((item) => {
                    return item.codigo !== props.fornecedorSelecionado.codigo ? item : props.fornecedorSelecionado;
                }));
                props.setModoAlterar(false);
            }
            else {
                props.setListaDeFornecedores([...props.listaFornecedores, fornecedor]);
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
            props.setFornecedorSelecionado({ ...props.fornecedorSelecionado, [elemento]: valor });
        }
        else {
            setFornecedor({ ...fornecedor, [elemento]: valor });
        }
    }

    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
                <Form.Group as={Col} md="3" controlId="validationCustom02">
                    <Form.Label>Código</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="codigo"
                        name="codigo"
                        disabled={
                            props.modoAlterar ?
                                true :
                                false
                        }
                        value={
                            props.modoAlterar ?
                                props.fornecedorSelecionado.codigo :
                                fornecedor.codigo
                        }
                        onChange={manipularMudanca}
                    />
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="validationCustom01">
                    <Form.Label>Descrição</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="descricao"
                        name="descricao"
                        value={
                            props.modoAlterar ?
                                props.fornecedorSelecionado.descricao :
                                fornecedor.descricao
                        }
                        onChange={manipularMudanca}
                    />
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="validationCustom02">
                    <Form.Label>CNPJ</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        id='cnpj'
                        name='cnpj'
                        value={
                            props.modoAlterar ?
                                props.fornecedorSelecionado.cnpj :
                                fornecedor.cnpj
                        }
                        onChange={manipularMudanca}
                    />
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="4" controlId="validationCustom03">
                    <Form.Label>Cidade</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        id='cidade'
                        name='cidade'
                        value={
                            props.modoAlterar ?
                                props.fornecedorSelecionado.cidade :
                                fornecedor.cidade
                        }
                        onChange={manipularMudanca}
                    />
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationCustom04">
                    <Form.Label>Endereço</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        id='endereco'
                        name='endereco'
                        value={
                            props.modoAlterar ?
                                props.fornecedorSelecionado.endereco :
                                fornecedor.endereco
                        }
                        onChange={manipularMudanca}
                    />
                </Form.Group>
                <Form.Group as={Col} md="2" controlId="validationCustom05">
                    <Form.Label>CEP</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        id='cep'
                        name='cep'
                        value={
                            props.modoAlterar ?
                                props.fornecedorSelecionado.cep :
                                fornecedor.cep
                        }
                    />
                </Form.Group>
                <Form.Group as={Col} md="2" controlId="validationCustom01">
                    <Form.Label>Prazo de Entrega</Form.Label>
                    <Form.Control
                        required
                        type="date"
                        id="prazoEntrega"
                        name="prazoEntrega"
                        value={
                            props.modoAlterar ?
                                props.fornecedorSelecionado.prazoEntrega :
                                fornecedor.prazoEntrega
                        }
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
    );
}

