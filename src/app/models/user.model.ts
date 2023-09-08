export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  avatar: string;
  role: string;
}

export interface CreateUserDTO extends Omit<User, 'id'> {}
