import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Login from "../Login/Login";
import { actionCreators as userActions } from "../../redux/modules/user";
import { history } from "../../redux/configureStore";
import NicknameModal from "../NicknameModal/NicknameModal";
import Swal from "sweetalert2";
import '../../shared/alert.css';
import { alert, alertNew } from "../../shared/alert";
import ReactGA from "react-ga";
import { 
  HeaderWrapper,
  HeaderInner,
  TyingLogo,
  HeaderNav,
  HeaderNavLoginMenu,
  HeaderNavScriptMenu,
  HeaderNavIcon,
  ModalBg,
 } from './style';

const Header = (props) => {
  const dispatch = useDispatch();

  const is_login = useSelector((state) => state.user.is_login);

  const [login_modal, setLoginModal] = React.useState(false);
  const [fade_out, setFadeOut] = React.useState(false);

  const modal_on = useSelector((state) => state.user.login_modal);
  const nickname_modal_on = useSelector((state) => state.user.nickname_modal);

  const logout = () => {
    dispatch(userActions.outUser());
    history.replace("/");
  };

  const openModal = () => {
    setFadeOut(false);
    setLoginModal(true);
  };

  const closeModal = () => {
    setFadeOut(true);
    setTimeout(() => {
      setLoginModal(false);
    }, 400);
  };

  return (
    <>
      <HeaderWrapper>
        <HeaderInner>
          <TyingLogo>
            <a href="/">
              <svg width="113" height="42" viewBox="0 0 113 42" fill="none">
                <path
                  d="M6.2327 10.5598H0.512695V4.47985H21.2727V10.5598H15.5527V31.9998H6.2327V10.5598Z"
                  fill="black"
                />
                <path
                  d="M32.4864 41.1598C31.0198 41.1598 29.6198 41.0132 28.2864 40.7198L28.9264 34.7998C29.9664 34.9598 30.9264 35.0398 31.8064 35.0398C33.3798 35.0398 34.5798 34.5598 35.4064 33.5998C36.2331 32.6665 36.6598 30.8932 36.6864 28.2798C35.2998 30.9465 33.0731 32.2798 30.0064 32.2798C27.4198 32.2798 25.3931 31.3732 23.9264 29.5598C22.4864 27.7198 21.7664 25.1865 21.7664 21.9598V11.9598H30.1664V23.1998C30.1664 24.1065 30.4198 24.8665 30.9264 25.4798C31.4331 26.0665 32.1264 26.3598 33.0064 26.3598C33.9131 26.3598 34.6464 25.9732 35.2064 25.1998C35.7931 24.4265 36.0864 23.4132 36.0864 22.1598V11.9598H44.5264V26.9198C44.5264 31.5598 43.4864 35.0932 41.4064 37.5198C39.3264 39.9465 36.3531 41.1598 32.4864 41.1598Z"
                  fill="black"
                />
                <path
                  d="M55.0052 32.3198C52.7652 32.3198 51.0185 31.5998 49.7652 30.1598C48.5119 28.7198 47.8852 26.7598 47.8852 24.2798V11.9598H56.3652V23.9198C56.3652 24.5332 56.5252 25.0132 56.8452 25.3598C57.1919 25.6798 57.6319 25.8398 58.1652 25.8398C58.6985 25.8398 59.2452 25.6798 59.8052 25.3598L60.2452 30.9198C59.6585 31.3732 58.8852 31.7198 57.9252 31.9598C56.9919 32.1998 56.0185 32.3198 55.0052 32.3198ZM52.1252 8.95984C50.8719 8.95984 49.8052 8.57318 48.9252 7.79984C48.0719 6.99984 47.6452 6.02651 47.6452 4.87984C47.6452 3.73318 48.0985 2.77318 49.0052 1.99984C49.9119 1.22651 50.9519 0.839844 52.1252 0.839844C53.3519 0.839844 54.4052 1.23984 55.2852 2.03984C56.1919 2.83984 56.6452 3.78651 56.6452 4.87984C56.6452 6.05318 56.1919 7.02651 55.2852 7.79984C54.3785 8.57318 53.3252 8.95984 52.1252 8.95984Z"
                  fill="black"
                />
                <path
                  d="M61.9746 12.2398H70.0146V16.3198C71.5612 13.2265 74.0146 11.6798 77.3746 11.6798C79.9346 11.6798 81.9346 12.5998 83.3746 14.4398C84.8412 16.2532 85.5746 18.7732 85.5746 21.9998V31.9998H77.1746V21.1598C77.1746 20.0132 76.9212 19.1332 76.4146 18.5198C75.9346 17.9065 75.2546 17.5998 74.3746 17.5998C73.7346 17.5998 73.1079 17.8132 72.4946 18.2398C71.8812 18.6398 71.3746 19.2265 70.9746 19.9998C70.6012 20.7732 70.4146 21.6532 70.4146 22.6398V31.9998H61.9746V12.2398Z"
                  fill="black"
                />
                <path
                  d="M100.156 41.1598C98.6888 41.1598 97.2888 41.0132 95.9555 40.7198L96.5955 34.7998C97.6355 34.9598 98.5955 35.0398 99.4755 35.0398C101.129 35.0398 102.382 34.5465 103.236 33.5598C104.089 32.5998 104.596 30.9732 104.756 28.6798C103.182 30.8932 100.782 31.9998 97.5555 31.9998C95.7955 31.9998 94.1688 31.5465 92.6755 30.6398C91.2088 29.7332 90.0355 28.5065 89.1555 26.9598C88.3022 25.4132 87.8755 23.7198 87.8755 21.8798C87.8755 20.0132 88.3022 18.3065 89.1555 16.7598C90.0088 15.1865 91.1688 13.9465 92.6355 13.0398C94.1288 12.1332 95.7555 11.6798 97.5155 11.6798C99.1422 11.6798 100.556 12.1065 101.756 12.9598C102.982 13.7865 103.782 14.9065 104.156 16.3198V11.6798H112.596V26.9198C112.596 31.5865 111.529 35.1198 109.396 37.5198C107.289 39.9465 104.209 41.1598 100.156 41.1598ZM100.156 25.9998C101.222 25.9998 102.142 25.6265 102.916 24.8798C103.689 24.1065 104.102 23.1998 104.156 22.1598V21.8398C104.102 20.8265 103.676 19.9332 102.876 19.1598C102.102 18.3865 101.196 17.9998 100.156 17.9998C99.0622 17.9998 98.1288 18.3998 97.3555 19.1998C96.5822 19.9732 96.1955 20.9065 96.1955 21.9998C96.1955 23.0932 96.5822 24.0398 97.3555 24.8398C98.1288 25.6132 99.0622 25.9998 100.156 25.9998Z"
                  fill="black"
                />
                <circle cx="52" cy="5" r="5" fill="#FF2E00" />
              </svg>
            </a>
          </TyingLogo>

          <HeaderNav>
            <HeaderNavLoginMenu>
              {!is_login ? (
                <span
                  onClick={() => {
                    dispatch(userActions.setLoginModal(true));
                  }}
                >
                  로그인
                </span>
              ) : (
                <span onClick={()=>{history.push('/mypage')}}>마이페이지</span>
              )}
            </HeaderNavLoginMenu>

            <HeaderNavScriptMenu>
              <span
                onClick={() => {
                  if (!is_login) {
                    alertNew('로그인 후에 이용할 수 있습니다.', ()=>{dispatch(userActions.setLoginModal(true))});     
                  } else {
                    history.push("/filtering");
                  }
                  ReactGA.event({
                    category: "Button",
                    action: "Script Filtering",
                    label: "Script Filtering",
                  });
                }}
              >
                스크립트 선택
              </span>
            </HeaderNavScriptMenu>

            <HeaderNavIcon
              onClick={() => {
                if (!is_login) {
                  alertNew('로그인 후에 이용할 수 있습니다.', ()=>{dispatch(userActions.setLoginModal(true))});
                } else {
                  history.push("/search");
                }
                ReactGA.event({
                  category: "Button",
                  action: "Script Search",
                  label: "Search",
                });
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12.5 11H11.71L11.43 10.73C12.41 9.59 13 8.11 13 6.5C13 2.91 10.09 0 6.5 0C2.91 0 0 2.91 0 6.5C0 10.09 2.91 13 6.5 13C8.11 13 9.59 12.41 10.73 11.43L11 11.71V12.5L16 17.49L17.49 16L12.5 11ZM6.5 11C4.01 11 2 8.99 2 6.5C2 4.01 4.01 2 6.5 2C8.99 2 11 4.01 11 6.5C11 8.99 8.99 11 6.5 11Z"
                  fill="black"
                />
              </svg>
            </HeaderNavIcon>
          </HeaderNav>
        </HeaderInner>
      </HeaderWrapper>
      {modal_on && (
        <>
          <ModalBg
            onClick={() => {
              dispatch(userActions.setLoginModal(false));
            }}
            login_modal={login_modal}
            className={fade_out ? "fade_out" : ""}
          />
          <Login
            _class={fade_out ? "fade_out" : ""}
            close={closeModal}
            setLoginModal={setLoginModal}
          >
            <button onClick={closeModal} />
          </Login>
        </>
      )}

      {nickname_modal_on && ( //일반 닉네임 수정 모달
        <>
          <ModalBg
            onClick={() => {
              dispatch(userActions.setNicknameModal(false));
            }}
            login_modal={login_modal}
            className={fade_out ? "fade_out" : ""}
          />
          <NicknameModal />
        </>
      )}
    </>
  );
};

export default Header;
