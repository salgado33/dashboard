# Dashboard de vendas — Mesa de Dados

Dashboard interativo para uma atividade de Fundamentos de IA e Análise de Dados. O projeto usa HTML, CSS e JavaScript puro, Chart.js e Papa Parse; não exige backend, banco de dados ou compilação.

A interface usa tema escuro. Nos gráficos, a escala térmica vai do azul frio `#03071e` ao vermelho quente `#d00000`, recalculada a cada alteração dos filtros.

## Abrir e explorar

1. Abra `public/index.html` em um navegador atualizado. A demonstração está incorporada em `public/script.js`, então não é necessário buscar o CSV local para iniciar.
2. Use os filtros de data, categoria, região e pesquisa. Os cartões, gráficos e tabela são atualizados em conjunto.
3. Selecione **Importar CSV** para substituir a demonstração por um arquivo próprio. O arquivo é lido localmente no navegador.
4. Selecione **Restaurar demonstração** para voltar aos dados de exemplo. Use **Exportar CSV** para baixar todas as linhas que correspondem aos filtros atuais.

Chart.js 4.4.7 e Papa Parse 5.4.1 são carregados por CDN, com versões fixadas. É necessária conexão com a internet para importar dados, desenhar os gráficos e exportar. Os dados escolhidos ficam no navegador e não são enviados a um servidor.

## Publicar no Render pelo GitHub

Envie o projeto ao GitHub e crie um serviço no Render usando estas opções:

| Opção | Valor |
| --- | --- |
| Tipo de serviço | **Static Site** |
| Repositório | Repositório GitHub do projeto |
| Branch | Branch que contém o projeto, por exemplo `main` |
| Root Directory | Deixe vazio |
| Build Command | `echo "Site pronto"` |
| Publish Directory | `public` |

O Render publicará `public/index.html` e os arquivos referenciados por caminhos relativos. Não é necessário configurar servidor ou comando de compilação. A cada atualização enviada à branch escolhida, o Render poderá publicar a nova versão.

## Dados da demonstração

`public/dados-exemplo.csv` contém 200 registros fictícios distribuídos de janeiro a dezembro de 2025. Cada linha é uma venda única de um produto, com ID único. Os valores, produtos, categorias e regiões foram criados para esta atividade; não representam uma empresa real. A mesma amostra está incorporada em `public/script.js` para permitir a abertura direta do HTML, sem `fetch`.

O projeto já tinha o arquivo original `vendas_hamburgueria.csv`, que foi preservado. Ele não se chama `vendas.csv` e não contém a coluna de região; por isso, a página inicia com a demonstração de 200 vendas para permitir explorar também a comparação regional, sem inventar regiões para as vendas originais. Esse arquivo original pode ser importado: as linhas válidas são analisadas, e a região aparece como “Sem informação”, pois ela não existe na base.

### Colunas aceitas

| Coluna | Descrição |
| --- | --- |
| `id_venda` | Identificador da venda |
| `data` | Data no formato `AAAA-MM-DD` |
| `produto` | Produto vendido |
| `categoria` | Categoria do produto |
| `regiao` | Região da venda |
| `quantidade` | Unidades vendidas; número inteiro não negativo |
| `preco_unitario` | Preço por unidade, como número sem símbolo de moeda |

Para a importação, `id_venda`, `data`, `quantidade` e `preco_unitario` são os cabeçalhos obrigatórios. Produto, categoria e região são opcionais; campos ou colunas ausentes são preservados e exibidos como “Sem informação”. Quando a coluna `regiao` não existe, o gráfico mostra que não há informação para comparar regiões. A validação descarta linhas com ID ausente, data inválida, quantidade ou preço ausente, inválido ou negativo, e informa as contagens e os motivos. Valores zero são válidos e não são confundidos com ausências. IDs repetidos são mantidos: a quantidade de vendas é calculada como contagem de IDs únicos, enquanto faturamento e unidades são somados por linha. Colunas adicionais importadas são preservadas na exportação.

## Indicadores e regras de cálculo

- **Faturamento por linha:** `quantidade × preco_unitario`.
- **Faturamento total:** soma do faturamento por linha nos registros filtrados.
- **Quantidade de vendas:** quantidade de `id_venda` únicos entre os registros filtrados.
- **Unidades vendidas:** soma de `quantidade` nas linhas filtradas.
- **Tíquete médio:** faturamento total dividido pela quantidade de vendas únicas. Se não houver vendas, o painel mostra R$ 0,00.
- **Faturamento mensal:** soma do faturamento das linhas por mês, apresentada em gráfico de linhas. Meses sem vendas entre as datas filtradas aparecem com valor zero.
- **Faturamento por categoria e por região:** soma do faturamento das linhas de cada grupo, exibida em gráficos de barras.
- **Preço unitário médio por produto:** média de `preco_unitario` das linhas filtradas para cada produto. O menor e o maior valor médio são identificados no próprio gráfico.

Os gráficos usam uma escala térmica: azul escuro frio (`#03071e`) para o menor valor e vermelho quente (`#d00000`) para o maior. A escala é recalculada com os dados filtrados.

A tabela permite pesquisar e ordenar por coluna. A exportação contém todas as linhas filtradas e inclui a coluna calculada `faturamento_linha`.

## Estrutura

- `AGENTS.md`: orientações do projeto.
- `README.md`: instruções, dados, fórmulas e publicação.
- `public/index.html`: estrutura da página.
- `public/styles.css`: aparência e adaptação para celular.
- `public/script.js`: amostra inicial, importação, validação, filtros, indicadores, gráficos, tabela e exportação.
- `public/dados-exemplo.csv`: base fictícia de 200 vendas.
- `vendas_hamburgueria.csv`: arquivo original do projeto, preservado sem alterações.
