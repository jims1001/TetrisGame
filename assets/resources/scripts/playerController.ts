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
  Rect,
  Size,
} from "cc";
import {
  generateArray,
  generateGridCentersFromTopLeft,
  getLastRowIndices,
  getRelativePosition,
  getRelativePositionFromCenter,
  hasIntersection2DClassic,
  transformToKeyStrings,
  updateArrayValues,
} from "./uitls/game";
import { player } from "./player";
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

  public gridItems = []; // 存储格子

  // 定义游戏格子的边界
  public leftEdge: number = 0; // 左边界
  public rightEdge: number = 0; // 右边界
  public bottomEdge: number = 0; // 上边界

  public columns: number = 16;
  public rows: number = 20;
  public gridSize: number = 40;
  public gameResultMap: any; // 保存游戏内容
  public gameVectors: Vec2[][] = []; // 保存游戏内容
  public lastVects: number[][];
  public currentNode: Node = null; // 保存当前的活动的节点

  start() {
    /// 生成棋的位置
    const vectors = generateGridCentersFromTopLeft(
      this.gridSize,
      this.columns,
      this.rows
    );
    this.gameVectors = vectors;
    this.lastVects = getLastRowIndices(this.gameVectors);
    this.initGrid();

    // 用于初始化数据
    this.gameResultMap = generateArray(this.rows, this.columns, 0);

    // 设置边界
    this.leftEdge = (-this.columns * this.gridSize) / 2;
    this.rightEdge = (this.columns * this.gridSize) / 2;
    this.bottomEdge = (-this.rows * this.gridSize) / 2;

    // 初始化格子
    this.initItemNode();
  }

  // 初始化网格
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
    trans.setContentSize(
      this.columns * this.gridSize,
      this.rows * this.gridSize
    );
  }

  /// 初始化格子
  initItemNode() {
    const gridItem1 = this.getGridItem(3, this.gameVectors[0][0]);
    this.gridNode.addChild(gridItem1);
    this.currentNode = gridItem1;
    const gridItemPlayer1 = this.getPlayerFromItem(gridItem1);
    gridItemPlayer1.leftEdge = this.leftEdge;
    gridItemPlayer1.rightEdge = this.rightEdge;
    gridItemPlayer1.bottomEdge = this.bottomEdge;
    gridItemPlayer1.isSelected = true;
    gridItemPlayer1.onEnterButtomEdge = () => {
      console.log("onEnterButtomEdge");
    };
    gridItemPlayer1.onChange = (player: player, boundRect: Rect) => {
      const indexPaths = this.getIndexes(player, this.gameVectors);
      const allKeys = transformToKeyStrings(this.gameResultMap);
      const currentKeys = transformToKeyStrings(indexPaths);

      if (hasIntersection2DClassic(this.lastVects, indexPaths)) {
        this.gameResultMap = updateArrayValues(indexPaths, this.gameResultMap);
        this.updateGridItemsByValue(this.gameResultMap, this.gridNode);
        console.log("gameResultMap", this.gameResultMap);
        this.removeCurrentItemNode();
        this.initItemNode();
      } else {
        let isCollision = false;
        currentKeys.forEach((key) => {
          const rowIndex = parseInt(key.split("-")[0]);
          const nextRowIndex = rowIndex + 1;
          const columnIndex = parseInt(key.split("-")[1]);
          const value = this.gameResultMap[nextRowIndex][columnIndex];
          if (value == 1) {
            isCollision = true;
          }
        });

        if (isCollision) {
          console.log("碰撞了");
          this.gameResultMap = updateArrayValues(
            indexPaths,
            this.gameResultMap
          );
          this.updateGridItemsByValue(this.gameResultMap, this.gridNode);
          console.log("gameResultMap", this.gameResultMap);
          this.removeCurrentItemNode();
          this.initItemNode();
          return;
        }
      }

      // 判断是否是最后一行 // 如果是最后一行 则直接消失  // 并且把当前的二维数组相应的地方改为1
      console.log("indexPaths", indexPaths);
    };
  }

  // 移除当前格子
  removeCurrentItemNode() {
    if (this.currentNode == null) {
      return;
    }

    this.currentNode.parent.removeChild(this.currentNode);
    this.currentNode = null;
  }

  /// 更新格子
  updateGridItemsByValue(gridValues: number[][], parentNode: Node): void {
    // 找到本身的子节点
    const existingNodes: { [key: string]: Node } = {};
    parentNode.children.forEach((child) => {
      existingNodes[child.name] = child; // 记录当前子节点
    });

    for (let rowIndex = 0; rowIndex < gridValues.length; rowIndex++) {
      for (
        let colIndex = 0;
        colIndex < gridValues[rowIndex].length;
        colIndex++
      ) {
        const value = gridValues[rowIndex][colIndex];
        const name = `${rowIndex}-${colIndex}`;

        if (value === 1) {
          if (!existingNodes[name]) {
            const p = this.gameVectors[rowIndex][colIndex];
            const newNode = this.getGridItem(10, p);
            newNode.name = name;
            parentNode.addChild(newNode);
          }
        } else if (value === 0) {
          if (existingNodes[name]) {
            const node = existingNodes[name];
            node.removeFromParent();
            node.destroy();
            delete existingNodes[name];
          }
        }
      }
    }
  }

  // 生成格子
  getGridItem(type: number = 1, point: Vec2 = new Vec2(0, 0)) {
    console.log("inintGridItem");

    let prefab = null;
    let gridSize = Size.ZERO;
    let groupWidth = 4 * 40;
    let offset = gridSize.width / 2;
    if (type == 1) {
      prefab = this.gridItem1;
      gridSize = new Size(160, 40);
      offset = -this.gridSize / 2 + 4; // 0.25 => 0.35 0.1 * 40 = 4
    } else if (type == 2) {
      gridSize = new Size(80, 80);
      prefab = this.gridItem2;
      offset = 0;
    } else if (type == 3) {
      gridSize = new Size(120, 80);
      prefab = this.gridItem3;
      offset = -this.gridSize / 2;
    } else if (type == 4) {
      groupWidth = 3 * 40;
      gridSize = new Size(120, 80);
      prefab = this.gridItem4;
      offset = -this.gridSize / 2;
    } else if (type == 10) {
      groupWidth = 1 * 40;
      gridSize = new Size(40, 40);
      prefab = this.gridItem10;
      offset = -this.gridSize / 2;
    }
    const gridItemNode = instantiate(prefab);

    const trans: UITransform = gridItemNode.getComponent(UITransform);
    const anchPos = trans.anchorPoint;

    //{ -300 380}
    gridItemNode.setPosition(
      point.x + gridSize.width * anchPos.x + offset,
      point.y - gridSize.height * (1 - anchPos.y) + this.gridSize / 2,
      0
    );

    return gridItemNode;
  }

  // 从格子中获取玩家
  getPlayerFromItem(node: Node) {
    const currentPlayer = node.getComponent(player);
    if (currentPlayer == null) {
      console.log("player not found in the grid item");
      return null;
    }
    return currentPlayer;
  }

  /// 获取矩形内的格子
  getIndexes(currentPlayer: player, vectors: Vec2[][]) {
    console.log("getIndexes");
    const p1 = getRelativePositionFromCenter(
      currentPlayer.item1,
      this.gridNode
    );
    const p2 = getRelativePositionFromCenter(
      currentPlayer.item2,
      this.gridNode
    );
    const p3 = getRelativePositionFromCenter(
      currentPlayer.item3,
      this.gridNode
    );
    const p4 = getRelativePositionFromCenter(
      currentPlayer.item4,
      this.gridNode
    );

    console.log("p1", p1, "p2", p2, "p3", p3, "p4", p4);

    const result = [];
    vectors.map((row, rowIndex) => {
      row.map((col, colIndex) => {
        if (col.equals(p1)) {
          result.push([rowIndex, colIndex]);
        }
        if (col.equals(p2)) {
          result.push([rowIndex, colIndex]);
        }
        if (col.equals(p3)) {
          result.push([rowIndex, colIndex]);
        }
        if (col.equals(p4)) {
          result.push([rowIndex, colIndex]);
        }
      });
    });

    return result;
  }

  update(deltaTime: number) {
    // console.log("deltaTime", deltaTime);
  }
}
