import { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import Pagina from '../layouts/Pagina';
import TabelaUsuarios from "./Tabelas/TabelaUsuario";
import FormCadUsuario from "./Formularios/FormCadUsuario";

export default function TelaCadastroUsuario() {
    const [exibirTabela, setExibirTabela] = useState(true);
    const [modoAlterar, setModoAlterar] = useState(false);
    const [usuarioSelecionado, setUsuarioSelecionado] = useState({
        id: "",
        username: "",
        senha: "",
        nome: "",
        email: "",
        privilegio: {}
    });

    return (
        <Pagina>
            <Alert className="text-center" variant="success">
                <h2 className="text-center">Tela de cadastro de Usuarios</h2>
            </Alert>
            {
                exibirTabela ?
                    <TabelaUsuarios setExibirTabela={setExibirTabela} setModoAlterar={setModoAlterar}
                        setUsuarioSelecionado={setUsuarioSelecionado} /> :
                    <FormCadUsuario setExibirTabela={setExibirTabela} setModoAlterar={setModoAlterar}
                        modoAlterar={modoAlterar}
                        setUsuarioSelecionado={setUsuarioSelecionado} usuarioSelecionado={usuarioSelecionado} />
            }
        </Pagina>
    );
}