import { Catch, ExceptionFilter, HttpException, ArgumentsHost, HttpStatus } from "@nestjs/common";

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const errorResponse = {
      type: 'error',
      code: status,
      timestamp: new Date().toLocaleDateString(),
      path: request.url,
      method: request.method,
      message: status !== HttpStatus.INTERNAL_SERVER_ERROR ? 
        exception.message || null :
        'Internal Server Error'
    };
    response.status(status).json(errorResponse);
  }
}