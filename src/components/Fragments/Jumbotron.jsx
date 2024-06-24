const Jumbotron = () => {
  return (
    <section
      id="main"
      className="bg-center bg-no-repeat bg-cover bg-gray-700 bg-blend-multiply bg-[url('https://d2jx2rerrg6sh3.cloudfront.net/images/Article_Images/ImageForArticle_23897_16987469872629420.jpg')]">
      <div className="backdrop-blur-sm px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-72">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
          <span className="text-[#124E66] dark:text-primaryOrange">
            ER
          </span>
          <span className="text-primaryBackground dark:text-secondaryGreen">
            U
          </span>
          <span className="text-[#748d92] dark:text-secondaryOrange">
            CA
          </span>
          <span className="text-[#748D92] dark:text-primaryOrange">
            {" VAPE"}
            <span className="text-[#D3D9D4] dark:text-secondaryGreen">
              STORE
            </span>
          </span>
        </h1>
        <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48 text-secondaryOrange dark:text-secondaryOrange">
          Your ultimate destination for premium vaping
          products. Founded with a passion for excellence
          and a commitment to quality, Eruca aims to elevate
          your vaping experience to new heights.
        </p>
        <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
          <a
            href="/login"
            className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-[#748d92] hover:bg-primaryGreen dark:bg-secondaryOrange dark:hover:bg-primaryOrange lg:animate-bounce focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
            Join Now!
          </a>
        </div>
      </div>
    </section>
  );
};

export default Jumbotron;
