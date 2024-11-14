/* eslint-disable prettier/prettier */
import { Global, Module } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import constants from 'src/common/constants';

@Global()
@Module({
  providers: [
    {
      provide: constants.uuid,
      useValue: uuidv4,
    },
  ],
  exports: [constants.uuid],
})
export class CommonModule {}
