export interface Proposal {
  id: string;
  title: string;
  source_url: string;
  source_name: string | null;
  content: string;
  prompt_used: string | null;
  model_used: string;
  created_at: string;
}

export interface ProposalListItem {
  id: string;
  title: string;
  source_url: string;
  source_name: string | null;
  model_used: string;
  created_at: string;
}

export interface CrawlResult {
  title: string;
  description: string;
  content: string;
  url: string;
}

export interface GenerateRequest {
  crawledContent: string;
  siteTitle: string;
  siteUrl: string;
  customPrompt?: string;
}

export type AppStatus = 'idle' | 'crawling' | 'generating' | 'complete' | 'error';
