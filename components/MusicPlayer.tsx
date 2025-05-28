import React, { useState, useEffect, useRef, useCallback } from 'react';
import { MusicPlaylistItem, MusicPreviewItem } from '../types';
import IconButton from './IconButton';

interface MusicPlayerProps {
  playlist?: MusicPlaylistItem[];
  preview?: MusicPreviewItem;
  onSetPreviewAsBackgroundMusic?: (url: string) => void;
  isDarkMode: boolean;
  currentBackgroundMusicUrl?: string;
}

const IconBase: React.FC<{children: React.ReactNode; className?: string}> = ({ children, className="" }) => <div className={`w-4 h-4 ${className}`}>{children}</div>;

const PlayIcon = () => <IconBase><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" /></svg></IconBase>;
const PauseIcon = () => <IconBase><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M5.75 3a.75.75 0 00-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75V3.75A.75.75 0 007.25 3h-1.5zM12.75 3a.75.75 0 00-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75V3.75a.75.75 0 00-.75-.75h-1.5z" /></svg></IconBase>;
const PrevIcon = () => <IconBase><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M15.79 5.47a.75.75 0 010 1.06L11.06 11.3l4.73 4.77a.75.75 0 11-1.06 1.06L9.47 11.83a.75.75 0 010-1.06l5.26-5.26a.75.75 0 011.06 0z" clipRule="evenodd" /><path fillRule="evenodd" d="M9.79 5.47a.75.75 0 010 1.06L5.06 11.3l4.73 4.77a.75.75 0 11-1.06 1.06L3.47 11.83a.75.75 0 010-1.06l5.26-5.26a.75.75 0 011.06 0zM4.25 3.75a.75.75 0 00-.75.75v10.5a.75.75 0 001.5 0V4.5a.75.75 0 00-.75-.75z" clipRule="evenodd" /></svg></IconBase>;
const NextIcon = () => <IconBase><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4.21 5.47a.75.75 0 011.06 0l5.26 5.26a.75.75 0 010 1.06L5.27 17.06a.75.75 0 11-1.06-1.06l4.73-4.77L4.21 6.53a.75.75 0 010-1.06z" clipRule="evenodd" /><path fillRule="evenodd" d="M10.21 5.47a.75.75 0 011.06 0l5.26 5.26a.75.75 0 010 1.06L11.27 17.06a.75.75 0 11-1.06-1.06l4.73-4.77L10.21 6.53a.75.75 0 010-1.06zM15.75 3.75a.75.75 0 00-.75.75v10.5a.75.75 0 001.5 0V4.5a.75.75 0 00-.75-.75z" clipRule="evenodd" /></svg></IconBase>;
const MusicNoteIcon = () => <IconBase><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M7 4a3 3 0 013-3h5a3 3 0 013 3v11.586l-2.793-2.793a1 1 0 00-1.414 0L12 14.586V4a1 1 0 00-1-1H7zm8 10.172a1 1 0 00-1.216-.97l-3.14.943A2 2 0 009 16.057V18a1 1 0 102 0v-1.057a.5.5 0 01.484-.498l2.354-.706A1 1 0 0015 14.172zM3 5a3 3 0 013-3h.5a.5.5 0 01.5.5V16a3 3 0 01-3 3H3a3 3 0 01-3-3V8a3 3 0 013-3z" /></svg></IconBase>;


const MusicPlayer: React.FC<MusicPlayerProps> = ({ 
    playlist, 
    preview, 
    onSetPreviewAsBackgroundMusic,
    isDarkMode,
    currentBackgroundMusicUrl
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [currentTrackTitle, setCurrentTrackTitle] = useState('');
  const audioRef = useRef<HTMLAudioElement>(null);
  const [error, setError] = useState<string | null>(null);

  const tracks = playlist || (preview ? [preview] : []);

  useEffect(() => {
    setIsPlaying(false); // Reset play state on new playlist/preview
    setCurrentTrackIndex(0);
    setError(null);
  }, [playlist, preview]);

  useEffect(() => {
    if (tracks.length > 0 && audioRef.current) {
      const track = tracks[currentTrackIndex];
      audioRef.current.src = track.url;
      setCurrentTrackTitle(track.title || track.url.substring(track.url.lastIndexOf('/') + 1) || 'Unknown Track');
      if (isPlaying) {
        audioRef.current.play().catch(e => {
            console.error("Error playing audio:", e);
            setError("Cannot play this track.");
            setIsPlaying(false);
        });
      }
    }
  }, [currentTrackIndex, tracks, isPlaying]); // isPlaying added to re-trigger play on src change if already playing

  const togglePlayPause = () => {
    if (!audioRef.current) return;
    setError(null);
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => {
        console.error("Error playing audio:", e);
        setError("Cannot play this track.");
        setIsPlaying(false); // Ensure isPlaying is false on error
        return; // Important: exit if play failed
      });
    }
    setIsPlaying(!isPlaying);
  };

  const playTrack = (index: number) => {
    setCurrentTrackIndex(index);
    setIsPlaying(true);
    setError(null);
  };

  const handleNextTrack = useCallback(() => {
    if (tracks.length > 0) {
      setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % tracks.length);
      setIsPlaying(true);
      setError(null);
    }
  }, [tracks]);

  const handlePrevTrack = () => {
     if (tracks.length > 0) {
      setCurrentTrackIndex((prevIndex) => (prevIndex - 1 + tracks.length) % tracks.length);
      setIsPlaying(true);
      setError(null);
    }
  };
  
  useEffect(() => {
    const audio = audioRef.current;
    const handleAudioEnded = () => {
        if (playlist) { // Only auto-advance for playlists
            handleNextTrack();
        } else {
            setIsPlaying(false); // For preview, just stop
        }
    };
    const handleAudioError = (e: Event) => {
        console.error("Audio Element Error:", e);
        const mediaError = (e.target as HTMLAudioElement).error;
        let errorMessage = "Audio playback error.";
        if (mediaError) {
            switch (mediaError.code) {
                case mediaError.MEDIA_ERR_ABORTED: errorMessage = "Playback aborted."; break;
                case mediaError.MEDIA_ERR_NETWORK: errorMessage = "Network error."; break;
                case mediaError.MEDIA_ERR_DECODE: errorMessage = "Decode error."; break;
                case mediaError.MEDIA_ERR_SRC_NOT_SUPPORTED: errorMessage = "Format not supported."; break;
                default: errorMessage = "Unknown audio error.";
            }
        }
        setError(errorMessage);
        setIsPlaying(false);
    };

    if (audio) {
      audio.addEventListener('ended', handleAudioEnded);
      audio.addEventListener('error', handleAudioError);
      return () => {
        audio.removeEventListener('ended', handleAudioEnded);
        audio.removeEventListener('error', handleAudioError);
      };
    }
  }, [playlist, handleNextTrack]);

  if (!playlist && !preview) return null;

  const isCurrentPreviewBackground = preview && preview.url === currentBackgroundMusicUrl;

  const buttonClass = `p-1.5 rounded-full transition-colors 
                       ${isDarkMode ? 'text-gray-300 hover:bg-gray-600' : 'text-gray-700 hover:bg-gray-200'}`;
  const activeTrackClass = isDarkMode ? 'bg-sky-700 text-sky-100' : 'bg-sky-200 text-sky-700';

  return (
    <div className={`mt-2 p-2.5 rounded-lg shadow-inner ${isDarkMode ? 'bg-black/20' : 'bg-white/30'}`}>
      <audio ref={audioRef} />
      
      {preview && (
        <div className="flex items-center justify-between">
          <div className="flex items-center min-w-0">
            <MusicNoteIcon />
            <span className="ml-2 text-sm font-medium truncate" title={preview.title}>{preview.title}</span>
          </div>
          <div className="flex items-center space-x-2">
            <IconButton icon={isPlaying ? <PauseIcon /> : <PlayIcon />} label={isPlaying ? "Pause" : "Play"} onClick={togglePlayPause} className={buttonClass} />
            {onSetPreviewAsBackgroundMusic && (
              <button
                onClick={() => onSetPreviewAsBackgroundMusic(preview.url)}
                disabled={isCurrentPreviewBackground}
                className={`px-2.5 py-1 text-xs rounded-md transition-colors
                            ${isCurrentPreviewBackground 
                                ? (isDarkMode ? 'bg-green-700 text-green-200 cursor-default' : 'bg-green-500 text-white cursor-default')
                                : (isDarkMode ? 'bg-sky-600 hover:bg-sky-500 text-white' : 'bg-sky-500 hover:bg-sky-600 text-white')
                            }`}
              >
                {isCurrentPreviewBackground ? "Background" : "Set as BG"}
              </button>
            )}
          </div>
        </div>
      )}

      {playlist && (
        <div>
          <div className="flex items-center justify-between mb-2">
             <span className="text-xs font-semibold tracking-wider uppercase opacity-80">Playlist</span>
            <div className="flex items-center space-x-1">
              <IconButton icon={<PrevIcon />} label="Previous" onClick={handlePrevTrack} className={buttonClass} />
              <IconButton icon={isPlaying ? <PauseIcon /> : <PlayIcon />} label={isPlaying ? "Pause" : "Play"} onClick={togglePlayPause} className={buttonClass} />
              <IconButton icon={<NextIcon />} label="Next" onClick={handleNextTrack} className={buttonClass} />
            </div>
          </div>
          <p className="text-xs truncate mb-1.5 opacity-90" title={currentTrackTitle}>Now Playing: {currentTrackTitle || "Select a track"}</p>
          <ul className="max-h-32 overflow-y-auto space-y-1 text-sm scrollbar-thin scrollbar-thumb-rounded scrollbar-track-transparent"
               style={{
                scrollbarColor: isDarkMode ? 'rgba(255,255,255,0.2) transparent' : 'rgba(0,0,0,0.2) transparent',
              }}>
            {playlist.map((track, index) => (
              <li key={track.id}
                  onClick={() => playTrack(index)}
                  className={`p-1.5 rounded cursor-pointer truncate transition-colors ${
                    index === currentTrackIndex ? activeTrackClass : (isDarkMode ? 'hover:bg-gray-700/70' : 'hover:bg-gray-100/70')
                  }`}
                  title={track.title || track.url}
              >
                {track.title || track.url.substring(track.url.lastIndexOf('/') + 1) || 'Unknown Track'}
              </li>
            ))}
          </ul>
        </div>
      )}
       {error && <p className="text-xs text-red-500 dark:text-red-400 mt-1.5">{error}</p>}
    </div>
  );
};

export default MusicPlayer;