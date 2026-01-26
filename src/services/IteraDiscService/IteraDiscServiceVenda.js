import { HTTPClient } from "../client";

const VendaService = {
  criar: async (venda) => {
    const response = await HTTPClient.post("/Venda/Criar", venda);
    return response.data;
  },

  obter: async (id) => {
    const response = await HTTPClient.get(`/Venda/Obter/${id}`);
    return response.data;
  },

  listar: async () => {
    const response = await HTTPClient.get("/Venda/Listar");
    return response.data;
  },

  historicoCliente: async (clienteId) => {
    const response = await HTTPClient.get(`/Venda/HistoricoCliente?clienteId=${clienteId}`);
    return response.data;
  }
};

export default VendaService;
