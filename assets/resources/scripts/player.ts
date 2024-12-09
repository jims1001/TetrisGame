import {
  _decorator,
  Component,
  Input,
  input,
  Node,
  Rect,
  Size,
  UITransform,
  Vec2,
  Vec3,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("player")
export class player extends Component {
  @property
  public type: number = 1; // ---- 表示出现的是那种形状
  @property
  public stepSize = 40; // 每次移动的距离

  @property
  public stepSpeed = 1; // 每次移动的速度

  @property
  public isSelected: boolean = false; // 是否被选中

  @property({ type: [Number] }) // 数字数组
  values: number[] = [];

  @property(Node)
  item1 = null;

  @property(Node)
  item2 = null;

  @property(Node)
  item3 = null;

  @property(Node)
  item4 = null;

  // 可以活动的 边界
  public leftEdge: number = 0; // 左边界
  public rightEdge: number = 0; // 右边界
  public bottomEdge: number = 0; // 上边界
  public onActive: (player: player) => void = null;
  // 进入到底部边界
  public onEnterButtomEdge: (player: player) => void = null;

  // 改变
  public onChange: (player: player, boundRect: Rect) => void = null;

  // 是否可以移动  1 左边 2 右边 -1 不处理
  public onCanMove: (player: player, direction: number) => boolean = null;

  start() {
    input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);

    if (this.onActive) {
      this.onActive(this);
    }
  }

  // 获取节点的尺寸
  getContentSize() {
    const uiTransform = this.node.getComponent(UITransform);
    if (uiTransform) {
      return uiTransform.contentSize;
    }
    return new Size(0, 0);
  }

  rotatePoint(point, angle) {
    let radian = (angle * Math.PI) / 180;
    let cos = Math.cos(radian);
    let sin = Math.sin(radian);
    return {
      x: point.x * cos - point.y * sin,
      y: point.x * sin + point.y * cos,
    };
  }

  // autoAlignAndRotateToGrid(gridSize) {
  //   // 获取节点的宽高
  //   let width = this.getContentSize().width;
  //   let height = this.getContentSize().height;

  //   // 获取节点当前的世界坐标
  //   let worldPos = this.node.getPosition();

  //   // 计算节点的当前中心点
  //   let centerX = worldPos.x;
  //   let centerY = worldPos.y;

  //   // 自动计算最近的网格点
  //   let targetX = Math.round(centerX / gridSize) * gridSize;
  //   let targetY = Math.round(centerY / gridSize) * gridSize;

  //   // 计算旋转后的锚点偏移
  //   let rotatedAnchorX = -0.5 * height; // 高度的一半，取负值
  //   let rotatedAnchorY = 0.5 * width; // 宽度的一半

  //   // 计算偏移量，使旋转后的网格对齐目标点
  //   let offsetX = targetX - (centerX + rotatedAnchorX);
  //   let offsetY = targetY - (centerY + rotatedAnchorY);

  //   // 设置节点的新位置
  //   this.node.setPosition(centerX + offsetX, centerY + offsetY);

  //   // 设置旋转角度为 90 度
  //   this.node.setRotationFromEuler(0, 0, this.node.eulerAngles.z + 90);
  // }

  // 键盘事件
  onKeyDown(event) {
    let point = this.node.position;
    // 如果没有选中 是不能进行操作的
    if (!this.isSelected) {
      return;
    }

    let direction = -1;
    switch (event.keyCode) {
      case 37:
        console.log("left");
        point = new Vec3(point.x - this.stepSize, point.y, point.z);
        direction = 1;
        break;
      case 38:
        console.log("up");

        this.node.setRotationFromEuler(
          new Vec3(
            this.node.eulerAngles.x,
            this.node.eulerAngles.y,
            this.node.eulerAngles.z + 90
          )
        );
        direction = -1;

        break;
      case 39:
        point = new Vec3(point.x + this.stepSize, point.y, point.z);
        direction = 2;
        console.log("right");
        break;
      case 40:
        console.log("down");
        direction = -1;
        point = new Vec3(
          point.x,
          point.y - this.stepSize * this.stepSpeed,
          point.z
        );
        break;
    }

    // 如果没有设置 onCanMove 则不可移动 判断是否可以移动
    if (this.onCanMove && !this.onCanMove(this, direction)) {
      return;
    }

    this.node.setPosition(point);

    const realReact = new Rect(
      this.node.position.x - this.getContentSize().x / 2,
      this.node.position.y + this.getContentSize().y / 2,
      this.getContentSize().width,
      this.getContentSize().height
    );

    // console.log("realReact", realReact);

    if (this.onChange) {
      this.onChange(this, realReact);
    }

    const nextPoint = new Vec3(
      point.x,
      point.y - this.stepSize * this.stepSpeed,
      point.z
    );

    // 判断下一个是否到边界

    if (nextPoint.y < this.bottomEdge) {
      if (this.onEnterButtomEdge) {
        this.onEnterButtomEdge(this);
      }
    }
  }

  getSmallBlockCenters(realReact: Rect, isRotated: boolean): Vec2[] {
    const result = [];
    const stepX = isRotated ? 0 : 40; // 如果没有旋转，水平步长为40
    const stepY = isRotated ? 40 : 0; // 如果旋转，垂直步长为40

    for (let i = 0; i < 4; i++) {
      const center = new Vec2(
        realReact.x + stepX * i + 20, // 每个小方块的中心点 x 坐标
        realReact.y - stepY * i - 20 // 每个小方块的中心点 y 坐标
      );
      result.push(center);
    }

    return result;
  }

  getValidPoints() {
    const resultCenter = [];
    // 条形
    if (this.type == 1) {
      const realReact = new Rect(
        this.node.position.x - this.getContentSize().x / 2,
        this.node.position.y + this.getContentSize().y / 2,
        this.getContentSize().width,
        this.getContentSize().height
      );

      return this.getSmallBlockCenters(realReact, false);
    } else if (this.type == 2) {
      return [];
    } else if (this.type == 3) {
      return [];
    } else if (this.type == 4) {
      return [];
    }

    return [];
  }

  update(deltaTime: number) {}
}
