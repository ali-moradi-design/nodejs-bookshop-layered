import type { IUserRepository } from '@repositories/interfaces/user.repository';
import type { IBookRepository } from '@repositories/interfaces/book.repository';
import type { IOrderRepository } from '@repositories/interfaces/order.repository';
import type { IIssueReportRepository } from '@repositories/interfaces/report.repository';
import type { Order } from '@app-types/order';
import type { Book } from '@app-types/book';

export class DashboardService {
  constructor(
    private readonly users: IUserRepository,
    private readonly books: IBookRepository,
    private readonly orders: IOrderRepository,
    private readonly issues: IIssueReportRepository,
  ) {}

  async summary(lowStockThreshold = 5) {
    const [users, books, orders, openIssues, lowStock, revenueAgg] = await Promise.all([
      this.users.count(),
      this.books.count(),
      this.orders.count(),
      this.issues.countOpen(),
      this.books.countLowStock(lowStockThreshold),
      this.orders.aggregateRevenue({
        deletedAt: null,
        'payment.status': 'paid',
        status: { $in: ['paid', 'processing', 'shipped', 'completed'] },
      }),
    ]);

    return {
      users,
      books,
      orders,
      revenue: revenueAgg.totalRevenue ?? 0,
      openIssueReports: openIssues,
      lowStock,
    };
  }

  async recentOrders(limit = 10): Promise<Order[]> {
    return this.orders.list({ limit: Math.min(50, Math.max(1, limit)) });
  }

  async lowStock(threshold = 5, limit = 50): Promise<Book[]> {
    return this.books.findLowStock(threshold, limit);
  }
}
