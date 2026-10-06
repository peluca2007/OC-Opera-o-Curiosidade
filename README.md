# Operação Curiosidade

Protótipo de gestão de clientes feito com HTML, CSS e JavaScript puro.
Os clientes continuam salvos na chave `clientsList` do localStorage.
O login ainda utiliza as contas de demonstração do projeto original.
Esta refatoração não implementa edição, exclusão nem controle de acesso.

## Como abrir

Abra **esta pasta**, a que contém este README e o index.html, no Visual Studio
ou Visual Studio Code. Execute com um servidor HTTP local, como Live Server.
Abra o index.html; ele encaminha para pages/auth/login.html.

Os scripts usam `type="module"`, `import` e `export`.
Por isso, abrir o HTML diretamente por file:// não é suficiente.
Use sempre a mesma origem (protocolo, host e porta) para acessar os dados já
cadastrados. O localStorage de outra porta ou de file:// não será o mesmo.

Login de demonstração: admin@oc.com / admin123.
A segunda conta original é luciano@oc.com / luciano123.

## Estrutura

```text
index.html
pages/
  auth/        login.html, login.css, login.js
  dashboard/   dashboard.html, dashboard.css, dashboard.js
  clients/     client-list.* e client-form.*
  users/       user-form.* (tela original, ainda sem formulário)
  reports/     reports.*, report-list.* e report-print.css
shared/
  services/    client-service.js
  utils/       text-utils.js, client-filters.js
  ui/          client-table.js, search.js
  styles/      base.css, layout.css, search.css
dev/
  seed-clients.js
```

## Destino das páginas existentes

| Antes | Agora |
| --- | --- |
| login/login.* | pages/auth/login.* |
| dashboard/dashboard.* | pages/dashboard/dashboard.* |
| customers/customers.* | pages/clients/client-list.* |
| registerClient/registerClient.* | pages/clients/client-form.* |
| userRegister/userRegister.* | pages/users/user-form.* |
| record/record.* | pages/reports/reports.* |
| record/list/list.* | pages/reports/report-list.* |
| record/list/listPrint.css | pages/reports/report-print.css |
| global/search.js | shared/ui/search.js |
| css/styles.css | shared/styles/base.css, layout.css e search.css |
| seedTest.js | dev/seed-clients.js |

O asterisco representa HTML, CSS e JavaScript.
As telas foram reaproveitadas. O HTML do cabeçalho e da pesquisa permanece
em cada página; a lógica e os estilos compartilhados ficam em shared.

## Como acompanhar a refatoração, arquivo por arquivo

1. **shared/services/client-service.js**: getClients lê, saveClients grava
   e addClient adiciona clientes. Dados inválidos geram erro para a página
   informar o problema sem sobrescrever os cadastros.
2. **shared/utils/text-utils.js**: normalizeText permite comparar José com jose.
3. **shared/utils/client-filters.js**: filterClients pesquisa somente nome,
   e-mail e telefone. isRegisteredThisMonth é usado no dashboard e nos relatórios.
4. **shared/ui/client-table.js**: renderClientTable recebe o tbody da página
   e os clientes. Cria células usando textContent, sem interpretar os dados como HTML.
5. **shared/ui/search.js**: conecta os eventos do formulário e do modal às
   funções acima. A pesquisa acontece ao pressionar Enter.
6. **pages/clients/client-list.js**: exemplo pequeno de uma página que usa
   os módulos compartilhados.
7. **pages/clients/client-form.js**: mantém a validação do cadastro e chama
   addClient. O botão usa addEventListener, porque funções de módulos não ficam globais.
8. **pages/dashboard/dashboard.js** e **pages/reports/**: reaproveitam leitura,
   cálculo do mês e tabela. Cada página mantém suas próprias regras.

Para copiar manualmente, comece pelos arquivos de shared; depois copie as
páginas completas (HTML, CSS e JS). Atualize as referências em conjunto.
Todos os caminhos relativos dependem da estrutura de pastas acima.

## Comportamento da pesquisa

- Busca por nome, e-mail e telefone, ignorando acentos e maiúsculas.
- Telefones podem ser digitados com parênteses, espaços e hífens.
- Campo vazio mostra uma orientação; nenhum resultado mostra uma mensagem.
- O filtro no modal permite escolher todos, ativos ou inativos.
- A lista é lida novamente a cada pesquisa e mudança de filtro.
- Falha no armazenamento mostra uma mensagem, sem tratar o erro como lista vazia.
- Fechar ou pressionar Escape devolve o foco ao campo de pesquisa.
- Resultados são informativos; edição e abertura de detalhes ficam para outra task.

## Conferência manual

1. Entre no sistema e cadastre um cliente chamado José com telefone.
2. Pesquise jose, parte do e-mail e o telefone com e sem formatação.
3. Cadastre outro cliente na mesma página e pesquise sem recarregar.
4. Teste campo vazio, texto inexistente e filtro de ativos/inativos.
5. Confira listagem, dashboard e os quatro relatórios.
6. Abra a visualização de impressão do relatório.
7. Confira navegação, pesquisa no celular e o console do navegador.

Para dados fictícios, importe dev/seed-clients.js como módulo uma única vez
em uma página local. O arquivo não é carregado automaticamente nas telas.

## Próximas etapas

O acesso aos dados está concentrado no serviço. Quando houver API em C#,
esse serviço passará a consultar o servidor; as chamadas terão de ser adaptadas
para operações assíncronas. A etapa de Angular poderá reaproveitar as regras
de comparação e filtros, adaptando os módulos a serviços e componentes.

O dashboard agora usa o mesmo mês de calendário dos relatórios para
"Cadastros do Mês"; antes, ele contava os últimos 30 dias.
A identificação de clientes inativos como "pendentes" no dashboard foi mantida
do protótipo e pode ser discutida em uma task de regras de negócio.
