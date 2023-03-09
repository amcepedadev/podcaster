import * as React from "react";
import styled, { keyframes } from "styled-components";
import { useAppSelector } from "../../app/hooks";

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

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const LoadingIndicator = styled.div`
  animation: ${rotate360} 1s linear infinite;
  transform: translateZ(0);

  border-top: 2px solid grey;
  border-right: 2px solid grey;
  border-bottom: 2px solid grey;
  border-left: 4px solid #2c78bc;
  background: transparent;
  width: 24px;
  height: 24px;
  border-radius: 50%;
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
        {/* TODO: change this to an indicator icon with movement?*/}
      </HeaderInner>
    </Wrapper>
  );
}

export default Header;
