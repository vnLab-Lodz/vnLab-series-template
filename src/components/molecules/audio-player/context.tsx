import React, {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from "react"

interface AudioPlayerContextType {
  tracks: {
    src: string
    title: string
    author?: string
  }[]
  currentTrack: AudioPlayerContextType["tracks"][number] | undefined
  setCurrentTrack: Dispatch<
    SetStateAction<AudioPlayerContextType["tracks"][number] | undefined>
  >
  isPlaying: boolean
  setIsPlaying: Dispatch<SetStateAction<boolean>>
  shouldPlayOnLoad: boolean
  setShouldPlayOnLoad: Dispatch<SetStateAction<boolean>>
}

type AudioPlayerProviderProps = PropsWithChildren<{
  tracks: AudioPlayerContextType["tracks"]
}>

export const AudioPlayerContext = createContext<
  AudioPlayerContextType | undefined
>(undefined)

export const AudioPlayerProvider = ({
  children,
  tracks,
}: AudioPlayerProviderProps) => {
  const [currentTrack, setCurrentTrack] = useState<
    AudioPlayerContextType["tracks"][number] | undefined
  >(undefined)
  const [isPlaying, setIsPlaying] = useState(false)
  const [shouldPlayOnLoad, setShouldPlayOnLoad] = useState(false)

  const context = useMemo(
    () => ({
      currentTrack,
      setCurrentTrack,
      isPlaying,
      setIsPlaying,
      tracks,
      shouldPlayOnLoad,
      setShouldPlayOnLoad,
    }),
    [
      currentTrack,
      setCurrentTrack,
      isPlaying,
      tracks,
      setIsPlaying,
      shouldPlayOnLoad,
      setShouldPlayOnLoad,
    ]
  )

  return (
    <AudioPlayerContext.Provider value={context}>
      {children}
    </AudioPlayerContext.Provider>
  )
}

export const useAudioPlayer = () => {
  const context = useContext(AudioPlayerContext)

  if (!context) {
    throw new Error("useAudioPlayer must be used within a AudioPlayerProvider")
  }

  return context
}
