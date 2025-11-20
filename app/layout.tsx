import "./globals.css";
import type { Metadata, NextPageContext } from 'next';

// 动态生成metadata，根据请求路径中的语言前缀设置不同的title和description
export async function generateMetadata({ params }: { params?: { locale: string } }) {
  // 从params获取语言，如果没有则默认为中文
  const locale = params?.locale || 'zh';
  
  // 根据语言设置不同的title和description
  const title = locale === 'zh' ? 'Masseter Botox 专业医疗' : 'Masseter Botox Professional Medical';
  const description = locale === 'zh' ? '专业的咬肌注射服务，安全有效' : 'Professional masseter injection services, safe and effective';
  
  return {
    title,
    description,
    alternates: {
      canonical: locale === 'zh' ? '/' : `/${locale}`,
      languages: {
        'zh': '/zh',
        'en': '/en',
      },
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>
        {children}
      </body>
    </html>
  );
}
