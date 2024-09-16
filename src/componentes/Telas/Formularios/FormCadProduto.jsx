import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

export default function FormCadProduto(props) {
    const [produto, setProduto] = useState({
        codigo: "",
        descricao: "",
        precoCusto: 0,
        precoVenda: 0,
        qtdEstoque: 0,
        urlImagem: "",
        dataValidade: ""
    });

    function manipularMudanca(evento) {
        const elemento = evento.target.name;
        const valor = evento.target.value;
        setProduto({ ...produto, [elemento]: valor }); // "..." é um operador de espalhamento
    }

    const [validated, setFormValidated] = useState(false);

    function handleSubmit(evento) {
        const form = evento.currentTarget;
        if (form.checkValidity()) {
            //cadastrar produto
            props.setListaDeProdutos([...props.listaDeProdutos], produto);
            // exibir a tabela com o produto incluido
            props.setExibirTabela(true);
        }
        else {
            setFormValidated(true);
        }
        evento.preventDefault();
        evento.stopPropagation();
    }

    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
                <Form.Group as={Col} md="3">
                    <Form.Label>Codigo</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="codigo"
                        value={produto.codigo}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="9">
                    <Form.Label>Descrição</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="descricao"
                        value={produto.descricao}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="9">
                    <Form.Label>Url da imagem</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="urlImagem"
                        value={produto.urlImagem}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="3">
                    <Form.Label>Data de Validade</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="dataValidade"
                        value={produto.dataValidade}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="4">
                    <Form.Label>Preço de Custo</Form.Label>
                    <InputGroup hasValidation>
                        <InputGroup.Text id="inputGroupPrepend">R$</InputGroup.Text>
                        <Form.Control
                            type="text"
                            id="precoCusto"
                            aria-describedby="inputGroupPrepend"
                            required
                            value={produto.precoCusto}
                            onChange={manipularMudanca}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please choose a username.
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
                <Form.Group as={Col} md="4">
                    <Form.Label>Preço de Venda</Form.Label>
                    <InputGroup hasValidation>
                        <InputGroup.Text id="inputGroupPrepend">R$</InputGroup.Text>
                        <Form.Control
                            type="text"
                            id="precoVenda"
                            aria-describedby="inputGroupPrepend"
                            required
                            value={produto.precoVenda}
                            onChange={manipularMudanca}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please choose a username.
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
                <Form.Group as={Col} md="4">
                    <Form.Label>Estoque</Form.Label>
                    <InputGroup hasValidation>
                        <InputGroup.Text id="inputGroupPrepend">+</InputGroup.Text>
                        <Form.Control
                            type="text"
                            id="qtdEstoque"
                            aria-describedby="inputGroupPrepend"
                            required
                            value={produto.qtdEstoque}
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
                        <Button type="submit">Cadastrar</Button> :
                        <Button type="submit">Alterar</Button>
                    }
                </Col>
                <Col md={{ offset: 1 }}>
                    <Button onClick={() => { props.setExibirTabela(true); }}>Voltar</Button>
                </Col>
            </Row>
        </Form>
    );
}