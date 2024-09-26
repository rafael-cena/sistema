import FormCadUsuario from "./Formularios/FormCadUsuario";
import Pagina from '../layouts/Pagina';
import { Alert } from "react-bootstrap";
import TabelaUsuarios from "./Tabelas/TabelaUsuario";
import { useState } from "react";
import { usuarios } from "../../dados/mockUsuarios";

export default function TelaCadastroUsuario(props) {
    const [exibirTabela, setExibirTabela] = useState(true);
    const [listaDeUsuario, setListaDeUsuario] = useState(usuarios);
    const [modoAlterar, setModoAlterar] = useState(false);
    const [usuarioSelecionado, setUsuarioSelecionado] = useState({
        userName: "",
        Nome: "",
        Sobrenome: "",
        Email: "",
        Senha: "",
        dataNascimento: ""
    });

    return (
        <Pagina>
            <Alert className="text-center" variant="success">
                <h2 className="text-center">Tela de cadastro de Usuarios</h2>
            </Alert>
            {
                exibirTabela ?
                    <TabelaUsuarios listaUsuario={listaDeUsuario} setListaDeUsuario={setListaDeUsuario}
                        setExibirTabela={setExibirTabela} setModoAlterar={setModoAlterar}
                        modoAlterar={modoAlterar} setUsuarioSelecionado={setUsuarioSelecionado} /> :
                    <FormCadUsuario listaUsuario={listaDeUsuario} setListaDeUsuario={setListaDeUsuario}
                        setExibirTabela={setExibirTabela} setModoAlterar={setModoAlterar}
                        modoAlterar={modoAlterar}
                        setUsuarioSelecionado={setUsuarioSelecionado} usuarioSelecionado={usuarioSelecionado} />
            }
        </Pagina>
    );
}