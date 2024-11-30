import { Vec2 } from "cc";

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
  const startX = -width * anchorX + gridSize / 2;
  const startY = height * (1 - anchorY) - gridSize / 2;

  // 填充二维数组
  for (let row = 0; row < rows; row++) {
    const rowCenters: Vec2[] = [];
    for (let col = 0; col < columns; col++) {
      const centerX = startX + col * gridSize;
      const centerY = startY - row * gridSize; // 注意 Y 坐标从上到下递减
      rowCenters.push(new Vec2(centerX, centerY));
    }
    centers.push(rowCenters);
  }

  return centers;
}
