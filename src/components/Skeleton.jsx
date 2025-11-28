import React from "react";

function Skeleton() {
  return (
    <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto animate-pulse px-3 sm:px-0">
      <div className="relative rounded-2xl bg-gradient-to-br from-indigo-500 via-sky-500 to-cyan-400 p-[1px] shadow-2xl shadow-cyan-900/30">
        <div className="rounded-2xl bg-slate-900/70 backdrop-blur-xl p-5 sm:p-6 md:p-7">
          {/* City Name & Local Time */}
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="h-6 w-40 sm:w-32 bg-white/10 rounded"></div>
            <div className="text-right space-y-1">
              <div className="h-3 w-24 sm:w-20 bg-white/10 rounded"></div>
              <div className="h-4 w-40 sm:w-32 bg-white/10 rounded"></div>
            </div>
          </div>

          {/* Temperature + Weather */}
          <div className="mb-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2 flex flex-col sm:flex-row items-center gap-4">
              <div className="rounded-xl bg-white/5 border border-white/10 p-4 flex-1 w-full">
                <div className="h-3 w-28 sm:w-20 bg-white/10 rounded"></div>
                <div className="mt-2 h-10 w-28 sm:w-24 bg-white/10 rounded"></div>
              </div>
              <div className="rounded-xl bg-white/5 border border-white/10 p-4 w-full sm:w-28">
                <div className="h-3 w-28 sm:w-20 bg-white/10 rounded mx-auto"></div>
                <div className="mt-2 h-5 w-24 sm:w-20 bg-white/10 rounded mx-auto"></div>
              </div>
            </div>
            <div className="sm:col-span-1 flex items-center justify-center">
              <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-full bg-white/5 border border-white/10"></div>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-xl bg-white/5 border border-white/10 p-4"
              >
                <div className="h-3 w-24 sm:w-20 bg-white/10 rounded"></div>
                <div className="mt-2 h-5 w-20 sm:w-16 bg-white/10 rounded"></div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-6 flex items-center justify-start">
            <div className="h-4 w-32 sm:w-28 bg-white/10 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Skeleton;
