interface IUserModel {
  name: string;
  email: string;
  password: string;
  image?: string;
  address?: string;
  phone?: string;
  role?: string;
  postalCode?: string;
  city?: string;
  country?: string;
  request?: boolean;
}

interface IBodyLogin {
  email: string;
  password: string;
}

interface IUserSession {
  _id?: string;
  id?: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: string | null;
}
