import { HTTPClient } from "../client";

const ItemVendaService = {
  criar: async (itemVenda) => {
    const response = await HTTPClient.post("/ItemVenda/Criar", itemVenda);
    return response.data;
  },

  atualizar: async (itemVenda) => {
    const response = await HTTPClient.put("/ItemVenda/Atualizar", itemVenda);
    return response.data;
  },

  obter: async (id) => {
    const response = await HTTPClient.get(`/ItemVenda/Obter/${id}`);
    return response.data;
  },

  listar: async () => {
    const response = await HTTPClient.get("/ItemVenda/Listar");
    return response.data;
  },

  deletar: async (id) => {
    const response = await HTTPClient.delete(`/ItemVenda/Deletar/${id}`);
    return response.data;
  }
};

export default ItemVendaService;
