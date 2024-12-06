import { useState } from "react";
import { Alert } from "react-bootstrap";
import Pagina from '../layouts/Pagina';
import TabelaClientes from "./Tabelas/TabelaClientes";
import FormCadCliente from "./Formularios/FormCadCliente";

export default function TelaCadastroCliente(props) {
    const [exibirTabela, setExibirTabela] = useState(true);
    const [modoAlterar, setModoAlterar] = useState(false);
    const [clienteSelecionado, setClienteSelecionado] = useState({
        id: "",
        nome: "",
        cpf: "",
        cep: "",
        endereco: "",
        numero: 0,
        telefone: "",
        usuario: {
            username: ""
        }
    });

    return (
        <Pagina>
            <Alert className="text-center" variant="success">
                <h2 className="text-center">Tela de cadastro de Clientes</h2>
            </Alert>
            {
                exibirTabela ? 
                <TabelaClientes setExibirTabela={setExibirTabela} setModoAlterar={setModoAlterar}
                                setClienteSelecionado={setClienteSelecionado} /> :
                <FormCadCliente setExibirTabela={setExibirTabela} setModoAlterar={setModoAlterar}
                                modoAlterar={modoAlterar} setClienteSelecionado={setClienteSelecionado}
                                clienteSelecionado={clienteSelecionado} />
            }
        </Pagina>
    );
}