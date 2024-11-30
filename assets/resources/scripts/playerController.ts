import {
  _decorator,
  Component,
  Node,
  Prefab,
  instantiate,
  resources,
  Vec2,
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

  public gridNode = null;

  start() {
    const vectors = generateGridCentersFromTopLeft(40, 16, 20);
    console.log(vectors);

    this.initGrid();

    const p = vectors[0][0];
    console.log("point", p);
    const gridItem1 = this.getGridItem(1, vectors[0][0]);
    this.gridNode.addChild(gridItem1);

    const gridItem2 = this.getGridItem(2, vectors[4][0]);
    this.gridNode.addChild(gridItem2);

    const gridItem3 = this.getGridItem(3, vectors[8][0]);
    this.gridNode.addChild(gridItem3);

    const gridItem4 = this.getGridItem(4, vectors[12][0]);
    this.gridNode.addChild(gridItem4);
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
    // resources.load("Prefab/gamegrid", Prefab, (err, prefab) => {
    //   if (err) {
    //     console.log(err);
    //     return;
    //   }

    //   console.log("gamegrid loaded successfully!");

    //   const node = instantiate(prefab);
    //   this.node.addChild(node);
    //   node.setPosition(0, 0, 0);
    //   this.node.name = "gamegrid";

    //   const gridScript = node.getComponent("gamegrid");
    //   if (gridScript) {
    //     console.log("gridScript", gridScript);
    //   } else {
    //     console.error(
    //       'The script "grid" is not found on the prefab root node.'
    //     );
    //   }
    // });
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
    }
    const gridItemNode = instantiate(prefab);
    gridItemNode.setPosition(point.x + groupWidth / 2 - 20, point.y, 0);
    return gridItemNode;
  }

  /// 获取指定类型的元素
  getGameItems(type: number = 1) {
    return this.node.children;
  }

  initItem1() {
    console.log("initItem1");

    resources.load("Prefab/group1", Prefab, (err, prefab) => {
      if (err) {
        console.log(err);
        return;
      }

      console.log("group1 loaded successfully!");

      const node = instantiate(prefab);
      this.node.addChild(node);
      node.setPosition(0, 0, 0);
      this.node.name = "group1";
    });
  }

  initItem2() {
    console.log("initItem2");
    resources.load("Prefab/group2", Prefab, (err, prefab) => {
      if (err) {
        console.log(err);
        return;
      }

      console.log("group2 loaded successfully!");

      const node = instantiate(prefab);
      this.node.addChild(node);
      node.setPosition(0, -100, 0);
      this.node.name = "group2";
    });
  }

  initItem3() {
    console.log("initItem3");
    resources.load("Prefab/group3", Prefab, (err, prefab) => {
      if (err) {
        console.log(err);
        return;
      }

      console.log("group3 loaded successfully!");

      const node = instantiate(prefab);
      this.node.addChild(node);
      node.setPosition(0, -200, 0);
      this.node.name = "group3";
    });
  }

  update(deltaTime: number) {
    // console.log("deltaTime", deltaTime);
  }
}
