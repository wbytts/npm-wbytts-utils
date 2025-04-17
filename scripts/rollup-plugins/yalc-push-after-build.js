import { execSync } from 'child_process';

// 记录构建完成的输出数量
let completedOutputs = 0;
// 从rollup.config.mjs中获取配置数量（这里是15个输出）
const totalOutputs = 15;
// 记录当前的计时器ID
let pushTimer = null;
// 记录是否已执行过yalc push的标志
let pushed = false;

export default {
  name: 'yalc-push-after-build',
  
  // 使用closeBundle钩子，它会在每个bundle关闭时调用
  closeBundle() {
    // 增加已完成的输出计数
    completedOutputs++;
    
    console.log(`构建进度: ${completedOutputs}/${totalOutputs}`);
    
    // 如果已经推送过，则直接返回
    if (pushed) return;
    
    // 清除之前的计时器（如果存在）
    if (pushTimer) clearTimeout(pushTimer);
    
    // 只有当所有输出都构建完成后才执行yalc push
    if (completedOutputs >= totalOutputs) {
      pushTimer = setTimeout(() => {
        try {
          console.log('所有打包任务完成，执行 yalc push...');
          execSync('yalc push', { stdio: 'inherit' });
          pushed = true;
          console.log('yalc push 执行成功');
          
          // 一段时间后重置状态，以便下次构建可以再次执行
          setTimeout(() => {
            pushed = false;
            completedOutputs = 0;
          }, 2000);
        } catch (error) {
          console.error('yalc push 失败:', error);
          // 重置计数，允许在错误后重试
          pushed = false;
          completedOutputs = 0;
        }
      }, 100); // 短暂延迟以确保所有文件都已写入
    }
  }
};