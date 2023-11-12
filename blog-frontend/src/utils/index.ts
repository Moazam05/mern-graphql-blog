export function parseAndFormatTimestamp(timestampString: string | Date | any) {
  const timestamp = parseInt(timestampString, 10);

  if (isNaN(timestamp)) {
    console.error("Invalid timestamp string");
    return null;
  }

  const dateObject = new Date(timestamp);

  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    // timeZoneName: "short",
  };

  const formattedDateString = dateObject.toLocaleString("en-US", options);
  return formattedDateString;
}

// prevent auto form submission
export function onKeyDown(keyEvent: any) {
  if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
    keyEvent.preventDefault();
  }
}
