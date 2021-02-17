import { errorHandler } from '@/utils';
import { IAppResponse } from './model';

export const responseHandler = (response: IAppResponse): IAppResponse => {
  if (response.error) {
    response.error = errorHandler(response.error);

    return response;
  }
  return response;
};
