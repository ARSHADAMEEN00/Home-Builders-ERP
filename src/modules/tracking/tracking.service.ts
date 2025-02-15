
import trackingModel from './tracking.model';

class trackingService {
  public trackingModel = trackingModel;
  public async createTracking(body:any):Promise<any>{
    const createTracking = await this.trackingModel.create(body);
    return createTracking;
  }
}

export default trackingService;
