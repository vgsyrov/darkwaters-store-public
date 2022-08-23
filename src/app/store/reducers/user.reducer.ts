import { createFeatureSelector, createReducer } from '@ngrx/store';
import { IUserState, userInitialState } from '../state/user.state';

export const USER_FEATURE = 'user';

export const userReducer = createReducer<IUserState>(userInitialState);

export const userFeatureSelector =
  createFeatureSelector<IUserState>(USER_FEATURE);
