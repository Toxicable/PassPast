import { User } from '../../+admin/models/user';
import { ApplicationUser } from './application-user';
export interface Vote{
    id: number;
    value: number;
    votedAt: Date;
    votedById: string;
    votedBy: ApplicationUser
}