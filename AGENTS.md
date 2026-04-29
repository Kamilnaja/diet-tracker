# AGENTS.md

## Commands

- `npm run sa` — generate `swagger-output.json` (run after route changes)
- `npm run dev` — start dev server (runs swagger gen + server via concurrently)
- `npm run test` — start server with `-initialData=false`, then run Jest
- `npm run lint` — eslint on `src/` (enforces explicit function return types)
- `npm run build` — `npx tsc` (not `tsc` directly)

## Module aliases

Configured in `tsconfig.json`, resolved by `tsconfig-paths/register`:

- `@shared/*` → `src/shared/*`
- `@helpers/*` → `src/shared/helpers/*`
- `@models/*` → `src/shared/models/*`
- `@modules/*` → `src/modules/*`
- `@db/*` → `src/db/*`

## Architecture

Express API with SQLite (files: `db.db`, `test.db`). Routes organized under `src/modules/` (auth, diary, dict, fluids, food, settings, weight). Server entrypoint: `src/index.ts`.

## Testing

- Jest config: `jest.config.ts` (uses ts-jest, moduleNameMapper mirrors tsconfig paths)
- Tests start server on port 8081 (`-initialData=false`), then run in-band
- `swagger-output.json` must exist before running tests

## Notes

- Port 8080 in dev, 8081 when `shouldLoadInitialData()` returns false
- Docker base: `node:18-alpine`; CI uses Node 20.x
- `.env` sets `PORT=8080`
