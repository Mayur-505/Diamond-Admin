import { Outlet } from "react-router";
import { useLocation } from "react-router-dom";
const AuthLayout = () => {
  const location = useLocation();
  const path = location.pathname;
  let title;
  switch (path) {
    case "/auth/forgot-password":
      title = (
        <>
          Reset your <br /> Password
        </>
      );
      break;
    case "/auth/new-password":
      title = (
        <>
          Change your <br /> Password
        </>
      );
      break;
    case "/auth/login":
      title = (
        <>
          Access to your <br /> Diamond <br /> Account
        </>
      );
      break;
    case "/auth/verification":
      title = (
        <>
          Verify your <br /> Diamond <br /> Account
        </>
      );
      break;
  }

  return (
    <>
      <main className="flex h-[100vh]">
        <div className="h-full lg:w-[33.33%] w-full p-[42px] flex justify-between flex-col text-center">
          <Outlet />
        </div>
        <div className="bg-[url('@/assets/Image/bg-login.jpg')] bg-cover w-[66.66%] h-full p-[42px] lg:flex justify-between items-center flex-col hidden bg-no-repeat">
          <div className="mt-auto mb-auto">
            <span className="block text-[#fff] font-semibold text-[56px] font-Nunito">
              {title}
            </span>
            <span className="block text-[#fff] font-normal text-[24.5px] font-Nunito mt-[21px]">
              Lorem ipsum dolor sit amet, consectetur <br />
              adipiscing elit. Donec posuere velit nec enim <br />
              sodales, nec placerat erat tincidunt.
            </span>
          </div>
          <div className="flex items-center gap-[28px]">
            <span className="text-[#fff] font-semibold text-[14px] font-Nunito">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </span>
            <i className="ri-github-fill text-[24px]"></i>
            <i className="ri-twitter-fill text-[24px]"></i>
          </div>
        </div>
      </main>
    </>
  );
};

export default AuthLayout;
