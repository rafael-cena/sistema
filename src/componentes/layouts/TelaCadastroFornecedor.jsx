import FormCadFornecedor from "../Formularios/FormCadFornecedor";
import { Alert } from "react-bootstrap";

export default function TelaCadastroFornecedor(props) {
    return (
        <div>
            <Alert className="text-center" variant="success">
                <h2 className="text-center">Tela de cadastro de Fornecedor</h2>
            </Alert>
            <FormCadFornecedor />
        </div>
    );
}