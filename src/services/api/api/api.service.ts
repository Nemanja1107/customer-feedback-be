import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ApiService {

    private baseUrl: string;

    constructor(private httpService: HttpService, private configService: ConfigService) {
        this.baseUrl = this.configService.get<string>('CLOUDMERSIVE_BASE_URL');
    }

    async cloudMersiveApi(endpoint: any, data) {
        const url = `${this.baseUrl}${endpoint}`;

        const headers = {
            'apikey': 'xyms220ATgH6rwyMluZLKz70Nblyp93s'
        }

        try {
            const response = await firstValueFrom(
                this.httpService.post<any>(url, data.text, { headers })
            );

            return response.data;

        } catch (error) {
            throw new HttpException('Error fetching data', error.response?.status || 500);
        }
    }


}
