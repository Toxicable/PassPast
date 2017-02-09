export interface Vote {
  value: VoteType;
  updatedAt: string;
}

export type VoteType = 1 | -1;
