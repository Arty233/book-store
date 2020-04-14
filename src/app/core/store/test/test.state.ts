import { Observable } from 'rxjs';

export interface ITestState {
    value: number;   
}

export const initialState: ITestState = {
    value: 0
}