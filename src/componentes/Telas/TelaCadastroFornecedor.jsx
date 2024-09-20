import FormCadFornecedor from "./Formularios/FormCadFornecedor";
import Pagina from '../layouts/Pagina';
import { Alert } from "react-bootstrap";
import TabelaFornecedores from "./Tabelas/TabelaFornecedores";
import { useState } from "react";
import { fornecedores } from "../../dados/mockFornecedores";

export default function TelaCadastroFornecedor(props) {
    const [exibirTabela, setExibirTabela] = useState(true);
    const [ListaDeFornecedores, setListaDeFornecedores] = useState(fornecedores);
    const [modoAlterar, setModoAlterar] = useState(false);
    const [fornecedorSelecionado, setFornecedorSelecionado] = useState({
        codigo: 0,
        descricao: "",
        cnpj: "",
        cidade: "",
        endereco: "",
        cep: "",
        prazoEntrega: ""
    });

    return (
        <Pagina>
            <Alert className="text-center" variant="success">
                <h2 className="text-center">Tela de cadastro de Fornecedor</h2>
            </Alert>
            {
                exibirTabela ?
                <TabelaFornecedores listaFornecedores={ListaDeFornecedores} setListaDeFornecedores={setListaDeFornecedores}
                                    setExibirTabela={setExibirTabela} setModoAlterar={setModoAlterar}
                                    modoAlterar={modoAlterar} setFornecedorSelecionado={setFornecedorSelecionado} /> :
                <FormCadFornecedor  listaFornecedores={ListaDeFornecedores} setListaDeFornecedores={setListaDeFornecedores}
                                    setExibirTabela={setExibirTabela} setModoAlterar={setModoAlterar}
                                    modoAlterar={modoAlterar} 
                                    setFornecedorSelecionado={setFornecedorSelecionado} fornecedorSelecionado={fornecedorSelecionado} />
            }
        </Pagina>
    );
}