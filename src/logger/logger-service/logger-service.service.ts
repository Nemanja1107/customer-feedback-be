import { Injectable } from '@nestjs/common';
import { instance } from 'src/logger/winston.logger'

@Injectable()
export class CustomLoggerService {
    info(message: string) {
        instance.info(message);
    }

    warn(message: string) {
        instance.warn(message);
    }

    error(message: string) {
        instance.error(message);
    }

    log(level: string, message: string) {
        instance.log(level, message);
    }
}

export type { CustomLoggerService as LoggerServiceService }
