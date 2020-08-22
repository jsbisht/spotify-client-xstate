import React from "react";
import { categoriesJson } from "../data/categories";
import styled from "styled-components";

function UnstyledCategories() {
  const categories = categoriesJson?.categories || [];

  return (
    <div className="categories" data-testid="categories">
      {categories.items.map((category) => (
        <div className="category">
          <img src={category.icons[0].url} alt={category.name} />
          <div>{category.name}</div>
        </div>
      ))}
    </div>
  );
}

const StyledApp = styled.div`
  .categories {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    .category {
      margin: 12px;
    }
  }

  img {
    width: 200px;
  }
`;

function Categories() {
  return (
    <StyledApp>
      <UnstyledCategories />
    </StyledApp>
  );
}

export default Categories;
