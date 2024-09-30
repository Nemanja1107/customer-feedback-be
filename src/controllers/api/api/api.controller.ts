import { Body, Controller, Post, RawBodyRequest, Req } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CommentDto } from 'src/models/dto/commentDto/comment.dto/comment.dto';
import { ApiService } from 'src/services/api/api/api.service';

@ApiTags('api')
@Controller('api')
export class ApiController {

    constructor(private apiService: ApiService) { }

    @Post()
    @ApiOperation({ summary: 'Call external sentiment analysis API' })
    @ApiBody({
        description: 'Comment to be evaluated',
        type: CommentDto,
    })
    @ApiResponse({
        status: 200,
        description: 'Sentiment analysis result',
    })
    @ApiResponse({ status: 400, description: 'Invalid input data' })
    @ApiResponse({ status: 500, description: 'Internal server error' })
    async callApi(@Body() data: any) {
        return this.apiService.cloudMersiveApi('/sentiment/analysis', data);
    }

}
