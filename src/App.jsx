import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {Home} from './pages/Home/Home'
import "./App.module.css";
import { NovoProduto } from "./pages/Produto/NovoProduto/NovoProduto";
import { EditarProduto } from "./pages/Produto/EditarProduto/EditarProduto";
import { ProdutosInativos } from "./pages/Produto/ProdutosInativos/ProdutosInativos";

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/produto/novo" element={<NovoProduto />} />
          <Route path="/produto/editar" element={<EditarProduto />} />
          <Route path="/produtos/inativos" element={ <ProdutosInativos />} />
          </Routes>
    </BrowserRouter>
  );
}

export default App;