import { _decorator, Component } from "cc";
import { GameManager } from "./gamemanager";

const { ccclass } = _decorator;

@ccclass("GameManagerInitializer")
export class GameManagerInitializer extends Component {
  start() {
    // 在游戏启动时初始化全局管理器
    console.log("Initializing GameManager...");
    GameManager.instance.startGame();
  }
}
