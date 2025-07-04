import { execSync } from 'child_process';

export default {
  name: 'yalc-push-after-build',
  
  // 使用closeBundle钩子，它会在每个bundle关闭时调用
  closeBundle() {
    execSync('yalc push', { stdio: 'inherit' });
  }
};