import style from "./ChatBot.module.css";
import { Sidebar } from "../../../components/Sidebar/Sidebar";
import { Topbar } from "../../../components/Topbar/Topbar";
import { useState } from "react";
import GroqService from "../../../services/IteraDiscService/IteraDiscServiceGroqService";
import { Button, Form, FormControl, FormGroup, FormLabel, Card } from "react-bootstrap";

export function ChatBot() {
  const [mensagem, setMensagem] = useState("");
  const [historico, setHistorico] = useState([]);
  const [loading, setLoading] = useState(false);

  const enviarMensagem = async (e) => {
    e.preventDefault();
    if (!mensagem.trim()) return;

    const novaMensagem = { role: "user", content: mensagem };
    setHistorico((prev) => [...prev, novaMensagem]);

    setLoading(true);
    try {
      const resposta = await GroqService.enviar(mensagem);
      setHistorico((prev) => [...prev, { role: "assistant", content: resposta }]);
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      setHistorico((prev) => [...prev, { role: "assistant", content: "Erro ao enviar mensagem." }]);
    } finally {
      setLoading(false);
      setMensagem("");
    }
  };

  return (
    <Sidebar>
      <Topbar>
        <div className={style.pagina_conteudo}>
          <h3>Atendente Virtual</h3>
          
          <div className={style.chat_box}>
            {historico.length === 0 && <p>Envie uma mensagem para começar a conversar!</p>}
            {historico.map((msg, index) => (
              <Card
                key={index}
                className={`${style.mensagem} ${msg.role === "user" ? style.user : style.assistant}`}
              >
                {msg.content}
              </Card>
            ))}
          </div>

          <Form onSubmit={enviarMensagem} className={style.formulario}>
            <FormGroup className="mb-3" controlId="formMensagem">
              <FormControl
                type="text"
                placeholder="Digite sua mensagem..."
                value={mensagem}
                onChange={(e) => setMensagem(e.target.value)}
                disabled={loading}
              />
            </FormGroup>
            <div className={style.botoes}>
              <Button variant="primary" type="submit" disabled={loading || !mensagem.trim()}>
                {loading ? "Enviando..." : "Enviar"}
              </Button>
              <Button
                variant="secondary"
                type="button"
                onClick={() => setHistorico([])}
                disabled={loading}
              >
                Limpar
              </Button>
            </div>
          </Form>
        </div>
      </Topbar>
    </Sidebar>
  );
}