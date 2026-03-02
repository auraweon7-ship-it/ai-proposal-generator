'use client';

import { useState } from 'react';
import { CrawlResult, AppStatus } from '@/types';
import { DEFAULT_PROPOSAL_PROMPT } from '@/lib/prompt';

interface GeneratorState {
  status: AppStatus;
  crawlResult: CrawlResult | null;
  proposal: string;
  customPrompt: string;
  error: string;
  isSaving: boolean;
  isSaved: boolean;
  savedId: string | null;
}

export function useProposalGenerator() {
  const [state, setState] = useState<GeneratorState>({
    status: 'idle',
    crawlResult: null,
    proposal: '',
    customPrompt: DEFAULT_PROPOSAL_PROMPT,
    error: '',
    isSaving: false,
    isSaved: false,
    savedId: null,
  });

  function setCrawlResult(result: CrawlResult) {
    setState((prev) => ({
      ...prev,
      crawlResult: result,
      status: 'idle',
      proposal: '',
      error: '',
      isSaved: false,
      savedId: null,
    }));
  }

  function setCustomPrompt(prompt: string) {
    setState((prev) => ({ ...prev, customPrompt: prompt }));
  }

  async function generate() {
    if (!state.crawlResult) return;

    setState((prev) => ({ ...prev, status: 'generating', error: '', proposal: '' }));

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          crawledContent: state.crawlResult.content,
          siteTitle: state.crawlResult.title,
          siteUrl: state.crawlResult.url,
          customPrompt: state.customPrompt !== DEFAULT_PROPOSAL_PROMPT
            ? state.customPrompt
            : undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || '제안서 생성에 실패했습니다.');
      }

      setState((prev) => ({
        ...prev,
        status: 'complete',
        proposal: data.proposal,
      }));
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : '오류가 발생했습니다.';
      setState((prev) => ({ ...prev, status: 'error', error: message }));
    }
  }

  async function save(): Promise<boolean> {
    if (!state.proposal || !state.crawlResult) return false;

    setState((prev) => ({ ...prev, isSaving: true }));

    try {
      const title = state.crawlResult.title || state.crawlResult.url;

      const res = await fetch('/api/proposals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          sourceUrl: state.crawlResult.url,
          sourceName: state.crawlResult.title,
          content: state.proposal,
          promptUsed: state.customPrompt,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || '저장에 실패했습니다.');
      }

      setState((prev) => ({ ...prev, isSaving: false, isSaved: true, savedId: data.id }));
      return true;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : '저장 중 오류가 발생했습니다.';
      setState((prev) => ({ ...prev, isSaving: false, error: message }));
      return false;
    }
  }

  function reset() {
    setState((prev) => ({
      ...prev,
      status: prev.crawlResult ? 'idle' : 'idle',
      proposal: '',
      error: '',
      isSaved: false,
      savedId: null,
    }));
  }

  return {
    ...state,
    setCrawlResult,
    setCustomPrompt,
    generate,
    save,
    reset,
  };
}
