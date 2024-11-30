import { _decorator, Component, Node } from "cc";
const { ccclass, property } = _decorator;

@ccclass("player")
export class player extends Component {
  @property
  public type: number = 1; // ---- 表示出现的是那种形状
  start() {}
  update(deltaTime: number) {}
}
