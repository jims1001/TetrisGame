import { _decorator, Component, Input, input, Node, Vec2, Vec3 } from "cc";
const { ccclass, property } = _decorator;

@ccclass("player")
export class player extends Component {
  @property
  public type: number = 1; // ---- 表示出现的是那种形状
  start() {
    input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
  }

  onKeyDown(event) {
    let point = this.node.position;
    const currentRotation = this.node.eulerAngles;

    console.log("point", point);
    switch (event.keyCode) {
      case 37:
        console.log("left");
        point = new Vec3(point.x - 40, point.y, point.z);
        break;
      case 38:
        console.log("up");

        const newRotation = new Vec3(
          currentRotation.x,
          currentRotation.y, // 在 Y 轴方向旋转
          currentRotation.z + 90
        );
        this.node.setRotationFromEuler(newRotation);

        break;
      case 39:
        point = new Vec3(point.x + 40, point.y, point.z);
        console.log("right");
        break;
      case 40:
        console.log("down");
        point = new Vec3(point.x, point.y - 40 * 1, point.z);
        break;
    }

    this.node.setPosition(point);
  }

  update(deltaTime: number) {}
}
