import { Plus } from 'lucide-react'
import { OutlineButton } from './outline-button'
import { getPendingGoals } from '../../http/get-pending-goals'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { createGoalCompletion } from '../../http/create-goal-completion'
import { deleteGoal } from '../../http/delete-goal'
import { useState } from 'react'

export function PendingGoals() {
  const queryClient = useQueryClient()
  const { data } = useQuery({
    queryKey: ['pending-goals'],
    queryFn: getPendingGoals,
    staleTime: 1000 * 60, // 60 SECONDS
  })

  if (!data) {
    return null
  }

  const [isDeleteMode, setIsDeleteMode] = useState(false)

  const toggleMode = () => {
    setIsDeleteMode(!isDeleteMode)
  }

  async function handleCompleteGoal(goalId: string) {
    await createGoalCompletion(goalId)

    queryClient.invalidateQueries({ queryKey: ['summary'] })
    queryClient.invalidateQueries({ queryKey: ['pending-goals'] })
  }

  async function handleDeleteGoal(goalId: string) {
    await deleteGoal(goalId)

    queryClient.invalidateQueries({ queryKey: ['summary'] })
    queryClient.invalidateQueries({ queryKey: ['pending-goals'] })
  }

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        {data.map(goal => {
          return (
            <div key={goal.id}>
              <OutlineButton
                key={goal.id}
                disabled={goal.completionCount >= goal.desiredWeeklyFrequency}
                onClick={() =>
                  isDeleteMode
                    ? handleDeleteGoal(goal.id)
                    : handleCompleteGoal(goal.id)
                }
                className={`${
                  isDeleteMode
                    ? 'border-red-500 text-red-500'
                    : 'bg-transparent text-gray-300'
                }`}
              >
                {!isDeleteMode && <Plus className="size-4 text-zinc-600" />}
                {goal.title}
              </OutlineButton>
            </div>
          )
        })}
      </div>

      <OutlineButton
        className="size-[100%] border-zinc-700 hover:border-zinc-600 bg-transparent mt-5 justify-center items-center"
        onClick={toggleMode}
      >
        {isDeleteMode ? 'Cancelar' : 'Deletar Metas'}
      </OutlineButton>
    </div>
  )
}
