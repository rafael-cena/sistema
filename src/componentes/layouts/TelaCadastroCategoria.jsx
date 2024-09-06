import FormCadCategoria from "../Formularios/FormCadCategoria";
import Pagina from './Pagina';
import { Alert } from "react-bootstrap";

export default function TelaCadastroCategoria(props) {
    return (
        <Pagina>
            <Alert className="text-center" variant="success">
                <h2 className="text-center">Tela de cadastro de Categoria</h2>
            </Alert>
            <FormCadCategoria />
        </Pagina>
    );
}