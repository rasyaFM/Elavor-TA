interface IQuery {
  page: number;
  limit: number;
}

interface IUserResponse extends IUserModel {
  _id: string;
  createdAt: string;
  updatedAt: string;
}

interface IResponse {
  totalRecords: number;
  userDatas: IUserResponse[];
  next?: any;
  previous?: any;
}
