export interface SignUp {
  email: string;
  password: string;
  username: string;
}

export interface Login {
  email: string;
  password: string;
}

export interface LoggedUser {
  email: string;
  username: string;
  avatar?: string;
  token: string;
  id: string;
}
