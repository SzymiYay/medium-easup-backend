<h1 align="center">Inżynieria oprogramowania - aplikacja Easup</h1>
<h3 align="center">Patryk Lesiak, Szymon Frączek, Maciej Pieniążek<h3>
<br><br>

# Instrukcja instalacji

## Aplikacja użytkownika

Aby uruchomić aplikację, należy najpierw zainstalować wszystkie wymagane pakiety poleceniem `npm install`. Po zakończonej instalacji, polecenie `npm start` uruchomi aplikację i będzie ona dostępna pod adresem `localhost:3001`.

## Serwer

Do uruchomienia serwera potrzebny jest `Docker`.

Aby uruchomić serwer, należy w folderze głównym projektu zbudować kontenery dockera:
```
docker-compose up -d
```
Opcja `-d` nie jest wymagana.

Po wykonaniu polecenia i zbudowanie kontenerów, domyślnie baza dostępna będzie pod portem `5432`, a API pod portem `3000`.

# Instrukcja obsługi aplikacji

# Dokumentacja API

## Dostępne endpoint'y

### Organizations

#### GET /api/organizations/:organizationId
Zwraca dane o organizacji z id *organizationId*.

**Request:** {}

**Response:**
```typescript
{
    id: number,
    name: string,
    description: string,
    mission: string,
    webpage: string,
    logo: string,
    details: string,
    projects: [
        {
            id: number,
            name: string,
            description: string,
            details: string
        },
        ...
    ]
}
```

**Kody statusu:**

* 200 - żądanie wykonane
* 400 - nie udało się przetworzyć żądania


#### GET /api/organizations/user/:userId
Zwraca organizacje, w których znajduje się użytkownik o id *userId*.

**Request:** {}

**Response:**

```typescript
{
    [
        {
            id: number,
            name: string,
            description: string,
            mission: string,
            webpage: string,
            logo: string,
            details: string,
            projects: [
                {
                    id: number,
                    name: string,
                    description: string,
                    details: string
                },
                ...
            ]
        },
        ...
    ]
}
```

**Kody statusu:**

* 200 - żądanie wykonane
* 400 - nie udało się przetworzyć żądania


#### POST /api/organizations
Tworzy nową organizację.

**Request:**

```typescript
{
    required ownerId: string,
    required name: string,
    description: string,
    mission: string,
    webpage: string,
    logo: string,
    details: string
}
```

**Response:**

```typescript
{
    id: number,
    name: string,
    description: string,
    mission: string,
    webpage: string,
    logo: string,
    details: string,
    projects: []
}
```

**Kody statusu:**

* 201 - utworzono
* 400 - nie udało się przetworzyć żądania

### Users

#### GET /api/users/:userId
Zwraca dane o użytkowniku z id *userId*.

**Request:** {}

**Response:**

```typescript
{
    id: number,
    email: string,
    name: string,
    surname: string,
    nickname: string,
    description: string,
    photo: string
}
```

**Kody statusu:**

* 200 - żądanie wykonane
* 400 - nie udało się przetworzyć żądania


#### GET /api/users/:userId/tasks
Zwraca zadania użytkownika o id *userId*.

**Request:** {}

**Response:**

```typescript
{
    [
        {
            id: number,
            name: string,
            description: string,
            deadline: string
        },
        ...
    ]
}
```

**Kody statusu:**

* 200 - żądanie wykonane
* 400 - nie udało się przetworzyć żądania


#### POST /api/users/register
Rejestruje nowego użytkownika.

**Request:**

```typescript
{
    required email: string,
    required name: string,
    required surname: string,
    required nickname: string,
    required password: string,
    description: string,
    photo: string
}
```

**Response:**

```typescript
{
    id: number,
    email: string,
    name: string,
    surname: string,
    nickname: string,
    password: null,
    description: string,
    tasks: [],
    projects: [],
    organizations: [],
    photo: string,
}
```

**Kody statusu:**

* 201 - użytkownik zarejestrowany
* 302 - taki użytkownik już istnieje
* 400 - nie udało się przetworzyć żądania


#### POST /api/users/login
Loguje użytkownika.

**Request:**

```typescript
{
    required email: string,
    required password: string
}
```

**Response:**

```typescript
{
    id: number,
    email: string,
    name: string,
    surname: string,
    nickname: string,
    password: string,
    description: string,
    photo: string
}
```

**Kody statusu:**

* 201 - użytkownik zalogowany
* 406 - błędne hasło
* 404 - nie znaleziono takiego użytkownika

### Projects

#### GET /api/projects/:projectId
Zwraca informacje o projekcie z id *projectId*.

**Request:** {}

**Response:**

```typescript
{
    id: number,
    name: string,
    description: string,
    details: string,
    boards: [
        {
            id: number,
            name: string,
            description: string
        },
        ...
    ]
}
```

**Kody statusu:**

* 200 - żądanie wykonane
* 400 - nie udało się przetworzyć żądania


#### POST /api/projects
Tworzy nowy projekt.

**Request:**

```typescript
{
    required organizationId: string,
    required name: string,
    description: string,
    details: string
}
```

**Response:**

```typescript
{
    id: number,
    name: string,
    description: string,
    details: string,
    organization: string,
    boards: [],
    users: []
}
```

**Kody statusu:**

* 201 - utworzono projekt
* 400 - nie udało się przetworzyć żądania


#### DELETE /api/projects/:projectId
Usuwa projekt o id *projectId*.

**Request:** {}

**Response:**

```typescript
{
    raw: [],
    affected: number
}
```

**Kody statusu:**

* 200 - żądanie wykonane
* 400 - nie udało się przetworzyć żądania

### Boards

#### GET /api/boards/:boardId
Zwraca dane o tablicy z id *boardId*.

**Request:** {}

**Response:**

```typescript
{
    id: number,
    name: string,
    description: string,
    sections: [
        {
            id: number,
            name: string,
            description: string
        },
        ...
    ]
}
```

**Kody statusu:**

* 200 - żądanie wykonane
* 400 - nie udało się przetworzyć żądania


#### POST /api/boards
Tworzy nową tablicę w projekcie.

**Request:**

```typescript
{
    required projectId: string,
    required name: string,
    description: string
}
```

**Response:**

```typescript
{
    id: number,
    name: string,
    description: string,
    project: string,
    sections: []
}
```

**Kody statusu:**

* 201 - tablica stworzona
* 400 - nie udało się przetworzyć żądania


#### DELETE /api/boards/:boardId
Usuwa tablicę z id *boardId*.

**Request:** {}

**Response:**

```typescript
{
    raw: [],
    affected: number
}
```

**Kody statusu:**

* 200 - żądanie wykonane
* 400 - nie udało się przetworzyć żądania

### Sections

#### GET /api/sections/:sectionId
Zwraca dane o sekcji z id *sectionId*.

**Request:** {}

**Response:**

```typescript
{
    id: number,
    name: string,
    description: string,
    tasks: [
        {
            id: number,
            name: string,
            description: string,
            deadline: string
        },
        ...
    ]
}
```

**Kody statusu:**

* 200 - żądanie wykonane
* 400 - nie udało się przetworzyć żądania


#### POST /api/sections
Tworzy nową sekcję.

**Request:**

```typescript
{
    required boardId: string,
    required name: string,
    description: string
}
```

**Response:**

```typescript
{
    id: number,
    board: string,
    description: string,
    tasks: []
}
```

**Kody statusu:**

* 201 - utworzono sekcję
* 400 - nie udało się przetworzyć żądania


#### DELETE /api/sections/:sectionId
Usuwa sekcję z id *sectionId*.

**Request:** {}

**Response:**

```typescript
{
    raw: [],
    affected: number
}
```

**Kody statusu:**

* 200 - żądanie wykonane
* 400 - nie udało się przetworzyć żądania

### Tasks

#### GET /api/tasks/:taskId
Zwraca dane o zadaniu z id *taskId*.

**Request:** {}

**Response:**

```typescript
{
    id: number,
    name: string,
    description: string,
    deadline: string
}
```

**Kody statusu:**

* 200 - żądanie wykonane
* 400 - nie udało się przetworzyć żądania

#### POST /api/tasks
Tworzy nowe zadanie.

**Request:**

```typescript
{
    required sectionId: string,
    required name: string,
    description: string,
    deadline: string
}
```

**Response:**

```typescript
{
    id: number,
    name: string,
    description: string,
    deadline: string,
    sections: [
        {
            id: number,
            name: string,
            description: string
        }
    ]
}
```

**Kody statusu:**

* 201 - utworzono zadanie
* 400 - nie udało się przetworzyć żądania


#### DELETE /api/tasks/:taskId
Usuwa zadanie z id *taskId*.

**Request:** {}

**Response:**

```typescript
{
    raw: [],
    affected: number
}
```

**Kody statusu:**

* 200 - żądanie wykonane
* 400 - nie udało się przetworzyć żądania

