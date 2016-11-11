import { Paper } from './paper';
export interface Course{
    id: number;
    name: string;
    code: string;
    papers: Paper[]
}