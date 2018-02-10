
declare type Dispatch = (action: any) => void;

declare interface Store {
  dispatch: Dispatch;
}
