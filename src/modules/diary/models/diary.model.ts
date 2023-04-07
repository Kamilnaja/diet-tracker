import { Entry } from "@shared/models/entry.model";
import { HttpResponse } from "@shared/models/http-response.model";
import { Food } from "../../foods/models/food.model";

export interface Diary extends Entry {
  foods: Food[];
  date: string;
}

export type DiaryAllReponse = HttpResponse<Diary[] | undefined>;
