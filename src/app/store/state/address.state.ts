export interface IAddressState {
  country: string;
  city: '';
  street: string;
  homeInfo: {
    number: string;
    block: string;
  };
}

export const addressInitialState: IAddressState = {
  country: '',
  city: '',
  street: '',
  homeInfo: {
    number: '',
    block: '',
  },
};
