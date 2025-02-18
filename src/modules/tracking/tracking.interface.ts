
import { STATUS } from './tracking.enum';

export interface IMilestone {
  name: string;
  status?: STATUS;
  completionDate?: Date;
}

// Export the main tracking interface
export interface ITracking {
  siteId: string;
  progressPercentage?: number;
  milestones: IMilestone[];
}