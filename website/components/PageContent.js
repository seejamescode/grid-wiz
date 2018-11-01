import React from "react";
import styled from "styled-components";
import { GridConsumer } from "./GridProvider";
import colors from "../utils/color";

const Container = styled.div`
  background: ${colors.background1};
  padding-bottom: 3rem;
  padding-top: 2rem;
  position: relative;
`;

export default class extends React.Component {
  render() {
    return (
      <GridConsumer>
        {({ state }) => (
          <Container>
            <div className={`${state.config.prefix}grid`}>
              {this.props.children}
            </div>
          </Container>
        )}
      </GridConsumer>
    );
  }
}
