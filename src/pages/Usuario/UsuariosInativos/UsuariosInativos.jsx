import style from './UsuariosInativos.module.css';
import { Sidebar } from '../../../components/Sidebar/Sidebar';
import { Topbar } from '../../../components/Topbar/Topbar';
import { Link } from "react-router-dom";
import { Button, Modal, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import UsuarioService from "../../../services/IteraDiscService/IteraDiscServiceUsuario";
import { MdOutlineRestorePage } from "react-icons/md";

export function UsuariosInativos() {
  const [usuarios, setUsuarios] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);

  const handleClickRestaurar = (usuario) => {
    setUsuarioSelecionado(usuario);
    setMostrarModal(true);
  };

  const handleRestaurar = async () => {
    try {
      await UsuarioService.restaurarAsync(usuarioSelecionado.usuarioId);
      setUsuarios(
        usuarios.filter((u) => u.usuarioId !== usuarioSelecionado.usuarioId),
      );
    } catch (error) {
      console.error("Erro ao restaurar usuário:", error);
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
      const listaUsuarios = await UsuarioService.listarAsync(false);
      console.log(listaUsuarios);
      setUsuarios(listaUsuarios);
    } catch (error) {
      console.error("Erro ao carrgar usuários:", error);
    }
  }

  useEffect(() => {
    carregarUsuarios();
  });
  return (
    <Sidebar>
      <Topbar>
        <div className={style.pagina_conteudo}>
          <div className={style.pagina_cabecalho}>
            <h3>Usuários Inativos</h3>
            <Link to="/usuarios" className={style.botao_mostrarAtivos}>
              Ativos
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
                      <button
                        onClick={() => handleClickRestaurar(usuario)}
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
              Tem certeza que deseja restaurar o usuário{" "}
              {usuarioSelecionado?.nome}?
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