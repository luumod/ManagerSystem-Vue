// 工具函数：保持比例计算另一个维度
function calculateAspectSize(
  originalWidth: number,
  originalHeight: number,
  newWidth?: number,
  newHeight?: number
): { width: number; height: number } {
  const aspect = originalWidth / originalHeight;

  if (newWidth !== undefined) {
    return {
      width: newWidth,
      height: newWidth / aspect
    };
  }
  return {
    width: newHeight! * aspect,
    height: newHeight!
  };
}

// 核心尺寸计算函数
export function calculateWidthResize(
  originalWidth: number,
  originalHeight: number,
  targetWidth: number,
  targetHeight: number,
  keepRatio: boolean
): { width: number; height: number } {
  if (!keepRatio) {
    return { width: targetWidth, height: targetHeight };
  }
  return calculateAspectSize(originalWidth, originalHeight, targetWidth);
}

export function calculateHeightResize(
  originalWidth: number,
  originalHeight: number,
  targetWidth: number,
  targetHeight: number,
  keepRatio: boolean
): { width: number; height: number } {
  if (!keepRatio) {
    return { width: targetWidth, height: targetHeight };
  }

  return calculateAspectSize(originalWidth, originalHeight, undefined, targetHeight);
}
