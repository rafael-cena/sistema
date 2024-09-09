import FormCadFornecedor from "./Formularios/FormCadFornecedor";
import Pagina from '../layouts/Pagina';
import { Alert } from "react-bootstrap";

export default function TelaCadastroFornecedor(props) {
    return (
        <Pagina>
            <Alert className="text-center" variant="success">
                <h2 className="text-center">Tela de cadastro de Fornecedor</h2>
            </Alert>
            <FormCadFornecedor />
        </Pagina>
    );
}