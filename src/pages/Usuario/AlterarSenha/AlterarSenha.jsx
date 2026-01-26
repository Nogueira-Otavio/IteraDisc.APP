import style from "./AlterarSenha.module.css";
import { Sidebar } from "../../../components/Sidebar/Sidebar";
import { Topbar } from "../../../components/Topbar/Topbar";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import UsuarioService from "../../../services/IteraDiscService/IteraDiscServiceUsuario";
import { Button, Form } from "react-bootstrap";

export function AlterarSenha() {
  const location = useLocation();
  const navigate = useNavigate();

  const [usuarioId] = useState(location.state);

  const [senha, setSenha] = useState("");
  const [senhaAntiga, setSenhaAntiga] = useState("");

  const handleSubmit = async (e) => {
    if (isFormValid()) {
      await UsuarioService.alterarSenhaAsync(usuarioId, senha, senhaAntiga);
      navigate("/usuarios");
    } else {
      alert("Por favor, preencha todos os campos!");
    }
  };
  
  const isFormValid = () => {
    return senha && senhaAntiga;
  };
  return (
    <Sidebar>
      <Topbar>
        <div className={style.pagina_conteudo}>
          <h3>Alterar Senha</h3>

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formSenha" className="mb-3">
              <Form.Label>Nova Senha</Form.Label>
              <Form.Control
                type="password"
                placeholder="*****"
                name="senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formSenha" className="mb-3">
              <Form.Label>Senha Atual</Form.Label>
              <Form.Control
                type="password"
                placeholder="*****"
                name="senhaAntiga"
                value={senhaAntiga}
                onChange={(e) => setSenhaAntiga(e.target.value)}
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
