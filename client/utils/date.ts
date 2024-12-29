export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
};

export function formatTime(secondsString: string): string {
  const totalSeconds = parseInt(secondsString, 10);

  if (isNaN(totalSeconds) || totalSeconds < 0) {
    throw new Error("Invalid input: Please provide a valid number of seconds.");
  }

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");

  return `${formattedMinutes}:${formattedSeconds}`;
}
