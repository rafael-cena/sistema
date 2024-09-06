import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

export default function FormCadCliente() {
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    };

    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="validationCustom01">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Digite o seu nome"
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="validationCustom02">
                    <Form.Label>CPF</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Insira o seu CPF"
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="8" controlId="validationCustom01">
                    <Form.Label>Endereço</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Digite o seu endereco (Rua, Número)"
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationCustom01">
                    <Form.Label>CEP</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Digite o seu CEP"
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="3" controlId="validationCustom03">
                    <Form.Label>Telefone</Form.Label>
                    <Form.Control type="text" placeholder="(xx)xxxxx-xxxx" required />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid city.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="9" controlId="validationCustom04">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text" placeholder="email@email.com" required />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid state.
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Form.Group className="mb-3">
                <Form.Check
                    required
                    label="Aceito os termos e condições"
                    feedback="You must agree before submitting."
                    feedbackType="invalid"
                />
            </Form.Group>
            <Button type="submit">Cadastrar</Button>
        </Form>
    )
}