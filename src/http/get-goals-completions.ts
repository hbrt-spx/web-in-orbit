type GetCompletionGoalsResponse = {
  id: string
  goalId: string
  createdAt: string
}

export async function getCompletionGoals(): Promise<GetCompletionGoalsResponse> {
  const webService = import.meta.env.VITE_WEBSERVICE_URL
  const response = await fetch(`${webService}/goals-completed`)
  const data = await response.json()

  return data.completions
}
