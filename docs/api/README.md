# Documentação da API

## Visão Geral

A API do AleFlix é construída com NestJS e Fastify, seguindo os princípios RESTful e utilizando OpenAPI para documentação.

**URL Base:** `http://localhost:4000`

## Autenticação

A autenticação é feita via cookies HTTP-only. O token JWT é automaticamente enviado em cada requisição através do cookie `auth_token`.

### Login

Ao fazer login, o servidor retorna um cookie HTTP-only com o token JWT. Este cookie é automaticamente enviado em todas as requisições subsequentes.

### Funcionalidade "Lembrar de mim"

- **Quando marcado**: Token expira em 30 dias
- **Quando desmarcado**: Token expira em 1 dia

### Segurança

- Cookies são HTTP-only (não acessíveis via JavaScript)
- Cookies são seguros em produção (HTTPS apenas)
- Cookies são configurados com SameSite=None para proteção contra CSRF
- Tokens têm expiração configurável baseada na opção "Lembrar de mim"

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
          rememberMe:
            type: boolean
            description: 'Se true, token expira em 30 dias. Se false, expira em 1 dia.'
responses:
  200:
    content:
      application/json:
        schema:
          type: object
          properties:
            accessToken:
              type: string
            user:
              $ref: '#/components/schemas/User'
    headers:
      Set-Cookie:
        schema:
          type: string
          example: auth_token=xxx; HttpOnly; Path=/; Max-Age=2592000; SameSite=None; Secure
```

#### POST /auth/signup

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
          type: object
          properties:
            message:
              type: string
            user:
              $ref: '#/components/schemas/User'
```

#### POST /auth/logout

```yaml
responses:
  200:
    content:
      application/json:
        schema:
          type: object
          properties:
            message:
              type: string
```

#### GET /auth/me

```yaml
security:
  - bearerAuth: []
responses:
  200:
    content:
      application/json:
        schema:
          $ref: '#/components/schemas/User'
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
  - name: type
    in: query
    schema:
      type: string
      enum: [MOVIE, SERIES, DOCUMENTARY]
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
                $ref: '#/components/schemas/Media'
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
          $ref: '#/components/schemas/Media'
```

#### POST /media

```yaml
requestBody:
  content:
    multipart/form-data:
      schema:
        type: object
        properties:
          title:
            type: string
          description:
            type: string
          releaseYear:
            type: integer
          type:
            type: string
            enum: [MOVIE, SERIES, DOCUMENTARY]
          rating:
            type: string
            enum: [G, PG, PG13, R, NC17]
          duration:
            type: integer
          poster:
            type: string
            format: binary
          video:
            type: string
            format: binary
responses:
  201:
    content:
      application/json:
        schema:
          $ref: '#/components/schemas/Media'
```

#### PUT /media/{id}

```yaml
parameters:
  - name: id
    in: path
    required: true
    schema:
      type: string
requestBody:
  content:
    application/json:
      schema:
        $ref: '#/components/schemas/UpdateMediaDto'
responses:
  200:
    content:
      application/json:
        schema:
          $ref: '#/components/schemas/Media'
```

#### DELETE /media/{id}

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
            message:
              type: string
```

### Categorias

#### GET /media/categories

```yaml
responses:
  200:
    content:
      application/json:
        schema:
          type: array
          items:
            $ref: '#/components/schemas/Category'
```

#### GET /media/categories/{id}

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
          $ref: '#/components/schemas/Category'
```

#### GET /media/categories/{id}/media

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
          type: array
          items:
            $ref: '#/components/schemas/Media'
```

## Schemas

### User

```yaml
type: object
properties:
  id:
    type: string
    format: cuid
  email:
    type: string
    format: email
  name:
    type: string
  role:
    type: string
    enum: [USER, ADMIN]
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
    format: cuid
  title:
    type: string
  description:
    type: string
    nullable: true
  thumbnailUrl:
    type: string
  releaseYear:
    type: integer
  type:
    type: string
    enum: [MOVIE, SERIES, DOCUMENTARY]
  rating:
    type: string
    enum: [G, PG, PG13, R, NC17]
  duration:
    type: integer
  progress:
    type: integer
    nullable: true
  isFeatured:
    type: boolean
    default: false
  isPopular:
    type: boolean
    default: false
  releaseDate:
    type: string
    format: date-time
    nullable: true
  createdAt:
    type: string
    format: date-time
  updatedAt:
    type: string
    format: date-time
  userRating:
    type: number
    format: float
    default: 0
  viewCount:
    type: integer
    default: 0
  userId:
    type: string
  poster:
    type: string
  streamUrl:
    type: string
    nullable: true
  status:
    type: string
    enum: [DRAFT, PUBLISHED, ARCHIVED, PROCESSING, READY, ERROR]
    default: DRAFT
  categories:
    type: array
    items:
      $ref: '#/components/schemas/Category'
```

### Category

```yaml
type: object
properties:
  id:
    type: string
    format: cuid
  name:
    type: string
    unique: true
  description:
    type: string
    nullable: true
  createdAt:
    type: string
    format: date-time
  updatedAt:
    type: string
    format: date-time
```

## Códigos de Erro

### 400 - Bad Request

- Dados de entrada inválidos
- Validação falhou

### 401 - Unauthorized

- Token JWT inválido ou expirado
- Credenciais inválidas

### 403 - Forbidden

- Usuário não tem permissão para acessar o recurso

### 404 - Not Found

- Recurso não encontrado

### 500 - Internal Server Error

- Erro interno do servidor

## Exemplos de Uso

### Login com "Lembrar de mim"

```bash
curl -X POST http://localhost:4000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "rememberMe": true
  }'
```

### Upload de mídia

```bash
curl -X POST http://localhost:4000/media \
  -H "Cookie: auth_token=your-jwt-token" \
  -F "title=Meu Filme" \
  -F "description=Descrição do filme" \
  -F "releaseYear=2024" \
  -F "type=MOVIE" \
  -F "rating=PG13" \
  -F "duration=120" \
  -F "poster=@poster.jpg" \
  -F "video=@video.mp4"
```

### Buscar mídia por categoria

```bash
curl -X GET http://localhost:4000/media/categories/123/media \
  -H "Cookie: auth_token=your-jwt-token"
```
