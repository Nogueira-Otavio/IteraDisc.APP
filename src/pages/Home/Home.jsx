import style from "./Home.module.css";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { Topbar } from "../../components/Topbar/Topbar";
import { Link } from "react-router-dom";
import { Button, Modal, Table } from "react-bootstrap";
import { MdDelete, MdEdit,  MdAddShoppingCart} from "react-icons/md";
import { useEffect, useState } from "react";
import ProdutoService from "../../services/IteraDiscService/IteraDiscServiceProduto";
import ItemVendaService from "../../services/IteraDiscService/IteraDiscServiceItemVenda";

import {
  Form,
  FormControl,
  FormGroup,
  FormLabel,
} from "react-bootstrap";

export function Home() {
  const [produtos, setProdutos] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarModalQuantidade, setMostrarModalQuantidade] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [quantidade, setQuantidade] = useState("");

  const handleClickDeletar = (produto) => {
    setProdutoSelecionado(produto);
    setMostrarModal(true);
  };

  const handleClickAdicionarCarrinho = (produto) => {
    setProdutoSelecionado(produto);
    setMostrarModalQuantidade(true);
  };

  const handleDeletar = async () => {
    try {
      await ProdutoService.deletarAsync(produtoSelecionado.produtoId);
      setProdutos(
        produtos.filter((p) => p.produtoId !== produtoSelecionado.produtoId),
      );
    } catch (error) {
      console.error("Erro ao deletar produto:", error);
    } finally {
      handleFecharModal();
    }
  };

  const handleAdicionarCarrinho = async () => {
    if(isFormValid()) {
      await ItemVendaService.criarAsync(
        produtoSelecionado.produtoId,
        quantidade)
        handleFecharModal();
    } else {
      alert("Por favor preencha todos os campo!");
    }
  };

const isFormValid = () => {
    return quantidade;
  };

  const handleFecharModal = () => {
    setMostrarModal(false);
    setMostrarModalQuantidade(false);
    setProdutoSelecionado(null);
  };

  async function carregarProdutos() {
    try {
      const listaProdutos = await ProdutoService.listarAsync(true);
      console.log(listaProdutos);
      setProdutos(listaProdutos);
    } catch (error) {
      console.error("Erro ao carrgar produtos:", error);
    }
  }

  useEffect(() => {
    carregarProdutos();
  }, []);
  return (
    <Sidebar>
      <Topbar>
        <div className={style.pagina_conteudo}>
          <div className={style.pagina_cabecalho}>
            <h3>Catálogo de discos</h3>
            <Link
              to="/produtos/inativos"
              className={style.botao_mostrarInativos}
            >
              Inativos
            </Link>
            <Link to="/produto/novo" className={style.botao_novo}>
              + Novo Produto
            </Link>
          </div>
          <div className={style.tabela}>
            <Table responsive>
              <thead className={style.tabela_cabecalho}>
                <tr>
                  <th>Nome</th>
                  <th>Descrição</th>
                  <th>Preço</th>
                  <th>Em Estoque</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody className={style.corpo}>
                {produtos.map((produto) => (
                  <tr key={produto.produtoId}>
                    <td>{produto.nome}</td>
                    <td>{produto.descricao}</td>
                    <td>R$ {produto.preco.toFixed(2)}</td>
                    <td>{produto.emEstoque}</td>
                    <td>
                      <button
                        onClick={() => handleClickAdicionarCarrinho(produto)}
                        className={style.botao_adicionarItem}
                      >
                        <MdAddShoppingCart />
                      </button>
                      <Link
                        to="/produto/editar"
                        state={produto.produtoId}
                        className={style.botao_editar}
                      >
                        <MdEdit />
                      </Link>

                      <button
                        onClick={() => handleClickDeletar(produto)}
                        className={style.botao_deletar}
                      >
                        <MdDelete />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          <Modal show={mostrarModal} onHide={handleFecharModal}>
            <Modal.Header closeButton>
              <Modal.Title>Confirmar</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Tem certeza que deseja deletar o produto{" "}
              {produtoSelecionado?.nome}?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleFecharModal}>
                Cancelar
              </Button>
              <Button variant="danger" onClick={handleDeletar}>
                Deletar
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal show={mostrarModalQuantidade} onHide={handleFecharModal}>
            <Modal.Header closeButton>
              <Modal.Title>Informe a quantidade</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleAdicionarCarrinho}>
                <FormGroup controlId="formQuantidade" className="mb-3">
                  <FormLabel>Informe a quantidade</FormLabel>
                  <FormControl
                    type="number"
                    placeholder="Informe a quantidade"
                    name="quantidade"
                    value={quantidade}
                    onChange={(e) => setQuantidade(e.target.value)}
                    required
                  />
                </FormGroup>

                <div className={style.botoes}>
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={!isFormValid()}
                  >
                    Salvar
                  </Button>
                  <Button variant="secondary" onClick={handleFecharModal}>
                    Cancelar
                  </Button>
                </div>
              </Form>
            </Modal.Body>
          </Modal>
        </div>
      </Topbar>
    </Sidebar>
  );
}
