import style from "./Usuarios.module.css";
import { Sidebar } from "../../../components/Sidebar/Sidebar";
import { Topbar } from "../../../components/Topbar/Topbar";
import { Link } from "react-router-dom";
import { Button, Modal, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import UsuarioService from "../../../services/IteraDiscService/IteraDiscServiceUsuario";
import { MdDelete, MdEdit, MdOutlinePassword  } from "react-icons/md";

export function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);

  const handleClickDeletar = (usuario) => {
    setUsuarioSelecionado(usuario);
    setMostrarModal(true);
  };

  const handleDeletar = async () => {
    try {
      await UsuarioService.deletarAsync(usuarioSelecionado.usuarioId);
      setUsuarios(
        usuarios.filter((u) => u.usuarioId !== usuarioSelecionado.usuarioId),
      );
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
    } finally {
      handleFecharModal();
    }
  };

  const handleFecharModal = () => {
    setMostrarModal(false);
    setUsuarioSelecionado(null);
  };

  async function carregarUsuarios() {
    try {
      const listaUsuarios = await UsuarioService.listarAsync(true);
      console.log(listaUsuarios);
      setUsuarios(listaUsuarios);
    } catch (error) {
      console.error("Erro ao carrgar usuários:", error);
    }
  }

  useEffect(() => {
    carregarUsuarios();
  }, []);
  return (
    <Sidebar>
      <Topbar>
        <div className={style.pagina_conteudo}>
          <div className={style.pagina_cabecalho}>
            <h3>Usuários</h3>
            <Link
              to="/usuarios/inativos"
              className={style.botao_mostrarInativos}
            >
              Inativos
            </Link>
            <Link to="/usuario/novo" className={style.botao_novo}>
              + Novo Usuário
            </Link>
          </div>

          <div className={style.tabela}>
            <Table responsive>
              <thead className={style.tabela_cabecalho}>
                <tr>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody className={style.tabela_corpo}>
                {usuarios.map((usuario) => (
                  <tr key={usuario.usuarioId}>
                    <td>{usuario.nome}</td>
                    <td>{usuario.email}</td>
                    <td>
                      <Link
                        to="/usuario/editar"
                        state={usuario.usuarioId}
                        className={style.botao_editar}
                      >
                        <MdEdit />
                      </Link>

                      <Link
                        to="/usuario/alterarSenha"
                        state={usuario.usuarioId}
                        className={style.botao_alterarSenha}
                      >
                        <MdOutlinePassword />
                      </Link>

                      <button
                        onClick={() => handleClickDeletar(usuario)}
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
              Tem certeza que deseja deletar o usuário{" "}
              {usuarioSelecionado?.nome}?
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
        </div>
      </Topbar>
    </Sidebar>
  );
}
