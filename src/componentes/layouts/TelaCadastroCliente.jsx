import FormCadCliente from "../Formularios/FormCadCliente";
import { Alert } from "react-bootstrap";

export default function TelaCadastroCliente(props) {
    return (
        <div>
            <Alert className="text-center" variant="success">
                <h2 className="text-center">Tela de cadastro de Cliente</h2>
            </Alert>
            <FormCadCliente />
        </div>
    );
}