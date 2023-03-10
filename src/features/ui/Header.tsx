import * as React from "react";
import styled from "styled-components";
import { useAppSelector } from "../../app/hooks";
import { LoadingIndicator } from "./LoadingIndicator";

const Wrapper = styled("header")`
  padding: 0.5rem 1.5rem;
  color: white;
  border-bottom: 2px solid;
  border-color: #ebebeb;
`;

const HeaderInner = styled("div")`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const HeaderLeft = styled("div")`
  padding-right: 1rem;
`;

const HeaderRight = styled("div")``;

const Title = styled("h2")`
  margin: 0;
  font-weight: 500;
`;

const TitleLink = styled("a")`
  text-decoration: none;
  color: #2c78bc;
`;

function Header() {
  const { isLoading } = useAppSelector((s) => s.loading);
  return (
    <Wrapper>
      <HeaderInner>
        <HeaderLeft>
          <Title>
            <TitleLink href="/">Podcaster</TitleLink>
          </Title>
        </HeaderLeft>
        <HeaderRight>{isLoading && <LoadingIndicator />}</HeaderRight>{" "}
      </HeaderInner>
    </Wrapper>
  );
}

export default Header;
