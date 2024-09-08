import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';

@Controller('postman')
export class PostmanController {
  @Get('collection')
  downloadPostmanCollection(@Res() res: Response) {
    const filePath = join(process.cwd(), 'public', 'postman-collection.json');
    res.download(filePath, 'api-vehicles.postman_collection.json', (err) => {
      if (err) {
        console.error('Error during file download:', err);
        res.status(404).send({ message: 'File not found' });
      }
    });
  }
}
