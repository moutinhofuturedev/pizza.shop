import { waitFor } from '@testing-library/dom'
import { toast } from 'sonner'
import { handleCopyClick } from '../handle-copy-click'

describe('handleCopyClick', () => {
	// Mock `navigator.clipboard.writeText`
	beforeAll(() => {
		Object.defineProperty(navigator, 'clipboard', {
			value: {
				writeText: vi.fn().mockResolvedValue(undefined),
			},
			writable: true,
		})
	})

	// Mock `toast.success`
	vi.spyOn(toast, 'success')

	it('should copy the orderId to the clipboard and show a success toast', async () => {
		const orderId = '12345'

		handleCopyClick(orderId)

		// Verifica se a função `writeText` do clipboard foi chamada com o texto correto
		expect(navigator.clipboard.writeText).toHaveBeenCalledWith(orderId)

		// Verifica se a notificação de sucesso foi exibida
		waitFor(() => {
			expect(toast.success).toHaveBeenCalledWith(
				'Id copiado para a área de transferência',
			)
		})
	})
})
