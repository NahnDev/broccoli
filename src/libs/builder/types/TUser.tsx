export type TUser = {
  _id: string;
  name: string;
  mail: string;
  avatar?: string;
};

export type TUserCredentials = {
  mail: string;
  password: string;
};

export type TRegisterDto = Pick<TUser, "mail"> & { password: string };
