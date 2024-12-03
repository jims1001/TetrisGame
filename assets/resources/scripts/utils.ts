import { Component } from "cc";

// 定义一个泛型回调类型
type Callback<TArgs extends any[] = []> = (...args: TArgs) => void;
// 定义专用的回调类型，可以接收 Node 或其他参数
// 定义一个通用的回调类型，支持 Component 类型和其他类型参数
type OneArgsCallback<TAdditionalArgs extends any[] = []> = Callback<
  [Component | unknown, ...TAdditionalArgs]
>;
