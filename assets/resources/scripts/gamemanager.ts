import { _decorator, Component } from "cc";
const { ccclass } = _decorator;

@ccclass("GameManager")
export class GameManager {
  private static _instance: GameManager | null = null;

  private _isGameRunning: boolean = false; // 游戏是否正在运行
  private _currentLevel: number = 1; // 当前关卡
  private _score: number = 0; // 当前分数

  // 定时器回调
  public onTimerTick = (): void => {};

  /// 全局一个定时器
  private _timer: TimerManager = TimerManager.getInstance();

  public static get instance(): GameManager {
    if (!this._instance) {
      this._instance = new GameManager();
    }
    return this._instance;
  }

  // 禁止直接通过 `new` 创建实例
  private constructor() {}

  // 游戏状态管理方法
  public startGame(): void {
    this._isGameRunning = true;
    this._timer.startTimer(this.__onTimerTick, 1);
    console.log("Game started");
  }

  private __onTimerTick = (): void => {
    if (this.onTimerTick) {
      this.onTimerTick();
    }

    console.log("Timer tick!");
  };

  public pauseGame(): void {
    this._isGameRunning = false;
    console.log("Game paused");
  }

  public isGameRunning(): boolean {
    return this._isGameRunning;
  }

  public addScore(points: number): void {
    this._score += points;
    console.log(`Score updated: ${this._score}`);
  }

  public getScore(): number {
    return this._score;
  }
  public nextLevel(): void {
    this._currentLevel++;
    console.log(`Level up! Current level: ${this._currentLevel}`);
  }

  public getCurrentLevel(): number {
    return this._currentLevel;
  }
}
