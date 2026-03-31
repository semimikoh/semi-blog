'use client';

import { useState, useEffect } from 'react';
import { codeToHtml } from 'shiki';

export function CopyBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  const [html, setHtml] = useState('');

  useEffect(() => {
    codeToHtml(code, {
      lang: 'typescript',
      theme: 'dracula',
    }).then(setHtml);
  }, [code]);

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <div className="solid-borders relative mt-3 overflow-hidden rounded-lg">
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 z-10 rounded border-none bg-white/20 px-2 py-0.5 text-[14px] text-white/80 transition-colors hover:bg-white/30 hover:text-white"
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
      {html ? (
        <div
          className="[&>pre]:whitespace-pre-wrap [&>pre]:break-all [&>pre]:p-3 [&>pre]:text-[12px] [&>pre]:leading-relaxed sm:[&>pre]:text-[13px]"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      ) : (
        <pre className="whitespace-pre-wrap break-all bg-[#282a36] p-3 text-[12px] leading-relaxed text-[#f8f8f2] sm:text-[13px]">
          <code>{code}</code>
        </pre>
      )}
    </div>
  );
}
