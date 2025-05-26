export interface Session {
  name: string;
  _id: string;
  token: string;
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  _id?: string;
}

export interface Location {
  title: string;
  description: string;
  category: string;
  latitude: number;
  longitude: number;
  userid?: string | User;
  _id?: string;
  img?: string;
  images?: Image[];
}

export interface Image {
  title: string;
  imageUrl: string;
  description: string;
  locationid?: string;
  _id?: string;
}

export interface DataSet {
  labels: string[];
  datasets: [{ values: number[] }];
}