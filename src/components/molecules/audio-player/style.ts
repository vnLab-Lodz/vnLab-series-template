import styled from "styled-components"
import atoms from "~components/atoms"
import { devices } from "~styles/breakpoints"
import { GridConstraint, GridContainer } from "~styles/grid"

export const Audio = styled.div`
  max-width: -moz-available;
  grid-column: 2 / 32;

  @media ${devices.tablet} {
    grid-column: 7 / 30;
  }

  @media ${devices.laptop} {
    grid-column: 9 / 25;
  }

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  margin-top: ${({ theme }) => theme.spacing.lg};
`

export const Button = styled.button`
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  height: 60px;
  width: 60px;
  border-radius: 100%;
  border: none;
  background-color: ${({ theme }) => theme.palette.accent};
  cursor: pointer;

  & #play,
  & #pause {
    display: none;
  }

  &:hover {
    & #play,
    & #pause {
      display: block;
    }

    & #idle {
      display: none;
    }
  }
`

export const IconContainer = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1 / 1;
`

export const Title = styled(atoms.h3)`
  font-family: ${({ theme }) => theme.typography.fonts.primary};
  margin-top: 0 !important;
  margin-bottom: calc(${({ theme }) => theme.spacing.xxs} / 2.5) !important;
  font-weight: 700;
  margin-bottom: 0;
  font-size: calc(${({ theme }) => theme.typography.md} * 0.9);
`

export const Description = styled(atoms.p)`
  font-family: ${({ theme }) => theme.typography.fonts.primary};
  margin-top: 0 !important;
  margin-bottom: ${({ theme }) => theme.spacing.xxs} !important;
  font-size: calc(${({ theme }) => theme.typography.md} * 0.75);
`

export const Time = styled(atoms.p)`
  margin-top: 0 !important;
  font-family: ${({ theme }) => theme.typography.fonts.primary};
  font-size: ${({ theme }) => theme.typography.sm};
`

/// --- global audio player --- ///

export const GlobalAudioPlayerFixed = styled(GridContainer)`
  position: fixed;
  bottom: ${({ theme }) => theme.spacing.md};
  left: 0;
  right: 0;
  margin: auto;
  z-index: 10;
  padding-top: ${({ theme }) => theme.spacing.xs};
`

export const GlobalAudioPlayerContainer = styled(GridConstraint)`
  position: relative;
  background: ${({ theme }) => theme.palette.accent};
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.palette.black};
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-block: calc(${({ theme }) => theme.spacing.xxs} / 2);
  padding-inline: ${({ theme }) => theme.spacing.xxs};

  & > * + * {
    margin-left: ${({ theme }) => theme.spacing.xs};
  }
`

export const ProgressTrack = styled.div`
  pointer-events: none;
  position: absolute;
  top: 0;
  left: ${({ theme }) => theme.spacing.xxs};
  right: ${({ theme }) => theme.spacing.xxs};
  transform: translateY(-50%);
  margin: 0;
  width: calc(
    var(--range-progress) * (100% - ${({ theme }) => theme.spacing.xxs} * 2)
  );
  background-color: ${({ theme }) => theme.palette.black};
  height: 3px;

  --range-progress: 0;
`

export const ProgressBar = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  transform: translateY(-50%);
  margin: 0;
  padding-inline: ${({ theme }) => theme.spacing.xxs};

  /* Input range - chrome and safari */
  &[type="range"] {
    --range-progress: 0;
  }

  /*Range Reset*/
  &[type="range"] {
    -webkit-appearance: none;
    appearance: none;
    background: transparent;
    cursor: pointer;
  }

  /* Removes default focus */
  &[type="range"]:focus {
    outline: none;
  }

  /***** Chrome, Safari, Opera and Edge Chromium styles *****/
  /* slider track */
  &[type="range"]::-webkit-slider-runnable-track {
    opacity: 0;
    background-color: ${({ theme }) => theme.palette.black};
    height: 3px;
  }

  /* slider thumb */
  &[type="range"]::-webkit-slider-thumb {
    opacity: 0;
    -webkit-appearance: none; /* Override default look */
    appearance: none;
    margin-top: -12px; /* Centers thumb on the track */

    /*custom styles*/
    height: 0.45rem;
    width: 0.45rem;
  }

  &[type="range"]:focus::-webkit-slider-thumb {
    outline: none;
    outline-offset: 0.125rem;
  }

  /******** Firefox styles ********/
  /* slider track */
  &[type="range"]::-moz-range-track {
    opacity: 0;
    background-color: ${({ theme }) => theme.palette.black};
    height: 3px;
  }

  /* slider thumb */
  &[type="range"]::-moz-range-thumb {
    opacity: 0;
    border: none; /*Removes extra border that FF applies*/
    border-radius: 100%; /*Removes default border-radius that FF applies*/

    /*custom styles*/
    background-color: ${({ theme }) => theme.palette.black};
    height: 0.45rem;
    width: 0.45rem;
  }

  &[type="range"]:focus::-moz-range-thumb {
    // opacity: 0;
    border: thin solid #053a5f;
    // outline: thin solid #053a5f;
    outline: none;
    outline-offset: 0.125rem;
  }
`

export const PlayPauseButton = styled.button`
  border: none;
  background: none;
  outline: none;
  cursor: pointer;
  width: 10px;
  height: 100%;
`

export const TimeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const TimeElapsed = styled(atoms.p)`
  font-family: ${({ theme }) => theme.typography.fonts.primary};
  font-size: ${({ theme }) => theme.typography.sm};
`

export const TimeDuration = styled(atoms.p)`
  font-family: ${({ theme }) => theme.typography.fonts.primary};
  font-size: ${({ theme }) => theme.typography.sm};
  font-weight: 700;
  color: ${({ theme }) => theme.palette.black};
`

export const TrackTitle = styled(atoms.p)`
  font-family: ${({ theme }) => theme.typography.fonts.primary};
  font-size: ${({ theme }) => theme.typography.sm};
  font-weight: 700;
  text-align: right;
  margin-left: ${({ theme }) => theme.spacing.xxs};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${({ theme }) => theme.palette.black};
`

export const TrackArtist = styled(atoms.p)`
  font-family: ${({ theme }) => theme.typography.fonts.primary};
  font-size: ${({ theme }) => theme.typography.sm};
  color: ${({ theme }) => theme.palette.black};

  display: none;
  @media ${devices.tablet} {
    display: initial;
  }
`

export const TrackListExpandButton = styled.button`
  border: none;
  background: none;
  outline: none;
  cursor: pointer;
`
export const TrackContainer = styled(GridContainer)`
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: ${({ theme }) => theme.palette.light};
  min-height: 100px;
  border-top: 1px solid ${({ theme }) => theme.palette.black};
  z-index: 1;
`

export const TrackList = styled(GridConstraint)`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
  padding-bottom: calc(${({ theme }) => theme.spacing.xxl} * 1.25);
  padding-top: ${({ theme }) => theme.spacing.xs};
  padding-inline: ${({ theme }) => theme.spacing.xs};

  & > * + * {
    margin-top: ${({ theme }) => theme.spacing.xxs};
  }
`

export const TrackItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  grid-column: 2 / 32;

  @media ${devices.tablet} {
    grid-column: 7 / 30;
  }

  @media ${devices.laptop} {
    grid-column: 9 / 25;
  }

  & > * + * {
    margin-left: ${({ theme }) => theme.spacing.xxs};
  }
`

export const TrackItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;

  & ${TrackArtist} {
    display: initial !important;
  }
`

export const TrackPlayIconWrapper = styled.span`
  padding-top: 0.2em;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 10px;
  height: 100%;
  & * {
    color: ${({ theme }) => theme.palette.black};
  }
`
