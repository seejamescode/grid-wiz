import React from "react";
import styled from "styled-components";
import colors from "../utils/color";
import { GridConsumer } from "./GridProvider";
import PageContent from "./PageContent";

const BreakpointName = styled.h3`
  margin-bottom: 0.5rem;
`;

const BreakpointDesc = styled.p`
  margin-top: 0;
  max-width: 400px;
`;

const Container = styled.div`
  [class*="col-"] {
    outline: 2px solid ${colors.accent0};
    outline-offset: -1px;

    [class*="col-"] {
      outline-color: ${colors.accent1};
      z-index: 1;
    }
  }
`;

export default class extends React.Component {
  render() {
    return (
      <GridConsumer>
        {({ state }) => (
          <Container>
            <PageContent>
              {state.config.breakpoints.map(bp => {
                const columns = [];
                for (let i = 0; i < Math.ceil(bp.columns / 2); i++) {
                  let className = `${state.config.prefix}col-${bp.name}-${i +
                    1}`;
                  let classNameFiller = `${state.config.prefix}col-${
                    bp.name
                  }-${bp.columns - i - 1}`;
                  columns.push(
                    <div
                      className={`${state.config.prefix}row`}
                      key={`${bp.name}-${i}`}
                    >
                      <div className={className}>
                        <p>.{className}</p>
                      </div>
                      {bp.columns > i + 1 ? (
                        <div className={classNameFiller}>
                          <p>.{classNameFiller}</p>
                        </div>
                      ) : null}
                    </div>
                  );
                }

                const classNameMax = `${state.config.prefix}col-${bp.name}-${
                  bp.columns
                }`;
                return (
                  <React.Fragment key={bp.name}>
                    <BreakpointName className={`${state.config.prefix}col`}>
                      {bp.name}
                    </BreakpointName>
                    <BreakpointDesc className={`${state.config.prefix}col`}>
                      These sizing class names start when the screen width is at{" "}
                      {bp.size}
                      px.
                    </BreakpointDesc>
                    <div className="border">
                      {columns}
                      <div
                        className={`${state.config.prefix}row`}
                        key={`${bp.name}-${bp.columns}`}
                      >
                        <div className={classNameMax}>
                          <p>.{classNameMax}</p>
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                );
              })}

              <BreakpointName className={`${state.config.prefix}col`}>
                Subgrids
                {!state.config.subgrid ? " (Disabled)" : ""}
              </BreakpointName>
              <BreakpointDesc className={`${state.config.prefix}col`}>
                {state.config.subgrid
                  ? `You can add a .${state.config.prefix}
                grid or .${state.config.prefix}
                row to any col item and children will know how many columns are
                available.`
                  : `Since you have the subgrid option disabled, adding .${
                      state.config.prefix
                    }
                grid or .${state.config.prefix}
                row to any col item will provide the original amount of columns. If enabled, the embedded grid would know exactly how many columns are left to use.`}
              </BreakpointDesc>
              {state.config.breakpoints.map((bp, i) => {
                const columnsAvailable = bp.columns - 1;
                const classNameSubgrid = `${state.config.prefix}row`;
                const classNameWidth = `${state.config.prefix}col-${bp.name}-1`;
                const classNameWidthSubgrid = `${state.config.prefix}col-${
                  bp.name
                }-${columnsAvailable}`;
                const columnsSubgridLeft = Math.floor(columnsAvailable / 2);
                const columnsSubgridRight =
                  columnsAvailable - columnsSubgridLeft;
                const classNameSubgridLeft = `${state.config.prefix}col-${
                  bp.name
                }-${columnsSubgridLeft}`;
                const classNameSubgridRight = `${state.config.prefix}col-${
                  bp.name
                }-${columnsSubgridRight}`;

                return (
                  <div
                    className={`${state.config.prefix}row`}
                    key={`${bp.name}-subgrid`}
                  >
                    <div className={`${classNameWidth}`}>
                      <p>.{classNameWidth}</p>
                    </div>
                    <div
                      className={`${classNameWidthSubgrid} ${classNameSubgrid}`}
                    >
                      <div className={`${classNameSubgridLeft}`}>
                        <p>
                          .{classNameWidthSubgrid}.{classNameSubgrid} > .
                          {classNameSubgridLeft}
                        </p>
                      </div>
                      <div className={`${classNameSubgridRight}`}>
                        <p>
                          .{classNameWidthSubgrid}.{classNameSubgrid} > .
                          {classNameSubgridRight}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}

              <BreakpointName className={`${state.config.prefix}col`}>
                Offsets
              </BreakpointName>
              <BreakpointDesc className={`${state.config.prefix}col`}>
                The following col items will start at a specific column at the
                specified breakpoint.
              </BreakpointDesc>

              {state.config.breakpoints.map((bp, i) => {
                const classNameOffset = `${state.config.prefix}offset-${
                  bp.name
                }-${bp.columns - 1}`;
                const classNameWidth = `${state.config.prefix}col-${bp.name}-1`;

                return (
                  <div
                    className={`${state.config.prefix}row`}
                    key={`${bp.name}-offset`}
                  >
                    <div className={`${classNameWidth} ${classNameOffset}`}>
                      <p>
                        .{classNameWidth}.{classNameOffset}
                      </p>
                    </div>
                  </div>
                );
              })}

              <BreakpointName className={`${state.config.prefix}col`}>
                Hiding
              </BreakpointName>
              <BreakpointDesc className={`${state.config.prefix}col`}>
                The following col items will not display at the specified
                breakpoint. We then bring the back by specifying any col size at
                the next breakpoint.
              </BreakpointDesc>

              {state.config.breakpoints.map((bp, i) => {
                const className = `${state.config.prefix}col-${bp.name}-0`;
                const breakpointNext = state.config.breakpoints[i + 1];

                const classNameNext = breakpointNext
                  ? `${state.config.prefix}col-${breakpointNext.name}-${
                      breakpointNext.columns
                    }`
                  : undefined;

                return (
                  <div
                    className={`${state.config.prefix}row`}
                    key={`${bp.name}-offset`}
                  >
                    <div
                      className={`${className} ${classNameNext}`}
                      key={`${bp.name}-0`}
                    >
                      <p>
                        .{className}
                        {classNameNext ? `.${classNameNext}` : null}
                      </p>
                    </div>
                  </div>
                );
              })}
            </PageContent>
          </Container>
        )}
      </GridConsumer>
    );
  }
}
