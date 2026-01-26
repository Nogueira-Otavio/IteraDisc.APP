import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import "./App.module.css";
import { NovoProduto } from "./pages/Produto/NovoProduto/NovoProduto";
import { EditarProduto } from "./pages/Produto/EditarProduto/EditarProduto";
import { ProdutosInativos } from "./pages/Produto/ProdutosInativos/ProdutosInativos";
import { Usuarios } from "./pages/Usuario/Usuarios/Usuarios";
import { NovoUsuario } from "./pages/Usuario/NovoUsuario/NovoUsuario";
import { EditarUsuario } from "./pages/Usuario/EditarUsuario/EditarUsuario";
import { UsuariosInativos } from "./pages/Usuario/UsuariosInativos/UsuariosInativos";
import { AlterarSenha } from "./pages/Usuario/AlterarSenha/AlterarSenha";
import { Carrinho } from "./pages/Carrinho/Carrinho/Carrinho";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/produto/novo" element={<NovoProduto />} />
        <Route path="/produto/editar" element={<EditarProduto />} />
        <Route path="/produtos/inativos" element={<ProdutosInativos />} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/usuario/novo" element={<NovoUsuario />} />
        <Route path="/usuario/editar" element={<EditarUsuario />} />
        <Route path="/usuarios/inativos" element={<UsuariosInativos />} />
        <Route path="/usuario/alterarSenha" element={<AlterarSenha />} />
        <Route path="/carrinho" element={<Carrinho />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
