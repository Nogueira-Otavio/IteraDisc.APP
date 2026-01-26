📗 README DO **FRONT-END** (React)
Arquivo: `README.md` no repositório do **iteradisc.app (Front-end)**

```md
# IteraDisc – Front-end

Aplicação desenvolvida em React responsável pela interface visual da loja virtual de discos IteraDisc.
Este projeto consome a API REST em C# e apresenta os dados ao usuário de forma interativa e dinâmica.

Aqui está apenas a camada de apresentação do sistema (cliente).

---

## 🚀 Tecnologias Utilizadas

- React
- Vite
- Axios
- JavaScript
- HTML5
- CSS3

---

## 🧱 Arquitetura do Front-end

O front-end segue a arquitetura baseada em componentes:

- **Pages** → Telas principais da aplicação  
- **Components** → Componentes reutilizáveis da interface  
- **Services** → Comunicação com a API (Axios)  

Isso garante:
- Organização do código
- Reutilização de componentes
- Facilidade de manutenção
- Separação de responsabilidades

---

## 📁 Estrutura de Pastas

```

iteradisc.app
│
├── src
│   ├── components
│   │   ├── Navbar.jsx
│   │   ├── ProdutoCard.jsx
│   │   └── ProdutoList.jsx
│   │
│   ├── pages
│   │   └── Home.jsx
│   │
│   ├── services
│   │   └── api.js
│   │
│   ├── App.jsx
│   └── main.jsx

````

---

## ⚙️ Pré-requisitos

- Node.js 18 ou superior  
- npm ou yarn  
- Navegador moderno (Chrome, Edge, Firefox)

---

## ▶️ Como Executar o Projeto

1. Clone o repositório:
```bash
git clone <url-do-repositorio-frontend>
````

2. Entre na pasta do projeto:

```bash
cd iteradisc.app
```

3. Instale as dependências:

```bash
npm install
```

4. Configure a URL da API no arquivo:

```
src/services/api.js
```

Exemplo:

```js
import axios from "axios";

export const api = axios.create({
  baseURL: "https://localhost:xxxx/api"
});
```

5. Execute a aplicação:

```bash
npm run dev
```

6. Acesse no navegador:

```
http://localhost:5173
```

---

## 🖥️ Funcionalidades da Interface

* Listagem de produtos na home
* Consumo da API REST
* Renderização dinâmica dos dados
* Interface baseada em componentes reutilizáveis
* Simulação visual de uma loja virtual de discos

---

## 🔌 Comunicação com a API

Toda comunicação é feita via Axios através do arquivo:

```
src/services/api.js
```

Ele centraliza:

* BaseURL da API
* Configuração de requisições HTTP
* Organização das chamadas para o back-end

---

## 🛠️ Possíveis Problemas Comuns

Se os produtos não aparecerem na tela:

* Verifique se o back-end está rodando
* Confirme se a URL do Axios está correta
* Confira se existe produto cadastrado no banco
* Veja erros no console do navegador (F12)

---

## 📌 Observações Finais

Este projeto representa exclusivamente a camada de interface do sistema IteraDisc.
Ele foi desenvolvido com foco em simplicidade, clareza visual e integração direta com a API.

```
