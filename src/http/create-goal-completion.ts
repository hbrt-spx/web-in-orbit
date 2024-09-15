export async function createGoalCompletion(goalId: string) {
  const webService = import.meta.env.VITE_WEBSERVICE_URL

  await fetch(`${webService}/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      goalId,
    }),
  })
}
