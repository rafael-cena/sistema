import FormCadProduto from "../Formularios/FormCadProduto";
import Pagina from './Pagina';
import { Alert } from "react-bootstrap";

export default function TelaCadastroProduto(props) {



    return (
        <Pagina>
            <Alert className="text-center" variant="success">
                <h2 className="text-center">Tela de cadastro de Produtos</h2>
            </Alert>
            <FormCadProduto />
        </Pagina>
    );
}