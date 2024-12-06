import { Alert } from "react-bootstrap";
import { useState } from "react";
import Pagina from "../layouts/Pagina";
import TabelaFornecedores from "./Tabelas/TabelaFornecedores";
import FormCadFornecedor from "./Formularios/FormCadFornecedor";


export default function TelaCadastroFornecedor(props) {
    const [exibirTabela, setExibirTabela] = useState(true);
    const [modoAlterar, setModoAlterar] = useState(false);
    const [fornecedorSelecionado, setFornecedorSelecionado] = useState({
        id: 0,
        nome: "",
        cnpj: "",
        cep: "",
        endereco: "",
        numero: "",
        telefone: "",
        produto: {}
    });

    return (
        <Pagina>
            <Alert className="text-center" variant="success">
                <h2 className="text-center">Tela de cadastro de Fornecedor</h2>
            </Alert>
            {
                exibirTabela ?
                    <TabelaFornecedores setExibirTabela={setExibirTabela} setModoAlterar={setModoAlterar}
                        setFornecedorSelecionado={setFornecedorSelecionado} /> :
                    <FormCadFornecedor setExibirTabela={setExibirTabela} setModoAlterar={setModoAlterar}
                        modoAlterar={modoAlterar}
                        setFornecedorSelecionado={setFornecedorSelecionado}
                        fornecedorSelecionado={fornecedorSelecionado} />
            }
        </Pagina>
    );
}