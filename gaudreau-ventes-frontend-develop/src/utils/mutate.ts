import { request } from 'umi';
import { ILooseObject } from '@/model';
import { responseHandler } from '@/utils';
import { ENErrorShowType, IAppResponse } from './model';

export const mutate = async <I = ILooseObject>(
  input: I,
  errorShowType: ENErrorShowType = ENErrorShowType.WARN_MESSAGE,
): Promise<IAppResponse<ILooseObject>> => {
  try {
    const response = await request(API_URL, input);

    if (response.errors) {
      for (const iterator of response.errors) {
        return responseHandler({
          data: {},
          error: {
            ...iterator,
            showType: ENErrorShowType.ERROR_MESSAGE,
          },
        }) as IAppResponse<I>;
      }
    }

    return response as IAppResponse<I>;
  } catch (error) {
    return responseHandler({
      data: {},
      error: {
        ...error,
        showType: errorShowType,
      },
    }) as IAppResponse<I>;
  }
};
