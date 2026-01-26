import style from "./EditarProduto.module.css";
import { Topbar } from "../../../components/Topbar/Topbar";
import { Sidebar } from "../../../components/Sidebar/Sidebar";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ProdutoService from "../../../services/IteraDiscService/IteraDiscServiceProduto";
import {
  Form,
  Button,
  FormGroup,
  FormLabel,
  FormControl,
} from "react-bootstrap";

export function EditarProduto() {
  const location = useLocation();
  const navigate = useNavigate();

  const [produtoId] = useState(location.state);

  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [emEstoque, setEmEstoque] = useState("");

  const handleSubmit = async (e) => {
    if (isFormValid()) {
      await ProdutoService.atualizarAsync(
        produtoId,
        nome,
        descricao,
        preco,
        emEstoque,
      );
      navigate("/");
    } else {
      alert("Por favor, preencha todos os campos!");
    }
  };

  useEffect(() => {
    const buscarDadosProduto = async () => {
      try {
        const produto = await ProdutoService.obterAsync(produtoId);
        setNome(produto.nome);
        setDescricao(produto.descricao);
        setPreco(produto.preco);
        setEmEstoque(produto.emEstoque);
      } catch (error) {
        console.error("Erro ao buscar dados do produto:", error);
      }
    };

    buscarDadosProduto();
  }, []);

  const isFormValid = () => {
    return nome && descricao && preco && emEstoque;
  };
  return (
    <Sidebar>
      <Topbar>
        <div className={style.pagina_conteudo}>
          <h3>Editar Produto</h3>

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
