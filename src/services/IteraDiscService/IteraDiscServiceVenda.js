import { HTTPClient } from "../client";

const VendaService = {
  async criarAsync(usuarioId, itens) {
    try {
      const itensIds = itens.map(item => item.itemVendaId);
      const vendaCriar = {
        UsuarioId: usuarioId,
        Itens: itensIds
      }
      const response = await HTTPClient.post(`/Venda/Criar`, vendaCriar);
      return response.data
     } catch (error){
      alert("Erro ao criar venda:", error);
    }
  },

  async obterAsync(vendaId) {
    try {
      const response = await HTTPClient.get(`/Venda/Obter/${vendaId}`);
      return response.data
    } catch (error) {
      console.error("Erro ao obter Venda:", error);
      throw error;
    }
  },

 async listarAsync() {
    try {
      const response = await HTTPClient.get(`/Venda/Listar`);
      return response.data
    } catch (error) {
      console.error("Erro ao listar vendas:", error);
      throw error;
    }
  },

  async HistoricoCliente(usuarioId) {
    try {
      const response = await HTTPClient.get(`/Vemda/HistoricoCliente?usuarioId=${usuarioId}`);
      return response.data
    } catch (error) {
      console.error("Erro ao listar items venda:", error);
      throw error;
    }
  },
}
export default VendaService
