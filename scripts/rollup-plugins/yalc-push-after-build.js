import { execSync } from 'child_process';

export default {
  name: 'yalc-push-after-build',
  writeBundle() {
    try {
      execSync('yalc push', { stdio: 'inherit' });
    } catch (error) {
      console.error('yalc push failed:', error);
    }
  }
}