import React from "react";
import styled from "styled-components";
import { useSpotifyApis } from "../hooks/useSpotifyApis";
import { PLAYLIST_URL } from "../constants/urls";

function UnstyledPlaylist() {
  const { response, error, isLoading } = useSpotifyApis(PLAYLIST_URL);
  const playlists = response?.playlists;

  return playlists ? (
    <div className="playlists" data-testid="playlists">
      {playlists?.items?.map((category) => (
        <div className="category">
          <img src={category.images[0].url} alt={category.name} />
          <div className="category-name">{category.name}</div>
        </div>
      ))}
    </div>
  ) : (
    <div>{isLoading ? "Loading..." : JSON.stringify(error)}</div>
  );
}

const StyledApp = styled.div`
  .playlists {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    .category {
      margin: 12px;
      .category-name {
        text-align: center;
        font-size: small;
      }
    }
  }

  img {
    width: 200px;
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
