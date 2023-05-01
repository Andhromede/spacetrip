/********** CAPITALIZE THE FIRST LETTER  **********/
export function capitalize(word) {
   return word && word[0].toUpperCase() + word.slice(1);
}


/********** COMPARE IF A CALENDAR PERIODE IS FREE  **********/
export function checkBookingDate(startDateCalendar, endDateCalendar, selectedStartDate, selectedEndDate) {
  let result = false;

  if (
     (selectedStartDate.getFullYear() >= startDateCalendar.getFullYear() &&
        selectedStartDate.getMonth() >= startDateCalendar.getMonth() &&
        selectedStartDate.getDate() >= startDateCalendar.getDate())
     &&
     (selectedEndDate.getFullYear() <= endDateCalendar.getFullYear() &&
     selectedEndDate.getMonth() <= endDateCalendar.getMonth() &&
     selectedEndDate.getDate() <= endDateCalendar.getDate())
     ||
     (selectedStartDate.getFullYear() <= endDateCalendar.getFullYear() &&
     selectedStartDate.getMonth() <= endDateCalendar.getMonth() &&
     selectedStartDate.getDate() <= endDateCalendar.getDate())
     &&
     (selectedEndDate.getFullYear() >= startDateCalendar.getFullYear() &&
        selectedEndDate.getMonth() >= startDateCalendar.getMonth() &&
        selectedEndDate.getDate() >= startDateCalendar.getDate())
  ){
     return result = false;  
  } else {
     return result = true;
  }
}

export function dateDiff(date1, date2){
	var diff = {}							
	var tmp = date2 - date1;

	tmp = Math.floor(tmp/1000);           
	diff.sec = tmp % 60;				

	tmp = Math.floor((tmp-diff.sec)/60);	
	diff.min = tmp % 60;					

	tmp = Math.floor((tmp-diff.min)/60);	
	diff.hour = tmp % 24;					
	
	tmp = Math.floor((tmp-diff.hour)/24);	
	diff.day = tmp;
	
	// return diff.day+1;
	return diff.day;
}


export function toBeautifyStringFr(date) {
   return date.toLocaleDateString('fr-FR', {
      //  weekday: 'long',
       year: 'numeric',
       month: 'long',
       day: 'numeric',
   });
}