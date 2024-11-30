import { _decorator, Color, Component, Graphics, Node, view } from "cc";
const { ccclass, property } = _decorator;

@ccclass("gamegrid")
export class gamegrid extends Component {
  @property
  gridSize: number = 40; // 每个格子的大小

  @property
  marginX: number = 200; // 左右空白宽度

  @property
  marginY: number = 400; // 上下空白高度

  @property
  lineWidth: number = 2; // 网格线宽度

  @property
  gridColor: Color = new Color(0, 0, 0, 255); // 网格线颜色

  @property
  backgroundColor: Color = new Color(200, 200, 200, 255); // 背景颜色

  start() {
    console.log("playercontroller start");
    const screenWidth = view.getVisibleSize().width;
    const screenHeight = view.getVisibleSize().height;

    console.log(`Screen Width: ${screenWidth}, Screen Height: ${screenHeight}`);

    // 计算中间网格区域的起点（向内偏移到 gridSize 的整数倍）
    const startX =
      Math.ceil((-screenWidth / 2 + this.marginX) / this.gridSize) *
        this.gridSize -
      (screenWidth % this.gridSize);
    const startY =
      Math.ceil((-screenHeight / 2 + this.marginY) / this.gridSize) *
        this.gridSize -
      100;

    // 计算总宽高范围（向下取整为 gridSize 的整数倍）
    const totalWidth =
      Math.floor((screenWidth - 2 * this.marginX) / this.gridSize) *
      this.gridSize;
    const totalHeight =
      Math.floor((screenHeight - 2 * this.marginY) / this.gridSize) *
      this.gridSize;

    console.log(`Start X: ${startX}, Start Y: ${startY}`);
    console.log(`Total Width: ${totalWidth}, Total Height: ${totalHeight}`);

    // 动态获取或添加 Graphics 组件
    let graphics = this.node.getComponent(Graphics);
    if (!graphics) {
      graphics = this.node.addComponent(Graphics);
    }

    // 绘制背景覆盖整个屏幕
    graphics.fillColor = this.backgroundColor;
    graphics.rect(
      -screenWidth / 2,
      -screenHeight / 2,
      screenWidth,
      screenHeight
    );
    graphics.fill();

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
