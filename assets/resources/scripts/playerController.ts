import {
  _decorator,
  Component,
  Node,
  Prefab,
  instantiate,
  resources,
  Vec2,
  Mask,
  UITransform,
} from "cc";
import { generateGridCentersFromTopLeft } from "./uitls/game";
const { ccclass, property } = _decorator;

@ccclass("playercontroller")
export class playercontroller extends Component {
  @property(Prefab)
  public gridPrefab: Prefab = null;

  @property(Prefab)
  public gridItem1: Prefab = null; // type == 1

  @property(Prefab)
  public gridItem2: Prefab = null; // type ==2

  @property(Prefab)
  public gridItem3: Prefab = null; // type ==3

  @property(Prefab)
  public gridItem4: Prefab = null; // type == 4

  @property(Prefab)
  public gridItem10: Prefab = null;

  public gridNode = null;

  start() {
    const vectors = generateGridCentersFromTopLeft(40, 16, 20);
    console.log(vectors);

    this.initGrid();
    // this.addMaskToNode(this.gridNode);

    const p = vectors[0][0];
    console.log("point", p);
    const gridItem1 = this.getGridItem(1, vectors[0][0]);
    this.gridNode.addChild(gridItem1);

    // const gridItem2 = this.getGridItem(2, vectors[4][0]);
    // this.gridNode.addChild(gridItem2);

    // const gridItem3 = this.getGridItem(3, vectors[8][0]);
    // this.gridNode.addChild(gridItem3);

    // const gridItem4 = this.getGridItem(4, vectors[12][0]);
    // this.gridNode.addChild(gridItem4);

    // const gridItem10 = this.getGridItem(10, vectors[16][0]);
    // this.gridNode.addChild(gridItem10);

    // const gridItem101 = this.getGridItem(10, vectors[16][1]);
    // this.gridNode.addChild(gridItem101);
  }

  initGrid() {
    this.gridNode = instantiate(this.gridPrefab);
    this.node.addChild(this.gridNode);
    this.gridNode.setPosition(0, 0, 0);

    this.node.name = "gamegrid";
    const gridScript = this.gridNode.getComponent("gamegrid");
    if (gridScript) {
      console.log("gridScript", gridScript);
    } else {
      console.error('The script "grid" is not found on the prefab root node.');
    }

    const trans: UITransform = this.gridNode.getComponent(UITransform);
    if (trans) {
      console.log("trans", trans);
    } else {
      console.error('The script "trans" is not found on the prefab root node.');
    }
    trans.setContentSize(16 * 40, 20 * 40);
  }

  // 添加遮罩
  addMaskToNode(targetNode: Node) {
    if (!targetNode) {
      console.error("Target node is not specified!");
      return;
    }

    // 检查目标节点是否已有 Mask 组件
    if (targetNode.getComponent(Mask)) {
      console.warn("The target node already has a Mask component.");
      return;
    }

    // 获取目标节点的 UITransform 组件
    const uiTransform = targetNode.getComponent(UITransform);
    if (!uiTransform) {
      console.error("The target node does not have a UITransform component.");
      return;
    }

    // 动态添加 Mask 组件
    const mask = targetNode.addComponent(Mask);

    // 设置 Mask 类型为 GRAPHICS（矩形裁剪）
    mask.type = Mask.Type.GRAPHICS_RECT;

    // 自动调整 Mask 的大小为节点的大小
    const size = uiTransform.contentSize;
    uiTransform.setContentSize(size.width, size.height);

    console.log(`Mask added to node '${targetNode.name}' with size:`, size);
  }
  getGridItem(type: number = 1, point: Vec2 = new Vec2(0, 0)) {
    console.log("inintGridItem");

    let prefab = null;
    let groupWidth = 4 * 40;
    if (type == 1) {
      prefab = this.gridItem1;
    } else if (type == 2) {
      groupWidth = 2 * 40;
      prefab = this.gridItem2;
    } else if (type == 3) {
      groupWidth = 3 * 40;
      prefab = this.gridItem3;
    } else if (type == 4) {
      groupWidth = 3 * 40;
      prefab = this.gridItem4;
    } else if (type == 10) {
      groupWidth = 1 * 40;
      prefab = this.gridItem10;
    }
    const gridItemNode = instantiate(prefab);
    gridItemNode.setPosition(point.x + groupWidth / 2 - 20, point.y, 0);
    return gridItemNode;
  }

  update(deltaTime: number) {
    // console.log("deltaTime", deltaTime);
  }
}
