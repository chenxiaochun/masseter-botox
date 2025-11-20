import { redirect } from 'next/navigation';

// 默认重定向到中文版本
export default function RootPage() {
  // 可以根据用户的浏览器语言设置或其他逻辑来确定默认语言
  const defaultLocale = 'zh';
  
  // 重定向到默认语言页面
  redirect(`/${defaultLocale}`);
}
