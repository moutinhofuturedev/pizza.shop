import React from 'react'
import ReactDOM from 'react-dom/client'

import { App } from './App.tsx'
import { enabledWorker } from './api/msw-mocks'

enabledWorker().then(() => {
	ReactDOM.createRoot(document.getElementById('root')!).render(
		<React.StrictMode>
			<App />
		</React.StrictMode>,
	)
})
