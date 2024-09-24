import { useQuery } from '@tanstack/react-query'
import { Building, ChevronDown } from 'lucide-react'

import { getProfile } from '@/api/get/get-profile'
import { getManagedRestaurant } from '@/api/get/orders/get-managed-restaurant'

import { AlertModal } from '../alert-modal'
import { StoreProfile } from '../store-profile'
import { Button } from '../ui/button'
import { Dialog, DialogTrigger } from '../ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { Skeleton } from '../ui/skeleton'

export const AccountMenu = () => {
  const { data: profile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
    // biome-ignore lint/style/useNumberNamespace: <explanation>
    staleTime: Infinity,
  })

  const { data: managedRestaurant, isLoading: isLoadingManagedRestaurant } =
    useQuery({
      queryKey: ['managed-restaurant'],
      queryFn: getManagedRestaurant,
      // biome-ignore lint/style/useNumberNamespace: <explanation>
      staleTime: Infinity,
    })

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="flex select-none items-center gap-2"
            data-testid="account-menu"
          >
            <span className="font-medium max-sm:hidden">
              {isLoadingManagedRestaurant ? (
                <Skeleton className="h-4 w-40" />
              ) : (
                managedRestaurant?.name
              )}
            </span>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="flex flex-col">
            {isLoadingProfile ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-3 w-40" />
              </div>
            ) : (
              <>
                <span>{profile?.name}</span>
                <span className="text-xs font-normal text-muted-foreground">
                  {profile?.email}
                </span>
              </>
            )}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DialogTrigger asChild>
            <DropdownMenuItem>
              <Building className="mr-2 h-4 w-4" />
              <span>Perfil da loja</span>
            </DropdownMenuItem>
          </DialogTrigger>
          <DropdownMenuItem
            className="text-rose-500 dark:text-rose-400"
            asChild
          >
            <AlertModal />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <StoreProfile />
    </Dialog>
  )
}
