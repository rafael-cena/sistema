import { Alert, Button, Container, Spinner, Table } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { apagarUsuario, buscarUsuarios } from "../../../redux/usuarioReducer";
import { useEffect } from "react";
import ESTADO from "../../../redux/estados";

export default function TabelaUsuarios(props) {
    const { estadoU, mensagemU, listaDeUsuarios } = useSelector((state) => state.usuario);
    const despachante = useDispatch();

    useEffect(() => {
        despachante(buscarUsuarios());
    }, [despachante]);

    function alterarUsuario(user) {
        props.setModoAlterar(true);
        props.setUsuarioSelecionado({
            id: user.id,
            username: user.username,
            senha: "",
            nome: user.nome,
            email: user.email,
            privilegio: {
                codigo: user.privilegio.codigo,
                descricao: user.privilegio.descricao
            }
        });
        props.setExibirTabela(false);
    }

    function excluirUsuario(user) {
        if (window.confirm("Deseja realmente excluir o Usuario " + user.username)) {
            despachante(apagarUsuario(user));
        }
    }

    if (estadoU === ESTADO.PENDENTE) {
        return (
            <>
                <Spinner className='mt-4' animation="border" variant="success" />
                <Alert variant="primary">{mensagemU}</Alert>
            </>
        );
    }
    else if (estadoU === ESTADO.ERRO) {
        return (
            <>
                <Alert variant="danger">{mensagemU}</Alert>
            </>
        );
    }
    else if (estadoU === ESTADO.OCIOSO) {
        return (
            <>
                <Container>
                    <Button className="mb-3" variant="primary" onClick={() => {
                        props.setExibirTabela(false);
                        props.setModoAlterar(false);
                        props.setUsuarioSelecionado({
                            id: "",
                            username: "",
                            senha: "",
                            nome: "",
                            email: "",
                            privilegio: {}
                        });
                    }}>
                        Adicionar
                    </Button>
                    <Table striped bordered hover>
                        <thead>
                            <th>Username</th>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Privilegio</th>
                            <th>Ações</th>
                        </thead>

                        <tbody>
                            {
                                listaDeUsuarios?.map((user) => {
                                    return (
                                        <tr>
                                            <td>{user.username}</td>
                                            <td>{user.nome}</td>
                                            <td>{user.email}</td>
                                            <td>{user.privilegio.descricao}</td>
                                                <td>
                                                    <Button onClick={() => { alterarUsuario(user) }} variant="warning">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                                        </svg>
                                                    </Button> <Button onClick={() => { excluirUsuario(user) }} variant="danger">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                                                        </svg>
                                                    </Button>
                                                </td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </Table>
                    <p>Quantidade de usuarios cadastrados: {listaDeUsuarios.length}</p>
                </Container>
                <Toaster position="top-right" reverseOrder={false} />
            </>
        );
    }
}