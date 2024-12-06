import { Button, Spinner, Col, Form, InputGroup, Row, Alert } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import ESTADO from '../../../redux/estados';
import { editarFornecedor, registrarFornecedor } from '../../../redux/fornecedorReducer';
import { buscarProdutos } from '../../../redux/produtoReducer';

export default function FormCadFornecedor(props) {
    const { estadoF, mensagemF } = useSelector((state) => state.fornecedor);
    //recuperar o estado da aplicacao / fatia produto                        // ↬ produto nomeado na store
    const { estado, mensagem, listaDeProdutos } = useSelector((state) => state.produto);
    const despachante = useDispatch();

    const [fornecedor, setFornecedor] = useState(props.fornecedorSelecionado);
    const [formValidado, setFormValidado] = useState(false);
    const [temProdutos, setTemProdutos] = useState(false);

    useEffect(() => {
        if (estado === ESTADO.OCIOSO && listaDeProdutos.length > 0) {
            setTemProdutos(true);
            if (mensagem !== "")
                toast.success(mensagem);
        }
        else if (estado === ESTADO.PENDENTE)
            toast(mensagem, {
                icon: '⏳'
            });
    }, [estado]);

    useEffect(() => {
        despachante(buscarProdutos());
    }, [despachante]);

    function selecionarProduto(evento) {
        setFornecedor({ ...fornecedor, produto: { codigo: evento.currentTarget.value } });
    }

    function manipularSubmissao(evento) {
        const form = evento.currentTarget;
        if (form.checkValidity()) {
            if (!props.modoAlterar) {
                despachante(registrarFornecedor(fornecedor));
                if (estadoF === ESTADO.ERRO) toast.error(mensagemF);
                else toast.success(mensagemF);
            }
            else {
                despachante(editarFornecedor(fornecedor));
                if (estadoF === ESTADO.ERRO) toast.error(mensagemF);
                else toast.success(mensagemF);

                //voltar para o modo de inclusão
                props.setModoAlterar(false);
            }
            setFornecedor({
                id: 0,
                nome: "",
                cnpj: "",
                cep: "",
                endereco: "",
                numero: "",
                telefone: "",
                produto: {}
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
        setFornecedor({ ...fornecedor, [elemento]: valor });
    }

    if (estadoF === ESTADO.PENDENTE)
        return (
            <>
                <Alert variant="primary">{mensagemF}</Alert>
                <Spinner className='mt-4' animation="border" variant="success" />
            </>
        );

    else if (estadoF === ESTADO.ERRO)
        return (
            <>
                <Alert variant="danger">{mensagemF}</Alert>
                <Col md={{ offset: 1 }}>
                    <Button onClick={() => {
                        props.setExibirTabela(true);
                    }}>Voltar</Button>
                </Col>
            </>
        );

    else if (estadoF === ESTADO.OCIOSO)
        return (
            <>
                <Toaster position='top-right' />
                <Form noValidate validated={formValidado} onSubmit={manipularSubmissao}>
                    <Row className="mb-4">
                        <Form.Group as={Col} md="8">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                id="nome"
                                name="nome"
                                value={fornecedor.nome}
                                onChange={manipularMudanca}
                            />
                        </Form.Group>
                        <Form.Group as={Col} md="4">
                            <Form.Label>CNPJ</Form.Label>
                            <Form.Control
                                type="text"
                                id="cnpj"
                                name="cnpj"
                                value={fornecedor.cnpj}
                                onChange={manipularMudanca}
                                required
                            />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="6" controlId="validationCustom01">
                            <Form.Label>Endereço</Form.Label>
                            <Form.Control
                                type='text'
                                id='endereco'
                                name='endereco'
                                value={fornecedor.endereco}
                                onChange={manipularMudanca}
                            />
                        </Form.Group>
                        <Form.Group as={Col} md="2" controlId="validationCustom01">
                            <Form.Label>Número</Form.Label>
                            <Form.Control
                                required
                                type='text'
                                id='numero'
                                name='numero'
                                value={fornecedor.numero}
                                onChange={manipularMudanca}
                            />
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId="validationCustom01">
                            <Form.Label>CEP</Form.Label>
                            <Form.Control
                                required
                                type='text'
                                id='cep'
                                name='cep'
                                value={fornecedor.cep}
                                onChange={manipularMudanca}
                            />
                        </Form.Group>
                    </Row>
                    <Row className="mb-4">
                        <Form.Group as={Col} md="4">
                            <Form.Label>Telefone</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                id="telefone"
                                name="telefone"
                                value={fornecedor.telefone}
                                onChange={manipularMudanca}
                            />
                        </Form.Group>
                        <Form.Group as={Col} md={temProdutos ? 8 : 7}>
                            <Form.Label>Produto: </Form.Label>
                            <Form.Select
                                id='produto'
                                name='produto'
                                value={fornecedor.produto.descricao}
                                onChange={selecionarProduto}>
                                <option selected value={null} disabled>Selecione um produto</option>
                                {   
                                    listaDeProdutos.map((produto) => {
                                        return <option value={produto.codigo}>
                                            {produto.descricao}
                                        </option>
                                    })
                                }
                            </Form.Select>
                        </Form.Group>
                        <Form.Group as={Col} md={1}>
                            {
                                temProdutos ? "" : <Spinner className='mt-4' animation="border" variant="success" />
                            }
                        </Form.Group>
                    </Row>
                    <Row className='mt-2 mb-2'>
                        <Col md={1}>
                            <Button type="submit" disabled={!temProdutos}>{props.modoAlterar ? "Alterar" : "Confirmar"}</Button>
                        </Col>
                        <Col md={{ offset: 1 }}>
                            <Button onClick={() => {
                                props.setExibirTabela(true);
                            }}>Voltar</Button>
                        </Col>
                    </Row>
                </Form>
                {
                    !temProdutos ? <Toaster position="top-right" reverseOrder={false}></Toaster> : ""
                }
            </>
        );
}