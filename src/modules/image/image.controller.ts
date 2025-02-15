import { NextFunction, Request, Response } from 'express';
import { DeleteImageDto, UploadImageDto } from './image.dto';
import ImageService from './image.service';
import path from 'path';
import fs from 'fs';
import sharp from 'sharp';

class ImageController {
  public imageService = new ImageService();
  // uploadImage
  public uploadImage = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const imageData: UploadImageDto = req.body;
      const uploadImageData: any = await this.imageService.uploadImage(imageData.image);
      res.status(200).json(uploadImageData);
    } catch (error) {
      next(error);
    }
  };

  // deleteImage
  public deleteImage = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const imageData: DeleteImageDto = req.body;
      const deleteImageData: any = await this.imageService.deleteImage(imageData);
      res.status(200).json(deleteImageData);
    } catch (error) {
      next(error);
    }
  };
  //viewUploadedFileSharp
  public viewUploadedFileSharp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const fileType = req.params.fileType;
      const transformations: any = [req.params.transformations];
      const fileName = req.params.fileName;
      const filePath = path.join('uploads/images', fileName);

      if (!fileName) {
        return res.status(404).json({ message: 'File not found' });
      }

      let fields: { [key: string]: string } = {};
      let width = 0;
      let height = 0;
      let quality = 0;

      if (req.params.transformations && transformations && transformations.length > 0) {
        for (const transformation of transformations) {
          if (transformation.includes('_')) {
            const fieldSegments = transformation.split(',');
            fieldSegments.forEach(segment => {
              const [key, value] = segment.split('_');
              fields[key] = value;
            });
          }
        }
        width = parseInt(fields['w']) || 0;
        height = parseInt(fields['h']) || 0;
        quality = parseInt(fields['q']) || 100;
      }

      fs.access(filePath, fs.constants.F_OK, async err => {
        if (err) {
          return res.status(404).json({ message: 'File not found' });
        }

        let image = await sharp(filePath);

        if (width || height) {
          image = image.resize(width || null, height || null);
        }

        if (quality && quality != 100) {
          image = image.jpeg({ quality }); // Assuming the file type is JPEG
        }

        image.toBuffer(async (err, buffer, info) => {
          if (err) {
            return next(err);
          }

          res.type(info.format);
          res.status(200).send(buffer);
        });
      });
    } catch (error) {
      next(error);
    }
  };
}

export default ImageController;
