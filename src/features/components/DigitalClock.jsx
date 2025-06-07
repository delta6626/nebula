import { memo, useEffect, useState } from "react";
import { formatDateMonthDayYear } from "../../utils/formatDateMonthDayYear";
import { Clock10 } from "lucide-react";

const MemoizedClock = memo(Clock10);

function DigitalClock() {
  const [parts, setParts] = useState({
    hour: "00",
    minute: "00",
    second: "00",
  });
  const [date, setDate] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setDate(formatDateMonthDayYear(now));

      const timeString = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });

      const timePart = timeString.split(" ");
      const [hour, minute, second] = timePart[0].split(":");

      setParts({ hour, minute, second });
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-transparent border-1 border-accent mt-4 w-sm mx-auto h-[10rem] rounded-lg p-4">
      <h1 className="flex items-center gap-2 font-semibold text-secondary">
        <MemoizedClock />
        Now
      </h1>
      <div className="">
        <table className="text-3xl font-semibold w-full flex flex-col items-center justify-center mt-4">
          <tbody>
            <tr className="flex gap-2">
              <td className="w-[1.5ch] text-center">{parts.hour}</td>
              <td className="w-[1.5ch] text-center">:</td>
              <td className="w-[1.5ch] text-center">{parts.minute}</td>
              <td className="w-[1.5ch] text-center">:</td>
              <td className="w-[1.5ch] text-center">{parts.second}</td>
            </tr>
          </tbody>
        </table>
        <p className="font-semibold text-center mt-2 text-secondary">{date}</p>
      </div>
    </div>
  );
}

export default DigitalClock;
