export interface SearchState  {
    destination: string;
    flyFrom: string;
    date: string;
    duration: string;
};

export interface DataRow {
  id: number;
  name: string;
  team: string;
  goals: number | string;
  age: number | string;
  deleted?: boolean;
};

export interface Item {
  _id?: string;
  name: string;
  email: string;
}

export interface Unicorn {
  _id?: string;
  name: string;
  age: number;
}
