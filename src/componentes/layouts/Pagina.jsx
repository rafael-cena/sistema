import Cabecalho from "./Cabecalho";
import Menu from "./Menu";

export default function Pagina(props) {
    return (
        <div>
            <Cabecalho titulo="Sistema de Controle Gerencial" />
            <Menu />
            { props.children }
        </div>
    );
}