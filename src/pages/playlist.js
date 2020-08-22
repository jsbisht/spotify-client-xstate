import React from "react";
import styled from "styled-components";
import { useSpotifyApis } from "../hooks/useSpotifyApis";
import { PLAYLIST_URL } from "../constants/urls";
import { Link, useParams } from "react-router-dom";

function UnstyledPlaylist() {
  const { playlistId } = useParams();
  const { response, error, isLoading } = useSpotifyApis(
    `${PLAYLIST_URL}${playlistId}`
  );
  const tracks = response?.tracks;

  return tracks ? (
    <div className="tracks" data-testid="tracks">
      {tracks?.items?.map(({ track }) => (
        <div className="track">
          <img src={track.album.images[2].url} alt={track.name} />
          <div className="info">
            <div className="track-name">{track.name}</div>
            <div className="artist-name">
              {track.album.artists.map(({ name }) => (
                <span>{name}</span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div>{isLoading ? "Loading..." : JSON.stringify(error)}</div>
  );
}

const StyledApp = styled.div`
  .tracks {
    .track {
      display: flex;
      margin: 12px;
      .track-name {
        font-size: 18px;
      }
      .artist-name {
        font-size: 12px;
      }
    }
  }

  img {
    width: 64px;
    margin-right: 12px;
  }
`;

function Playlist() {
  return (
    <StyledApp>
      <UnstyledPlaylist />
    </StyledApp>
  );
}

export default Playlist;
