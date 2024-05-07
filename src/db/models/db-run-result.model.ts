import { ISqlite } from "sqlite";
import { Statement } from "sqlite3";

export type DbRunResult = Promise<void | ISqlite.RunResult<Statement>>;
