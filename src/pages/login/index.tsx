import { useEffect } from "react";
import { LoginForm } from "./components/LoginForm";
import style from "./login.module.scss";

export const Login = () => {
  useEffect(() => {
    document.title = "登录";
  });
  return (
    <div className="container">
      <div className={style.loginContainer}>
        <div className={style.title}></div>
        <div className={style.middleBlock}>
          <div className={style.leftBlock}></div>
          <div className={style.rightBlock}>
            <div className={style.formTitle}>用户登录</div>
            <div className={style.form}>
              <LoginForm></LoginForm>
            </div>
          </div>
        </div>
        <div className={style.copyright}>Copyright @ 2022 XXXX科技有限公司</div>
      </div>
    </div>
  );
};
