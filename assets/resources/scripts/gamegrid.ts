import { _decorator, Color, Component, Graphics, Node, view } from "cc";
const { ccclass, property } = _decorator;

@ccclass("gamegrid")
export class gamegrid extends Component {
  @property
  lineWidth: number = 2; // 网格线宽度

  @property
  gridColor: Color = new Color(0, 0, 255, 255); // 网格线颜色

  @property
  backgroundColor: Color = new Color(200, 200, 200, 255); // 背景颜色

  @property
  gridSize: number = 40; // 每个格子的大小
  @property
  public columns: number = 5; // 列数
  @property
  public rows: number = 5; // 行数

  start() {
    console.log("playercontroller start");

    const startX = (-this.columns / 2) * this.gridSize;
    const startY = (-this.rows / 2) * this.gridSize;

    // 计算总宽高范围（向下取整为 gridSize 的整数倍）
    const totalWidth = this.columns * this.gridSize;
    const totalHeight = this.rows * this.gridSize;

    console.log(`Start X: ${startX}, Start Y: ${startY}`);
    console.log(`Total Width: ${totalWidth}, Total Height: ${totalHeight}`);

    // 动态获取或添加 Graphics 组件
    let graphics = this.node.getComponent(Graphics);
    if (!graphics) {
      graphics = this.node.addComponent(Graphics);
    }

    // 设置网格线宽和颜色
    graphics.lineWidth = this.lineWidth;
    graphics.strokeColor = this.gridColor;

    // **绘制垂直线**
    for (let x = startX; x <= startX + totalWidth; x += this.gridSize) {
      graphics.moveTo(x, startY);
      graphics.lineTo(x, startY + totalHeight);
    }

    // **绘制水平线**
    for (let y = startY; y <= startY + totalHeight; y += this.gridSize) {
      graphics.moveTo(startX, y);
      graphics.lineTo(startX + totalWidth, y);
    }

    // 应用绘制
    graphics.stroke();
    console.log("Complete grid drawn successfully.");
  }

  update(deltaTime: number) {}
}
