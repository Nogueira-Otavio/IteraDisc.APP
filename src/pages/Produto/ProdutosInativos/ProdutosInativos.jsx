import style from "./ProdutosInativos.module.css";

import { Link } from "react-router-dom";
import { Button, Modal, Table } from "react-bootstrap";
import { MdOutlineRestorePage } from "react-icons/md";
import { useEffect, useState } from "react";
import { Sidebar } from "../../../components/Sidebar/Sidebar";
import { Topbar } from "../../../components/Topbar/Topbar";
import ProdutoService from "../../../services/IteraDiscService/IteraDiscServiceProduto";

export function ProdutosInativos() {
  const [produtos, setProdutos] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);

  const handleClickDeletar = (produto) => {
    setProdutoSelecionado(produto);
    setMostrarModal(true);
  };

  const handleRestaurar = async () => {
    try {
      await ProdutoService.restaurarAsync(produtoSelecionado.produtoId);
      setProdutos(
        produtos.filter((p) => p.produtoId !== produtoSelecionado.produtoId),
      );
    } catch (error) {
      console.error("Erro ao restaurar produto:", error);
    } finally {
      handleFecharModal();
    }
  };

  const handleFecharModal = () => {
    setMostrarModal(false);
    setProdutoSelecionado(null);
  };

  async function carregarProdutos() {
    try {
      const listaProdutos = await ProdutoService.listarAsync(false);
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
            <h3>Produtos Inativos</h3>
            <Link to="/" className={style.botao_mostrarAtivos}>
              Ativos
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
                        onClick={() => handleClickDeletar(produto)}
                        className={style.botao_restaurar}
                      >
                        <MdOutlineRestorePage />
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
              Tem certeza que deseja restaurar o produto{" "}
              {produtoSelecionado?.nome}?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleFecharModal}>
                Cancelar
              </Button>
              <Button variant="success" onClick={handleRestaurar}>
                Restaurar
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </Topbar>
    </Sidebar>
  );
}
