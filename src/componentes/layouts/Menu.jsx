import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';

export default function Menu(props) {

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#" as={Link} to="/">Menu</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavDropdown title="Cadastros" id="basic-nav-dropdown">
                            <NavDropdown.Item href='#' as={Link} to='/cliente'>Clientes</NavDropdown.Item>
                            <NavDropdown.Item href='#' as={Link} to='/fornecedor'>Fornecedores</NavDropdown.Item>
                            <NavDropdown.Item href='#' as={Link} to='/produto'>Produtos</NavDropdown.Item>
                            <NavDropdown.Item href='#' as={Link} to='/categoria'>Categorias</NavDropdown.Item>
                        </NavDropdown>

                        <NavDropdown title="Operações" id="basic-nav-dropdown">
                            <NavDropdown.Item href='#' as={Link} to='/compra'>Compra</NavDropdown.Item>
                            <NavDropdown.Item href='#' as={Link} to='/venda'>Venda</NavDropdown.Item>
                        </NavDropdown>

                        <NavDropdown title="Relatórios" id="basic-nav-dropdown">
                            <NavDropdown.Item href='#' as={Link} to='/relatorio-cliente'>Clientes</NavDropdown.Item>
                            <NavDropdown.Item href='#' as={Link} to='/relatorio-fornecedor'>Fornecedores</NavDropdown.Item>
                            <NavDropdown.Item href='#' as={Link} to='/relatorio-estoque'>Estoque</NavDropdown.Item>
                            <NavDropdown.Item href='#' as={Link} to='/relatorio-compras'>Compras</NavDropdown.Item>
                            <NavDropdown.Item href='#' as={Link} to='/relatorio-vendas'>Vendas</NavDropdown.Item>
                        </NavDropdown>

                        <Nav.Link href='#' as={Link} to='/sobre'>Sobre</Nav.Link>
                        <Nav.Link href='#' as={Link} to='/sair'>Sair</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}