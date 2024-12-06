import { Button, Container, Form } from "react-bootstrap";
import { useContext, useEffect, useRef, useState } from "react";
import { ContextoUsuario } from "../../App";
import { useDispatch, useSelector } from "react-redux";
import { authLogin } from "../../redux/loginReducer";
import ESTADO from "../../redux/estados";

export default function TelaLogin() {
    const nomeUsuario = useRef();
    const senha = useRef();
    const { usuario, setUsuario } = useContext(ContextoUsuario);

    const { estadoL, status, usuarioL } = useSelector((state) => state.login);
    const disp = useDispatch();

    useEffect(() => {
        if (estadoL === ESTADO.OCIOSO) {
            if (status) {
                setUsuario({
                    ...usuario,
                    usuario: usuarioL,
                    logado: true
                });
            }
        }
    }, [estadoL]);

    function manipularSubmissao(evento) {
        disp(authLogin({
            username: nomeUsuario.current.value,
            senha: senha.current.value
        }));

        evento.preventDefault();
        evento.stopPropagation();
    }

    return (
        <Container className="w-25 border p-2">
            <Form onSubmit={manipularSubmissao}>
                <Form.Group className="mb-3">
                    <Form.Label>Usuário</Form.Label>
                    <Form.Control
                        type="text"
                        id="usuario"
                        name="usuario"
                        required
                        ref={nomeUsuario}
                        placeholder="Informe o usuário" />
                    <Form.Text className="text-muted">
                        Nunca compartilhe suas credenciais de acesso!
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Senha</Form.Label>
                    <Form.Control
                        type="password"
                        id="senha"
                        name="senha"
                        required
                        ref={senha}
                        placeholder="Password" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Login
                </Button>
            </Form>
        </Container>
    );
}