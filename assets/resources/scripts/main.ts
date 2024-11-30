import {
  _decorator,
  Button,
  Color,
  Component,
  instantiate,
  Label,
  Node,
  Sprite,
  SpriteFrame,
  Texture2D,
  UITransform,
  Widget,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("main")
export class main extends Component {
  @property(Label)
  titleLabel: Label = null!;

  start() {
    // const bgNode = new Node("BackgroundSprite");
    // // 添加 Sprite 组件
    // const sprite = bgNode.addComponent(Sprite);
    // // 设置节点大小（全屏覆盖）
    // const uiTransform = bgNode.addComponent(UITransform);
    // const canvas = this.node.getComponent(UITransform); // 父节点应为 Canvas
    // uiTransform.setContentSize(canvas.width, canvas.height);
    // // 创建一个单像素纹理并设置为蓝色
    // const texture = new Texture2D();
    // texture.reset({
    //   width: 1,
    //   height: 1,
    //   format: Texture2D.PixelFormat.RGBA8888,
    // });
    // // 设置纹理的像素数据（蓝色）
    // const pixelData = new Uint8Array([0, 0, 255, 255]); // 蓝色 RGBA
    // texture.uploadData(pixelData);
    // // 创建 SpriteFrame 并绑定纹理
    // const spriteFrame = new SpriteFrame();
    // spriteFrame.texture = texture;
    // // 设置 SpriteFrame 到 Sprite
    // sprite.spriteFrame = spriteFrame;
    // // 添加到当前节点（通常是 Canvas）
    // this.node.addChild(bgNode);
    // // 创建一个新的节点
    // const labelNode = new Node("DynamicLabel");
    // // 添加 Label 组件
    // const label = labelNode.addComponent(Label);
    // // 设置 Label 的字符串内容
    // label.string = "hello cocos";
    // // 设置字体大小
    // label.fontSize = 30;
    // // 设置字体颜色（可选）
    // label.color = new Color(255, 255, 255, 255); // 白色
    // // 设置 Label 节点的大小
    // const uiTransform1 = labelNode.addComponent(UITransform);
    // uiTransform1.setContentSize(200, 50);
    // // 将 Label 节点添加到当前场景节点（通常是 Canvas）
    // this.node.addChild(labelNode);
    // const widget = labelNode.addComponent(Widget);
    // // 设置对齐方式为 Top-Left
    // widget.isAlignTop = true;
    // widget.isAlignLeft = true;
    // widget.top = 10; // 距离顶部的偏移量
    // widget.left = 10; // 距离左侧的偏移量
    // // 设置 Label 的位置（可选）
    // labelNode.setPosition(0, 0); // 居中显示
    // const buttonNode = new Node("DynamicButton");
    // // 添加 Button 组件
    // const button = buttonNode.addComponent(Button);
    // button.node.on(
    //   Button.EventType.CLICK,
    //   () => {
    //     console.log("hello cocos");
    //   },
    //   this
    // );
    // // 添加 UITransform 组件（用于设置按钮大小）
    // const uiTransform2 = buttonNode.addComponent(UITransform);
    // uiTransform2.setContentSize(150, 50); // 按钮宽150，高50
    // // 添加 UIWidget 组件，用于定位按钮到底部中央
    // const widget1 = buttonNode.addComponent(Widget);
    // widget1.top = 100; // 距离底部 20 像素
    // widget1.isAlignHorizontalCenter = true; // 水平居中
    // // 将按钮节点添加到当前节点（通常是 Canvas）
    // this.node.addChild(buttonNode);
    // // 创建一个新的节点作为按钮文本
    // const labelNode1 = new Node("ButtonLabel");
    // const label1 = labelNode1.addComponent(Label);
    // // 设置 Label 文本
    // label1.string = "点我";
    // label1.fontSize = 20;
    // label1.color = new Color(255, 255, 255, 255); // 白色
    // // 添加文本节点到按钮节点
    // buttonNode.addChild(labelNode1);
    // // 设置文本节点的位置（位于按钮中心）
    // labelNode1.setPosition(0, 0);
    // // 给按钮添加点击事件（可选）
    // buttonNode.on(
    //   Node.EventType.MOUSE_DOWN,
    //   () => {
    //     console.log("按钮被点击！");
    //   },
    //   this
    // );
  }

  update(deltaTime: number) {}
}
