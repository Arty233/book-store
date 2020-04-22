import { IShowCaseState } from './show-case-store/showcase.state';
import { ITestState } from './test/test.state';
import { IUserState } from './user-store/user.state';

export interface IAppState {
    showcase: IShowCaseState;
    test: ITestState;
    user: IUserState;
}