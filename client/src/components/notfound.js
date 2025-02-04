import "../css/index.css";
import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div className="notfound-page">
      <span className="notfound-text">
        스터티 메모의 올바르지 않은 페이지 입니다
      </span>
      <Link to="/">스터디 메모로 이동하기</Link>
    </div>
  );
};
