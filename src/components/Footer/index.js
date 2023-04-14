export default function Footer() {
  return (
    <div className="sticky rounded-2xl w-11/12 sm:w-[600px] h-40 sm:h-[80px] p-0.5 z-10 bottom-10 left-0 right-0 mx-auto">
      <div className="rounded-[14px] w-full h-full bg-gray-50 border border-gray-200 flex flex-col sm:flex-row items-center justify-center sm:justify-between space-y-3 sm:space-y-0 px-3">
        <p className="text-black text-[13px] font-mono w-[400px] h-10 flex items-center justify-center">
          Copyright © 2023 Snowfus. All rights reserved.
        </p>
        {/* <a
          className="text-white text-[13px] font-mono bg-blue-700 hover:bg-blue-900 transition-all rounded-md w-[140px] h-10 flex items-center justify-center whitespace-nowrap"
          href="https://vercel.com/templates/next.js/admin-dashboard-tailwind-planetscale-react-nextjs"
          target="_blank"
          rel="noreferrer"
        >
          Discord
        </a> */}
        <div className="tooltip text-white text-[13px] font-mono bg-blue-700 hover:bg-blue-900 transition-all rounded-md w-[140px] h-10 flex items-center justify-center whitespace-nowrap" data-tip="Shad0w59i#6966">
          <button>
            Notre Discord
          </button>
        </div>
      </div>
    </div>
  );
}
