import { Minus, Plus } from 'lucide-react'
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
  const [isDeleteMode, setIsDeleteMode] = useState(false)

  if (!data) {
    return null
  }

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
                    ? 'border-red-600 text-red-600 hover:text-red-500 hover:border-red-500'
                    : 'bg-transparent text-gray-300'
                }`}
              >
                {!isDeleteMode && <Plus className="size-4 text-zinc-600" />}
                {isDeleteMode && <Minus className='size-4 text-red-600'/>}
                {goal.title}
              </OutlineButton>
            </div>
          )
        })}
      </div>


        <div className='flex justify-end items-end size-[100%]'>
        <OutlineButton
        className=" border-l size-[20%] border-zinc-800 hover:border-zinc-600 bg-transparent mt-5 justify-center items-end"
        onClick={toggleMode}
      >
        {isDeleteMode ? 'Cancelar' : "🗑️"}
      </OutlineButton>
        </div>      
    </div>
  )
}
