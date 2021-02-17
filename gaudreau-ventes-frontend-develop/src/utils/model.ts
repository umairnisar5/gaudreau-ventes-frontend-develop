import { ILooseObject } from '@/model';
import { ArgsProps } from 'antd/lib/message';

export enum ENErrorShowType {
  SILENT = 0,
  WARN_MESSAGE = 1,
  ERROR_MESSAGE = 2,
  NOTIFICATION = 4,
  REDIRECT = 9,
}

export interface IError {
  value: string;
  property: string;
  children: IError[];
  constraints: ILooseObject;
}

export interface IAppResponse<D = ILooseObject> {
  data: {
    [key: string]: D;
  };
  error?: {
    showType: ENErrorShowType;
    // this should be ArgsProps! but seems to be using string elsewhere
    // up to devs to choose!!
    message?: ArgsProps | string;
    errorType?: string;
    partialError?: boolean;
    errors?: ILooseObject;
  };
  errors?: IError[];
}

export class ErrorMessage implements ArgsProps {
  type: ArgsProps['type'];

  content: ArgsProps['content'];

  duration: ArgsProps['duration'] = 5000;

  constructor(message: string, errorType: ArgsProps['type']) {
    this.type = errorType;
    this.content = message;
  }
}
