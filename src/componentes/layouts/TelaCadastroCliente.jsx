import FormCadCliente from "../Formularios/FormCadCliente";
import Pagina from './Pagina';
import { Alert } from "react-bootstrap";

export default function TelaCadastroCliente(props) {
    return (
        <Pagina>
            <Alert className="text-center" variant="success">
                <h2 className="text-center">Tela de cadastro de Cliente</h2>
            </Alert>
            <FormCadCliente />
        </Pagina>
    );
}