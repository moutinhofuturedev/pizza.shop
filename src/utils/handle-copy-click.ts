import { toast } from 'sonner'

export const handleCopyClick = (orderId: string) => {
	navigator.clipboard.writeText(orderId).then(() => {
		toast.success('Id copiado para a área de transferência')
	})
}
