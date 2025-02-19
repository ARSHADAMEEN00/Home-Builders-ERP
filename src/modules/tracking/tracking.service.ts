import { HttpException } from '@/exceptions/HttpException';
import trackingModel from './tracking.model';
import { ITracking } from './tracking.interface';

class trackingService {
  public trackingModel = trackingModel;

  public async createTracking(body: any): Promise<any> {
    const createTracking = await this.trackingModel.create(body);
    if (!createTracking) throw new HttpException(500, 'something went wrong !');
    return createTracking;
  }

  public async getAllTracking(): Promise<ITracking[]> {
    const getAllTracking: ITracking[] = await this.trackingModel.find();
    if (getAllTracking.length == 0) throw new HttpException(404, 'No TrackingList available at the moment !');
    return getAllTracking;
  }
  public async updateTrackingById(trackingId: string, trackingData): Promise<ITracking> {
    const updateTrackingById = await this.trackingModel.findByIdAndUpdate(trackingId, trackingData, { new: true });
    if (!updateTrackingById) throw new HttpException(404, 'tracking not found. Please verify the tracking ID and try again.');
    return updateTrackingById;
  }

  public async findTrackingById(trackingId: string): Promise<ITracking> {
    const findTrackingById = await this.trackingModel.findById(trackingId);
    if (!findTrackingById) throw new HttpException(404, ' Please verify the tracking ID and try again.');
    return findTrackingById;
  }

  public async deleteTrackingById(trackingId:string):Promise<ITracking>{
    const deleteTrackingById = await this.trackingModel.findByIdAndDelete(trackingId);
    if (!deleteTrackingById) throw new HttpException(404, "tracking not found. The tracking with the given ID may have already been deleted !");
    return deleteTrackingById;
  }
  

}

export default trackingService;
