type SummaryResponse = {
  completed: number
  total: number
  goalsPerDay: Record<
    string,
    {
      id: string
      title: string
      completedAt: string
      completionId: string
    }[]
  >
}

export async function getSummary(): Promise<SummaryResponse> {
  const webService = import.meta.env.VITE_WEBSERVICE_URL
  const response = await fetch(`${webService}/summary`)
  const data = await response.json()

  return data.summary
}
