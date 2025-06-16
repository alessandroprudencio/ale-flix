# Documentação da API

## Visão Geral

A API do AleFlix é construída com NestJS e Fastify, seguindo os princípios RESTful e utilizando OpenAPI para documentação.

## Autenticação

Todas as requisições à API (exceto login e registro) devem incluir o token JWT no header:

```
Authorization: Bearer <token>
```

## Endpoints

### Autenticação

#### POST /auth/login

```yaml
requestBody:
  content:
    application/json:
      schema:
        type: object
        properties:
          email:
            type: string
            format: email
          password:
            type: string
            minLength: 6
responses:
  200:
    content:
      application/json:
        schema:
          type: object
          properties:
            token:
              type: string
            user:
              $ref: "#/components/schemas/User"
```

#### POST /auth/register

```yaml
requestBody:
  content:
    application/json:
      schema:
        type: object
        properties:
          email:
            type: string
            format: email
          password:
            type: string
            minLength: 6
          name:
            type: string
responses:
  201:
    content:
      application/json:
        schema:
          $ref: "#/components/schemas/User"
```

### Usuários

#### GET /users/me

```yaml
security:
  - bearerAuth: []
responses:
  200:
    content:
      application/json:
        schema:
          $ref: "#/components/schemas/User"
```

### Mídia

#### GET /media

```yaml
parameters:
  - name: page
    in: query
    schema:
      type: integer
      default: 1
  - name: limit
    in: query
    schema:
      type: integer
      default: 10
responses:
  200:
    content:
      application/json:
        schema:
          type: object
          properties:
            items:
              type: array
              items:
                $ref: "#/components/schemas/Media"
            total:
              type: integer
            page:
              type: integer
            limit:
              type: integer
```

#### GET /media/{id}

```yaml
parameters:
  - name: id
    in: path
    required: true
    schema:
      type: string
responses:
  200:
    content:
      application/json:
        schema:
          $ref: "#/components/schemas/Media"
```

### Streaming

#### GET /media/{id}/stream

```yaml
parameters:
  - name: id
    in: path
    required: true
    schema:
      type: string
responses:
  200:
    content:
      application/json:
        schema:
          type: object
          properties:
            url:
              type: string
            expiresAt:
              type: string
              format: date-time
```

## Schemas

### User

```yaml
type: object
properties:
  id:
    type: string
    format: uuid
  email:
    type: string
    format: email
  name:
    type: string
  role:
    type: string
    enum: [USER, PRODUCER, ADMIN]
  createdAt:
    type: string
    format: date-time
  updatedAt:
    type: string
    format: date-time
```

### Media

```yaml
type: object
properties:
  id:
    type: string
    format: uuid
  title:
    type: string
  description:
    type: string
  duration:
    type: integer
  thumbnailUrl:
    type: string
  status:
    type: string
    enum: [PROCESSING, READY, ERROR]
  createdAt:
    type: string
    format: date-time
  updatedAt:
    type: string
    format: date-time
```

## Códigos de Erro

| Código | Descrição                                 |
| ------ | ----------------------------------------- |
| 400    | Bad Request - Dados inválidos             |
| 401    | Unauthorized - Token inválido ou expirado |
| 403    | Forbidden - Sem permissão                 |
| 404    | Not Found - Recurso não encontrado        |
| 429    | Too Many Requests - Rate limit excedido   |
| 500    | Internal Server Error - Erro interno      |

## Rate Limiting

A API implementa rate limiting para proteger contra abusos:

- 100 requisições por minuto por IP
- 1000 requisições por hora por usuário autenticado

## WebSocket

### Eventos

```typescript
// Conexão
//api.streamflow.com/ws

// Eventos disponíveis
ws: interface Events {
  "media:status": {
    mediaId: string;
    status: "PROCESSING" | "READY" | "ERROR";
  };
  "user:notification": {
    type: string;
    message: string;
  };
}
```

## Exemplos de Uso

### Autenticação

```bash
# Login
curl -X POST http://api.streamflow.com/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "password123"}'

# Usar token
curl http://api.streamflow.com/users/me \
  -H "Authorization: Bearer <token>"
```

### Streaming

```bash
# Obter URL de streaming
curl http://api.streamflow.com/media/123/stream \
  -H "Authorization: Bearer <token>"
```
