import TelaCadastroCategoria from "./componentes/layouts/TelaCadastroCategoria";
import TelaCadastroCliente from "./componentes/layouts/TelaCadastroCliente";
import TelaCadastroFornecedor from "./componentes/layouts/TelaCadastroFornecedor";
import TelaCadastroProduto from "./componentes/layouts/TelaCadastroProduto";
import Tela404 from "./componentes/layouts/Tela404";
import TelaMenu from "./componentes/layouts/TelaMenu";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* a ordem das rotas é importante */}
        <Routes>
          <Route path="/categoria" element={<TelaCadastroCategoria />} />
          <Route path="/cliente" element={<TelaCadastroCliente />} />
          <Route path="/fornecedor" element={<TelaCadastroFornecedor />} />
          <Route path="/produto" element={<TelaCadastroProduto />} />

          <Route path="/" element={<TelaMenu />} />
          <Route path="*" element={<Tela404 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;