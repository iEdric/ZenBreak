import { RelaxMode, RelaxationAdvice } from "../types";

export const getRelaxationContent = async (mode: RelaxMode): Promise<RelaxationAdvice> => {
  // Simulate a short delay for smooth UI transition
  await new Promise(resolve => setTimeout(resolve, 600));

  switch (mode) {
    case RelaxMode.BREATHING:
      return {
        title: "深度呼吸",
        content: "专注于你的呼吸，感受空气充满你的肺部，然后慢慢呼出。",
        steps: ["吸气 4 秒", "保持 4 秒", "呼气 4 秒"]
      };
    case RelaxMode.EYES:
      return {
        title: "眼部放松",
        content: "长时间盯着屏幕会让眼睛疲劳。让我们移动一下视线。",
        steps: ["看向远处 20 秒", "顺时针转动眼球", "闭上眼睛休息片刻"]
      };
    case RelaxMode.MEDITATION:
      return {
        title: "片刻冥想",
        content: "暂时放下工作的烦恼，让思绪回到当下。",
        steps: ["感受脚踩在地板上的感觉", "放松肩膀", "清空杂念"]
      };
    default:
      return { title: "Relax", content: "Take a break.", steps: [] };
  }
};