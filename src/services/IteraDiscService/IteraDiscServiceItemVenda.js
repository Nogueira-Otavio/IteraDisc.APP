import { HTTPClient } from "../client";

const ItemVendaService = {
  async criarAsync(produtoId, quantidade) {
    try {
      const itemVendaCriar = {
        ProdutoId: produtoId,
        Quantidade: quantidade
      }
      const response = await HTTPClient.post(`/ItemVenda/Criar`, itemVendaCriar);
      return response.data
    } catch (error){
      alert("Erro ao criar itemVenda:", error);
    }
  },

  async atualizarAsync(itemVendaId, produtoId, quantidade, valorItemVenda, vendido, vendaId) {
    try {
      const itemVendaAtualizar = {
        ItemVendaId: itemVendaId,
        ProdutoId: produtoId,
        Quantidade: quantidade,
        ValorItemVenda: valorItemVenda,
        Vendido: vendido,
        VendaId: vendaId
      }
      const response = await HTTPClient.put(`/ItemVenda/Atualizar`, itemVendaAtualizar);
      return response.data
    } catch (error) {
      console.error("Erro ao atualizar itemVenda:", error);
      throw error;
    }
  },

  async obterAsync(itemVendaId, vendido, descartado) {
    try {
      const response = await HTTPClient.get(`/ItemVenda/Obter/${itemVendaId}?vendido=${vendido}&descartado=${descartado}`);
      return response.data
    } catch (error) {
      console.error("Erro ao obter itemVenda:", error);
      throw error;
    }
  },

  async listarAsync(vendido, descartado) {
    try {
      const response = await HTTPClient.get(`/ItemVenda/Listar?vendido=${vendido}&descartado=${descartado}`);
      return response.data
    } catch (error) {
      console.error("Erro ao listar items venda:", error);
      throw error;
    }
  },

  async deletarAsync(itemVendaId) {
    try {
      const response = await HTTPClient.delete(`/ItemVenda/Deletar/${itemVendaId}`);
      return response.data
    } catch (error) {
      console.error("Erro ao deletar itemVenda:", error);
      throw error;
    }
  }
};

export default ItemVendaService;
