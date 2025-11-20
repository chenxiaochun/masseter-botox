"use client";
import { useState, useEffect } from 'react';
import { useLocale } from '../[locale]/layout';

// 定义翻译类型接口
interface TranslationData {
  [key: string]: string | TranslationData;
}

// 翻译钩子函数
export function useTranslation() {
  const locale = useLocale();
  const [translations, setTranslations] = useState<TranslationData>({});
  const [isLoading, setIsLoading] = useState(true);

  // 加载翻译文件
  useEffect(() => {
    async function loadTranslations() {
      setIsLoading(true);
      try {
        const response = await fetch(`/translations/${locale}.json`);
        if (response.ok) {
          const data = await response.json();
          setTranslations(data);
        } else {
          console.error(`Failed to load translations for locale: ${locale}`);
          // 回退到默认语言（中文）
          const fallbackResponse = await fetch(`/translations/zh.json`);
          if (fallbackResponse.ok) {
            const fallbackData = await fallbackResponse.json();
            setTranslations(fallbackData);
          }
        }
      } catch (error) {
        console.error('Error loading translations:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadTranslations();
  }, [locale]);

  // 翻译函数，支持嵌套键和变量替换
  const t = (key: string, variables: Record<string, string | number> = {}): string => {
    // 如果正在加载或没有翻译数据，返回键名
    if (isLoading || !translations) {
      return key;
    }

    // 解析嵌套键（例如：'navigation.home'）
    const keys = key.split('.');
    let value: TranslationData | string = translations;

    for (const k of keys) {
      if (typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // 如果键不存在，返回键名
        return key;
      }
    }

    // 如果最终值不是字符串，返回键名
    if (typeof value !== 'string') {
      return key;
    }

    // 替换变量（例如：'Hello {{name}}' -> 'Hello John'）
    let result = value;
    for (const [varName, varValue] of Object.entries(variables)) {
      result = result.replace(new RegExp(`{{${varName}}}`, 'g'), String(varValue));
    }

    return result;
  };

  return {
    t,
    isLoading,
    locale
  };
}