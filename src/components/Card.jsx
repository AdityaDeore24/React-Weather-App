import React from "react";
import "../App.css";

function Card({ weatherData }) {
  return (
    <div className="relative rounded-2xl bg-gradient-to-br from-indigo-500 via-sky-500 to-cyan-400 p-[1px] shadow-2xl shadow-cyan-900/30 animate-floatIn card-with-shimmer w-full max-w-sm sm:max-w-md md:max-w-lg">
      <div className="w-full">
        <div className="rounded-2xl bg-slate-900/70 backdrop-blur-xl p-4 sm:p-6 md:p-8">
          {/* City Name */}
          <div className="mb-4 sm:mb-6 md:mb-7">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white tracking-tight after-shimmer">
                {weatherData?.location?.name}
                <span className="font-medium text-slate-200">
                  , {weatherData?.location?.country}
                </span>
              </h1>

              <div className="text-left sm:text-right">
                <p className="text-xs uppercase tracking-widest text-slate-300">
                  Local Time
                </p>
                <p className="text-sm sm:text-base md:text-lg font-medium text-white">
                  {weatherData?.location?.localtime}
                </p>
              </div>
            </div>
          </div>

          {/* Temperature & Weather */}
          <div className="mb-4 sm:mb-6 md:mb-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="col-span-2 flex flex-col sm:flex-row items-stretch gap-4">
              <div className="rounded-xl bg-white/5 border border-white/10 p-4 flex-1">
                <p className="text-xs uppercase tracking-widest text-slate-300">
                  Temperature
                </p>
                <p className="mt-1 text-3xl sm:text-4xl md:text-5xl font-semibold text-white leading-none">
                  {weatherData?.current?.temp_c}
                  <span className="align-top text-base sm:text-lg font-normal">
                    °C
                  </span>
                </p>
              </div>
              <div className="rounded-xl bg-white/5 border border-white/10 p-4 text-center">
                <p className="text-xs uppercase tracking-widest text-slate-300">
                  Weather
                </p>
                <p className="mt-1 text-base sm:text-lg font-semibold text-white">
                  {weatherData?.current?.condition?.text}
                </p>
              </div>
            </div>
            <div className="col-span-1 flex items-center justify-center">
              <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-full bg-gradient-to-br from-white/20 to-white/5 border border-white/10 shadow-lg backdrop-blur-sm flex items-center justify-center">
                <div className="relative">
                  <div className="h-6 w-6 sm:h-8 sm:w-8 rounded-full bg-yellow-300/90 shadow-md"></div>
                  <div className="absolute -right-2 sm:-right-3 top-2 sm:top-3 h-6 w-10 sm:h-8 sm:w-12 rounded-full bg-white/90 shadow"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="rounded-xl bg-white/5 border border-white/10 p-3 sm:p-4">
              <p className="text-xs uppercase tracking-widest text-slate-300">
                Pressure
              </p>
              <p className="mt-1 text-lg sm:text-xl font-semibold text-white">
                {weatherData?.current?.pressure_mb} hPa
              </p>
            </div>
            <div className="rounded-xl bg-white/5 border border-white/10 p-3 sm:p-4">
              <p className="text-xs uppercase tracking-widest text-slate-300">
                Humidity
              </p>
              <p className="mt-1 text-lg sm:text-xl font-semibold text-white">
                {weatherData?.current?.humidity}%
              </p>
            </div>
            <div className="rounded-xl bg-white/5 border border-white/10 p-3 sm:p-4">
              <p className="text-xs uppercase tracking-widest text-slate-300">
                Wind
              </p>
              <p className="mt-1 text-lg sm:text-xl font-semibold text-white">
                {weatherData?.current?.wind_kph} km/h
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 flex items-center justify-start text-slate-300/90 text-xs">
            <span className="px-2 py-1 rounded-md bg-white/5 border border-white/10">
              Updated: just now
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
