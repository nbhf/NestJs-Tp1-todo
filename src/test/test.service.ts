import { Inject, Injectable } from '@nestjs/common';
import constants from 'src/common/constants';

@Injectable()
export class TestService {
  constructor(@Inject(constants.uuid) private readonly uuid) {}

  generateUUID(): string {
    return this.uuid();
  }
}
