import { Module } from '@nestjs/common';
import { TestService } from './test.service';
import { TestController } from './test.controller';
import { CommonModule } from '../common/common.module';  // Ajouter l'importation du CommonModule

@Module({
  imports: [CommonModule],  // Importer CommonModule pour avoir accès à uuid
  providers: [TestService],
  controllers: [TestController],
})
export class TestModule {}
