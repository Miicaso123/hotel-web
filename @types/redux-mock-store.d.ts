declare module 'redux-mock-store' {
    import { AnyAction, Middleware } from 'redux';
  
    type MockStore<TState = unknown, TActions extends AnyAction = AnyAction> = {
      getState(): TState;
      dispatch: (action: TActions) => void;
      getActions(): TActions[];
      clearActions(): void;
      subscribe(listener: () => void): void;
      replaceReducer(nextReducer: any): void;
    };
  
    export default function configureStore<
      TState = unknown,
      TActions extends AnyAction = AnyAction
    >(middlewares?: Middleware[]): (state?: TState) => MockStore<TState, TActions>;
}
  