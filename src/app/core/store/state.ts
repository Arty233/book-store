import { IShowCaseState } from './show-case-store/showcase.state';
import { ITestState } from './test/test.state';

export interface IAppState {
    showcase: IShowCaseState;
    test: ITestState;
}