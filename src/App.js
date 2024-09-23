import TelaCadastroCategoria from "./componentes/Telas/TelaCadastroCategoria";
import TelaCadastroCliente from "./componentes/Telas/TelaCadastroCliente";
import TelaCadastroFornecedor from "./componentes/Telas/TelaCadastroFornecedor";
import TelaCadastroProduto from "./componentes/Telas/TelaCadastroProduto";
import Tela404 from "./componentes/Telas/Tela404";
import TelaMenu from "./componentes/Telas/TelaMenu";
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