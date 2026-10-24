# OC - Operação Curiosidade

Sistema web de cadastro e gestão de clientes feito com HTML, CSS e JavaScript puro (ES Modules). Os dados ficam salvos no `localStorage` do navegador, sem back-end.

## Funcionalidades

- Tela de login com validação de e-mail e senha contra uma lista fixa de usuários de demonstração (`shared/services/user-service.js`)
- Exibição do nome do usuário logado no cabeçalho
- Dashboard com total de cadastros, cadastros inativos (pendentes), cadastros do mês e tabela dos últimos registros
- Cadastro de clientes com validação de campos obrigatórios, formato de e-mail, telefone (mínimo de 10 dígitos) e data de nascimento anterior à data atual
- Lista de clientes com ações de visualizar, editar e excluir em um modal (acessível também pelo teclado)
- Pesquisa global por nome, e-mail ou telefone, com filtro por status (ativo/inativo)
- Relatórios de clientes: todos, ativos, inativos e cadastrados no mês, com opção de impressão
- Script de exemplo (`dev/seed-clients.js`) que adiciona três clientes fictícios ao abrir o dashboard

## Tecnologias

- HTML5 e CSS3
- JavaScript (ES Modules, sem frameworks)
- `localStorage` para persistência
- Google Fonts (Inter) e Font Awesome via CDN

## Estrutura

```
pages/     telas (auth, dashboard, clients, reports, users)
shared/    serviços, componentes, utilitários e estilos compartilhados
dev/       dados de exemplo
```

## Como rodar

Como o projeto usa `<script type="module">`, é preciso servir os arquivos por um servidor local (abrir pelo `file://` bloqueia os módulos). Por exemplo, na raiz do repositório:

```bash
npx serve .
# ou
python3 -m http.server 8000
```

Depois acesse `pages/auth/login.html` no navegador. Credenciais de demonstração: `admin@oc.com` / `admin123`.

## Observações

- O login é apenas uma simulação no front-end: as credenciais ficam no código e as páginas internas não verificam se há usuário logado.
- A página `pages/users/user-form.html` tem apenas o layout; o script `user-form.js` ainda está vazio.
