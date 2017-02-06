import { Dict } from './dict';
export interface Role {
  $key: string;
  createdAt: string;
  createdBy: string;
  name: string;
  users: Dict<UserRole> | UserRole[];
}

export interface UserRole {
  $key?: string;
  updatedAt: string;
  updatedBy: string;
}
