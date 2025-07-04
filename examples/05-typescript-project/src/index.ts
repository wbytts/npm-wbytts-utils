#!/usr/bin/env node

/**
 * TypeScript 示例入口文件
 * 展示 @wbytts/utils 在 TypeScript 环境中的类型安全使用
 */

import { runMathExamples } from './examples/mathExamples';
import { runValidateExamples } from './examples/validateExamples';
import { runTimeExamples } from './examples/timeExamples';
import { runUtilsExamples } from './examples/utilsExamples';
import { MathService } from './services/MathService';
import { ValidateService } from './services/ValidateService';
import { TimeService } from './services/TimeService';
import { Logger } from './utils/logger';
import type { AppConfig } from './types';

// 应用配置
const config: AppConfig = {
  debug: true,
  logLevel: 'info',
  features: {
    validation: true,
    math: true,
    time: true,
    utils: true
  }
};

// 初始化日志器
const logger = new Logger(config.logLevel);

/**
 * 主函数
 */
async function main(): Promise<void> {
  try {
    logger.info('🚀 TypeScript 示例程序启动');
    logger.info('📦 使用工具包: @wbytts/utils');
    logger.info('🔧 运行环境: TypeScript + Node.js', process.version);
    logger.info('=' * 50);

    // 运行基础示例
    if (config.features.math) {
      logger.info('\n📊 运行数学计算示例...');
      await runMathExamples();
    }

    if (config.features.validation) {
      logger.info('\n✅ 运行数据验证示例...');
      await runValidateExamples();
    }

    if (config.features.time) {
      logger.info('\n⏰ 运行时间处理示例...');
      await runTimeExamples();
    }

    if (config.features.utils) {
      logger.info('\n🔧 运行通用工具示例...');
      await runUtilsExamples();
    }

    // 运行服务层示例
    logger.info('\n🏗️ 运行服务层示例...');
    await runServiceExamples();

    // 运行类型安全示例
    logger.info('\n🛡️ 运行类型安全示例...');
    await runTypeSafetyExamples();

    logger.info('\n' + '=' * 50);
    logger.info('✅ 所有示例运行完成!');
    logger.info('💡 提示: 查看源代码了解 TypeScript 类型安全的使用方式');

  } catch (error) {
    logger.error('❌ 运行示例时出错:', error);
    process.exit(1);
  }
}

/**
 * 服务层示例
 */
async function runServiceExamples(): Promise<void> {
  const mathService = new MathService();
  const validateService = new ValidateService();
  const timeService = new TimeService();

  try {
    // 数学服务示例
    logger.info('📊 数学服务示例:');
    const sumResult = await mathService.sum(1, 2, 3, 4, 5);
    logger.info(`  求和结果: ${JSON.stringify(sumResult.data)}`);

    const avgResult = await mathService.average(10, 20, 30, 40, 50);
    logger.info(`  平均值结果: ${JSON.stringify(avgResult.data)}`);

    // 验证服务示例
    logger.info('\n✅ 验证服务示例:');
    const phoneResult = await validateService.validatePhone('13800138000');
    logger.info(`  手机号验证: ${phoneResult.isValid ? '✅' : '❌'} ${phoneResult.message}`);

    const urlResult = await validateService.validateUrl('https://www.example.com');
    logger.info(`  URL验证: ${urlResult.isValid ? '✅' : '❌'} ${urlResult.message}`);

    // 批量验证示例
    const batchResult = await validateService.batchValidate(
      {
        phone: '13800138000',
        url: 'https://www.example.com',
        idCard: '11010519491231002X'
      },
      {
        phone: { type: 'phone' as const, required: true },
        url: { type: 'url' as const, required: true },
        idCard: { type: 'idCard' as const, required: true }
      }
    );
    logger.info(`  批量验证: ${batchResult.allValid ? '✅' : '❌'} ${batchResult.validCount}/${batchResult.totalCount} 通过`);

    // 时间服务示例
    logger.info('\n⏰ 时间服务示例:');
    const formatResult = await timeService.format(new Date(), { format: 'YYYY-MM-DD HH:mm:ss' });
    logger.info(`  时间格式化: ${formatResult.data.formatted}`);

    const addResult = await timeService.add(new Date(), 7, 'day');
    logger.info(`  时间计算: ${addResult.data.formatted}`);

  } catch (error) {
    logger.error('服务层示例出错:', error);
    throw error;
  }
}

/**
 * 类型安全示例
 */
async function runTypeSafetyExamples(): Promise<void> {
  logger.info('🛡️ TypeScript 类型安全示例:');

  // 1. 严格类型检查
  logger.info('  1. 严格类型检查:');
  
  // 正确的类型使用
  const numbers: number[] = [1, 2, 3, 4, 5];
  const validPhone: string = '13800138000';
  const config: Partial<AppConfig> = { debug: true };
  
  logger.info(`    ✅ 数字数组: [${numbers.join(', ')}]`);
  logger.info(`    ✅ 手机号: ${validPhone}`);
  logger.info(`    ✅ 配置: ${JSON.stringify(config)}`);

  // 2. 泛型使用示例
  logger.info('  2. 泛型使用示例:');
  
  function processArray<T>(items: T[], processor: (item: T) => T): T[] {
    return items.map(processor);
  }
  
  const processedNumbers = processArray(numbers, (n) => n * 2);
  const processedStrings = processArray(['a', 'b', 'c'], (s) => s.toUpperCase());
  
  logger.info(`    ✅ 处理数字: [${processedNumbers.join(', ')}]`);
  logger.info(`    ✅ 处理字符串: [${processedStrings.join(', ')}]`);

  // 3. 联合类型和类型守卫
  logger.info('  3. 联合类型和类型守卫:');
  
  type StringOrNumber = string | number;
  
  function processValue(value: StringOrNumber): string {
    if (typeof value === 'string') {
      return `字符串: ${value}`;
    } else {
      return `数字: ${value}`;
    }
  }
  
  logger.info(`    ✅ ${processValue('hello')}`);
  logger.info(`    ✅ ${processValue(42)}`);

  // 4. 可选属性和默认值
  logger.info('  4. 可选属性和默认值:');
  
  interface UserConfig {
    name: string;
    age?: number;
    email?: string;
  }
  
  function createUser(config: UserConfig): Required<UserConfig> {
    return {
      name: config.name,
      age: config.age ?? 18,
      email: config.email ?? 'unknown@example.com'
    };
  }
  
  const user = createUser({ name: '张三', age: 25 });
  logger.info(`    ✅ 用户: ${JSON.stringify(user)}`);

  // 5. 枚举和常量断言
  logger.info('  5. 枚举和常量断言:');
  
  enum Status {
    PENDING = 'pending',
    SUCCESS = 'success',
    ERROR = 'error'
  }
  
  const statusMessages = {
    [Status.PENDING]: '处理中',
    [Status.SUCCESS]: '成功',
    [Status.ERROR]: '错误'
  } as const;
  
  logger.info(`    ✅ 状态: ${Status.SUCCESS} - ${statusMessages[Status.SUCCESS]}`);
}

// 错误处理
process.on('uncaughtException', (error: Error) => {
  logger.error('❌ 未捕获的异常:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason: unknown) => {
  logger.error('❌ 未处理的Promise拒绝:', reason);
  process.exit(1);
});

// 优雅退出
process.on('SIGINT', () => {
  logger.info('\n👋 程序正在退出...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  logger.info('\n👋 程序正在退出...');
  process.exit(0);
});

// 运行主函数
if (require.main === module) {
  main().catch((error: Error) => {
    logger.error('主函数执行失败:', error);
    process.exit(1);
  });
}
