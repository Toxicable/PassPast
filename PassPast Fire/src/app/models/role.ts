import { Dict } from './dict';
export interface Role {
  name: string;
  users: UserRole[];
}

export interface UserRole {
  $key?: string;
  updatedAt: string;
  updatedBy: string;
}
