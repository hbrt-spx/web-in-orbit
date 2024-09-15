type PendingGoalsResponse = {
  id: string
  title: string
  desiredWeeklyFrequency: number
  completionCount: number
}[]

export async function getPendingGoals(): Promise<PendingGoalsResponse> {
  const webService = import.meta.env.VITE_WEBSERVICE_URL
  const response = await fetch(`${webService}/pending-goals`)
  const data = await response.json()

  return data.pendingGoals
}
