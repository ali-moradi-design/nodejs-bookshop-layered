import type { IssueReport, CreateIssueInput, UpdateIssueInput } from '@app-types/report';

export interface IIssueReportRepository {
  findById(id: string, populate?: boolean): Promise<IssueReport | null>;
  list(filter: { reporterId?: string }, populate?: boolean): Promise<IssueReport[]>;
  create(input: CreateIssueInput): Promise<IssueReport>;
  update(id: string, input: UpdateIssueInput): Promise<IssueReport | null>;
  softDelete(id: string): Promise<IssueReport | null>;
  countOpen(): Promise<number>;
}
