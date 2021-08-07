import React, { useEffect, useState } from "react";
import Button from "../common/Button";
function OrderTimer(props) {
  // constructor(props) {
  //   super(props);
  //   state = {
  //     currentDate: props.listDate[0],
  //     open: false,
  //     timeStart: null,
  //     timeClose: null,
  //     listTimer: [],
  //   };
  // }
  const [currentDate, setCurrentDate] = useState(props.listDate[0]);
  const [open, setOpen] = useState(false);
  const [timeStart, setTimeStart] = useState(null);
  const [timeClose, setTimeClose] = useState(null);
  const [listTimer, setListTimer] = useState([]);
  function getOptionDate(e) {
    setDefaultTime();
    setCurrentDate(e.target.value);
    if (e.target.value === props.today)
      showListTimer(e.target.value, 0, timeClose);
    else showListTimer(e.target.value, timeStart, timeClose);
  }
  function setDefaultTime() {
    let t_Start = new Date();
    t_Start.setHours(7);
    t_Start.setMinutes(30);
    let t_Close = new Date();
    t_Close.setHours(20);
    t_Close.setMinutes(31);
    setTimeStart(t_Start);
    setTimeClose(t_Close);
  }
  function openTimer() {
    setOpen(true);
    if (props.today === currentDate)
      showListTimer(props.listDate[0], 0, timeClose);
    else showListTimer(props.listDate[0], timeStart, timeClose);
  }
  function showListTimer(today, t_Start, t_Close) {
    let tmpArray = [];
    let nextTime = new Date();

    if (t_Start !== 0) nextTime = t_Start;
    if (today === props.today) {
      let midpointTime = new Date();
      midpointTime.setHours(midpointTime.getHours() + 3);
      midpointTime.setMinutes(0);
      for (
        nextTime.setMinutes(
          nextTime.getMinutes() < 15
            ? nextTime.getMinutes() - nextTime.getMinutes() + 45
            : nextTime.getMinutes() < 30
            ? nextTime.getMinutes() - nextTime.getMinutes() + 60
            : nextTime.getMinutes() - nextTime.getMinutes() + 90
        );
        nextTime <= midpointTime;
        nextTime.setMinutes(nextTime.getMinutes() + 15)
      ) {
        tmpArray.push(
          nextTime.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })
        );
      }
    }
    for (
      nextTime.setMinutes(30);
      nextTime <= t_Close;
      nextTime.setMinutes(nextTime.getMinutes() + 30)
    ) {
      tmpArray.push(
        nextTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    }
    setListTimer(tmpArray);
  }
  function timer() {
    let a = document.getElementById("select_time_order").value;
    a === "NOW"
      ? props.changeTextTimer("GIAO NGAY")
      : props.changeTextTimer(`${currentDate}  ${a}`);
  }
  useEffect(() => {
    setDefaultTime();
  }, []);

  return (
    <div className="order_time">
      <div className="padding_timer flex_timer">
        <div className="flex_timer">
          <span className="spacing_right">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                fill="none"
                stroke="#000"
                strokeWidth="1.1"
                cx="10"
                cy="10"
                r="9"
              ></circle>
              <rect x="9" y="4" width="1" height="7"></rect>
              <path
                fill="none"
                stroke="#000"
                strokeWidth="1.1"
                d="M13.018,14.197 L9.445,10.625"
              ></path>
            </svg>
          </span>
          <span>GIAO NGAY</span>
        </div>
        <span className="icon_check">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polyline
              fill="none"
              stroke="#000"
              strokeWidth="1.1"
              points="4,10 8,15 17,4"
            ></polyline>
          </svg>
        </span>
      </div>
      <div className="padding_timer flex_timer" onClick={openTimer}>
        <div className="flex_timer">
          <span className="spacing_right">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M 2,3 2,17 18,17 18,3 2,3 Z M 17,16 3,16 3,8 17,8 17,16 Z M 17,7 3,7 3,4 17,4 17,7 Z"></path>
              <rect width="1" height="3" x="6" y="2"></rect>
              <rect width="1" height="3" x="13" y="2"></rect>
            </svg>
          </span>
          <span>Thời gian đặt hàng</span>
        </div>
      </div>
      {open ? (
        <div className="padding_timer">
          <div className="option_time">
            <label>Ngày đặt</label>
            <select
              id="select_date_order"
              className="list-date"
              onChange={getOptionDate}
            >
              {props.listDate.map((date, index) => (
                <option key={index} value={date}>
                  {props.today === date ? "Hôm nay" : "Ngày " + date}
                </option>
              ))}
            </select>
          </div>
          <div className="option_time">
            <label>Thời gian đặt</label>
            <select id="select_time_order" className="list-time">
              {currentDate === props.today ? (
                <>
                  <option value="NOW">Trong 15-30 phút</option>
                  {listTimer.map((time, index) => (
                    <option value={time} key={index}>
                      {time}
                    </option>
                  ))}
                </>
              ) : (
                <>
                  {listTimer.map((time, index) => (
                    <option value={time} key={index}>
                      {time}
                    </option>
                  ))}
                </>
              )}
            </select>
          </div>
          <Button
            className="seecart btn_timer"
            Text="Hẹn giờ"
            onClick={timer}
          />
        </div>
      ) : null}
    </div>
  );
}
export default OrderTimer;
