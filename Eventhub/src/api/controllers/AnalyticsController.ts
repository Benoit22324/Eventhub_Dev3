import type { Request, Response, NextFunction } from 'express';
import { RecordAnalyticsCommand } from "../../application/commands/RecordAnalyticsCommand";
import { GetAnalyticsQuery } from "../../application/queries/GetAnalyticsQuery";
import GetUserByIdUseCase from '../../application/usecases/GetUserByIdUseCase';

class AnalyticsController {
    constructor(
        private readonly recordAnalyticsCommand: RecordAnalyticsCommand,
        private readonly getAnalyticsQuery: GetAnalyticsQuery
    ) { }

    async recordAnalytics(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            await this.recordAnalyticsCommand.execute(req.body);

            return res.jsonSuccess(null);
        } catch(error) {
            next(error);
        }
    }

    async getAnalytics(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const analytics = await this.getAnalyticsQuery.execute();

            return res.jsonSuccess(analytics);
        } catch(error) {
            next(error);
        }
    }
}

export default AnalyticsController;