# Calendar API

## Project structure

```
$PROJECT_ROOT
│   # Source code
├── src
│   │   # Domain, Logic and Infrastructure
│   │   # shared by the entire service
│   ├── Shared
│   │   # Domain, Logic and Infrastructure
│   │   # related to Events
│   ├── Events
│   │   # Domain, Logic and Infrastructure
│   │   # related to users
│   └── Users
│   # Static files
└── public
```

## Getting Started

### Running the app

To run the server it is necessary to set the following environment variables:

- `DB_CNN`: URI formats for defining connections between applications and MongoDB instances

  Example: `mongodb://myDBReader:D1fficultP%40ssw0rd@mongodb0.example.com:27017/?authSource=admin`

- `SECRET_JWT_KEY`: Necessary for signing json web tokens

  Example: `1935fg5968c1r3ha6ae67tal2cbbd1c2aa9h0ca595a5333bfecqfd27ceab5t0b`

```bash
# install dependencies
npm install

# run in dev mode on port 4000
npm run dev

# generate production build
npm run build

# run generated content in dist folder on port 4000
npm run start
```

### Testing

Jest with supertest

```bash
npm run test
```

### Linting

```bash
# run linter
npm run lint

# fix lint issues
npm run lint:fix
```
