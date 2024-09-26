import FormCadEntregador from './Formularios/FormCadEntregador';
import Pagina from '../layouts/Pagina';
import { Alert } from "react-bootstrap";
import TabelaEntregador from './Tabelas/TabelaEntregador';
import { useState } from "react";
import { entregadores } from '../../dados/mockEntregadores';

export default function TelaCadastroEntregador(props) {
    const [exibirTabela, setExibirTabela] = useState(true);
    const [listaDeEntregador, setListaDeEntregador] = useState(entregadores);
    const [modoAlterar, setModoAlterar] = useState(false);
    const [entregadorSelecionado, setEntregadorSelecionado] = useState({
        cpf: "",
        telefone: "",
        nome: "",
        sobrenome: "",
        endereco: "",
        dataNascimento: "",
        placaVeiculo: ""
    });

    return (
        <Pagina>
            <Alert className="text-center" variant="success">
                <h2 className="text-center">Tela de cadastro de Entregador</h2>
            </Alert>
            {
                exibirTabela ?
                    <TabelaEntregador listaEntregador={listaDeEntregador} setListaDeEntregador={setListaDeEntregador}
                        setExibirTabela={setExibirTabela} setModoAlterar={setModoAlterar}
                        modoAlterar={modoAlterar} setEntregadorSelecionado={setEntregadorSelecionado} /> :
                    <FormCadEntregador listaEntregador={listaDeEntregador} setListaDeEntregador={setListaDeEntregador}
                        setExibirTabela={setExibirTabela} setModoAlterar={setModoAlterar}
                        modoAlterar={modoAlterar}
                        setEntregadorSelecionado={setEntregadorSelecionado} entregadorSelecionado={entregadorSelecionado} />
            }
        </Pagina>
    );
}