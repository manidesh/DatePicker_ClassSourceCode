import logo from './logo.svg';
import './App.css';
import MyNewDate from './component/MyNewDate'

const bankHolidayDates = [
      new Date(2021,0,15),new Date(2021,0,5),
      new Date(2021,0,25),new Date(2021,0,20)
]

function App() {
  return (
    <div className="App">
     <MyNewDate noOfAllowedDays={45} bankHolidayDates={bankHolidayDates}/> 
    </div>
  );
}

export default App;
