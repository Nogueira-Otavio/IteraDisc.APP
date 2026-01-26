import { HTTPClient } from "../client";

const GroqService = {
  enviar: async (mensagem) => {
    const response = await HTTPClient.post("/GroqService/Enviar", {
      mensagem
    });
    return response.data;
  }
};

export default GroqService;
