import { createReducer, on } from '@ngrx/store';
import { clearErrorAction, setErrorAction } from '../actions/eror.action';


interface IUser {
  message: string;
  messages: string[];
}
const initialState: IUser  = { 
    message: '',
    messages: [],
};
export const errorReducer = createReducer(
    initialState,
    on(setErrorAction, (state, action) => {
      return { ...state, ...action };
    }),
    on(clearErrorAction, () => initialState)
  );
