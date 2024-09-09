import FormCadProduto from "./Formularios/FormCadProduto";
import Pagina from '../layouts/Pagina';
import { Alert } from "react-bootstrap";
import TabelaProdutos from "./Tabelas/TabelaProdutos";
import { useState } from "react";
import { produtos } from '../../dados/mockProdutos';

export default function TelaCadastroProduto(props) {
    const [exibirTabela, setExibirTabela] = useState(true);

    return (
        <Pagina>
            <Alert className="text-center" variant="success">
                <h2 className="text-center">Tela de cadastro de Produtos</h2>
            </Alert>
            {/* operador ternário */}
            {/*          if     return       else   return */}
            {exibirTabela ? <TabelaProdutos listaProdutos={produtos} setExibirTabela={setExibirTabela} /> : <FormCadProduto setExibirTabela={setExibirTabela} />}
        </Pagina>
    );
}