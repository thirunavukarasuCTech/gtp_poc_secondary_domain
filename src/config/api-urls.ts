import { API } from './constants';
// export const baseURL = API.Auth;
export const capURL = API.CAP;
// export const v1Customer = API.V1CUSTOMER;
// export const v2Ledger = API.V2LEDGER;

export const APP_URLS = {
  
  CreateUserInCapillary: () => `${capURL}ciamcustomers/add`,
  
};