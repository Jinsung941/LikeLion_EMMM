import { useState } from "react";
import styles from "../CSS/Progress.module.css";
import completeImg from "../asset/icon-complete.png";
import roomImg from "../asset/icon-meetingroom.png";
import roomHostImg from "../asset/icon-meetinghost.png";
import { useNavigate } from "react-router-dom";

function Progress({ progressRoomList, onChange }) {
  const navigate = useNavigate();
  const [inAndOut, setInAndOut] = useState("MaindivIn");

  const [searchTerm, setSearchTerm] = useState("");

  function getRoomId(e) {
    localStorage.setItem("roomId", e.currentTarget.id);
    navigate("/meet");
  }

  function archiveOpen() {
    onChange(true);
  }

  return (
    <div>
      <div className={styles.process}>
        <div>진행중인 회의</div>
        <input
          placeholder="🔍︎ 검색"
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        ></input>
      </div>

      <div className={styles.rooms}>
        <div className={styles.archive} onClick={archiveOpen}>
          <img className={styles.completeImg} src={completeImg} alt="완료됨" />
          <div className={styles.complete}>완료됨</div>
        </div>
        {progressRoomList
          .filter((progressRoomList) => {
            if (searchTerm === "") {
              return progressRoomList;
            } else if (
              progressRoomList.roomName
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
            ) {
              return progressRoomList;
            }
          })
          .map((progressRoomList) => {
            if (progressRoomList.role === "host") {
              return (
                <div
                  id={progressRoomList.roomId}
                  key={progressRoomList.roomId}
                  className={styles.room}
                  onClick={(e) => getRoomId(e)}
                >
                  <img
                    className={styles.roomHostImg}
                    src={roomHostImg}
                    alt="호스트룸"
                  />

                  <div className={styles.roomName}>
                    {progressRoomList.roomName.length > 9
                      ? `${progressRoomList.roomName.slice(0, 9)}...`
                      : progressRoomList.roomName}
                  </div>
                </div>
              );
            }
          })}
        {progressRoomList
          .filter((progressRoomList) => {
            if (searchTerm === "") {
              return progressRoomList;
            } else if (
              progressRoomList.roomName
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
            ) {
              return progressRoomList;
            }
          })
          .map((progressRoomList) => {
            if (progressRoomList.role === "member") {
              return (
                <div
                  id={progressRoomList.roomId}
                  key={progressRoomList.roomId}
                  className={styles.room}
                  onClick={(e) => getRoomId(e)}
                >
                  <img className={styles.roomImg} src={roomImg} alt="멤버룸" />

                  <div className={styles.roomName}>
                    {progressRoomList.roomName.length > 9
                      ? `${progressRoomList.roomName.slice(0, 9)}...`
                      : progressRoomList.roomName}
                  </div>
                </div>
              );
            }
          })}
      </div>
    </div>
  );
}

export default Progress;
