"use client";

import { useRef, useState } from "react";

function fmt(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

/**
 * Video with a minimal, brand-styled control bar (play/pause, seek, volume).
 * Custom controls are used instead of the native player so the same reduced
 * control set renders in every browser — Safari and Firefox ignore the
 * `controlsList` attribute that would otherwise trim Chrome's native controls.
 */
export function IntroVideo({ src, poster, label }: { src: string; poster: string; label: string }) {
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(1);

  function togglePlay() {
    const v = video.current;
    if (!v) return;
    if (v.paused) void v.play();
    else v.pause();
  }

  function onSeek(e: React.ChangeEvent<HTMLInputElement>) {
    const v = video.current;
    if (!v) return;
    v.currentTime = Number(e.target.value);
  }

  function toggleMute() {
    const v = video.current;
    if (!v) return;
    v.muted = !v.muted;
  }

  function onVolume(e: React.ChangeEvent<HTMLInputElement>) {
    const v = video.current;
    if (!v) return;
    const next = Number(e.target.value);
    v.volume = next;
    if (next > 0 && v.muted) v.muted = false;
  }

  return (
    <div className="videoplayer">
      <video
        ref={video}
        className="videoplayer__el"
        playsInline
        preload="metadata"
        poster={poster}
        aria-label={label}
        onClick={togglePlay}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onTimeUpdate={(e) => setCurrent(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onVolumeChange={(e) => {
          setMuted(e.currentTarget.muted);
          setVolume(e.currentTarget.volume);
        }}
      >
        <source src={src} type="video/mp4" />
      </video>

      {!playing && (
        <button
          type="button"
          className="videoplayer__big"
          onClick={togglePlay}
          aria-label="Play video"
        >
          <i className="ph-light ph-play" aria-hidden="true" />
        </button>
      )}

      <div className="videoplayer__bar">
        <button
          type="button"
          className="videoplayer__btn"
          onClick={togglePlay}
          aria-label={playing ? "Pause" : "Play"}
        >
          <i className={`ph-light ${playing ? "ph-pause" : "ph-play"}`} aria-hidden="true" />
        </button>

        <input
          type="range"
          className="videoplayer__seek"
          min={0}
          max={duration || 0}
          step="any"
          value={Math.min(current, duration || 0)}
          onChange={onSeek}
          aria-label="Seek"
        />

        <span className="videoplayer__time">
          {fmt(current)} / {fmt(duration)}
        </span>

        <button
          type="button"
          className="videoplayer__btn"
          onClick={toggleMute}
          aria-label={muted || volume === 0 ? "Unmute" : "Mute"}
        >
          <i
            className={`ph-light ${muted || volume === 0 ? "ph-speaker-slash" : "ph-speaker-high"}`}
            aria-hidden="true"
          />
        </button>

        <input
          type="range"
          className="videoplayer__vol"
          min={0}
          max={1}
          step={0.05}
          value={muted ? 0 : volume}
          onChange={onVolume}
          aria-label="Volume"
        />
      </div>
    </div>
  );
}
