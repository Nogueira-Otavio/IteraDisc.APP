import { useEffect, useState } from "react";
import { Sidebar } from "../../../components/Sidebar/Sidebar";
import { Topbar } from "../../../components/Topbar/Topbar";
import style from "./Carrinho.module.css";
import ItemVendaService from "../../../services/IteraDiscService/IteraDiscServiceItemVenda";
import VendaService from "../../../services/IteraDiscService/IteraDiscServiceVenda";
import UsuarioService from "../../../services/IteraDiscService/IteraDiscServiceUsuario";
import {
  Button,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Modal,
  Table,
} from "react-bootstrap";
import { MdDelete, MdEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export function Carrinho() {
  const [itens, setItens] = useState([]);
  const [mostrarModalDescartar, setMostrarModalDescartar] = useState(false);
  const [itemSelecionado, setItemSelecionado] = useState(null);
  const [usuario, setUsuario] = useState(null);
  const [usuarios, setUsuarios] = useState([]);

  const navigate = useNavigate();

  const handleClickDescartar = (item) => {
    setItemSelecionado(item);
    setMostrarModalDescartar(true);
  };

  const handleDescartar = async () => {
    try {
      await ItemVendaService.deletarAsync(itemSelecionado.itemVendaId);
      setItens(
        itens.filter((i) => i.itemVendaId !== itemSelecionado.itemVendaId),
      );
    } catch (error) {
      console.error("Erro ao descartar item:", error);
    } finally {
      handleFecharModal();
    }
  };

  const handleFecharModal = () => {
    setMostrarModalDescartar(false);
    setItemSelecionado(null);
  };

  async function carregarItens() {
    try {
      const listaItens = await ItemVendaService.listarAsync(false, false);
      console.log(listaItens);
      setItens(listaItens);
    } catch (error) {
      console.error("Erro ao carrgar itens:", error);
    }
  }

  const handleSubmit = async (e) => {
    if (isFormValid()) {
        await VendaService.criarAsync(usuario, itens);
        navigate('/vendas')
    } else {
        alert('Por favor, preencha todos os campos!')
    }
  }

  const isFormValid = () => {
    return usuario;
  }

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const listaUsuarios = await UsuarioService.listarAsync(true);
        setUsuarios(listaUsuarios);
      } catch (error) {
        console.error("Erro ao buscar usuários");
      }
    };

    fetchUsuarios();
    carregarItens();
  }, []);

  return (
    <Sidebar>
      <Topbar>
        <div className={style.pagina_conteudo}>
          <div className={style.tabela}>
            <Table responsive>
              <thead className={style.tabela_cabecalho}>
                <tr>
                  <th>Produto</th>
                  <th>Quantidade</th>
                  <th>Preço</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody className={style.corpo}>
                {itens.map((item) => (
                  <tr key={item.itemVendaId}>
                    <td>{item.produto.nome}</td>
                    <td>{item.quantidade}</td>
                    <td>R$ {item.valorItemVenda.toFixed(2)}</td>
                    <td>
                      <button
                        onClick={() => handleClickDescartar(item)}
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
          <Form onSubmit={handleSubmit}>
            <FormGroup controlId="formUsuario" className="mb-3">
              <FormLabel>Usuário</FormLabel>
              <FormControl
                as='select'
                name="usuario"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                required
              >
                <option value=''>Selecione o usuário</option>
                {usuarios.map((usuario) =>
                <option value={usuario.usuarioId}>{usuario.nome}</option>
                )}
              </FormControl>
            </FormGroup>

            <div className={style.botoes}>
              <Button variant="primary" type="submit" disabled={!isFormValid()}>
                Salvar
              </Button>
              <Button variant="secondary" onClick={handleFecharModal}>
                Cancelar
              </Button>
            </div>
          </Form>

          <Modal show={mostrarModalDescartar} onHide={handleFecharModal}>
            <Modal.Header closeButton>
              <Modal.Title>Confirmar</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Tem certeza que deseja descartar o item{" "}
              {itemSelecionado?.produto.nome}?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleFecharModal}>
                Cancelar
              </Button>
              <Button variant="danger" onClick={handleDescartar}>
                Deletar
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </Topbar>
    </Sidebar>
  );
}
