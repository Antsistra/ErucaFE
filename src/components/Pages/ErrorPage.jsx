import { Link } from "react-router-dom";
import { Button } from "../ui/button";

const ErrorPage = () => {
  return (
    <>
      <div className="flex flex-row justify-center items-center min-h-screen text-center">
        <section class="bg-white dark:bg-gray-900">
          <h1 class="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">
            404
          </h1>
          <p class="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
            Something's missing.
          </p>
          <p class="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
            Sorry, this page maybe on Construction or not
            available. Please try again later. Thankyou
            ganteng
          </p>
          <Link to="/">
            <Button> Back to Homepage</Button>
          </Link>
        </section>
      </div>
    </>
  );
};

export default ErrorPage;
