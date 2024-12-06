import { useState } from "react";
import { Alert } from "react-bootstrap";
import Pagina from "../layouts/Pagina";
import TabelaPrivilegios from "./Tabelas/TabelaPrivilegios";
import FormCadPrivilegios from "./Formularios/FormCadPrivilegio";

export default function TelaCadastroPrivilegio() {
    const [exibirTabela, setExibirTabela] = useState(true);
    const [modoEdicao, setModoEdicao] = useState(false);
    const [privilegioSelecionado, setPrivilegioSelecionado] = useState({
        codigo: 0,
        descricao: ""
    });

    return (
        <div>
            <Pagina>
                <Alert className="mt-02 mb-02 success text-center" variant="success">
                    <h2>
                        Cadastro de Privilegio
                    </h2>
                </Alert>
                {
                    exibirTabela ?
                        <TabelaPrivilegios setExibirTabela={setExibirTabela}
                            setModoEdicao={setModoEdicao}
                            setPrivilegioSelecionado={setPrivilegioSelecionado} /> :
                        <FormCadPrivilegios setExibirTabela={setExibirTabela}
                            privilegioSelecionado={privilegioSelecionado}
                            setPrivilegioSelecionado={setPrivilegioSelecionado}
                            modoEdicao={modoEdicao}
                            setModoEdicao={setModoEdicao} />
                }
            </Pagina>
        </div>
    );
}