import { Request, Response } from 'express';
import { reportService } from '@container/services';
import { asyncHandler } from '@utils/asyncHandler';
import { canManageReports } from '@utils/auth-helpers';
import { sendCreated, sendData, sendMessage } from '@utils/response';

export const createIssue = asyncHandler(async (req: Request, res: Response) => {
  const issue = await reportService.createIssue({
    reporter: req.user!.id,
    type: req.body.type,
    targetId: req.body.targetId,
    subject: req.body.subject,
    body: req.body.body,
  });
  sendCreated(res, issue);
});

export const listIssues = asyncHandler(async (req: Request, res: Response) => {
  const issues = await reportService.listIssues(req.user!.id, canManageReports(req.user));
  sendData(res, issues);
});

export const getIssue = asyncHandler(async (req: Request, res: Response) => {
  const issue = await reportService.getIssue(
    String(req.params.id),
    req.user!.id,
    canManageReports(req.user),
  );
  sendData(res, issue);
});

export const updateIssue = asyncHandler(async (req: Request, res: Response) => {
  const issue = await reportService.updateIssue(
    String(req.params.id),
    req.body,
    req.user!.id,
    canManageReports(req.user),
  );
  sendData(res, issue);
});

export const deleteIssue = asyncHandler(async (req: Request, res: Response) => {
  await reportService.deleteIssue(String(req.params.id), req.user!.id, canManageReports(req.user));
  sendMessage(res, 'Issue soft-deleted');
});

export const revenueSummary = asyncHandler(async (req: Request, res: Response) => {
  const data = await reportService.revenueSummary(
    req.query.from as string | undefined,
    req.query.to as string | undefined,
  );
  sendData(res, data);
});

export const ordersByStatus = asyncHandler(async (_req: Request, res: Response) => {
  sendData(res, await reportService.ordersByStatus());
});

export const topBooks = asyncHandler(async (req: Request, res: Response) => {
  const data = await reportService.topBooks(
    req.query.from as string | undefined,
    req.query.to as string | undefined,
    Number(req.query.limit) || 10,
  );
  sendData(res, data);
});

export const salesByDate = asyncHandler(async (req: Request, res: Response) => {
  const data = await reportService.salesByDate(
    req.query.from as string | undefined,
    req.query.to as string | undefined,
  );
  sendData(res, data);
});
