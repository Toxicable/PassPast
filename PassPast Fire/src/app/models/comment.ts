import { Dict } from './dict';
import { Vote } from './vote';

export interface Comment {
    $key?: string;
    questionKey: string;
    content: string;
    createdAt: string;
    createdBy: string;
}
