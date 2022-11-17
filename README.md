### README

## Installation

First of all, run command to install all dependencies:

```
npm install
```
Well, with all dependencies installed in the project, set the environment variables:

```
DB_HOST= <database host>
DB_PORT= <database port>
DB_USER= <database username>
DB_PASS= <database password>
DB_NAME= <database name>

PORT= <port for api run>

JWT_PASS= <secret string jwt>
```
## Scripts

Use ***npm run*** or ***yarn*** before the next commands: 

- **dev**: command run project in development

- **migration:generate**: command to generate migrations

- **migration:run**: command to run migrations

- **migration:revert**: command to revert migrations

- **build**: build project for production

- **start**: command run project in production