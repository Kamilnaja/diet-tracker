import { Food } from "../../foods/models/food.interface";
import { Entry } from "../../shared/models/entry.interface";
import { HttpResponse } from "../../shared/models/http-response.interface";

export interface Diary extends Entry {
  foods: Food[];
  date: string;
}

export type DiaryResponse = HttpResponse<Diary | undefined>;
export type DiaryAllReponse = HttpResponse<Diary[] | undefined>;
