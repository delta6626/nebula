/* eslint-disable no-undef */
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <Outlet />
      {/* This indicator shows which tailwind width breakpoint is currently active in development only. Useful when debugging responsiveness. */}
      {process.env.NODE_ENV === "development" && (
        <div class="fixed bottom-1 left-1 z-50 flex h-6 w-6 items-center justify-center rounded-full bg-gray-800 p-3 font-mono text-xs text-white">
          <div class="block sm:hidden">xs</div>
          <div class="hidden sm:block md:hidden">sm</div>
          <div class="hidden md:block lg:hidden">md</div>
          <div class="hidden lg:block xl:hidden">lg</div>
          <div class="hidden xl:block 2xl:hidden">xl</div>
          <div class="hidden 2xl:block">2xl</div>
        </div>
      )}
    </>
  );
}
