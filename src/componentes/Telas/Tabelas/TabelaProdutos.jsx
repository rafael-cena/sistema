import { Button, Container, Table } from "react-bootstrap";

export default function TabelaProdutos(props) {

    return (
        <>
            <Container>
                <Button className="mb-3" variant="primary" onClick={() => { props.setExibirTabela(false); }}>
                    Adicionar
                </Button>
                <Table striped bordered hover>
                    <thead>
                        <th>Código</th>
                        <th>Descrição</th>
                        <th>Preço de Custo</th>
                        <th>Preço de Venda</th>
                        <th>Estoque</th>
                        <th>Imagem</th>
                        <th>Validade</th>
                    </thead>

                    <tbody>
                        {
                            // ? -> verifica se é valido, se for executa
                            props.listaProdutos?.map((produto) => {
                                return (
                                    <tr>
                                        <td>{produto.codigo}</td>
                                        <td>{produto.descricao}</td>
                                        <td>{produto.precoCusto}</td>
                                        <td>{produto.precoVenda}</td>
                                        <td>{produto.qtdEstoque}</td>
                                        <td><img src={produto.urlImagem} alt="Imagem do produto" style={{ width: '30px'}}/></td>
                                        <td>{produto.dataValidade}</td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </Table>
            </Container>
        </>
    );
}