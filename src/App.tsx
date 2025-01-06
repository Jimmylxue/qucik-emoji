import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Base } from './pages/base'
import { EmojiSearchContextProvider } from './pages/base/core/core'

function App() {
	return (
		<Router>
			<Routes>
				<Route
					path="/base"
					element={
						<EmojiSearchContextProvider>
							<Base />
						</EmojiSearchContextProvider>
					}
				/>
				<Route path="*" element={<Navigate to="/base" replace />} />
			</Routes>
		</Router>
	)
}

export default App
