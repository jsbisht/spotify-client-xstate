import React from "react";
import styled from "styled-components";
import { useMachine } from "@xstate/react";
import { Machine, assign } from "xstate";
import { percentage, minutes, seconds } from "../helpers/utils";

/**
 * Audio State Machine
 */

const audioMachine = Machine({
  id: "audio",
  initial: "loading",

  context: {
    audio: null,
    duration: 0,
    elapsed: 0
  },

  states: {
    loading: {
      on: {
        LOADED: {
          target: "ready",
          actions: ["setAudio"]
        },
        FAIL: "failure"
      }
    },
    ready: {
      initial: "paused",
      states: {
        paused: {
          on: {
            PLAY: {
              target: "playing",
              actions: ["setElapsed", "playAudio"]
            }
          }
        },
        playing: {
          on: {
            TIMING: {
              target: "playing",
              actions: "setElapsed"
            },
            PAUSE: {
              target: "paused",
              actions: ["setElapsed", "pauseAudio"]
            },
            END: "ended"
          }
        },
        ended: {
          on: {
            PLAY: {
              target: "playing",
              actions: "restartAudio"
            }
          }
        }
      }
    },
    failure: {
      type: "final"
    }
  }
});

/**
 * Action functions
 */

const setAudio = assign({
  audio: (_context, event) => event.audio,
  duration: (_context, event) => event.audio.duration
});

const setElapsed = assign({
  elapsed: (context, _event) => context.audio.currentTime
});

const playAudio = (context, _event) => {
  context.audio.play();
};

const pauseAudio = (context, _event) => {
  context.audio.pause();
};

const restartAudio = (context, _event) => {
  context.audio.currentTime = 0;
  context.audio.play();
};

/**
 * Components
 */

function UnstyledMusicPlayer() {
  const ref = React.useRef(null);
  const [current, send] = useMachine(audioMachine, {
    actions: { setAudio, setElapsed, playAudio, pauseAudio, restartAudio }
  });
  const { duration, elapsed } = current.context;
  const srcUrl =
    "https://p.scdn.co/mp3-preview/27b4eb723337cb13604727c4e4e421dad7cb1adf?cid=17c4bde8b1d646c89d556cd643b50477";

  return (
    <div className="container">
      <audio
        ref={ref}
        onCanPlay={() => {
          send("LOADED", { audio: ref.current });
        }}
        onTimeUpdate={() => {
          send("TIMING");
        }}
        onEnded={() => {
          send("END");
        }}
        onError={() => {
          send("FAIL");
        }}
      >
        <source src={srcUrl} type="audio/mp3" />
      </audio>

      {["paused", "playing", "ended"].some((subState) =>
        current.matches({ ready: subState })
      ) && (
        <div>
          <ElapsedBar elapsed={elapsed} duration={duration} />
          <Buttons current={current} send={send} />
          <Timer elapsed={elapsed} duration={duration} />
        </div>
      )}
    </div>
  );
}

const Buttons = ({ current, send }) => {
  if (current.matches({ ready: "playing" })) {
    return (
      <button
        onClick={() => {
          send("PAUSE");
        }}
      >
        Pause
      </button>
    );
  }

  return (
    <button
      onClick={() => {
        send("PLAY");
      }}
    >
      Play
    </button>
  );
};

const ElapsedBar = ({ elapsed, duration }) => (
  <div className="elapsed">
    <div
      className="elapsed-bar"
      style={{ width: `${percentage(duration, elapsed)}%` }}
    />
  </div>
);

const Timer = ({ elapsed, duration }) => (
  <span className="timer">
    {minutes(elapsed)}:{seconds(elapsed)} of {minutes(duration)}:
    {seconds(duration)}
  </span>
);

const StyledApp = styled.div`
  .elapsed {
    width: 100%;
    height: 5px;
    background-color: grey;
  }
  .elapsed-bar {
    transition: width 0.5 ease;
    height: 5px;
    background-color: #629460;
  }

  .timer {
    display: inline-block;
    margin-left: 5px;
  }
`;

export default function MusicPlayer() {
  return (
    <StyledApp>
      <UnstyledMusicPlayer />
    </StyledApp>
  );
}
