import FormCadCategoria from "./Formularios/FormCadCategoria";
import Pagina from '../layouts/Pagina';
import { Alert } from "react-bootstrap";
import TabelaCategorias from "./Tabelas/TabelaCategorias";
import { useState } from "react";
import { categorias } from "../../dados/mockCategoria";

export default function TelaCadastroCategoria(props) {
    const [exibirTabela, setExibirTabela] = useState(true);
    const [listaDeCategorias, setListaDeCategorias] = useState(categorias);
    const [modoAlterar, setModoAlterar] = useState(false);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState({
        codigo: 0,
        nome: "",
        descricao: "",
        status: ""
    });

    return (
        <Pagina>
            <Alert className="text-center" variant="success">
                <h2 className="text-center">Tela de cadastro de Categorias</h2>
            </Alert>
            {
                exibirTabela ?
                    <TabelaCategorias listaCategorias={listaDeCategorias} setListaDeCategorias={setListaDeCategorias}
                        setExibirTabela={setExibirTabela} setModoAlterar={setModoAlterar}
                        modoAlterar={modoAlterar} setCategoriaSelecionada={setCategoriaSelecionada} /> :
                    <FormCadCategoria listaCategorias={listaDeCategorias} setListaDeCategorias={setListaDeCategorias}
                        setExibirTabela={setExibirTabela} setModoAlterar={setModoAlterar}
                        modoAlterar={modoAlterar}
                        setCategoriaSelecionada={setCategoriaSelecionada} categoriaSelecionada={categoriaSelecionada} />
            }
        </Pagina>
    );
}
