import { CreateSite } from './site.dto';
import { Site } from './site.interface';
import siteModel from './site.model';

class siteService {
  public siteModel = siteModel;

  public async createSite(body: CreateSite): Promise<Site> {
    const createSite: Site = await this.siteModel.create(body);
    return createSite;
  }
}

export default siteService;
