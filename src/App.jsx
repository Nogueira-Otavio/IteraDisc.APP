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
import { Historico } from "./pages/Venda/Historico/Historico";
import { ChatBot } from "./pages/ChatBot/ChatBot/ChatBot";
import { Login } from "./pages/Login/Login";
import { RotaProtegida } from "./components/RotaProtegida/RotaProtegida";

function App() {
  return (
    <BrowserRouter>
      <Routes>
       <Route path="/login" element={<Login />} />

       <Route path="/" element={<RotaProtegida><Home /></RotaProtegida>} />
        <Route path="/produto/novo" element={<RotaProtegida><NovoProduto /></RotaProtegida>} />
        <Route path="/produto/editar" element={<RotaProtegida><EditarProduto /></RotaProtegida>} />
        <Route path="/produtos/inativos" element={<RotaProtegida><ProdutosInativos /></RotaProtegida>} />
        <Route path="/usuarios" element={<RotaProtegida><Usuarios /></RotaProtegida>} />
        <Route path="/usuario/novo" element={<RotaProtegida><NovoUsuario /></RotaProtegida>} />
        <Route path="/usuario/editar" element={<RotaProtegida><EditarUsuario /></RotaProtegida>} />
        <Route path="/usuarios/inativos" element={<RotaProtegida><UsuariosInativos /></RotaProtegida>} />
        <Route path="/usuario/alterarSenha" element={<RotaProtegida><AlterarSenha /></RotaProtegida>} />
        <Route path="/carrinho" element={<RotaProtegida><Carrinho /></RotaProtegida>} />
        <Route path="/historico" element={<RotaProtegida><Historico /></RotaProtegida>} />
        <Route path="/chatbot" element={<RotaProtegida><ChatBot /></RotaProtegida>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;