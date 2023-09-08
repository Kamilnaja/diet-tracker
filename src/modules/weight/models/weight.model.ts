import { HttpResponse } from "@shared/models/http-response.model";

export interface Weight {
  id: string;
  date: string;
  weight: number;
}

export type WeightAllResponse = HttpResponse<Weight[] | undefined>;
