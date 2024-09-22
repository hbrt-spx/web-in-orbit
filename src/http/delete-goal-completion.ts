export async function deleteGoalCompletion(goalId: string) {
  const webService = import.meta.env.VITE_WEBSERVICE_URL

  await fetch(`${webService}/delete-completions`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      goalId,
    }),
  })
}
