export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type AuthUser = {
  user_id: string;
  username: string;
  email: string;
};

export type UserPage = {
  id: string;
  name: string;
  email: string;
};

export type GoodDeed = {
  id: string;
  user_id: string;
  deed: string;
  date: string;
  status: 'doing' | 'done';
};

export type Revenue = {
  month: string;
  revenue: number;
};

export type LatestGoodDeed = {
  id: string;
  name: string;
  image_url: string;
  deed: string;
};

export type LatestGoodDeedRaw = Omit<LatestGoodDeed, 'amount'> & {
  amount: number;
};

export type GoodDeedsCountUsers = {
  id: string;
  status: 'doing' | 'done';
  date: string;
  deed: string;
  user_id: string;
  name: string;
};

export type GoodDeedsTable = {
  id: string;
  user_id: string;
  name: string;
  deed: string;
  date: string;
  status: 'doing' | 'done';
};

export type FriendsTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_good_deeds: number;
  total_doing: number;
  total_done: number;
};

export type FormattedFriendsTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_good_deeds: number;
  total_doing: string;
  total_done: string;
};

export type UserField = {
  id: string;
  name: string;
};

export type GoodDeedForm = {
  id: string;
  user_id: string;
  deed: string;
  status: 'doing' | 'done';
};
