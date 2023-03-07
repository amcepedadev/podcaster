import * as React from "react";
import styled from "styled-components";

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

const HeaderRight = styled("div")`
  color: red; //TODO: change this once loading func is done
`;

const Title = styled("h2")`
  margin: 0;
  font-weight: 500;
`;

const TitleLink = styled("a")`
  text-decoration: none;
  color: #2c78bc;
`;

function Header() {
  return (
    <Wrapper>
      <HeaderInner>
        <HeaderLeft>
          <Title>
            <TitleLink href="/">Podcaster</TitleLink>
          </Title>
        </HeaderLeft>
        <HeaderRight>TBD loading here</HeaderRight>{" "}
        {/* TODO: change this to loading func */}
      </HeaderInner>
    </Wrapper>
  );
}

export default Header;
