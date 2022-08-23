import { createAction } from '@ngrx/store';
import { IAddressState } from '../state/address.state';

enum AddressAtcionTypes {
  AddAddress = '[Address] Add address',
  ResetAddress = '[Address] Reset address',
}

export const addAddress = createAction(
  AddressAtcionTypes.AddAddress,
  (address: IAddressState) => ({
    address,
  })
);

export const resetAddress = createAction(AddressAtcionTypes.ResetAddress);
