import type { PaperCategory, QuestionPaper } from '@/data/papers'
import { apiClient } from '@/lib/axios'
import { endpoints } from './endpoints'

export async function getPapers(category: PaperCategory, signal?: AbortSignal) {
  const response = await apiClient.get<QuestionPaper[]>(endpoints.papers.list, {
    params: { category },
    signal,
  })
  return response.data
}
