import { Skeleton } from '@/components/ui/skeleton'

export const MetricsCardsSkeleton = () => {
	return (
		<>
			<Skeleton className='mt-1 h-7 w-36' />
			<Skeleton className='w-54 h-4' />
		</>
	)
}
