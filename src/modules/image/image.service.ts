import { HttpException } from '@/exceptions/HttpException';
import fs from 'fs';
import path from 'path';
import { DeleteImageDto } from './image.dto';

class ImageService {
  public async uploadImage(body_file: string): Promise<any> {
    const BASE_URL = process.env.SERVER_HOST_NAME;
    let file;

    const uploadDir = 'uploads';
    let destinationFolder = uploadDir;
    await this.createDirectoryIfNotExists(destinationFolder);

    const saveFile = async (fileType: string, filePath: string) => {
      // its a function

      destinationFolder = `uploads/${fileType}s`;
      await this.createDirectoryIfNotExists(destinationFolder);

      const buffer = Buffer.from(body_file.split(',')[1], 'base64');
      await fs.promises.writeFile(filePath, buffer);
      const url: string = `${BASE_URL}/uploads/${fileType}s/${path.basename(filePath)}`;
      const public_id: string = `uploads/${fileType}s/${path.basename(filePath)}`;
      return { public_id, url };
    };

    if (body_file) {
      console.log('1111>>', body_file);

      const fileType = body_file.split(':')[1].split('/')[0];
      let extension = body_file.split('/')[1].split(';')[0];
      if (extension === 'svg+xml') extension = 'svg';

      const filePath = `uploads/${fileType}s/file-${Date.now()}.${extension}`;

      if (fileType === 'image' || fileType === 'video' || fileType === 'application') {
        if (fileType === 'image' || fileType === 'video') {
          file = await saveFile(fileType, filePath);
        } else if (fileType === 'application' && extension === 'pdf') {
          const fileType = body_file.split('/')[1].split(';')[0];
          const filePath = `uploads/${fileType}s/file-${Date.now()}.${extension}`;
          file = await saveFile('pdf', filePath);
        } else {
          throw new HttpException(400, 'Invalid file format');
        }
      }
    }
    return file;
  }

  public async deleteImage(imageData: DeleteImageDto): Promise<any> {
    try {
      await fs.promises.unlink(imageData.public_id);
      return { message: 'File deleted successfully' };
    } catch (error) {
      return { message: 'Error deleting file: ' + error.message };
    }
  }

  public async createDirectoryIfNotExists(dir: string) {
    if (!fs.existsSync(dir)) {
      try {
        fs.mkdirSync(dir, { recursive: true });
      } catch (error) {
        console.error(`Error creating directory ${dir}:`, error);
      }
    }
  }
}

export default ImageService;
