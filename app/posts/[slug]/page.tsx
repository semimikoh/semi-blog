import { redirect } from 'next/navigation';
import { defaultLocale } from '../../lib/i18n/config';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function PostRedirect({ params }: Props) {
  const { slug } = await params;
  redirect(`/${defaultLocale}/posts/${slug}`);
}
