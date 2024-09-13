import React, { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import { AppState } from "../store/rootReducer";
import { useNavigate } from "react-router-dom";
import paths from "../configs/pathsConfig";
import { useNotification } from "../hooks/notifications";
interface UserCheckerProps {
  children: ReactNode;
  forceLogin: boolean;
}
const UserChecker: React.FC<UserCheckerProps> = ({
  children: component,
  forceLogin,
}) => {
  const user = useSelector((state: AppState) => state.user);
  const { showNotification } = useNotification();
  const navigator = useNavigate();

  useEffect(() => {
    if (forceLogin && !user) {
      showNotification("You need to login first", "error");
      navigator(paths.login);
    } else if (!forceLogin && user) {
      navigator(paths.home);
    }
  }, [user, forceLogin, navigator, showNotification]);

  if (!(forceLogin && !user)) {
    return component;
  } else if (!(!forceLogin && user)) {
    return component;
  } else {
    return <></>;
  }
};

export default UserChecker;
