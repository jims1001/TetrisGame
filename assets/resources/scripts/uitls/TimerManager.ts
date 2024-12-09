// 定时器管理 主要是处理逻辑
class TimerManager {
  private static instance: TimerManager;
  private timers: Set<number> = new Set();

  private constructor() {}

  public static getInstance(): TimerManager {
    if (!TimerManager.instance) {
      TimerManager.instance = new TimerManager();
    }
    return TimerManager.instance;
  }

  public startTimer(callback: Function, interval: number): number {
    const timerId = setInterval(callback, interval * 1000);
    this.timers.add(timerId);
    return timerId;
  }

  public stopTimer(timerId: number): void {
    clearInterval(timerId);
    this.timers.delete(timerId);
  }

  public stopAllTimers(): void {
    this.timers.forEach((timerId) => clearInterval(timerId));
    this.timers.clear();
  }
}
