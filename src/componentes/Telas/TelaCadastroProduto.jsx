import FormCadProduto from "./Formularios/FormCadProduto";
import Pagina from '../layouts/Pagina';
import { Alert } from "react-bootstrap";
import TabelaProdutos from "./Tabelas/TabelaProdutos";
import { useState } from "react";
import { produtos } from '../../dados/mockProdutos';

export default function TelaCadastroProduto(props) {
    const [exibirTabela, setExibirTabela] = useState(true);
    const [listaDeProdutos, setListaDeProdutos] = useState(produtos);
    const [modoAlterar, setModoAlterar] = useState(false);
    const [produtoSelecionado, setProdutoSelecionado] = useState({
        codigo: 0,
        descricao: "",
        precoCusto: 0,
        precoVenda: 0,
        qtdEstoque: 0,
        urlImagem: "",
        dataValidade: ""
    });

    return (
        <Pagina>
            <Alert className="text-center" variant="success">
                <h2 className="text-center">Tela de cadastro de Produtos</h2>
            </Alert>
            {/* operador ternário */}
            {/*          if     return       else   return */}
            {
                exibirTabela ? 
                <TabelaProdutos listaProdutos={listaDeProdutos} setListaDeProdutos={setListaDeProdutos} 
                                setExibirTabela={setExibirTabela} setModoAlterar={setModoAlterar}
                                modoAlterar={modoAlterar} setProdutoSelecionado={setProdutoSelecionado} /> :
                <FormCadProduto listaProdutos={listaDeProdutos} setListaDeProdutos={setListaDeProdutos}
                                setExibirTabela={setExibirTabela} setModoAlterar={setModoAlterar}
                                modoAlterar={modoAlterar} 
                                setProdutoSelecionado={setProdutoSelecionado} produtoSelecionado={produtoSelecionado} />
            }
        </Pagina>
    );
}