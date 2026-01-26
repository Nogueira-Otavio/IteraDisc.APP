import { PrefetchPageLinks } from "react-router-dom";
import { HTTPClient } from "../client";

const ProdutoService = {
  async obterAsync(produtoId) {
    try {
      const response = await HTTPClient.get(`/Produto/Obter/${produtoId}`);
      return response.data
    } catch (error) {
      console.error("Erro ao obter produto:", error);
      throw error;
    }
  },

  async listarAsync(ativos) {
    try {
      const response = await HTTPClient.get(`/Produto/Listar?ativos=${ativos}`);
      return response.data
    } catch (error) {
      console.error("Erro ao listar produtos:", error);
      throw error;
    }
  },

  async criarAsync(nome, descricao, preco, emEstoque) {
    try {
      const produtoCriar = {
        Nome: nome,
        Descricao: descricao,
        Preco: preco,
        EmEstoque: emEstoque
      }
      const response = await HTTPClient.post(`/Produto/Criar`, produtoCriar);
      return response.data
    } catch (error) {
      console.error("Erro ao criar produto:", error);
      throw error;
    }
  },

  async atualizarAsync(produtoId, nome, descricao, preco, emEstoque) {
    try {
      const produtoAtualizar = {
        ProdutoId: produtoId,
        Nome: nome,
        Descricao: descricao,
        Preco: preco,
        EmEstoque: emEstoque
      }
      const response = await HTTPClient.put(`/Produto/Atualizar`, produtoAtualizar);
      return response.data
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
      throw error;
    }
  },

  async deletarAsync(produtoId) {
    try {
      const response = await HTTPClient.delete(`/Produto/Deletar/${produtoId}`);
      return response.data
    } catch (error) {
      console.error("Erro ao deletar produto:", error);
      throw error;
    }
  },

  async restaurarAsync(produtoId) {
    try {
      const response = await HTTPClient.put(`/Produto/Restaurar/${produtoId}`);
      return response.data
    } catch (error) {
      console.error("Erro ao restaurar produto:", error);
      throw error;
    }
  },
}

export default ProdutoService