export const handleNumericandDecimalInput = (event) => {
    const newValue = event.target.value.replace(/[^\d.]/g, '');
    const parts = newValue.split('.');
    if (parts.length > 1) {
        const lastPart = parts.pop();
        if (lastPart && lastPart.length > 2) {
            parts[parts.length - 1] = lastPart.slice(0, 2);
        }
    }
  }

export const handleNumericInput = (event) => {
  const newValue = event.target.value.replace(/[^0-9]/g, '');
  event.target.value = newValue;
};
export function formatIsoDate(isoString) {
    const date = new Date(isoString);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); 
    const day = String(date.getUTCDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export const convertDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const year = date.getUTCFullYear();
    return `${day}-${month}-${year}`;
  };

export const renderYesNo = (value) => {
    return value ? 'Yes' : 'No';
};
export const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

export const  convertToHourTime=(dateTime) => {
    const date = new Date(dateTime);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
  
    return `${hours}:${minutes}:${seconds}`;
  }
export const  convertToHour=(dateTime) => {
    const date = new Date(dateTime);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
  
    return `${hours}:${minutes}`;
  }

export const convertDecimalHours=(decimalHours) =>{
    const totalSeconds = Math.floor(decimalHours * 3600);
    const hours = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');
  
    return `${hours}:${minutes}:${seconds}`;
  }

  export const formatDateintoMonthDay = (dateString ) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = date.toLocaleString('default', { month: 'short' });
    return `${day} ${month}`;
  };

  export const  capitalizeAndConvert=(text)=> {
    let words = text.split('_');

    words = words?.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());

    return words.join(' ');
}


