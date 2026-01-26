import style from "./NovoProduto.module.css";
import { Topbar } from "../../../components/Topbar/Topbar";
import { Sidebar } from "../../../components/Sidebar/Sidebar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProdutoService from "../../../services/IteraDiscService/IteraDiscServiceProduto";
import {
  Button,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
} from "react-bootstrap";

export function NovoProduto() {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [emEstoque, setEmEstoque] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    if (isFormValid()) {
      await ProdutoService.criarAsync(nome, descricao, preco, emEstoque);
      navigate("/");
    } else {
      alert("Por favor preencha todos os campo!");
    }
  };

  const isFormValid = () => {
    return nome && descricao && preco && emEstoque;
  };
  return (
    <Sidebar>
      <Topbar>
        <div className={style.pagina_conteudo}>
          <h3>Novo Produto</h3>

          <Form onSubmit={handleSubmit}>
            <FormGroup controlId="formNome" className="mb-3">
              <FormLabel>Nome</FormLabel>
              <FormControl
                type="text"
                placeholder="Digite o nome do produto"
                name="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </FormGroup>

            <FormGroup controlId="formDescicao" className="mb-3">
              <FormLabel>Descrição</FormLabel>
              <FormControl
                type="text"
                placeholder="Digite a descrção do produto"
                name="descricao"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                required
              />
            </FormGroup>

            <FormGroup controlId="formPreco" className="mb-3">
              <FormLabel>Preço</FormLabel>
              <FormControl
                type="number"
                placeholder="Informe o preço do produto"
                name="preco"
                value={preco}
                onChange={(e) => setPreco(e.target.value)}
                required
              />
            </FormGroup>

            <FormGroup controlId="formEmEstoque" className="mb-3">
              <FormLabel>Quantidade</FormLabel>
              <FormControl
                type="number"
                placeholder="Informe a quantidade do produto em estoque"
                name="emEstoque"
                value={emEstoque}
                onChange={(e) => setEmEstoque(e.target.value)}
                required
              />
            </FormGroup>
            <div className={style.botoes}>
              <Button variant="primary" type="submit" disabled={!isFormValid()}>
                Salvar
              </Button>
              <Button href="/" variant="secondary">
                Cancelar
              </Button>
            </div>
          </Form>
        </div>
      </Topbar>
    </Sidebar>
  );
}
