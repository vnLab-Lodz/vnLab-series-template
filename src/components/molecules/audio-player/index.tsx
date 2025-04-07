import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import * as Styled from "./style"
import { useAudioPlayer } from "./context"
import {
  IdleIcon,
  PlayerPauseIcon,
  PlayerPlayIcon,
  PlayIcon,
  TrackListExpandIcon,
  TrackPlayingIcon,
} from "./icons"
import { FileSystemNode } from "gatsby-source-filesystem"
import { flushSync } from "react-dom"
import { AnimatePresence, motion } from "framer-motion"
import { ThemeProvider } from "styled-components"
import lightTheme from "~styles/theme"

type AudioPlayerProps = {
  track: {
    title: string
    author?: string
    src: FileSystemNode
  }
}

export function AudioPlayer(props: AudioPlayerProps) {
  const player = useAudioPlayer()
  const [duration, setDuration] = useState<number>(0)

  const track = useMemo(() => {
    return {
      title: props.track.title,
      author: props.track.author,
      src: props.track.src.publicURL as string,
    }
  }, [props.track])

  return (
    <Styled.Audio className="mdx-audio">
      <audio
        onLoadedMetadata={e => {
          setDuration(e.currentTarget.duration)
        }}
        src={track.src}
        style={{ display: "none" }}
        hidden
      />
      <Styled.Button
        onClick={() => {
          if (player.currentTrack?.src === track.src) {
            player.setIsPlaying(prev => !prev)
          } else {
            flushSync(() => {
              player.setIsPlaying(false)
            })
            player.setShouldPlayOnLoad(true)
            player.setCurrentTrack(track)
          }
        }}
      >
        <Styled.IconContainer>
          <IdleIcon />
          {player.isPlaying ? <PlayerPauseIcon /> : <PlayIcon />}
        </Styled.IconContainer>
      </Styled.Button>
      <Styled.Title>{props.track.title}</Styled.Title>
      {props.track.author && (
        <Styled.Description>{props.track.author}</Styled.Description>
      )}
      <Styled.Time suppressHydrationWarning>{formatTime(duration)}</Styled.Time>
    </Styled.Audio>
  )
}

export function GlobalAudioPlayer() {
  const player = useAudioPlayer()

  const audioRef = useRef<HTMLAudioElement>(null)
  const progressBarRef = useRef<HTMLInputElement>(null)
  const progressTrackRef = useRef<HTMLInputElement>(null)
  const playAnimationRef = useRef<number | null>(null)

  const [isExpanded, setIsExpanded] = useState(false)

  const [timeProgress, setTimeProgress] = useState<number>(0)
  const [duration, setDuration] = useState<number>(0)

  const handleProgressChange = () => {
    if (
      audioRef.current &&
      progressBarRef.current &&
      progressTrackRef.current
    ) {
      const newTime = Number(progressBarRef.current.value)
      player.setIsPlaying(false)

      audioRef.current.currentTime = newTime
      setTimeProgress(newTime)
      // if progress bar changes while audio is on pause
      progressBarRef.current.style.setProperty(
        "--range-progress",
        `calc(${newTime / duration}`
      )
      progressTrackRef.current.style.setProperty(
        "--range-progress",
        `calc(${newTime / duration}`
      )
    }
  }

  const onLoadedMetadata = () => {
    const seconds = audioRef.current?.duration
    if (seconds !== undefined) {
      setDuration(seconds)
      if (progressBarRef.current) {
        progressBarRef.current.max = seconds.toString()
      }
    }
  }

  const updateProgress = useCallback(() => {
    if (
      audioRef.current &&
      progressBarRef.current &&
      duration &&
      progressTrackRef.current
    ) {
      const currentTime = audioRef.current.currentTime
      setTimeProgress(currentTime)
      progressBarRef.current.value = currentTime.toString()
      progressBarRef.current.style.setProperty(
        "--range-progress",
        `calc(${currentTime / duration}`
      )
      progressTrackRef.current.style.setProperty(
        "--range-progress",
        `calc(${currentTime / duration}`
      )
    }
  }, [duration, setTimeProgress, audioRef, progressBarRef])

  const startAnimation = useCallback(() => {
    if (audioRef.current && progressBarRef.current && duration) {
      const animate = () => {
        updateProgress()
        playAnimationRef.current = requestAnimationFrame(animate)
      }
      playAnimationRef.current = requestAnimationFrame(animate)
    }
  }, [updateProgress, duration, audioRef, progressBarRef])

  useEffect(() => {
    if (player.isPlaying) {
      audioRef.current?.play()
      startAnimation()
    } else {
      audioRef.current?.pause()
      if (playAnimationRef.current !== null) {
        cancelAnimationFrame(playAnimationRef.current)
        playAnimationRef.current = null
      }
      updateProgress() // Ensure progress is updated immediately when paused
    }
    return () => {
      if (playAnimationRef.current !== null) {
        cancelAnimationFrame(playAnimationRef.current)
      }
    }
  }, [player.isPlaying, startAnimation, updateProgress, audioRef])

  useEffect(() => {
    progressBarRef.current?.style.setProperty("--range-progress", "0")
    progressTrackRef.current?.style.setProperty("--range-progress", "0")
  }, [player.currentTrack?.src])

  if (!player.currentTrack) return null

  return (
    <>
      <Styled.GlobalAudioPlayerFixed>
        <ThemeProvider theme={lightTheme}>
          <Styled.GlobalAudioPlayerContainer>
            <Styled.PlayPauseButton
              disabled={!player.currentTrack}
              onClick={() => player.setIsPlaying(prev => !prev)}
            >
              {player.isPlaying ? <PlayerPauseIcon /> : <PlayerPlayIcon />}
            </Styled.PlayPauseButton>
            <Styled.TimeContainer>
              <Styled.TimeElapsed>
                {formatTime(timeProgress)}
              </Styled.TimeElapsed>
              <Styled.TimeDuration>
                &nbsp;/&nbsp;
                {formatTime(duration)}
              </Styled.TimeDuration>
            </Styled.TimeContainer>
            <div style={{ marginLeft: "auto" }}></div>
            <Styled.TrackTitle>{player.currentTrack?.title}</Styled.TrackTitle>
            <Styled.TrackArtist>
              {player.currentTrack?.author}
            </Styled.TrackArtist>
            <Styled.TrackListExpandButton
              onClick={() => setIsExpanded(prev => !prev)}
            >
              <TrackListExpandIcon rotate={isExpanded ? 180 : 0} />
            </Styled.TrackListExpandButton>
            {player.currentTrack && (
              <audio
                key={player.currentTrack.src}
                hidden
                ref={audioRef}
                src={player.currentTrack.src}
                onLoadedMetadata={onLoadedMetadata}
                onLoadedData={() => {
                  if (player.shouldPlayOnLoad) {
                    player.setIsPlaying(true)
                    player.setShouldPlayOnLoad(false)
                  }
                }}
                onEnded={() => player.setIsPlaying(false)}
                controls
              />
            )}
            {player.currentTrack && (
              <>
                <Styled.ProgressBar
                  ref={progressBarRef}
                  type="range"
                  step={duration ? duration / 100 : 1}
                  defaultValue="0"
                  onChange={handleProgressChange}
                />
                <Styled.ProgressTrack ref={progressTrackRef} />
              </>
            )}
          </Styled.GlobalAudioPlayerContainer>
        </ThemeProvider>
      </Styled.GlobalAudioPlayerFixed>
      <AnimatePresence initial={false}>
        {isExpanded && (
          <Styled.TrackContainer
            as={motion.div}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <Styled.TrackList>
              {player.tracks.map(track => (
                <Styled.TrackItem key={track.src}>
                  <Styled.TrackItemDetails>
                    <Styled.TrackTitle>{track.title}</Styled.TrackTitle>
                    <Styled.TrackArtist>{track.author}</Styled.TrackArtist>
                  </Styled.TrackItemDetails>
                  <Styled.PlayPauseButton
                    onClick={() => {
                      flushSync(() => {
                        player.setIsPlaying(false)
                      })

                      player.setShouldPlayOnLoad(true)
                      player.setCurrentTrack(track)
                      player.setIsPlaying(true)
                    }}
                  >
                    <Styled.TrackPlayIconWrapper>
                      {player.currentTrack?.src === track.src ? (
                        <TrackPlayingIcon />
                      ) : (
                        <PlayIcon />
                      )}
                    </Styled.TrackPlayIconWrapper>
                  </Styled.PlayPauseButton>
                </Styled.TrackItem>
              ))}
            </Styled.TrackList>
          </Styled.TrackContainer>
        )}
      </AnimatePresence>
    </>
  )
}

function formatTime(time: number | undefined) {
  if (typeof time !== "number" || isNaN(time)) return "00:00"

  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60)
  // Convert to string and pad with leading zeros if necessary
  const formatMinutes = minutes.toString().padStart(2, "0")
  const formatSeconds = seconds.toString().padStart(2, "0")
  return `${formatMinutes}:${formatSeconds}`
}
