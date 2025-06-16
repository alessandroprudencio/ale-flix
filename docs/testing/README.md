# Documentação de Testes

## Visão Geral

O AleFlix implementa uma estratégia abrangente de testes, cobrindo diferentes níveis e aspectos da aplicação.

## Estratégia de Testes

### 1. Testes Unitários (Jest)

```typescript
// Exemplo de teste unitário
describe("MediaService", () => {
  let service: MediaService;
  let repository: MockType<Repository<Media>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MediaService,
        {
          provide: getRepositoryToken(Media),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<MediaService>(MediaService);
    repository = module.get(getRepositoryToken(Media));
  });

  it("should find media by id", async () => {
    const media = new Media();
    media.id = "123";
    media.title = "Test Video";

    repository.findOne.mockReturnValue(media);

    const result = await service.findOne("123");
    expect(result).toEqual(media);
  });
});
```

### 2. Testes de Integração (SuperTest)

```typescript
// Exemplo de teste de integração
describe("MediaController (e2e)", () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it("/media (GET)", () => {
    return request(app.getHttpServer())
      .get("/media")
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty("items");
        expect(Array.isArray(res.body.items)).toBe(true);
      });
  });
});
```

### 3. Testes de Carga (K6)

```javascript
// Exemplo de teste de carga
import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  stages: [
    { duration: "30s", target: 20 },
    { duration: "1m", target: 50 },
    { duration: "30s", target: 0 },
  ],
};

export default function () {
  const res = http.get("http://api.streamflow.com/media");

  check(res, {
    "status is 200": (r) => r.status === 200,
    "response time < 200ms": (r) => r.timings.duration < 200,
  });

  sleep(1);
}
```

## Cobertura de Testes

### Frontend (Vue.js)

```bash
# Executar testes unitários
npm run test:unit

# Executar testes de componentes
npm run test:components

# Gerar relatório de cobertura
npm run test:coverage
```

### Backend (NestJS)

```bash
# Executar testes unitários
npm run test

# Executar testes e2e
npm run test:e2e

# Gerar relatório de cobertura
npm run test:cov
```

## Métricas de Qualidade

### Cobertura Mínima

- Linhas: 80%
- Branches: 75%
- Funções: 85%
- Statements: 80%

### Performance

- Tempo de resposta < 200ms
- Throughput > 1000 req/s
- Error rate < 0.1%

## Testes Automatizados

### GitHub Actions

```yaml
name: Tests

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2

      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: "20"

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm run test

      - name: Upload coverage
        uses: codecov/codecov-action@v2
```

## Testes de Segurança

### OWASP ZAP

```bash
# Executar scan de segurança
docker run -v $(pwd):/zap/wrk/:rw \
  -t owasp/zap2docker-stable zap-baseline.py \
  -t http://localhost:3000 \
  -g gen.conf \
  -r testreport.html
```

### SonarQube

```yaml
sonar:
  properties: sonar.projectKey=streamflow
    sonar.sources=src
    sonar.tests=test
    sonar.javascript.lcov.reportPaths=coverage/lcov.info
```

## Testes de Acessibilidade

### Lighthouse

```javascript
// Exemplo de teste de acessibilidade
const lighthouse = require("lighthouse");
const chromeLauncher = require("chrome-launcher");

async function runLighthouse() {
  const chrome = await chromeLauncher.launch();
  const options = {
    logLevel: "info",
    output: "html",
    onlyCategories: ["accessibility"],
    port: chrome.port,
  };

  const runnerResult = await lighthouse("http://localhost:3000", options);
  const report = runnerResult.report;

  await chrome.kill();
  return report;
}
```

## Testes de Internacionalização

```typescript
// Exemplo de teste i18n
describe("i18n", () => {
  it("should load all translations", () => {
    const locales = ["en", "pt-BR", "es"];

    locales.forEach((locale) => {
      const messages = require(`@/locales/${locale}.json`);
      expect(messages).toBeDefined();
      expect(Object.keys(messages).length).toBeGreaterThan(0);
    });
  });
});
```

## Relatórios de Teste

### Jest

```json
{
  "coverageReporters": ["json", "lcov", "text", "clover"],
  "coverageThreshold": {
    "global": {
      "branches": 75,
      "functions": 85,
      "lines": 80,
      "statements": 80
    }
  }
}
```

### K6

```bash
# Gerar relatório HTML
k6 run --out html=report.html load-test.js

# Gerar relatório JSON
k6 run --out json=report.json load-test.js
```
