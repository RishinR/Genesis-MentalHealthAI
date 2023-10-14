
import Router from './routes';
import { BrowserRouter } from 'react-router-dom';
import { DataProvider } from './DataContext';



function App() {
  return (
    
    <div className="App text-white overflow-hidden">
      <DataProvider>
        <BrowserRouter>
          <Router/>
        </BrowserRouter>
        </DataProvider>
    </div>
    
  )
}

export default App;
