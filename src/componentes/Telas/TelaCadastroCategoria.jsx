import { useState } from "react";
import { Alert } from "react-bootstrap";
import Pagina from "../layouts/Pagina";
import TabelaCategorias from "./Tabelas/TabelaCategorias";
import FormCadCategorias from "./Formularios/FormCadCategoria";

export default function TelaCadastroCategoria() {
    const [exibirTabela, setExibirTabela] = useState(true);
    const [modoEdicao, setModoEdicao] = useState(false);
    const [categoriaSelecionado, setCategoriaSelecionado] = useState({
        codigo: 0,
        descricao: ""
    });

    return (
        <div>
            <Pagina>
                <Alert className="mt-02 mb-02 success text-center" variant="success">
                    <h2>
                        Cadastro de Categoria
                    </h2>
                </Alert>
                {
                    exibirTabela ?
                        <TabelaCategorias setExibirTabela={setExibirTabela}
                            setModoEdicao={setModoEdicao}
                            setCategoriaSelecionado={setCategoriaSelecionado} /> :
                        <FormCadCategorias setExibirTabela={setExibirTabela}
                            categoriaSelecionado={categoriaSelecionado}
                            setCategoriaSelecionado={setCategoriaSelecionado}
                            modoEdicao={modoEdicao}
                            setModoEdicao={setModoEdicao}

                        />
                }
            </Pagina>
        </div>
    );

}