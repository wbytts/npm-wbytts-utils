/**
 * 数据验证服务
 * 提供类型安全的数据验证功能
 */

import { isPhoneNumber, isIdCard, isUrl } from '@wbytts/utils/validate';
import type { 
  IValidateService, 
  ValidationResult, 
  ValidationRule, 
  BatchValidationResult,
  ValidationType 
} from '../types';
import { ValidationError, VALIDATION_MESSAGES } from '../types';
import { Logger } from '../utils/logger';

export class ValidateService implements IValidateService {
  private readonly logger = new Logger('info');

  /**
   * 验证手机号
   */
  async validatePhone(phone: string): Promise<ValidationResult> {
    try {
      this.validateInput(phone, 'phone');
      
      const isValid = isPhoneNumber(phone);
      const rule: ValidationRule = {
        type: 'phone' as ValidationType,
        required: true
      };

      this.logger.debug(`手机号验证: ${phone} -> ${isValid ? '有效' : '无效'}`);

      return {
        success: true,
        message: isValid ? '手机号格式正确' : VALIDATION_MESSAGES.PHONE_INVALID,
        timestamp: new Date(),
        field: 'phone',
        value: phone,
        isValid,
        rule
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : '手机号验证失败';
      this.logger.error('手机号验证错误:', error);
      
      throw new ValidationError(message, 'phone', phone);
    }
  }

  /**
   * 验证身份证号
   */
  async validateIdCard(idCard: string): Promise<ValidationResult> {
    try {
      this.validateInput(idCard, 'idCard');
      
      const isValid = isIdCard(idCard);
      const rule: ValidationRule = {
        type: 'idCard' as ValidationType,
        required: true
      };

      this.logger.debug(`身份证验证: ${idCard} -> ${isValid ? '有效' : '无效'}`);

      return {
        success: true,
        message: isValid ? '身份证格式正确' : VALIDATION_MESSAGES.ID_CARD_INVALID,
        timestamp: new Date(),
        field: 'idCard',
        value: idCard,
        isValid,
        rule
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : '身份证验证失败';
      this.logger.error('身份证验证错误:', error);
      
      throw new ValidationError(message, 'idCard', idCard);
    }
  }

  /**
   * 验证URL
   */
  async validateUrl(url: string): Promise<ValidationResult> {
    try {
      this.validateInput(url, 'url');
      
      const isValid = isUrl(url);
      const rule: ValidationRule = {
        type: 'url' as ValidationType,
        required: true
      };

      this.logger.debug(`URL验证: ${url} -> ${isValid ? '有效' : '无效'}`);

      return {
        success: true,
        message: isValid ? 'URL格式正确' : VALIDATION_MESSAGES.URL_INVALID,
        timestamp: new Date(),
        field: 'url',
        value: url,
        isValid,
        rule
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'URL验证失败';
      this.logger.error('URL验证错误:', error);
      
      throw new ValidationError(message, 'url', url);
    }
  }

  /**
   * 批量验证
   */
  async batchValidate(
    data: Record<string, string>,
    rules: Record<string, ValidationRule>
  ): Promise<BatchValidationResult> {
    const results: ValidationResult[] = [];
    
    try {
      // 验证所有字段
      for (const [field, value] of Object.entries(data)) {
        const rule = rules[field];
        
        if (!rule) {
          this.logger.warn(`字段 ${field} 没有对应的验证规则`);
          continue;
        }

        // 检查必填字段
        if (rule.required && (!value || value.trim() === '')) {
          results.push({
            success: false,
            message: VALIDATION_MESSAGES.REQUIRED_FIELD,
            timestamp: new Date(),
            field,
            value: value || '',
            isValid: false,
            rule
          });
          continue;
        }

        // 如果不是必填且值为空，跳过验证
        if (!rule.required && (!value || value.trim() === '')) {
          results.push({
            success: true,
            message: '字段为空但非必填',
            timestamp: new Date(),
            field,
            value: value || '',
            isValid: true,
            rule
          });
          continue;
        }

        // 根据类型进行验证
        let validationResult: ValidationResult;
        
        switch (rule.type) {
          case 'phone':
            validationResult = await this.validatePhone(value);
            break;
          case 'idCard':
            validationResult = await this.validateIdCard(value);
            break;
          case 'url':
            validationResult = await this.validateUrl(value);
            break;
          default:
            throw new Error(`不支持的验证类型: ${rule.type}`);
        }

        // 更新字段名
        validationResult.field = field;
        results.push(validationResult);
      }

      // 统计结果
      const validCount = results.filter(r => r.isValid).length;
      const totalCount = results.length;
      const allValid = validCount === totalCount;

      this.logger.info(`批量验证完成: ${validCount}/${totalCount} 个字段通过验证`);

      return {
        results,
        allValid,
        validCount,
        totalCount
      };
    } catch (error) {
      this.logger.error('批量验证错误:', error);
      throw error;
    }
  }

  /**
   * 验证表单数据
   */
  async validateForm<T extends Record<string, string>>(
    formData: T,
    schema: Record<keyof T, ValidationRule>
  ): Promise<{
    isValid: boolean;
    errors: Record<keyof T, string>;
    validFields: Array<keyof T>;
  }> {
    const errors: Record<keyof T, string> = {} as Record<keyof T, string>;
    const validFields: Array<keyof T> = [];

    for (const [field, value] of Object.entries(formData) as Array<[keyof T, string]>) {
      const rule = schema[field];
      
      if (!rule) continue;

      try {
        let result: ValidationResult;
        
        switch (rule.type) {
          case 'phone':
            result = await this.validatePhone(value);
            break;
          case 'idCard':
            result = await this.validateIdCard(value);
            break;
          case 'url':
            result = await this.validateUrl(value);
            break;
          default:
            continue;
        }

        if (result.isValid) {
          validFields.push(field);
        } else {
          errors[field] = result.message;
        }
      } catch (error) {
        const message = error instanceof Error ? error.message : '验证失败';
        errors[field] = message;
      }
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
      validFields
    };
  }

  /**
   * 验证输入参数
   */
  private validateInput(value: string, field: string): void {
    if (typeof value !== 'string') {
      throw new Error(`${field} 必须是字符串类型`);
    }

    if (value.trim() === '') {
      throw new Error(`${field} 不能为空`);
    }

    this.logger.debug(`${field} 输入验证通过: ${value.length} 个字符`);
  }
}
