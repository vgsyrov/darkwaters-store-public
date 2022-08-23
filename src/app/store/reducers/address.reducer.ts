import { createFeatureSelector, createReducer, on } from '@ngrx/store';
import { addAddress, resetAddress } from '../actions/address.actions';
import { addressInitialState, IAddressState } from '../state/address.state';

export const ADDRESS_FEATURE = 'address';

export const addressReducer = createReducer(
  addressInitialState,
  on(addAddress, (state, { address }) => ({
    ...state,
    ...address,
  })),
  on(resetAddress, () => addressInitialState)
);

export const addressFeatureSelector =
  createFeatureSelector<IAddressState>(ADDRESS_FEATURE);
