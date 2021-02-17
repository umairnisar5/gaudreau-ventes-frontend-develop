import { request } from 'umi';
import { responseHandler } from '@/utils';
import { ILooseObject } from '@/model';
import { ENErrorShowType, IAppResponse } from './model';

export const query = async (
  args: ILooseObject = {},
  errorShowType: ENErrorShowType = ENErrorShowType.ERROR_MESSAGE,
): Promise<IAppResponse<ILooseObject>> => {
  try {
    const response = await request(API_URL, args);

    return responseHandler(<IAppResponse>response);
  } catch (error) {
    return responseHandler({
      data: {},
      error: {
        ...error,
        showType: errorShowType,
      },
    });
  }
};
