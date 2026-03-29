import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import AuthService from "../../services/IteraDiscService/IteraDiscServiceAuth";
import style from "./Login.module.css";
import Logo from "../../assets/IteraDiscLogo.png";

export function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setErro("");
    try {
      const dados = await AuthService.loginAsync(email, senha);
      AuthService.salvarSessao(dados);
      navigate("/");
    } catch {
      setErro("E-mail ou senha inválidos.");
    }
  }

  return (
    <div className={style.pagina}>
      <div className={style.card}>
        <img src={Logo} alt="IteraDisc" className={style.logo} />
        <h4 className={style.titulo}>Entrar na sua conta</h4>

        {erro && <div className="alert alert-danger">{erro}</div>}

        <Form onSubmit={handleLogin}>
          <Form.Group controlId="formEmail" className="mb-3">
            <Form.Label>E-mail</Form.Label>
            <Form.Control
              type="email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formSenha" className="mb-3">
            <Form.Label>Senha</Form.Label>
            <Form.Control
              type="password"
              placeholder="*****"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </Form.Group>

          <button type="submit" className={style.botao}>
            Entrar
          </button>
        </Form>
      </div>
    </div>
  );
}