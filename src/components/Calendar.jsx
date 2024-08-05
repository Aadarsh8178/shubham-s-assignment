import { useState } from "react";
import Header from "./Header";
import DateGrid from "./DateGrid";

function Calendar() {
  const d = new Date();
  const [month, setMonth] = useState(d.getMonth());
  const currentDate = new Date();
  const [year, setYear] = useState(d.getFullYear());

  const handleDateFocus = () => {

  }

  return <div className="w-lvw bg-white">
    <Header month={month} year={year} setMonth={setMonth} setYear={setYear} onFocusDate={handleDateFocus}/>
    <DateGrid month={month} year={year} />
  </div>;
}

export default Calendar;
