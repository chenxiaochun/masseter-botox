"use client";
import React, { createContext, useContext, Suspense } from 'react';

// 定义支持的语言列表
export const supportedLocales = ['zh', 'en'] as const;

export type Locale = typeof supportedLocales[number];

// 创建语言上下文
interface LocaleContextType {
  locale: Locale;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

// 导出用于获取当前语言的Hook
export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context.locale;
}

// 多语言布局组件
export default function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { locale: Promise<string> };
}) {
  // 使用React.use()正确解包params Promise
  const resolvedParams = React.use(params) as { locale: string };
  const locale = resolvedParams?.locale as Locale;

  // 验证语言是否支持
  if (!supportedLocales.includes(locale)) {
    return (
      <div className="p-4">
        <h1>不支持的语言</h1>
        <p>请选择支持的语言：</p>
        <ul>
          {supportedLocales.map((lang) => (
            <li key={lang}>
              <a href={`/${lang}`}>{lang === 'zh' ? '中文' : 'English'}</a>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <LocaleContext.Provider value={{ locale }}>
      {children}
    </LocaleContext.Provider>
  );
}