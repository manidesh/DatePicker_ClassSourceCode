import React , {Component} from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import  { formatDate, parseDate,} from 'react-day-picker/moment';

const currentYear = new Date().getFullYear();
const fromMonth = new Date(currentYear, 0);
const toMonth = new Date(currentYear + 10, 11);

const {PropTypes} = React;


function YearMonthForm({ date, localeUtils, onChange }) {
    const months = localeUtils.getMonths();
const years = [];
  for (let i = fromMonth.getFullYear(); i <= toMonth.getFullYear(); i += 1) {
    years.push(i);
  }
const handleChange = function handleChange(e) {
    const { year, month } = e.target.form;
    onChange(new Date(year.value, month.value));
  };

  return (
    <form className="DayPicker-Caption">
      <select name="month" onChange={handleChange} value={date.getMonth()}>
        {months.map((month, i) => (
          <option key={month} value={i}>
            {month}
          </option>
        ))}
      </select>
      <select name="year" onChange={handleChange} value={date.getFullYear()}>
        {years.map(year => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </form>
  );
}


class MyNewDate extends Component{
    constructor(props){
        super(props);
        this.state= {
            selectedDate :  undefined, //handles selected date
            maximumDate : undefined, //handles maximum range date
            month: fromMonth
        }
        this.handleYearMonthChange = this.handleYearMonthChange.bind(this);
        this.handleDayClick = this.handleDayClick.bind(this); //Binding the click event to select the specific date
    }
    //Adding the number of days to today's date (disable if the date is beyond range)
    addDate(date,days){
        const copy = new Date(Number(date));
        copy.setDate(date.getDate() + days);
        return copy;
    } 
    componentDidMount(){
        this.setState({maximumDate : this.addDate(new Date(),this.props.noOfAllowedDays)})
    }
    //implementation of handle click event 
    handleDayClick(day){
        this.setState({selectedDate : day});
    }
    handleYearMonthChange(month) {
        this.setState({ month });
    }
    
    render(){
        
        var disableDay=[]; //initializing the empty array to store the dates which are going to be disable
        this.props.bankHolidayDates.map((bankingHolidayDate)=>{
             disableDay.push(bankingHolidayDate); //adding the dates to the array
            });
          disableDay.push({ daysOfWeek : [0, 6]}, //weekend disable 
                         {after: this.state.maximumDate, //out of range dates are disable here
                         before: new Date()}
                         );
                         var date1 = new Date();
                         var date2 = new Date(date1.getFullYear()+1,1,1);
                         console.log(date2.getFullYear());
                
        return(
            <div>
                <div><DayPickerInput 
                dayPickerProps={{
                    disabledDays:disableDay,
                    fromMonth:new Date(),
                    toMonth:new Date((new Date().getFullYear()+1),new Date().getMonth(),new Date().getDay()-1),

                    captionElement:({ date, localeUtils }) => (
                        <YearMonthForm
                          date={date}
                          localeUtils={localeUtils}
                          onChange={this.handleYearMonthChange}
                        />
                      )


                }}  onDayClick={this.handleDayClick}
                formatDate={formatDate}
                parseDate={parseDate}
                placeholder={`${formatDate(new Date())}`}
                
                /></div>
                <div>{this.selectedDate}</div>
            </div>
        )
    }
}
export default MyNewDate;
