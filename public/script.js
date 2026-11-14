"use strict";

const EXPECTED_FIELDS = ["id_venda", "data", "produto", "categoria", "regiao", "quantidade", "preco_unitario"];
const REQUIRED_HEADERS = ["id_venda", "data", "quantidade", "preco_unitario"];
const DEMO_CSV = "id_venda,data,produto,categoria,regiao,quantidade,preco_unitario\n1,2025-01-01,Classic,Lanche,Norte,2,29.90\n2,2025-01-08,Milk-shake,Sobremesa,Oeste,5,18.90\n3,2025-01-15,Batata frita,Acompanhamento,Leste,3,13.90\n4,2025-01-22,Refrigerante,Bebida,Sul,1,7.50\n5,2025-01-01,Cheeseburger,Lanche,Norte,4,34.90\n6,2025-01-08,Classic,Lanche,Oeste,2,29.90\n7,2025-01-15,Milk-shake,Sobremesa,Leste,5,18.90\n8,2025-01-22,Batata frita,Acompanhamento,Leste,3,13.90\n9,2025-01-01,Refrigerante,Bebida,Sul,1,7.50\n10,2025-01-08,Cheeseburger,Lanche,Norte,4,34.90\n11,2025-01-15,Classic,Lanche,Oeste,2,29.90\n12,2025-01-22,Milk-shake,Sobremesa,Leste,5,18.90\n13,2025-01-01,Batata frita,Acompanhamento,Sul,3,13.90\n14,2025-01-08,Refrigerante,Bebida,Norte,1,7.50\n15,2025-01-15,Cheeseburger,Lanche,Norte,4,34.90\n16,2025-01-22,Classic,Lanche,Oeste,2,29.90\n17,2025-01-01,Milk-shake,Sobremesa,Leste,5,18.90\n18,2025-02-08,Batata frita,Acompanhamento,Sul,3,13.90\n19,2025-02-15,Refrigerante,Bebida,Norte,1,7.50\n20,2025-02-22,Cheeseburger,Lanche,Oeste,4,34.90\n21,2025-02-01,Classic,Lanche,Leste,2,29.90\n22,2025-02-08,Milk-shake,Sobremesa,Leste,5,18.90\n23,2025-02-15,Batata frita,Acompanhamento,Sul,3,13.90\n24,2025-02-22,Refrigerante,Bebida,Norte,1,7.50\n25,2025-02-01,Cheeseburger,Lanche,Oeste,4,34.90\n26,2025-02-08,Classic,Lanche,Leste,2,29.90\n27,2025-02-15,Milk-shake,Sobremesa,Sul,5,18.90\n28,2025-02-22,Batata frita,Acompanhamento,Norte,3,13.90\n29,2025-02-01,Refrigerante,Bebida,Norte,1,7.50\n30,2025-02-08,Cheeseburger,Lanche,Oeste,4,34.90\n31,2025-02-15,Classic,Lanche,Leste,2,29.90\n32,2025-02-22,Milk-shake,Sobremesa,Sul,5,18.90\n33,2025-02-01,Batata frita,Acompanhamento,Norte,3,13.90\n34,2025-02-08,Refrigerante,Bebida,Oeste,1,7.50\n35,2025-03-15,Cheeseburger,Lanche,Leste,4,34.90\n36,2025-03-22,Classic,Lanche,Leste,2,29.90\n37,2025-03-01,Milk-shake,Sobremesa,Sul,5,18.90\n38,2025-03-08,Batata frita,Acompanhamento,Norte,3,13.90\n39,2025-03-15,Refrigerante,Bebida,Oeste,1,7.50\n40,2025-03-22,Cheeseburger,Lanche,Leste,4,34.90\n41,2025-03-01,Classic,Lanche,Sul,2,29.90\n42,2025-03-08,Milk-shake,Sobremesa,Norte,5,18.90\n43,2025-03-15,Batata frita,Acompanhamento,Norte,3,13.90\n44,2025-03-22,Refrigerante,Bebida,Oeste,1,7.50\n45,2025-03-01,Cheeseburger,Lanche,Leste,4,34.90\n46,2025-03-08,Classic,Lanche,Sul,2,29.90\n47,2025-03-15,Milk-shake,Sobremesa,Norte,5,18.90\n48,2025-03-22,Batata frita,Acompanhamento,Oeste,3,13.90\n49,2025-03-01,Refrigerante,Bebida,Leste,1,7.50\n50,2025-03-08,Cheeseburger,Lanche,Leste,4,34.90\n51,2025-04-15,Classic,Lanche,Sul,2,29.90\n52,2025-04-22,Milk-shake,Sobremesa,Norte,5,18.90\n53,2025-04-01,Batata frita,Acompanhamento,Oeste,3,13.90\n54,2025-04-08,Refrigerante,Bebida,Leste,1,7.50\n55,2025-04-15,Cheeseburger,Lanche,Sul,4,34.90\n56,2025-04-22,Classic,Lanche,Norte,2,29.90\n57,2025-04-01,Milk-shake,Sobremesa,Norte,5,18.90\n58,2025-04-08,Batata frita,Acompanhamento,Oeste,3,13.90\n59,2025-04-15,Refrigerante,Bebida,Leste,1,7.50\n60,2025-04-22,Cheeseburger,Lanche,Sul,4,34.90\n61,2025-04-01,Classic,Lanche,Norte,2,29.90\n62,2025-04-08,Milk-shake,Sobremesa,Oeste,5,18.90\n63,2025-04-15,Batata frita,Acompanhamento,Leste,3,13.90\n64,2025-04-22,Refrigerante,Bebida,Leste,1,7.50\n65,2025-04-01,Cheeseburger,Lanche,Sul,4,34.90\n66,2025-04-08,Classic,Lanche,Norte,2,29.90\n67,2025-04-15,Milk-shake,Sobremesa,Oeste,5,18.90\n68,2025-05-22,Batata frita,Acompanhamento,Leste,3,13.90\n69,2025-05-01,Refrigerante,Bebida,Sul,1,7.50\n70,2025-05-08,Cheeseburger,Lanche,Norte,4,34.90\n71,2025-05-15,Classic,Lanche,Norte,2,29.90\n72,2025-05-22,Milk-shake,Sobremesa,Oeste,5,18.90\n73,2025-05-01,Batata frita,Acompanhamento,Leste,3,13.90\n74,2025-05-08,Refrigerante,Bebida,Sul,1,7.50\n75,2025-05-15,Cheeseburger,Lanche,Norte,4,34.90\n76,2025-05-22,Classic,Lanche,Oeste,2,29.90\n77,2025-05-01,Milk-shake,Sobremesa,Leste,5,18.90\n78,2025-05-08,Batata frita,Acompanhamento,Leste,3,13.90\n79,2025-05-15,Refrigerante,Bebida,Sul,1,7.50\n80,2025-05-22,Cheeseburger,Lanche,Norte,4,34.90\n81,2025-05-01,Classic,Lanche,Oeste,2,29.90\n82,2025-05-08,Milk-shake,Sobremesa,Leste,5,18.90\n83,2025-05-15,Batata frita,Acompanhamento,Sul,3,13.90\n84,2025-05-22,Refrigerante,Bebida,Norte,1,7.50\n85,2025-06-01,Cheeseburger,Lanche,Norte,4,34.90\n86,2025-06-08,Classic,Lanche,Oeste,2,29.90\n87,2025-06-15,Milk-shake,Sobremesa,Leste,5,18.90\n88,2025-06-22,Batata frita,Acompanhamento,Sul,3,13.90\n89,2025-06-01,Refrigerante,Bebida,Norte,1,7.50\n90,2025-06-08,Cheeseburger,Lanche,Oeste,4,34.90\n91,2025-06-15,Classic,Lanche,Leste,2,29.90\n92,2025-06-22,Milk-shake,Sobremesa,Leste,5,18.90\n93,2025-06-01,Batata frita,Acompanhamento,Sul,3,13.90\n94,2025-06-08,Refrigerante,Bebida,Norte,1,7.50\n95,2025-06-15,Cheeseburger,Lanche,Oeste,4,34.90\n96,2025-06-22,Classic,Lanche,Leste,2,29.90\n97,2025-06-01,Milk-shake,Sobremesa,Sul,5,18.90\n98,2025-06-08,Batata frita,Acompanhamento,Norte,3,13.90\n99,2025-06-15,Refrigerante,Bebida,Norte,1,7.50\n100,2025-06-22,Cheeseburger,Lanche,Oeste,4,34.90\n101,2025-07-01,Classic,Lanche,Leste,2,29.90\n102,2025-07-08,Milk-shake,Sobremesa,Sul,5,18.90\n103,2025-07-15,Batata frita,Acompanhamento,Norte,3,13.90\n104,2025-07-22,Refrigerante,Bebida,Oeste,1,7.50\n105,2025-07-01,Cheeseburger,Lanche,Leste,4,34.90\n106,2025-07-08,Classic,Lanche,Leste,2,29.90\n107,2025-07-15,Milk-shake,Sobremesa,Sul,5,18.90\n108,2025-07-22,Batata frita,Acompanhamento,Norte,3,13.90\n109,2025-07-01,Refrigerante,Bebida,Oeste,1,7.50\n110,2025-07-08,Cheeseburger,Lanche,Leste,4,34.90\n111,2025-07-15,Classic,Lanche,Sul,2,29.90\n112,2025-07-22,Milk-shake,Sobremesa,Norte,5,18.90\n113,2025-07-01,Batata frita,Acompanhamento,Norte,3,13.90\n114,2025-07-08,Refrigerante,Bebida,Oeste,1,7.50\n115,2025-07-15,Cheeseburger,Lanche,Leste,4,34.90\n116,2025-07-22,Classic,Lanche,Sul,2,29.90\n117,2025-07-01,Milk-shake,Sobremesa,Norte,5,18.90\n118,2025-08-08,Batata frita,Acompanhamento,Oeste,3,13.90\n119,2025-08-15,Refrigerante,Bebida,Leste,1,7.50\n120,2025-08-22,Cheeseburger,Lanche,Leste,4,34.90\n121,2025-08-01,Classic,Lanche,Sul,2,29.90\n122,2025-08-08,Milk-shake,Sobremesa,Norte,5,18.90\n123,2025-08-15,Batata frita,Acompanhamento,Oeste,3,13.90\n124,2025-08-22,Refrigerante,Bebida,Leste,1,7.50\n125,2025-08-01,Cheeseburger,Lanche,Sul,4,34.90\n126,2025-08-08,Classic,Lanche,Norte,2,29.90\n127,2025-08-15,Milk-shake,Sobremesa,Norte,5,18.90\n128,2025-08-22,Batata frita,Acompanhamento,Oeste,3,13.90\n129,2025-08-01,Refrigerante,Bebida,Leste,1,7.50\n130,2025-08-08,Cheeseburger,Lanche,Sul,4,34.90\n131,2025-08-15,Classic,Lanche,Norte,2,29.90\n132,2025-08-22,Milk-shake,Sobremesa,Oeste,5,18.90\n133,2025-08-01,Batata frita,Acompanhamento,Leste,3,13.90\n134,2025-08-08,Refrigerante,Bebida,Leste,1,7.50\n135,2025-09-15,Cheeseburger,Lanche,Sul,4,34.90\n136,2025-09-22,Classic,Lanche,Norte,2,29.90\n137,2025-09-01,Milk-shake,Sobremesa,Oeste,5,18.90\n138,2025-09-08,Batata frita,Acompanhamento,Leste,3,13.90\n139,2025-09-15,Refrigerante,Bebida,Sul,1,7.50\n140,2025-09-22,Cheeseburger,Lanche,Norte,4,34.90\n141,2025-09-01,Classic,Lanche,Norte,2,29.90\n142,2025-09-08,Milk-shake,Sobremesa,Oeste,5,18.90\n143,2025-09-15,Batata frita,Acompanhamento,Leste,3,13.90\n144,2025-09-22,Refrigerante,Bebida,Sul,1,7.50\n145,2025-09-01,Cheeseburger,Lanche,Norte,4,34.90\n146,2025-09-08,Classic,Lanche,Oeste,2,29.90\n147,2025-09-15,Milk-shake,Sobremesa,Leste,5,18.90\n148,2025-09-22,Batata frita,Acompanhamento,Leste,3,13.90\n149,2025-09-01,Refrigerante,Bebida,Sul,1,7.50\n150,2025-09-08,Cheeseburger,Lanche,Norte,4,34.90\n151,2025-10-15,Classic,Lanche,Oeste,2,29.90\n152,2025-10-22,Milk-shake,Sobremesa,Leste,5,18.90\n153,2025-10-01,Batata frita,Acompanhamento,Sul,3,13.90\n154,2025-10-08,Refrigerante,Bebida,Norte,1,7.50\n155,2025-10-15,Cheeseburger,Lanche,Norte,4,34.90\n156,2025-10-22,Classic,Lanche,Oeste,2,29.90\n157,2025-10-01,Milk-shake,Sobremesa,Leste,5,18.90\n158,2025-10-08,Batata frita,Acompanhamento,Sul,3,13.90\n159,2025-10-15,Refrigerante,Bebida,Norte,1,7.50\n160,2025-10-22,Cheeseburger,Lanche,Oeste,4,34.90\n161,2025-10-01,Classic,Lanche,Leste,2,29.90\n162,2025-10-08,Milk-shake,Sobremesa,Leste,5,18.90\n163,2025-10-15,Batata frita,Acompanhamento,Sul,3,13.90\n164,2025-10-22,Refrigerante,Bebida,Norte,1,7.50\n165,2025-10-01,Cheeseburger,Lanche,Oeste,4,34.90\n166,2025-10-08,Classic,Lanche,Leste,2,29.90\n167,2025-10-15,Milk-shake,Sobremesa,Sul,5,18.90\n168,2025-11-22,Batata frita,Acompanhamento,Norte,3,13.90\n169,2025-11-01,Refrigerante,Bebida,Norte,1,7.50\n170,2025-11-08,Cheeseburger,Lanche,Oeste,4,34.90\n171,2025-11-15,Classic,Lanche,Leste,2,29.90\n172,2025-11-22,Milk-shake,Sobremesa,Sul,5,18.90\n173,2025-11-01,Batata frita,Acompanhamento,Norte,3,13.90\n174,2025-11-08,Refrigerante,Bebida,Oeste,1,7.50\n175,2025-11-15,Cheeseburger,Lanche,Leste,4,34.90\n176,2025-11-22,Classic,Lanche,Leste,2,29.90\n177,2025-11-01,Milk-shake,Sobremesa,Sul,5,18.90\n178,2025-11-08,Batata frita,Acompanhamento,Norte,3,13.90\n179,2025-11-15,Refrigerante,Bebida,Oeste,1,7.50\n180,2025-11-22,Cheeseburger,Lanche,Leste,4,34.90\n181,2025-11-01,Classic,Lanche,Sul,2,29.90\n182,2025-11-08,Milk-shake,Sobremesa,Norte,5,18.90\n183,2025-11-15,Batata frita,Acompanhamento,Norte,3,13.90\n184,2025-11-22,Refrigerante,Bebida,Oeste,1,7.50\n185,2025-12-01,Cheeseburger,Lanche,Leste,4,34.90\n186,2025-12-08,Classic,Lanche,Sul,2,29.90\n187,2025-12-15,Milk-shake,Sobremesa,Norte,5,18.90\n188,2025-12-22,Batata frita,Acompanhamento,Oeste,3,13.90\n189,2025-12-01,Refrigerante,Bebida,Leste,1,7.50\n190,2025-12-08,Cheeseburger,Lanche,Leste,4,34.90\n191,2025-12-15,Classic,Lanche,Sul,2,29.90\n192,2025-12-22,Milk-shake,Sobremesa,Norte,5,18.90\n193,2025-12-01,Batata frita,Acompanhamento,Oeste,3,13.90\n194,2025-12-08,Refrigerante,Bebida,Leste,1,7.50\n195,2025-12-15,Cheeseburger,Lanche,Sul,4,34.90\n196,2025-12-22,Classic,Lanche,Norte,2,29.90\n197,2025-12-01,Milk-shake,Sobremesa,Norte,5,18.90\n198,2025-12-08,Batata frita,Acompanhamento,Oeste,3,13.90\n199,2025-12-15,Refrigerante,Bebida,Leste,1,7.50\n200,2025-12-22,Cheeseburger,Lanche,Sul,4,34.90\n";

const TABLE_COLUMNS = [
  { key: "id", label: "ID da venda" },
  { key: "date", label: "Data" },
  { key: "product", label: "Produto" },
  { key: "category", label: "Categoria" },
  { key: "region", label: "Região" },
  { key: "quantity", label: "Unidades" },
  { key: "unitPrice", label: "Preço unitário" },
  { key: "revenue", label: "Faturamento" }
];

const state = {
  rows: [], filteredRows: [], charts: { monthly: null, category: null, region: null },
  sortKey: "date", sortDirection: "desc", discarded: {}, parseWarnings: 0,
  missingCategories: 0, missingRegions: 0, missingHeaders: [], sourceFields: EXPECTED_FIELDS, sourceName: ""
};

const byId = (id) => document.getElementById(id);
const money = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
const wholeNumber = new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 0 });
const decimalNumber = new Intl.NumberFormat("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const dateFormat = new Intl.DateTimeFormat("pt-BR", { timeZone: "UTC" });
const monthFormat = new Intl.DateTimeFormat("pt-BR", { month: "short", year: "numeric", timeZone: "UTC" });

function setStatus(message, kind = "") {
  const status = byId("status-message");
  status.className = `status-message ${kind}`.trim();
  status.lastElementChild.textContent = message;
}

function parseDate(value) {
  const text = String(value ?? "").trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(text)) return null;
  const date = new Date(`${text}T00:00:00Z`);
  return Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== text ? null : text;
}

function parseNumber(value, integer = false) {
  const text = String(value ?? "").trim();
  if (!text) return { missing: true, value: null };
  const number = Number(text.replace(",", "."));
  if (!Number.isFinite(number) || (integer && !Number.isInteger(number))) return { invalid: true, value: null };
  return { value: number };
}

function addReason(reasons, label) {
  reasons[label] = (reasons[label] || 0) + 1;
}

function normalizeRecord(source, discarded, missing, sourceFields) {
  const id = String(source.id_venda ?? "").trim();
  if (!id) { addReason(discarded, "ID ausente"); return null; }

  const date = parseDate(source.data);
  if (!date) { addReason(discarded, "data ausente ou inválida"); return null; }

  const quantity = parseNumber(source.quantidade, true);
  if (quantity.missing) { addReason(discarded, "quantidade ausente"); return null; }
  if (quantity.invalid || quantity.value < 0) { addReason(discarded, "quantidade inválida"); return null; }

  const unitPrice = parseNumber(source.preco_unitario);
  if (unitPrice.missing) { addReason(discarded, "preço unitário ausente"); return null; }
  if (unitPrice.invalid || unitPrice.value < 0) { addReason(discarded, "preço unitário inválido"); return null; }

  const product = String(source.produto ?? "").trim();
  const categoryValue = String(source.categoria ?? "").trim();
  const regionValue = String(source.regiao ?? "").trim();
  if (!categoryValue) missing.categories += 1;
  if (!regionValue) missing.regions += 1;

  const original = sourceFields.map((field) => String(source[field] ?? ""));
  return {
    id, date, product: product || "(Sem informação)",
    category: categoryValue || "(Sem informação)", region: regionValue || "(Sem informação)",
    quantity: quantity.value, unitPrice: unitPrice.value,
    revenue: Math.round(quantity.value * unitPrice.value * 100) / 100,
    original
  };
}

function readParsedCsv(results, sourceName, isDemo = false) {
  const fields = results.meta.fields || [];
  const missingHeaders = REQUIRED_HEADERS.filter((field) => !fields.includes(field));
  if (missingHeaders.length) {
    setStatus(`CSV não carregado. Faltam estas colunas: ${missingHeaders.join(", ")}.`, "error");
    return;
  }

  const discarded = {};
  const missing = { categories: 0, regions: 0 };
  const rows = results.data
    .map((source) => normalizeRecord(source, discarded, missing, fields))
    .filter(Boolean);

  if (!rows.length) {
    setStatus("Não encontrei vendas válidas. Verifique os IDs, as datas, as quantidades e os preços do CSV.", "error");
    return;
  }

  state.rows = rows;
  state.filteredRows = [...rows];
  state.discarded = discarded;
  state.parseWarnings = results.errors.length;
  state.missingCategories = missing.categories;
  state.missingRegions = missing.regions;
  state.missingHeaders = EXPECTED_FIELDS.filter((field) => !fields.includes(field));
  state.sourceFields = fields;
  state.sourceName = sourceName;
  populateFilters();
  updateMode(isDemo);
  byId("source-description").textContent = isDemo
    ? "A amostra fictícia já está carregada. Importe um CSV para substituí-la."
    : `${sourceName} carregado no navegador. A amostra continua disponível em “Restaurar demonstração”.`;
  byId("restore-demo").hidden = isDemo;

  const discardedCount = Object.values(discarded).reduce((sum, count) => sum + count, 0);
  const warningCount = results.errors.length;
  const status = isDemo
    ? "A base fictícia é apenas demonstrativa; os resultados não representam vendas reais."
    : `${rows.length} linhas válidas carregadas de ${sourceName}. Os dados permanecem neste navegador.`;
  const details = [];
  if (discardedCount) details.push(`${discardedCount} linha(s) descartada(s) por dados obrigatórios ausentes ou inválidos`);
  if (warningCount) details.push(`${warningCount} aviso(s) de leitura do CSV`);
  if (state.missingHeaders.length) details.push(`colunas ausentes tratadas como “Sem informação”: ${state.missingHeaders.join(", ")}`);
  setStatus(details.length ? `${status} Validação: ${details.join("; ")}.` : status, details.length ? "error" : "");
  updateDashboard();
}

function updateMode(isDemo) {
  const badge = byId("data-mode");
  badge.className = isDemo ? "demo-badge" : "demo-badge imported";
  const dot = document.createElement("span");
  dot.className = "badge-dot";
  dot.setAttribute("aria-hidden", "true");
  badge.replaceChildren(dot, document.createTextNode(isDemo ? " DADOS DEMONSTRATIVOS" : " CSV IMPORTADO"));
}

function populateSelect(id, values, firstOption) {
  const select = byId(id);
  const first = select.options[0];
  first.textContent = firstOption;
  select.replaceChildren(first);
  [...new Set(values)].sort((a, b) => a.localeCompare(b, "pt-BR")).forEach((value) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    select.append(option);
  });
}

function populateFilters() {
  populateSelect("category-filter", state.rows.map((row) => row.category), "Todas as categorias");
  populateSelect("region-filter", state.rows.map((row) => row.region), "Todas as regiões");
  const dates = state.rows.map((row) => row.date).sort();
  byId("date-from").min = dates[0];
  byId("date-from").max = dates.at(-1);
  byId("date-to").min = dates[0];
  byId("date-to").max = dates.at(-1);
  byId("date-from").value = "";
  byId("date-to").value = "";
  byId("category-filter").value = "";
  byId("region-filter").value = "";
  byId("search-filter").value = "";
}

function applyFilters() {
  const from = byId("date-from").value;
  const to = byId("date-to").value;
  const category = byId("category-filter").value;
  const region = byId("region-filter").value;
  const search = byId("search-filter").value.trim().toLocaleLowerCase("pt-BR");

  state.filteredRows = state.rows.filter((row) => {
    if (from && row.date < from) return false;
    if (to && row.date > to) return false;
    if (category && row.category !== category) return false;
    if (region && row.region !== region) return false;
    if (search && !row.original.join(" ").toLocaleLowerCase("pt-BR").includes(search)) return false;
    return true;
  });
  updateDashboard();
}

function updateMetrics() {
  const rows = state.filteredRows;
  const revenue = rows.reduce((sum, row) => sum + row.revenue, 0);
  const units = rows.reduce((sum, row) => sum + row.quantity, 0);
  const sales = new Set(rows.map((row) => row.id)).size;

  byId("metric-revenue").textContent = money.format(revenue);
  byId("metric-sales").textContent = wholeNumber.format(sales);
  byId("metric-units").textContent = wholeNumber.format(units);
  byId("metric-ticket").textContent = money.format(sales ? revenue / sales : 0);
  byId("record-count").textContent = `${wholeNumber.format(rows.length)} ${rows.length === 1 ? "registro" : "registros"}`;

  const dates = rows.map((row) => row.date).sort();
  byId("date-summary").textContent = dates.length
    ? `${dateFormat.format(new Date(`${dates[0]}T00:00:00Z`))} – ${dateFormat.format(new Date(`${dates.at(-1)}T00:00:00Z`))}`
    : "";
}

function monthKeysBetween(first, last) {
  if (!first || !last) return [];
  const months = [];
  let cursor = new Date(`${first.slice(0, 7)}-01T00:00:00Z`);
  const end = new Date(`${last.slice(0, 7)}-01T00:00:00Z`);
  while (cursor <= end) {
    months.push(cursor.toISOString().slice(0, 7));
    cursor = new Date(Date.UTC(cursor.getUTCFullYear(), cursor.getUTCMonth() + 1, 1));
  }
  return months;
}

function chartBaseOptions() {
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true, position: "bottom", labels: { color: "#c0cad7", boxWidth: 8, boxHeight: 8, font: { size: 9 }, padding: 12 } },
      tooltip: { callbacks: { label: (context) => ` ${money.format(context.raw)}` } }
    }
  };
}

function heatColor(value, min, max) {
  const cold = [3, 7, 30];
  const hot = [208, 0, 0];
  const ratio = max === min ? 0.5 : Math.max(0, Math.min(1, (value - min) / (max - min)));
  const channels = cold.map((start, index) => Math.round(start + (hot[index] - start) * ratio));
  return `#${channels.map((channel) => channel.toString(16).padStart(2, "0")).join("")}`;
}

function scaleColors(values) {
  if (!values.length) return [];
  const min = Math.min(...values);
  const max = Math.max(...values);
  return values.map((value) => heatColor(value, min, max));
}

function replaceChart(name, canvas, config) {
  if (state.charts[name]) state.charts[name].destroy();
  state.charts[name] = new Chart(byId(canvas), config);
}

function updateCharts() {
  const rows = state.filteredRows;
  const monthTotals = new Map();
  const categoryTotals = new Map();
  const regionTotals = new Map();
  const productPrices = new Map();
  rows.forEach((row) => {
    const month = row.date.slice(0, 7);
    monthTotals.set(month, (monthTotals.get(month) || 0) + row.revenue);
    categoryTotals.set(row.category, (categoryTotals.get(row.category) || 0) + row.revenue);
    regionTotals.set(row.region, (regionTotals.get(row.region) || 0) + row.revenue);
    const price = productPrices.get(row.product) || { total: 0, count: 0 };
    price.total += row.unitPrice;
    price.count += 1;
    productPrices.set(row.product, price);
  });

  const dates = rows.map((row) => row.date).sort();
  const months = monthKeysBetween(dates[0], dates.at(-1));
  const monthlyValues = months.map((month) => monthTotals.get(month) || 0);
  const monthlyMin = monthlyValues.length ? Math.min(...monthlyValues) : 0;
  const monthlyMax = monthlyValues.length ? Math.max(...monthlyValues) : 0;
  const common = chartBaseOptions();
  replaceChart("monthly", "monthly-chart", {
    type: "line",
    data: {
      labels: months.map((month) => monthFormat.format(new Date(`${month}-01T00:00:00Z`))),
      datasets: [{
        label: "Faturamento",
        data: monthlyValues,
        borderColor: "#03071e",
        segment: { borderColor: (context) => heatColor((context.p0.parsed.y + context.p1.parsed.y) / 2, monthlyMin, monthlyMax) },
        pointBackgroundColor: scaleColors(monthlyValues),
        pointBorderColor: "#d6e0ee",
        pointBorderWidth: 2,
        pointHoverBorderColor: "#ffffff",
        backgroundColor: "rgba(3, 7, 30, .07)",
        borderWidth: 2.5,
        pointRadius: 4,
        pointHoverRadius: 6,
        fill: true,
        tension: .28
      }]
    },
    options: {
      ...common,
      interaction: { intersect: false, mode: "index" },
      scales: {
        x: { grid: { display: false }, ticks: { color: "#aab6c5", font: { size: 9 }, maxRotation: 0 } },
        y: { beginAtZero: true, grid: { color: "#29374a" }, ticks: { color: "#aab6c5", font: { size: 9 }, callback: (value) => money.format(value) } }
      }
    }
  });

  const categories = [...categoryTotals.entries()].sort((a, b) => b[1] - a[1]);
  const categoryValues = categories.map(([, value]) => value);
  replaceChart("category", "category-chart", {
    type: "bar",
    data: { labels: categories.map(([name]) => name), datasets: [{ label: "Faturamento", data: categoryValues, backgroundColor: scaleColors(categoryValues), hoverBackgroundColor: scaleColors(categoryValues), borderColor: "#93a7c6", borderWidth: 1, borderRadius: 4, maxBarThickness: 42 }] },
    options: {
      ...common,
      scales: {
        x: { grid: { display: false }, ticks: { color: "#aab6c5", font: { size: 9 } } },
        y: { beginAtZero: true, grid: { color: "#29374a" }, ticks: { color: "#aab6c5", font: { size: 9 }, callback: (value) => money.format(value) } }
      }
    }
  });

  const regions = [...regionTotals.entries()].sort((a, b) => b[1] - a[1]);
  const regionValues = regions.map(([, value]) => value);
  replaceChart("region", "region-chart", {
    type: "bar",
    data: { labels: regions.map(([name]) => name), datasets: [{ label: "Faturamento", data: regionValues, backgroundColor: scaleColors(regionValues), hoverBackgroundColor: scaleColors(regionValues), borderColor: "#93a7c6", borderWidth: 1, borderRadius: 4, maxBarThickness: 28 }] },
    options: {
      ...common,
      indexAxis: "y",
      scales: {
        x: { beginAtZero: true, grid: { color: "#29374a" }, ticks: { color: "#aab6c5", font: { size: 9 }, callback: (value) => money.format(value) } },
        y: { grid: { display: false }, ticks: { color: "#aab6c5", font: { size: 9 } } }
      }
    }
  });

  const prices = [...productPrices.entries()]
    .map(([name, values]) => ({ name, average: values.total / values.count }))
    .sort((a, b) => a.average - b.average);
  const priceValues = prices.map((item) => item.average);
  if (prices.length) {
    const lowest = prices[0];
    const highest = prices.at(-1);
    byId("price-range").textContent = `MENOR ${money.format(lowest.average)} (${lowest.name}) · MAIOR ${money.format(highest.average)} (${highest.name})`;
  } else {
    byId("price-range").textContent = "MENOR — · MAIOR —";
  }
  replaceChart("price", "price-chart", {
    type: "bar",
    data: { labels: prices.map((item) => item.name), datasets: [{ label: "Preço unitário médio", data: priceValues, backgroundColor: scaleColors(priceValues), hoverBackgroundColor: scaleColors(priceValues), borderColor: "#93a7c6", borderWidth: 1, borderRadius: 4, maxBarThickness: 22 }] },
    options: {
      ...common,
      indexAxis: "y",
      scales: {
        x: { beginAtZero: true, grid: { color: "#29374a" }, ticks: { color: "#aab6c5", font: { size: 9 }, callback: (value) => money.format(value) } },
        y: { grid: { display: false }, ticks: { color: "#aab6c5", font: { size: 9 } } }
      }
    }
  });
}

function sortedRows() {
  const direction = state.sortDirection === "asc" ? 1 : -1;
  return [...state.filteredRows].sort((a, b) => {
    const left = a[state.sortKey];
    const right = b[state.sortKey];
    if (left == null || left === "") return 1;
    if (right == null || right === "") return -1;
    if (typeof left === "number" && typeof right === "number") return (left - right) * direction;
    return String(left).localeCompare(String(right), "pt-BR", { numeric: true }) * direction;
  });
}

function displayValue(key, row) {
  const value = row[key];
  if (value == null || value === "") return "—";
  if (key === "date") return dateFormat.format(new Date(`${value}T00:00:00Z`));
  if (key === "unitPrice" || key === "revenue") return money.format(value);
  if (key === "quantity") return wholeNumber.format(value);
  return value;
}

function renderTable() {
  const head = byId("table-head");
  head.replaceChildren();
  const headerRow = document.createElement("tr");
  TABLE_COLUMNS.forEach(({ key, label }) => {
    const cell = document.createElement("th");
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.sort = key;
    const arrow = state.sortKey === key ? (state.sortDirection === "asc" ? " ↑" : " ↓") : "";
    button.textContent = label + arrow;
    button.setAttribute("aria-label", `Ordenar por ${label}`);
    cell.append(button);
    headerRow.append(cell);
  });
  head.append(headerRow);

  const body = byId("table-body");
  body.replaceChildren();
  const rows = sortedRows();
  const fragment = document.createDocumentFragment();
  rows.forEach((row) => {
    const tr = document.createElement("tr");
    TABLE_COLUMNS.forEach(({ key }) => {
      const cell = document.createElement("td");
      cell.textContent = displayValue(key, row);
      tr.append(cell);
    });
    fragment.append(tr);
  });
  body.append(fragment);

  byId("table-count").textContent = `${wholeNumber.format(rows.length)} ${rows.length === 1 ? "linha" : "linhas"}`;
  byId("empty-state").hidden = rows.length !== 0;
  byId("table-scroll").hidden = rows.length === 0;
}

function renderDataQuality() {
  const parts = [`<span><strong>${wholeNumber.format(state.rows.length)}</strong> linhas válidas na base.</span>`];
  const discardedCount = Object.values(state.discarded).reduce((sum, count) => sum + count, 0);
  if (discardedCount) {
    const reasons = Object.entries(state.discarded).map(([reason, count]) => `${wholeNumber.format(count)} ${reason}`).join("; ");
    parts.push(`<span><strong>${wholeNumber.format(discardedCount)}</strong> linhas descartadas: ${escapeHtml(reasons)}.</span>`);
  } else {
    parts.push("<span><strong>0</strong> linhas descartadas por validação.</span>");
  }
  if (state.missingCategories) parts.push(`<span>${wholeNumber.format(state.missingCategories)} categorias ausentes aparecem como “Sem informação”.</span>`);
  if (state.missingRegions) parts.push(`<span>${wholeNumber.format(state.missingRegions)} regiões ausentes aparecem como “Sem informação”.</span>`);
  if (state.missingHeaders.length) parts.push(`<span>Colunas não encontradas: ${escapeHtml(state.missingHeaders.join(", "))}. As comparações correspondentes não têm dados nesta base.</span>`);
  if (state.parseWarnings) parts.push(`<span>${wholeNumber.format(state.parseWarnings)} aviso(s) informado(s) pelo leitor CSV.</span>`);
  const uniqueSales = new Set(state.rows.map((row) => row.id)).size;
  if (uniqueSales < state.rows.length) parts.push("<span>IDs repetidos são mantidos; a quantidade de vendas conta IDs únicos.</span>");
  byId("data-quality").innerHTML = parts.join("");
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);
}

function updateDashboard() {
  updateMetrics();
  updateCharts();
  renderTable();
  renderDataQuality();
}

function clearFilters() {
  byId("date-from").value = "";
  byId("date-to").value = "";
  byId("category-filter").value = "";
  byId("region-filter").value = "";
  byId("search-filter").value = "";
  applyFilters();
}

function importFile(file) {
  if (!window.Papa) {
    setStatus("A biblioteca de leitura CSV não carregou. Verifique sua conexão com a internet e atualize a página.", "error");
    return;
  }
  setStatus(`Lendo ${file.name} localmente no navegador…`);
  window.Papa.parse(file, {
    header: true,
    skipEmptyLines: "greedy",
    complete: (results) => readParsedCsv(results, file.name),
    error: (error) => setStatus(`Não foi possível ler o CSV: ${error.message}`, "error")
  });
}

function restoreDemo() {
  window.Papa.parse(DEMO_CSV, {
    header: true,
    skipEmptyLines: "greedy",
    complete: (results) => readParsedCsv(results, "dados-exemplo.csv", true)
  });
}

function exportFilteredCsv() {
  if (!window.Papa) {
    setStatus("A biblioteca de exportação não carregou. Verifique sua conexão com a internet.", "error");
    return;
  }
  const fields = [...state.sourceFields, "faturamento_linha"];
  const data = sortedRows().map((row) => [...row.original, row.revenue.toFixed(2)]);
  const csv = `\uFEFF${window.Papa.unparse({ fields, data })}`;
  const link = document.createElement("a");
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
  link.href = url;
  link.download = `vendas-filtradas-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

byId("csv-file").addEventListener("change", (event) => {
  const [file] = event.target.files;
  if (file) importFile(file);
  event.target.value = "";
});
["date-from", "date-to", "category-filter", "region-filter"].forEach((id) => byId(id).addEventListener("change", applyFilters));
byId("search-filter").addEventListener("input", applyFilters);
byId("clear-filters").addEventListener("click", clearFilters);
byId("restore-demo").addEventListener("click", restoreDemo);
byId("export-csv").addEventListener("click", exportFilteredCsv);
byId("table-head").addEventListener("click", (event) => {
  const button = event.target.closest("button[data-sort]");
  if (!button) return;
  const key = button.dataset.sort;
  state.sortDirection = state.sortKey === key && state.sortDirection === "asc" ? "desc" : "asc";
  state.sortKey = key;
  renderTable();
});

if (window.Chart && window.Papa) {
  restoreDemo();
} else {
  setStatus("Não foi possível carregar os gráficos e a leitura de CSV. Verifique a conexão com a internet e atualize a página.", "error");
}
