import { useMemo } from 'react'
import {
  getMockContributorById,
  getTopCollaborators,
  getWeeklyProductivity,
  getDailyActivity,
  type Contributor,
  type WeeklyProductivity,
  type DayActivity
} from '@/lib/mockData'

interface UseContributorReturn {
  contributor: Contributor | undefined
  weeklyProductivity: WeeklyProductivity[]
  dailyActivity: DayActivity[]
  topCollaborators: Contributor[]
  isLoading: boolean
  error: Error | null
}

/**
 * Custom hook to fetch contributor data with productivity metrics
 * Currently uses mock data, but designed to easily swap to API calls
 */
export function useContributor(id: number): UseContributorReturn {
  const contributor = useMemo(() => getMockContributorById(id), [id])

  const weeklyProductivity = useMemo(
    () => getWeeklyProductivity(id),
    [id]
  )

  const dailyActivity = useMemo(
    () => getDailyActivity(id),
    [id]
  )

  const topCollaborators = useMemo(
    () => getTopCollaborators(id, 5),
    [id]
  )

  return {
    contributor,
    weeklyProductivity,
    dailyActivity,
    topCollaborators,
    isLoading: false, // Will be true when using real API
    error: null
  }
}
