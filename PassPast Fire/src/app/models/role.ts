import { Dict } from './dict';
export interface Role {
  $key: string;
  createdAt: string;
  createdBy: string;
  name: string;
  users: Dict<UserRole>;
}

export interface UserRole {
  updatedAt: string;
  updatedBy: string;
}
