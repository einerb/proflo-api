export interface JwtPayload {
  id: number;
  identification: number;
  name: string;
  lastname: string;
  state: boolean;
}

export interface IToken {
  readonly token: string;
}
