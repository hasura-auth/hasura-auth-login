// import LoginMethods from '@/../../hasura-auth-client/dist/model/LoginMethods';
// import IFormInputs from '@/../../hasura-auth-client/dist/model/FormInputs';
// import useHasuraAuth from '@/lib/useHasuraAuth';
// import { LockClosedIcon } from '@heroicons/react/solid';
import { SubmitHandler, useForm } from 'react-hook-form';
import { URL } from 'url';

export default function Example() {
  // const { socialLogin, localLogin } = useHasuraAuth();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();

  const onSubmit: SubmitHandler<any> = async (data) => {
    console.log(data);
    await fetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(async (resp) => await resp.json())
      .then((jsonBody) => {
        const { redirectUri, accessToken } = jsonBody;

        const url = `${redirectUri}?access_token=${accessToken}`;
        window.location.assign(url);
      });
  };

  return (
    <div className="min-h-screen  flex items-center justify-center bg-gray-700">
      <div className="bg-gray-200 py-8 px-4 sm:px-6 lg:px-12 rounded-lg">
        <div className="max-w-md w-full space-y-12">
          <div className="text-center">
            <span className="self-center  text-gray-500"> Sign in with </span>
            <div className="flex justify-evenly">
              <button
                onClick={() => {
                  // socialLogin(LoginMethods.GITHUB);
                  window.location.assign('http://localhost:8000/auth/social/github');
                  // fetch('/auth/social/github', {
                  //   method: 'GET',
                  //   mode: 'cors',
                  //   redirect: 'follow'
                  // });
                }}
                className="mt-6 group relative w-1/3 flex justify-center py-2 px-4 border border-gray-300 text-sm  rounded-md text-black bg-white hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 "
              >
                <div className="flex items-center">
                  <i className="fa-2x fab fa-github" />
                  <p className="ml-1"> Github</p>
                </div>
              </button>

              <button
                onClick={() => {
                  // socialLogin(LoginMethods.GOOGLE);
                }}
                className="mt-6 group relative w-1/3 flex justify-center py-2 px-4 border border-gray-300 text-sm  rounded-md text-black bg-white hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 "
              >
                <div className="flex place-content-center items-center ">
                  {/* <img alt="..." src={require('assets/img/icons/google.svg')} /> */}
                  <p className="ml-1"> Google</p>
                </div>
              </button>
            </div>
          </div>

          <div className=" text-center text-gray-500">
            <p className="border-b-1 border-yellow-50 mb-4 -mt-4" />
            <span className="mt-6"> Or sign in with credentials </span>
          </div>

          <form
            className="space-y-6"
            // action="http://localhost:8000/auth/social/github"
            // method="GET"

            onSubmit={handleSubmit(onSubmit)}
            // onSubmit={(e) => {
            //   e.preventDefault();
            //   const form = new FormData(e.target);
            //   const formula = form.get('formula');
            //   console.log(formula);
            //   localLogin(new FormData());
            // }}
          >
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  type="email"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  defaultValue="admin@test.com"
                  {...register('email', { required: true })}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Password"
                  defaultValue="admin"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  {...register('password', { required: true })}
                />

                {/* <input
                  id="password"
                  name="password"
                  type="password"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                /> */}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  {/* <LockClosedIcon
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    aria-hidden="true"
                  /> */}
                </span>
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
