export class Dates {

    static monthNamesES = [
        'Enero',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
        'Julio',
        'Agosto',
        'Septiembre',
        'Noviembre',
        'Diciembre'
    ]

    static getDates() {
        let currentMonth = new Date().getMonth();
        let lastMonth = currentMonth - 1;
        let secondLastMonth = currentMonth - 2;
        let currentMonthYear = new Date().getFullYear();
        let lastMonthYear = currentMonthYear;
        let secondLastMonthYear = currentMonthYear;
        if (currentMonth === 1) {
            secondLastMonth = 11;
            secondLastMonthYear = currentMonthYear - 1; // algo...
        }
        if (currentMonth === 0) {
            lastMonth = 11;
            secondLastMonth = 10;
            lastMonthYear = currentMonthYear - 1;
            secondLastMonthYear = currentMonthYear - 1;
        }
        return {
            firstDayCurrentMonth: this.getDay(currentMonth, currentMonthYear).firstDay,
            lastDayCurrentMonth: this.getDay(currentMonth, currentMonthYear).lastDay,
            firstDayLastMonth: this.getDay(lastMonth, lastMonthYear).firstDay,
            lastDayLastMonth: this.getDay(lastMonth, lastMonthYear).lastDay,
            firstDaySecondLastMonth: this.getDay(secondLastMonth, secondLastMonthYear).firstDay,
            lastDaySecondLastMonth: this.getDay(secondLastMonth, secondLastMonthYear).lastDay
        }
    }

    static getDay(month, year) {
        let day = new Date(year, month, 1);
        let days = [];
        while (day.getMonth() === month) {
            days.push(new Date(day));
            day.setDate(day.getDate() + 1);
        }
        return {
            firstDay: days[0],
            lastDay: days[days.length - 1]
        }
    }

    static getMonthNameES(day) {
        return this.monthNamesES[day.getMonth()] + ' ' + day.getFullYear();
    }
}