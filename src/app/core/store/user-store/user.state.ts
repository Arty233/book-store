import { User } from 'src/app/models/user.model';


export interface IUserState {
    user: User;
}

export const initialState: IUserState = {
    user: null
}