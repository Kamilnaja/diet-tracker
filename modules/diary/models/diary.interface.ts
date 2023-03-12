import { Entry } from "@models/entry.interface";
import { HttpResponse } from "@models/http-response.interface";
import { Food } from "../../foods/models/food.interface";

export interface Diary extends Entry {
  foods: Food[];
  date: string;
}

export type DiaryResponse = HttpResponse<Diary | undefined>;
export type DiaryAllReponse = HttpResponse<Diary[] | undefined>;
