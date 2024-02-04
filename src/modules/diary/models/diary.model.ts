import { Entry } from "@shared/models/entry.model";
import { HttpResponse } from "@shared/models/http-response.model";
import { FoodInDiary } from "./food-in-diary.model";

export interface Diary extends Entry {
  food: FoodInDiary[];
  date: string;
  id: string;
}

export type DiaryAllReponse = HttpResponse<Diary[] | undefined>;
