import dynamic from "next/dynamic";
import React from "react";
import styled, { injectGlobal } from "styled-components";
import saveAs from "file-saver";
import Markdown from "markdown-to-jsx";
import gridInJS from "../../dist/grid-in-js.umd";
import readme from "../../README.md";
const ReactJson = dynamic(() => import("react-json-view"), {
  ssr: false
});

const initialconfig = {
  breakpoints: [
    {
      columns: 4,
      margin: 0,
      name: "sm",
      gutter: 32,
      size: 0
    },
    {
      columns: 8,
      margin: 16,
      name: "md",
      gutter: 32,
      size: 672
    },
    {
      columns: 16,
      margin: 16,
      name: "lg",
      gutter: 32,
      size: 1056
    },
    {
      columns: 16,
      margin: 16,
      name: "xl",
      gutter: 32,
      size: 1312
    },
    {
      columns: 16,
      margin: 32,
      name: "max",
      gutter: 32,
      size: 1584
    }
  ],
  maxWidth: 1584,
  prefix: "bx--",
  progressive: false,
  subgrid: true,
  support: "displayGrid"
};

injectGlobal`
  #__next {
    display: flex;
    font-size: 14px;
    height: 100%;
    overflow-y: hidden;
  }

  [class*="col"] {
    outline: 2px solid #D3643B;
    outline-offset: -1px;
  }

  .markdown {
    code {
      background: #f1f1f1;
    }

    h1 {
      font-size: 3rem;
      margin-bottom: 1.9rem;
      margin-top: 0;
    }

    h2 {
      font-size: 1.5rem;
      margin-top: 2rem;
    }

    h3 {
      font-size: 1rem;
    }

    p, ul {
      max-width: 500px;
    }

    table {
      display: block;
      width: 100%;
    }

    td, th {
      padding-right: 2rem;
      text-align: left;
    }

    tr {
      height: 1.5rem;
    }
  }
`;

const Aside = styled.aside`
  background: #f1faff;
  box-sizing: border-box;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  position: fixed;
  width: 320px;

  @media (min-width: 640px) {
    position: relative;
  }
`;

const BreakpointName = styled.h3`
  margin-bottom: 0.5rem;
`;

const BreakpointSize = styled.p`
  margin-top: 0;
  max-width: 300px;
`;

const Code = styled.code`
  background: white;
  overflow: auto;
  padding: 1rem;
`;

const GridTitle = styled.h2`
  font-size: 2rem;
`;

const Main = styled.main`
  flex: 1;
  overflow-y: scroll;
  padding-bottom: 3rem;
  padding-top: 1rem;
`;

const Notes = styled.ul`
  padding-left: 1rem;
`;

const NotesTitle = styled.h4`
  margin-bottom: 0;
`;

const TabButton = styled.button`
  background: ${props => (props.active ? "black" : "none")};
  border: none;
  color: ${props => (props.active ? "white" : null)};
  display: inline-block;
  font-size: 1.5rem;
  height: 2rem;
`;

const Tabs = styled.div`
  display: inline-block;
  margin-bottom: 1rem;
`;

const Title = styled.h1`
  margin-top: 0;
`;

export default class extends React.Component {
  state = {
    config: initialconfig,
    tab: "editor"
  };

  static async getInitialProps() {
    return {};
  }

  saveCSS(css, prefix) {
    var blob = new Blob([css], { type: "text/css; charset=UTF-8" });
    saveAs(blob, `${prefix}grid.css`);
  }

  updateconfig(edit) {
    this.setState({
      config: edit.updated_src
    });
  }

  render() {
    const { config } = this.state;
    const prefix = config.prefix ? config.prefix : "";
    const breakpoints = config.breakpoints ? config.breakpoints : [];
    const css = gridInJS(config);

    return (
      <React.Fragment>
        <style dangerouslySetInnerHTML={{ __html: css }} />
        <Aside className="aside">
          <Tabs>
            <TabButton
              active={this.state.tab === "editor"}
              onClick={() => this.setState({ tab: "editor" })}
            >
              Editor
            </TabButton>
            <TabButton
              active={this.state.tab === "code"}
              onClick={() => this.setState({ tab: "code" })}
            >
              Code
            </TabButton>
          </Tabs>
          {this.state.tab === "editor" ? (
            <React.Fragment>
              <p>
                Edit the object below to generate your grid framework straight
                in the browser. Click "Code" to download the CSS. Scroll below
                documentation to see a live demo of your generated grid
                framework.
              </p>
              <ReactJson
                displayDataTypes={false}
                displayObjectSize={false}
                enableClipboard={false}
                onAdd={edit => this.updateconfig(edit)}
                onDelete={edit => this.updateconfig(edit)}
                onEdit={edit => this.updateconfig(edit)}
                src={config}
                style={{
                  background: "white",
                  overflowY: "auto",
                  margin: "1rem 0",
                  padding: "1rem"
                }}
              />
              <NotesTitle>Notes</NotesTitle>
              <Notes>
                <li>
                  Currently supported `support` values: `cssVariables`,
                  `displayGrid`
                </li>
                <li>Subgrid can not be disabled yet</li>
              </Notes>
            </React.Fragment>
          ) : null}
          {this.state.tab === "code" ? (
            <React.Fragment>
              <button onClick={() => this.saveCSS(css, prefix)}>
                Download CSS
              </button>
              <Code>{css}</Code>
            </React.Fragment>
          ) : null}
        </Aside>
        <Main>
          <div className={`${prefix}grid`}>
            <Markdown className="markdown">{readme}</Markdown>
            <GridTitle>Your Custom Grid Demo</GridTitle>
            {breakpoints.map(bp => {
              const columns = [];
              for (let i = 0; i < Math.ceil(bp.columns / 2); i++) {
                let className = `${prefix}col-${bp.name}-${i + 1}`;
                let classNameFiller = `${prefix}col-${bp.name}-${bp.columns -
                  i -
                  1}`;
                columns.push(
                  <div className={`${prefix}row`} key={`${bp.name}-${i}`}>
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

              const classNameMax = `${prefix}col-${bp.name}-${bp.columns}`;
              return (
                <React.Fragment key={bp.name}>
                  <BreakpointName>{bp.name}</BreakpointName>
                  <BreakpointSize>
                    These sizing class names start when the screen width is at{" "}
                    {bp.size}
                    px.
                  </BreakpointSize>
                  <div className="border">
                    {columns}
                    <div
                      className={`${prefix}row`}
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

            <BreakpointName>Offsets</BreakpointName>
            <BreakpointSize>
              The following col items will start at a specific column at the
              specified breakpoint.
            </BreakpointSize>
            {breakpoints.map((bp, i) => {
              const classNameOffset = `${prefix}offset-${bp.name}-${bp.columns -
                1}`;
              const classNameWidth = `${prefix}col-${bp.name}-1`;

              return (
                <div className={`${prefix}row`} key={`${bp.name}-offset`}>
                  <div className={`${classNameWidth} ${classNameOffset}`}>
                    .{classNameWidth}.{classNameOffset}
                  </div>
                </div>
              );
            })}

            <BreakpointName>Hiding</BreakpointName>
            <BreakpointSize>
              The following col items will not display at the specified
              breakpoint. We then bring the back by specifying any col size at
              the next breakpoint.
            </BreakpointSize>

            {breakpoints.map((bp, i) => {
              const className = `${prefix}col-${bp.name}-0`;
              const breakpointNext = breakpoints[i + 1];

              const classNameNext = breakpointNext
                ? `${prefix}col-${breakpointNext.name}-${
                    breakpointNext.columns
                  }`
                : undefined;

              return (
                <div
                  className={`${className} ${classNameNext}`}
                  key={`${bp.name}-0`}
                >
                  .{className}
                  {classNameNext ? `.${classNameNext}` : null}
                </div>
              );
            })}
          </div>
        </Main>
      </React.Fragment>
    );
  }
}
