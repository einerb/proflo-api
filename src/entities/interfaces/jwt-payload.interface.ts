export interface JwtPayload {
  id: number;
  identification: number;
  name: string;
  lastname: string;
  rol: number;
  photo: number;
  users: number;
  occupation: string;
  city: string;
  address: string;
  birthdate: string;
  phone: string;
  email: string;
  state: boolean;
}

export interface IToken {
  readonly token: string;
}
