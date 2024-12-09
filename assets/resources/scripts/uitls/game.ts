import { UITransform, Vec2, Vec3 } from "cc";
import { Node } from "cc";
/**
 * 生成网格每个单元格中心点的二维数组
 * */

export function generateGridCentersFromTopLeft(
  gridSize: number,
  columns: number,
  rows: number,
  anchorX: number = 0.5,
  anchorY: number = 0.5
): Vec2[][] {
  const centers: Vec2[][] = [];

  // 计算网格的宽度和高度
  const width = columns * gridSize;
  const height = rows * gridSize;

  // 根据锚点计算左上角起始点的位置
  const startX = -width * anchorX;
  const startY = height * (1 - anchorY);

  // 填充二维数组
  for (let row = 0; row < rows; row++) {
    const rowCenters: Vec2[] = [];
    for (let col = 0; col < columns; col++) {
      const centerX = startX + col * gridSize + gridSize / 2;
      const centerY = startY - row * gridSize - gridSize / 2; // 注意 Y 坐标从上到下递减
      rowCenters.push(new Vec2(centerX, centerY));
    }
    centers.push(rowCenters);
  }

  return centers;
}

/**
 * 获取当前节点相对于目标节点的本地坐标
 * @param currentNode 当前节点
 * @param targetNode 目标节点
 * @returns Vec3 当前节点在目标节点坐标系中的坐标
 */
export function getRelativePosition(currentNode: Node, targetNode: Node): Vec2 {
  // 获取当前节点的世界坐标
  const worldPosition = currentNode.getWorldPosition();

  // 转换为目标节点的本地坐标
  const relativePosition = targetNode.inverseTransformPoint(
    new Vec3(),
    worldPosition
  );

  return new Vec2(relativePosition.x, relativePosition.y);
}

export function getRelativePositionFromCenter(
  currentNode: Node,
  targetNode: Node
): Vec2 {
  // 确保当前节点有 UITransform 组件
  const uiTransform = currentNode.getComponent(UITransform);
  if (!uiTransform) {
    throw new Error("当前节点缺少 UITransform 组件");
  }

  // 获取当前节点的锚点
  const anchorPoint = uiTransform.anchorPoint;

  // 获取当前节点的世界坐标
  const worldPosition = currentNode.getWorldPosition();

  // 获取当前节点的世界缩放
  const worldScale = currentNode.getWorldScale();

  // 获取节点的尺寸
  const size = uiTransform.contentSize;

  // 计算从当前锚点到 (0.5, 0.5) 的偏移
  const offsetX = (0.5 - anchorPoint.x) * size.width * worldScale.x;
  const offsetY = (0.5 - anchorPoint.y) * size.height * worldScale.y;

  // 计算中心点的世界坐标
  const centerWorldPosition = new Vec3(
    worldPosition.x + offsetX,
    worldPosition.y + offsetY,
    worldPosition.z
  );

  // 将世界坐标转换为目标节点的本地坐标
  const relativePosition = targetNode.inverseTransformPoint(
    new Vec3(),
    centerWorldPosition
  );

  // 返回结果
  return new Vec2(relativePosition.x, relativePosition.y);
}

/// 获取最后一行的索引
export function getLastRowIndices(gridCenters: Vec2[][]): number[][] {
  const indices: number[][] = [];

  // 检查数组是否为空
  if (gridCenters.length === 0) return indices;

  // 获取最后一行的索引
  const lastRow = gridCenters.length - 1;
  const lastRowLength = gridCenters[lastRow].length;

  for (let col = 0; col < lastRowLength; col++) {
    indices.push([lastRow, col]);
  }

  return indices;
}

// 获取左边的索引
export function getFirstColumnIndexes(array: any[][]): [number, number][] {
  return array.map((_, rowIndex) => [rowIndex, 0]);
}

// 获取右边的索引
export function getLastColumnIndexes(array: any[][]): [number, number][] {
  return array.map((_, rowIndex) => [rowIndex, array[rowIndex].length - 1]);
}

/**
 * 将二维数组转换为字符串键数组
 * @param array 二维数组
 * @returns string[] 转换后的字符串数组
 */
export function transformToKeyStrings(array: number[][]): string[] {
  const result: string[] = [];

  for (let i = 0; i < array.length; i++) {
    if (array[i].length === 2) {
      result.push(`${array[i][0]}-${array[i][1]}`);
    }
  }

  return result;
}

// 判断两个数组 是否有相交
/**
 * 判断二维数组 array1 是否包含 array2 中的任意值（不使用 flat() 和 includes()）
 * @param array1 主二维数组
 * @param array2 要检查的二维数组
 * @returns boolean 如果 array1 中包含 array2 的任意值，返回 true；否则返回 false
 */
export function hasIntersection2DClassic(
  array1: number[][],
  array2: number[][]
): boolean {
  const keys1 = transformToKeyStrings(array1);
  const keys2 = transformToKeyStrings(array2);

  console.log("key1", keys1);
  console.log("key2", keys2);

  return hasIntersection(keys1, keys2);
}

/**
 * 判断两个数组是否有交集
 * @param array1 数组1
 * @param array2 数组2
 * @returns boolean 如果有交集，返回 true；否则返回 false
 */
export function hasIntersection(array1: string[], array2: string[]): boolean {
  for (let i = 0; i < array1.length; i++) {
    for (let j = 0; j < array2.length; j++) {
      if (array1[i] === array2[j]) {
        return true;
      }
    }
  }
  return false;
}

/**
 * 根据索引数组修改目标数组的值为 1
 * @param indices 二维数组，保存 rowIndex 和 colIndex
 * @param targetArray 目标二维数组
 */
export function updateArrayValues(
  indices: number[][],
  targetArray: number[][]
): number[][] {
  for (let i = 0; i < indices.length; i++) {
    const [rowIndex, colIndex] = indices[i];

    // 检查索引是否有效，防止越界
    if (
      rowIndex >= 0 &&
      rowIndex < targetArray.length &&
      colIndex >= 0 &&
      colIndex < targetArray[rowIndex].length
    ) {
      targetArray[rowIndex][colIndex] = 1;
    }
  }

  const newGrids = processGridRows(targetArray);
  return newGrids;
}

/**
 * 对二维数组进行处理：
 * 1. 删除整行为 1 的行。
 * 2. 在顶部插入等数量的全 0 行。
 * @param gridValues 二维数组
 * @returns number[][] 处理后的二维数组
 */
export function processGridRows(gridValues: number[][]): number[][] {
  const rows = gridValues.length;
  const cols = gridValues[0].length;

  // 创建一个新的数组，用于存储删除整行为 1 的行后的结果
  const newGrid: number[][] = [];
  let countOnesRows = 0; // 记录全为 1 的行数

  // 遍历每一行
  for (let i = 0; i < rows; i++) {
    let isAllOnes = true;

    // 判断当前行是否全为 1
    for (let j = 0; j < cols; j++) {
      if (gridValues[i][j] !== 1) {
        isAllOnes = false;
        break;
      }
    }

    if (isAllOnes) {
      countOnesRows++; // 如果是全 1 行，记录数量
    } else {
      newGrid.push([...gridValues[i]]); // 如果不是全 1 行，则保留
    }
  }

  // 在顶部插入对应数量的全 0 行
  for (let i = 0; i < countOnesRows; i++) {
    newGrid.unshift(Array(cols).fill(0));
  }

  return newGrid;
}

// 生成一个数组
export function generateArray(
  rows: number,
  cols: number,
  initialValue: number = 0
): any[][] {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => initialValue)
  );
}
