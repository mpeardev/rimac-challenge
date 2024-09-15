export type UserOptionType = "forMe" | "forSomeone";

export interface IPlan {
  name: string;
  price: number;
  description: Array<string>;
  age: number;
}

export interface IPlanData {
  namePlan: string;
  pricePlan: string;
}
