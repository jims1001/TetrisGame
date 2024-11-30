import {
  _decorator,
  Color,
  Component,
  Graphics,
  MeshRenderer,
  Node,
  Sprite,
  UITransform,
  Vec2,
  view,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("playercontroller")
export class playercontroller extends Component {
  start() {}

  update(deltaTime: number) {
    // console.log("deltaTime", deltaTime);
  }
}
