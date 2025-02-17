import { HttpException } from '@/exceptions/HttpException';
import { CreateSite } from './site.dto';
import { Site } from './site.interface';
import siteModel from './site.model';

class siteService {
  public siteModel = siteModel;

  public async createSite(body: CreateSite): Promise<Site> {
    const createSite: Site = await this.siteModel.create(body);
    if(!createSite) throw new HttpException(500,'something went wrong !')
    return createSite;
  }
  
  public async getAllSite():Promise<Site[]>{
    const getSiteList :Site[] = await this.siteModel.find();
    if(getSiteList.length == 0) throw new HttpException(404 ,"no data");
    return getSiteList;
  }

  public async UpdateSite(siteId:string,siteData:CreateSite):Promise<Site>{
    const updateSite:Site = await this.siteModel.findByIdAndUpdate(siteId,siteData,{ new: true });
    if (!updateSite) throw new HttpException(404, "site not found");
    return updateSite;

  }

  public async findsiteById(siteId:string):Promise<Site>{
    const findSite:Site = await this.siteModel.findById(siteId);
    if (!findSite) throw new HttpException(404, "site not found");
    return findSite;
  }

  public async deleteSite(siteId:string):Promise<Site>{
    const deleteSiteById = await this.siteModel.findByIdAndDelete(siteId);
    if (!deleteSiteById) throw new HttpException(404, "site not found");
    return deleteSiteById;
  }


}

export default siteService;
