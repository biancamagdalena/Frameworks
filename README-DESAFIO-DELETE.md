# Meu Site de Vendas — Desafio DELETE (Projeto do Aluno)

Este projeto já contém as etapas anteriores do CRUD trabalhadas em aula:

- GET — listagem de produtos;
- POST — cadastro de produtos;
- GET por ID — busca do produto para edição;
- PUT — atualização de produtos.

## O que NÃO está pronto

A exclusão de produtos foi deixada propositalmente para o aluno implementar.

### Etapa A — Backend (Aulas 3 e 4)
No arquivo `backend/server.js`, localize o bloco **DESAFIO 4 — DELETE DE PRODUTOS** e implemente:

1. `DELETE /api/produtos/:id`;
2. leitura do ID com `req.params`;
3. exclusão usando Mongoose;
4. tratamento de produto não encontrado;
5. resposta JSON de sucesso/erro.

### Etapa B — Frontend (Aulas 5 e 6)
No arquivo `frontend/src/App.jsx`, o botão **Excluir** ainda mostra apenas uma mensagem. Em aula posterior, ele será conectado à API usando `fetch()` com `method: "DELETE"` e atualização do estado React.

## Teste esperado nas Aulas 3 e 4

Após implementar o backend, teste a rota DELETE e depois faça um GET em `/api/produtos` para verificar se o produto foi removido do MongoDB.

> Não copie uma solução pronta. Implemente e teste cada etapa durante a aula.
