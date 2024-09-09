import Pagina from '../layouts/Pagina';
import imgErro from '../../assets/imagens/erro.jpg';
import { Container } from 'react-bootstrap';

export default function Tela404(props) {
    return (
        <Pagina>
            <Container>
                <img src={imgErro} alt='imagem de erro' />
                <h1 className='text-center'>O recurso solicitado não existe!</h1>
                <h6 className='text-center'>escorrega os dados do cartão no meu zap que da certo</h6>
            </Container>
        </Pagina>
    );
}