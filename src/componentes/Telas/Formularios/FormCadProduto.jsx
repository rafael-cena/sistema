import { Button, Spinner, Col, Form, InputGroup, Row, Alert } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { editarProduto, registrarProduto } from '../../../redux/produtoReducer';
import { useDispatch, useSelector } from 'react-redux';
import ESTADO from '../../../redux/estados';

export default function FormCadProdutos(props) {
    //recuperar o estado da aplicacao / fatia produto                        // ↬ produto nomeado na store
    const { estado, mensagem, listaDeProdutos } = useSelector((state) => state.produto);
    const { estadoCat, mensagemCat, listaDeCategorias } = useSelector((state) => state.categoria);
    const despachante = useDispatch();

    const [produto, setProduto] = useState(props.produtoSelecionado);
    const [formValidado, setFormValidado] = useState(false);
    const [temCategorias, setTemCategorias] = useState(false);

    useEffect(() => {
        if (estadoCat === ESTADO.OCIOSO && listaDeCategorias.length > 0) {
            setTemCategorias(true);
            if (mensagemCat !== "")
                toast.success(mensagemCat);
        }
        else if (estadoCat === ESTADO.PENDENTE)
            toast(mensagemCat, {
                icon: '⏳'
            });
    }, [estadoCat]);

    function selecionarCategoria(evento) {
        setProduto({ ...produto, categoria: { codigo: evento.currentTarget.value } })
    }

    function manipularSubmissao(evento) {
        const form = evento.currentTarget;
        if (form.checkValidity()) {
            if (!props.modoEdicao) {
                despachante(registrarProduto(produto));
                if (estado === ESTADO.ERRO) toast.error(mensagem);
                else toast.success(mensagem);
            }
            else {
                despachante(editarProduto(produto));
                if (estado === ESTADO.ERRO) toast.error(mensagem);
                else toast.success(mensagem);

                //voltar para o modo de inclusão
                props.setModoEdicao(false);
            }
            setProduto({
                codigo: 0,
                descricao: "",
                precoCusto: 0,
                precoVenda: 0,
                qtdEstoque: 0,
                urlImagem: "",
                dataValidade: "",
                categoria: {}
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
        setProduto({ ...produto, [elemento]: valor });
    }

    if (estado === ESTADO.PENDENTE)
        return (
            <>
                <Alert variant="primary">{mensagem}</Alert>
                <Spinner className='mt-4' animation="border" variant="success" />
            </>
        );

    else if (estado === ESTADO.ERRO)
        return (
            <>
                <Alert variant="danger">{mensagem}</Alert>
                <Col md={{ offset: 1 }}>
                    <Button onClick={() => {
                        props.setExibirTabela(true);
                    }}>Voltar</Button>
                </Col>
            </>
        );

    else if (estado === ESTADO.OCIOSO)
        return (
            <>
                <Toaster position='top-right' />
                <Form noValidate validated={formValidado} onSubmit={manipularSubmissao}>
                    <Row className="mb-4">
                        <Form.Group as={Col} md="4">
                            <Form.Label>Código</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                id="codigo"
                                name="codigo"
                                value={produto.codigo}
                                disabled
                                onChange={manipularMudanca}
                            />
                            <Form.Control.Feedback type='invalid'>Por favor, informe o código do produto!</Form.Control.Feedback>
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
                                value={produto.descricao}
                                onChange={manipularMudanca}
                            />
                            <Form.Control.Feedback type="invalid">Por favor, informe a descrição do produto!</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-4">
                        <Form.Group as={Col} md="4">
                            <Form.Label>Preço de Custo:</Form.Label>
                            <InputGroup hasValidation>
                                <InputGroup.Text id="precoCusto">R$</InputGroup.Text>
                                <Form.Control
                                    type="text"
                                    id="precoCusto"
                                    name="precoCusto"
                                    aria-describedby="precoCusto"
                                    value={produto.precoCusto}
                                    onChange={manipularMudanca}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Por favor, informe o preço de custo!
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                        <Form.Group as={Col} md="4">
                            <Form.Label>Preço de Venda:</Form.Label>
                            <InputGroup hasValidation>
                                <InputGroup.Text id="precoVenda">R$</InputGroup.Text>
                                <Form.Control
                                    type="text"
                                    id="precoVenda"
                                    name="precoVenda"
                                    aria-describedby="precoVenda"
                                    value={produto.precoVenda}
                                    onChange={manipularMudanca}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Por favor, informe o preço de venda!
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                        <Form.Group as={Col} md="4">
                            <Form.Label>Qtd em estoque:</Form.Label>
                            <InputGroup hasValidation>
                                <InputGroup.Text id="qtdEstoque">+</InputGroup.Text>
                                <Form.Control
                                    type="text"
                                    id="qtdEstoque"
                                    name="qtdEstoque"
                                    aria-describedby="qtdEstoque"
                                    value={produto.qtdEstoque}
                                    onChange={manipularMudanca}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Por favor, informe a quantidade em estoque!
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                    </Row>
                    <Row className="mb-4">
                        <Form.Group as={Col} md="12">
                            <Form.Label>Url da imagem:</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                id="urlImagem"
                                name="urlImagem"
                                value={produto.urlImagem}
                                onChange={manipularMudanca}
                            />
                            <Form.Control.Feedback type="invalid">Por favor, informe a url da imagem do produto!</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-4">
                        <Form.Group as={Col} md="4">
                            <Form.Label>Válido até:</Form.Label>
                            <Form.Control
                                required
                                type="date"
                                id="dataValidade"
                                name="dataValidade"
                                onChange={(evento) => {
                                    const data = new Date(evento.target.value);
                                    setProduto({ ...produto, dataValidade: data.toLocaleDateString() });
                                }}
                            />
                            <Form.Control.Feedback type="invalid">Por favor, informe a data de validade do produto!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md={temCategorias ? 8 : 7}>
                            <Form.Label>Categoria: </Form.Label>
                            <Form.Select id='categoria' name='categoria' value={produto.categoria.descricao} onChange={selecionarCategoria}>
                                <option selected value={null} disabled>Selecione uma categoria</option>
                                {   //criar em tempo de execucao as categorias existentes no banco de dados
                                    listaDeCategorias.map((categoria) => {
                                        return <option value={categoria.codigo}>
                                            {categoria.descricao}
                                        </option>
                                    })
                                }
                            </Form.Select>
                        </Form.Group>
                        <Form.Group as={Col} md={1}>
                            {
                                temCategorias ? "" : <Spinner className='mt-4' animation="border" variant="success" />
                            }
                        </Form.Group>
                    </Row>
                    <Row className='mt-2 mb-2'>
                        <Col md={1}>
                            <Button type="submit" disabled={!temCategorias}>{props.modoEdicao ? "Alterar" : "Confirmar"}</Button>
                        </Col>
                        <Col md={{ offset: 1 }}>
                            <Button onClick={() => {
                                props.setExibirTabela(true);
                            }}>Voltar</Button>
                        </Col>
                    </Row>
                </Form>
                {
                    !temCategorias ? <Toaster position="top-right" reverseOrder={false}></Toaster> : ""
                }
            </>
        );
}