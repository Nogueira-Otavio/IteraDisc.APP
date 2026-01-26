import style from "./Historico.module.css";
import { Sidebar } from "../../../components/Sidebar/Sidebar";
import { Topbar } from "../../../components/Topbar/Topbar";
import VendaService from "../../../services/IteraDiscService/IteraDiscServiceVenda";
import UsuarioService from "../../../services/IteraDiscService/IteraDiscServiceUsuario";
import { useEffect, useState } from "react";
import { Table, Form } from "react-bootstrap";

export function Historico() {
  const [vendas, setVendas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState("");

  // Carrega histórico de vendas (todos ou filtrado)
  async function carregarHistorico() {
    try {
      let historico = [];
      if (usuarioSelecionado) {
        historico = await VendaService.HistoricoCliente(usuarioSelecionado);
      } else {
        historico = await VendaService.listarAsync();
      }
      setVendas(historico);
    } catch (error) {
      console.error("Erro ao carregar histórico:", error);
    }
  }

  // Carrega usuários para o filtro
  async function carregarUsuarios() {
    try {
      const listaUsuarios = await UsuarioService.listarAsync(true);
      setUsuarios(listaUsuarios);
    } catch (error) {
      console.error("Erro ao listar usuários:", error);
    }
  }

  useEffect(() => {
    carregarUsuarios();
    carregarHistorico();
  }, []);

  // Map de usuarioId -> nome
  const mapaUsuarios = {};
  usuarios.forEach((u) => {
    mapaUsuarios[u.usuarioId] = u.nome;
  });

  return (
    <Sidebar>
      <Topbar>
        <div className={style.pagina_conteudo}>
          <Form.Group controlId="filtroUsuario" className="mb-3">
            <Form.Label>Filtrar por usuário</Form.Label>
            <Form.Control
              as="select"
              value={usuarioSelecionado}
              onChange={(e) => setUsuarioSelecionado(Number(e.target.value) || "")}
            >
              <option value="">Todos</option>
              {usuarios.map((u) => (
                <option key={u.usuarioId} value={u.usuarioId}>
                  {u.nome}
                </option>
              ))}
            </Form.Control>
            <button
              className={style.botoes}
              onClick={carregarHistorico}
              type="button"
            >
              Filtrar
            </button>
          </Form.Group>

          <div className={style.tabela}>
            <Table responsive>
              <thead className={style.tabela_cabecalho}>
                <tr>
                  <th>Usuário</th>
                  <th>Data</th>
                  <th>Valor Total</th>
                  <th>Itens</th>
                </tr>
              </thead>
              <tbody className={style.corpo}>
                {vendas.map((venda) => (
                  <tr key={venda.vendaId}>
                    <td>{mapaUsuarios[venda.usuarioId] || venda.usuarioId}</td>
                    <td>{new Date(venda.dataVenda).toLocaleString()}</td>
                    <td>R$ {venda.valorTotalVenda.toFixed(2)}</td>
                    <td>
                      <ul>
                        {venda.itens.map((item) => (
                          <li key={item.itemVendaId}>
                            {item.produto.nome} - Qtde: {item.quantidade} - R${" "}
                            {item.valorItemVenda.toFixed(2)}
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </Topbar>
    </Sidebar>
  );
}