import Plans from "./pages/bundles"

function App() {

  console.log('Plans component:', Plans); // Log to check if import resolved

  return (
    <>
      <h1>Welcome to ISP Portal</h1>
      <Plans />
    </>
  )
}

export default App
