interface IOrderModel {
  profile: IUserModel;
  organizerId: string;
  package: IPackageModel;
  time: Date;
  totalPrice: string | number;
  status: string;
  transaction: ITransaction[];
  customItem?: ICostumItem[];
}

interface ICostumItem {
  id: number;
  name: string;
  price: number | string;
  request?: boolean;
}

interface ITransaction {
  id: number | string;
  price: number | string;
  status: string;
  paymentTime?: Date;
}
