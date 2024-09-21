
<div align="center">
<img src="https://sonarcloud.io/images/project_badges/sonarcloud-orange.svg"/>
<div>
<img src="https://sonarcloud.io/api/project_badges/measure?project=moutinhofuturedev_pizza.shop&metric=ncloc" />
<img src="https://sonarcloud.io/api/project_badges/measure?project=moutinhofuturedev_pizza.shop&metric=coverage" />
<img src="https://sonarcloud.io/api/project_badges/measure?project=moutinhofuturedev_pizza.shop&metric=alert_status" />
</div>
</div>

# Pizza Shop

Aplicativo de restaurantes de entrega de comida. Front-end construído com React, TypeScript, Tailwindcss e Shadcn UI.

🧬 Mais stacks utilizadas no frontend
- React Router DOM
- Tanstack Query
- Vite
- Vitest
- React Testing Library
- React Hook Form
- Zod
- Axios
- Dayjs
- Lucide React
- Recharts
- Mock Service Worker
- Biomejs


> 💡 **Dicas do Biomejs:**
Utilize a ferramenta **Biomejs** no seu projeto para automatizar a formatação e a organização de importações, além de aplicar regras de linting. O Biomejs é capaz de reorganizar automaticamente as importações no seu código, garantindo que os módulos sejam importados de forma ordenada e consistente. Isso facilita a legibilidade e manutenção do código, especialmente em projetos maiores.

***Configuração pessoal:***

```sh
# biome.json
{
  "$schema": "./node_modules/@biomejs/biome/configuration_schema.json",
  "organizeImports": {
    "enabled": true
  },
  "formatter": {
    "indentStyle": "space",
    "indentWidth": 2,
    "lineWidth": 80
  },
  "javascript": {
    "formatter": {
      "arrowParentheses": "asNeeded",
      "jsxQuoteStyle": "double",
      "quoteStyle": "single",
      "semicolons": "asNeeded",
      "trailingCommas": "es5"
    }
  },
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true
    }
  },
  "files": {
    "ignore": [
      "node_modules"
    ]
  }
}
```


## 🧩 Funcionalidades

- Cadastro de estabelecimento;
- Login de estabelecimento;
- Cadastro como cliente;
- Criação de novos pedidos;
- Gestão do cardápio;
- Gestão de avaliações;
- Gestão de pedidos;
- Gestão do perfil do estabelecimento;
- Loja aberta/fechada;
- Métricas p/ dashboard;
  - Gráfico de pedidos nos últimos 7 dias;
  - Gráfico de valores nos últimos 7 dias;
  - Média de avaliações (mês/geral);
  - Média de pedidos por dia (mês/geral);