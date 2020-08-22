import React from "react";
import styled from "styled-components";
import { useSpotifyApis } from "../hooks/useSpotifyApis";
import { FEATURED_PLAYLISTS_URL } from "../constants/urls";
import { Link } from "react-router-dom";

function UnstyledPlaylists() {
  const { response, error, isLoading } = useSpotifyApis(FEATURED_PLAYLISTS_URL);
  const playlists = response?.playlists;

  return playlists ? (
    <div className="playlists" data-testid="playlists">
      {playlists?.items?.map((category) => (
        <Link to={`/playlist/${category.id}`}>
          <div className="category">
            <img src={category.images[0].url} alt={category.name} />
            <div className="category-name">{category.name}</div>
          </div>
        </Link>
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

function Playlists() {
  return (
    <StyledApp>
      <UnstyledPlaylists />
    </StyledApp>
  );
}

export default Playlists;
