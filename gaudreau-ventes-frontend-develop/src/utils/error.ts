/* eslint-disable no-console */
import { message as ANTDmessage, notification as ANTDNotification } from 'antd';
import { IAppResponse, ENErrorShowType } from './model';

const errorAction = {
  1: 'warn',
  2: 'error',
};

const DEFAULT_ERROR_PAGE = '/exception';

const formatError = (resError: IAppResponse['error']): IAppResponse['error'] => {
  if (resError?.errors?.length) {
    // generic error message handling

    return {
      errorType: 'GraphQL Error',
      message: 'An error has occured',
      showType: resError.showType,
    };
  }

  // this should be ArgsProps! but seems to be using string elsewhere
  // up to devs to choose!!
  // also resError?.name makes no sense as not no adher to type above
  // therefore I hack it; developer needs to decide here!!
  // the any is a code smell as developer does not know what they want
  return {
    errorType: (resError as any).name,
    message: resError?.message,
    showType: resError?.showType!,
  };
};

export const errorHandler = (resError: IAppResponse['error']): IAppResponse['error'] => {
  if (!resError) {
    return resError;
  }

  const error = formatError(resError);

  if (!error) {
    return resError;
  }

  if (error.showType === ENErrorShowType.REDIRECT) {
    // @ts-ignore
    // redirect to error page
    // eslint-disable-next-line no-restricted-globals
    history.push({
      pathname: DEFAULT_ERROR_PAGE,
      query: {
        errorType: error.errorType,
        errorMessage: error.message || '',
      },
    });

    return error;
  }

  if (!error.message) {
    return error;
  }

  if (error.showType === ENErrorShowType.NOTIFICATION) {
    ANTDNotification.open({
      message: error.message,
    });
    console.info(error.message, resError);

    return error;
  }

  const action = errorAction[error.showType] || null;

  if (action) {
    ANTDmessage[action](error.message || 'An error has occured', 3);
    console[action](error.message, resError);
  }

  return error;
};
/* eslint-enable no-console */
