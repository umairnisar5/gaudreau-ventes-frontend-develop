declare namespace API {
  export type CurrentUser = {
    id: string;
    isSuperuser?: boolean;

    username: string;
    firstName: string;
    lastName: string;
    email: string;
    isStaff: boolean;
    isActive: boolean;
    dateJoined: string;
  };

  export type LoginStateType = {
    token: string;
  };

  export type NoticeIconData = {
    id: string;
    key: string;
    avatar: string;
    title: string;
    datetime: string;
    type: string;
    read?: boolean;
    description: string;
    clickClose?: boolean;
    extra: any;
    status: string;
  };
}
