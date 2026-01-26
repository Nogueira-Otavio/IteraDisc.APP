import style from "./EditarUsuario.module.css";
import { Sidebar } from "../../../components/Sidebar/Sidebar";
import { Topbar } from "../../../components/Topbar/Topbar";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import UsuarioService from "../../../services/IteraDiscService/IteraDiscServiceUsuario";
import { Button, Form } from "react-bootstrap";

export function EditarUsuario() {
  const location = useLocation();
  const navigate = useNavigate();

  const [usuarioId] = useState(location.state);

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    if (isFormValid()) {
      await UsuarioService.atualizarAsync(usuarioId, nome, email);
      navigate("/usuarios");
    } else {
      alert("Por favor, preencha todos os campos!");
    }
  };

  useEffect(() => {
    const buscarDadosUsuario = async () => {
      try {
        const usuario = await UsuarioService.obterAsync(usuarioId);
        setNome(usuario.nome);
        setEmail(usuario.email);
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
      }
    };

    buscarDadosUsuario();
  }, []);

  const isFormValid = () => {
    return nome && email;
  };

  return (
    <Sidebar>
      <Topbar>
        <div className={style.pagina_conteudo}>
          <h3>Editar Usuário</h3>

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formNome" className="mb-3">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite seu nome"
                name="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Digite seu email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <div className={style.botoes}>
              <Button variant="primary" type="submit" disabled={!isFormValid()}>
                Salvar
              </Button>
              <Button href="/usuarios" variant="secondary">
                Cancelar
              </Button>
            </div>
          </Form>
        </div>
      </Topbar>
    </Sidebar>
  );
}
