import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

export default function FormCadProduto(props) {
    const [produto, setProduto] = useState({
        codigo: 0,
        descricao: "",
        precoCusto: 0,
        precoVenda: 0,
        qtdEstoque: 0,
        urlImagem: "",
        dataValidade: ""
    });

    const [validated, setFormValidated] = useState(false);

    function handleSubmit(evento) {
        const form = evento.currentTarget;
        if (form.checkValidity()) {
            if (props.modoAlterar) {
                props.setListaDeProdutos(props.listaProdutos.map((item) => {
                    return item.codigo !== props.produtoSelecionado.codigo ? item : props.produtoSelecionado;
                }));
                props.setModoAlterar(false);
            }
            else {
                //cadastrar produto
                props.setListaDeProdutos([...props.listaProdutos, produto]);
            }
            // exibir a tabela com o produto incluido/alterado
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
            props.setProdutoSelecionado({ ...props.produtoSelecionado, [elemento]: valor });
        }
        else {
            setProduto({ ...produto, [elemento]: valor });
        }
    }
    // "..." é um operador de espalhamento

    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
                <Form.Group as={Col} md="3">
                    <Form.Label>Codigo</Form.Label>
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
                                props.produtoSelecionado.codigo :
                                produto.codigo
                        }
                        onChange={manipularMudanca}
                    />
                </Form.Group>
                <Form.Group as={Col} md="9">
                    <Form.Label>Descrição</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="descricao"
                        name="descricao"
                        value={
                            props.modoAlterar ?
                                props.produtoSelecionado.descricao :
                                produto.descricao
                        }
                        onChange={manipularMudanca}
                    />
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="9">
                    <Form.Label>Url da imagem</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="urlImagem"
                        name="urlImagem"
                        value={
                            props.modoAlterar ?
                                props.produtoSelecionado.urlImagem :
                                produto.urlImagem
                        }
                        onChange={manipularMudanca}
                    />
                </Form.Group>
                <Form.Group as={Col} md="3">
                    <Form.Label>Data de Validade</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="dataValidade"
                        name="dataValidade"
                        value={
                            props.modoAlterar ?
                                props.produtoSelecionado.dataValidade :
                                produto.dataValidade
                        }
                        onChange={manipularMudanca}
                    />
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
                            name="precoCusto"
                            aria-describedby="inputGroupPrepend"
                            required
                            value={
                                props.modoAlterar ?
                                    props.produtoSelecionado.precoCusto :
                                    produto.precoCusto
                            }
                            onChange={manipularMudanca}
                        />
                    </InputGroup>
                </Form.Group>
                <Form.Group as={Col} md="4">
                    <Form.Label>Preço de Venda</Form.Label>
                    <InputGroup hasValidation>
                        <InputGroup.Text id="inputGroupPrepend">R$</InputGroup.Text>
                        <Form.Control
                            type="text"
                            id="precoVenda"
                            name="precoVenda"
                            aria-describedby="inputGroupPrepend"
                            required
                            value={
                                props.modoAlterar ?
                                    props.produtoSelecionado.precoVenda :
                                    produto.precoVenda
                            }
                            onChange={manipularMudanca}
                        />
                    </InputGroup>
                </Form.Group>
                <Form.Group as={Col} md="4">
                    <Form.Label>Estoque</Form.Label>
                    <InputGroup hasValidation>
                        <InputGroup.Text id="inputGroupPrepend">+</InputGroup.Text>
                        <Form.Control
                            type="number"
                            id="qtdEstoque"
                            name="qtdEstoque"
                            aria-describedby="inputGroupPrepend"
                            required
                            value={
                                props.modoAlterar ?
                                    props.produtoSelecionado.qtdEstoque :
                                    produto.qtdEstoque
                            }
                            onChange={manipularMudanca}
                        />
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