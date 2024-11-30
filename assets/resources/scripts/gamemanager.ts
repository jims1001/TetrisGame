import { _decorator, Component } from "cc";
const { ccclass } = _decorator;

@ccclass("GameManager")
export class GameManager {
  private static _instance: GameManager | null = null;

  // 游戏状态
  private _isGameRunning: boolean = false; // 游戏是否正在运行
  private _currentLevel: number = 1; // 当前关卡
  private _score: number = 0; // 当前分数

  // 获取单例实例
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
    console.log("Game started");
  }

  public pauseGame(): void {
    this._isGameRunning = false;
    console.log("Game paused");
  }

  public isGameRunning(): boolean {
    return this._isGameRunning;
  }

  // 分数管理
  public addScore(points: number): void {
    this._score += points;
    console.log(`Score updated: ${this._score}`);
  }

  public getScore(): number {
    return this._score;
  }

  // 关卡管理
  public nextLevel(): void {
    this._currentLevel++;
    console.log(`Level up! Current level: ${this._currentLevel}`);
  }

  public getCurrentLevel(): number {
    return this._currentLevel;
  }
}
