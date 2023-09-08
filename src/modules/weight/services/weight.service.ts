import { db } from "@db/db";
import { tables } from "@db/db-table-names";
import { Weight } from "../models/weight.model";

export class WeightService {
  static getWeights = async (): Promise<Weight[]> => {
    const query = `select * from ${tables.WEIGHTS}`;
    const rows = await db.all<Weight[]>(query);

    return rows;
  };

  static addWeight = async (newWeight: Weight): Promise<void> => {
    const { weight, date } = newWeight;

    const query = `insert into ${tables.WEIGHTS} (weight, date) values (?, ?)`;

    await db.run(query, [weight, date]);
  };

  static deleteWeight = async (id: string): Promise<void> => {
    const query = `delete from ${tables.WEIGHTS} where id = ?`;

    await db.run(query, [id]);
  };

  static editWeight = async (id: string, weight: Weight): Promise<void> => {
    const { date, weight: newWeight } = weight;

    if (!date && newWeight) {
      const query = `update ${tables.WEIGHTS} set weight = ? where id = ?`;

      await db.run(query, [newWeight, id]);
      return;
    } else if (date && !newWeight) {
      const query = `update ${tables.WEIGHTS} set date = ? where id = ?`;

      await db.run(query, [date, id]);
      return;
    }

    const query = `update ${tables.WEIGHTS} set date = ?, weight = ? where id = ?`;

    await db.run(query, [date, newWeight, id]);
  };
}
