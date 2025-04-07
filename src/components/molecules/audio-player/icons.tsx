import React from "react"

export const PlayIcon = () => {
  return (
    <svg
      id="play"
      width="9"
      height="11"
      viewBox="0 0 9 11"
      fill="none"
      color="#111111"
    >
      <path
        d="M9 5.26562L-4.89399e-07 10.4618L-3.51373e-08 0.0694724L9 5.26562Z"
        fill="currentColor"
      />
    </svg>
  )
}

export const IdleIcon = () => {
  return (
    <svg
      id="idle"
      width="29.25"
      height="28.77"
      viewBox="0 0 31 30"
      fill="none"
      color="#111111"
    >
      <path
        d="M13.4775 7.78577C16.8315 11.2555 17.3696 16.5464 14.7823 20.6098C14.4121 21.1934 13.9752 21.7329 13.4775 22.2143"
        stroke="currentColor"
      />
      <path
        d="M18.6543 4.20264C24.6158 10.1874 24.6158 19.8124 18.6543 25.7972"
        stroke="currentColor"
      />
      <path
        d="M23.8848 0.615601C31.8348 8.58597 31.8348 21.414 23.8848 29.3843"
        stroke="currentColor"
      />
      <path
        d="M7.99975 19.0173L0.597656 15.0001L7.99975 10.9829V19.0173Z"
        fill="currentColor"
      />
    </svg>
  )
}

export const PlayerPauseIcon = () => {
  return (
    <svg id="pause" width="10" height="10" viewBox="0 0 10 10" fill="none">
      <line x1="7.9375" x2="7.9375" y2="10" stroke="#111111" strokeWidth="3" />
      <line x1="1.9375" x2="1.9375" y2="10" stroke="#111111" strokeWidth="3" />
    </svg>
  )
}

export const PlayerPlayIcon = () => {
  return (
    <svg width="9" height="12" viewBox="0 0 9 12" fill="none" color="#111111">
      <path
        d="M9.00098 6L0.000976073 11.1962L0.000976527 0.803847L9.00098 6Z"
        fill="currentColor"
      />
    </svg>
  )
}

export const TrackListExpandIcon = ({ rotate }: { rotate: number }) => {
  return (
    <svg
      width="9"
      height="8"
      viewBox="0 0 9 8"
      fill="none"
      style={{ rotate: `${rotate}deg`, transition: "all 0.3s ease-in-out" }}
    >
      <path
        d="M8.182 7.382L7.155 7.967L4.204 2.793L1.253 7.967L0.225999 7.382L4.204 0.400999L8.182 7.382Z"
        fill="#111111"
      />
    </svg>
  )
}

export const TrackPlayingIcon = () => {
  return (
    <svg width="11" height="17" viewBox="0 0 11 17" fill="none" color="#111111">
      <path
        d="M0.958984 5.00415C2.70776 6.81327 2.98832 9.57192 1.6393 11.6906C1.44628 11.9949 1.21845 12.2762 0.958984 12.5272"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M3.6582 3.13586C6.76655 6.25633 6.76655 11.2748 3.6582 14.3953"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M6.38574 1.26562C10.5309 5.42137 10.5309 12.1099 6.38574 16.2656"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  )
}
