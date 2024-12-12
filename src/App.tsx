import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Base } from './pages/base'

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/base" element={<Base />} />
				<Route path="*" element={<Navigate to="/base" replace />} />
			</Routes>
		</Router>
	)
}

export default App
