interface IPackageModel {
  name: string;
  userId: string;
  category: ICategoryModel;
  price: number;
  customItem: ICostumItem[];
  description: string;
  image?: string;
}

interface ICategoryModel {
  id: number;
  name: string;
}

interface ICostumItem {
  id: number;
  name: string;
  price: number | string;
}
