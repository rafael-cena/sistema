import Pagina from "./componentes/layouts/Pagina";

function App() {
  return (
    <div className="App">
      <Pagina >
        <h1 className="text-center">Cadastro de Cliente</h1>
      </Pagina>
      <Pagina>
        <h1 className="text-center">Cadastro de Fornecedor</h1>
      </Pagina>
      <Pagina>
        <h1 className="text-center">Cadastro de Produtos</h1>
      </Pagina>
    </div>
  );
}

export default App;
