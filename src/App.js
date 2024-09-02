import Pagina from "./componentes/layouts/Pagina";
import TelaCadastroCliente from "./componentes/layouts/TelaCadastroCliente";
import TelaCadastroFornecedor from "./componentes/layouts/TelaCadastroFornecedor";
import TelaCadastroProduto from "./componentes/layouts/TelaCadastroProduto";

function App() {
  return (
    <div className="App">
      <Pagina >
        <TelaCadastroCliente />
        <TelaCadastroProduto />
        <TelaCadastroFornecedor />
      </Pagina>
    </div>
  );
}

export default App;
