# Galata Dergisi

This project was generated using [Nx](https://nx.dev).

## Database

- Download and install MariaDB Server 10.5 (or an equivalant MySQL Server).
- Create a database with a name of your choice. (e.g. galata_dergisi)
- Copy `ormconfig.example.json` as `ormconfig.json` and modify its content to
reflect your database settings.

Run:

```bash
npm run migrate
```

Important note: `ormconfig.json` is used for database migrations only. **It is not
used by the apps.**

## Installation

First, install dependencies:

```bash
npm install
```

## Configuration

Copy `.env.example` file as `.env` and modify its content to reflect your database
settings.

## Running tests

Run unit tests:

```bash
npm test
```

Run end-to-end tests:

```bash
npm run e2e-tests
```

## Running the server code

To start the API server:

```bash
npm run start:api
```

To start editor-panel

```bash
npm run start:editor-panel
```

Note: You need to start both.

## License

![GNU GPLv3 - Free as in Freedom](https://www.gnu.org/graphics/gplv3-with-text-136x68.png)

GNU General Public License v3.0 or later.

See [COPYING](COPYING) to see the full text.
