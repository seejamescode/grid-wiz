import dynamic from "next/dynamic";
import React from "react";
import styled from "styled-components";
import saveAs from "file-saver";
import { IoIosArrowDropleft, IoIosArrowDroprightCircle } from "react-icons/io";
import { GridConsumer } from "./GridProvider";
const ReactJson = dynamic(() => import("react-json-view"), {
  ssr: false
});

const Aside = styled.aside`
  background: #f1faff;
  box-sizing: border-box;
  color: #403b33;
  height: 100%;
  display: flex;
  flex-direction: column;
  left: calc(100% - 320px);
  margin-right: 0px;
  overflow-y: auto;
  padding: 1rem;
  position: fixed;
  top: 0;
  transition: margin-left 100ms ease-in, margin-right 100ms ease-in;
  width: 320px;
  z-index: 2;

  @media (min-width: 640px) {
    margin-left: 0 !important;
    left: 0;
    position: relative;
    position: sticky;
  }

  > *:not(nav) {
    margin-left: ${props => (props.navCollapsed ? "2.5rem" : null)};
    transition: margin-left 100ms ease-in;
  }

  /* Extremely direct values to hide options React-JSON-View that mess with the correct object schema */
  .react-json-view
    > .object-container
    > .object-content
    > .object-key-val
    > span
    > span
    > span:first-of-type,
  .react-json-view
    > .object-container
    > .object-content
    > .object-key-val
    > span
    > span
    > div:first-of-type,
  .react-json-view
    > .object-container
    > .object-content
    > .object-key-val
    > span
    > .object-meta-data,
  .react-json-view
    > .object-container
    > .object-content
    > .object-key-val
    > .pushed-content
    > .object-content
    > .variable-row:hover
    > .click-to-remove,
  .react-json-view
    > .object-container
    > .object-content
    > .object-key-val
    > .pushed-content
    > .object-content
    > .object-key-val
    > .pushed-content
    > .object-content
    > .object-key-val
    > span
    > .object-meta-data
    > .click-to-add,
  .react-json-view
    > .object-container
    > .object-content
    > .object-key-val
    > .pushed-content
    > .object-content
    > .object-key-val:hover
    > span
    > .object-meta-data
    > .click-to-remove,
  .react-json-view
    > .object-container
    > .object-content
    > .object-key-val
    > .pushed-content
    > .object-content
    > .object-key-val
    > .pushed-content
    > .object-content
    > .object-key-val
    > .pushed-content
    > .object-content
    > .variable-row:hover
    > .click-to-remove {
    display: none !important;
  }
`;

const AsideNav = styled.nav`
  margin-bottom: 1.5rem;
`;

const AsideNavFlex = styled.div`
  display: flex;
  -webkit-justify-content: space-between;
  justify-content: space-between;
  height: 2rem;
`;

const Code = styled.code`
  background: white;
  overflow: auto;
  padding: 1rem;
`;

const CollapseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  position: relative;

  :after {
    content: "Grid Editor";
    font-size: 0.875rem;
    height: 1rem;
    left: -1.75rem;
    opacity: ${props => (props.navCollapsed ? 1 : 0)};
    position: absolute;
    top: 3.75rem;
    transform: rotateZ(90deg);
    transition: opacity 100ms ease-in;
    width: 5rem;
  }

  svg {
    height: 1.4rem;
    width: 1.4rem;
  }

  :hover {
    :after {
      color: lightgrey;
    }

    svg {
      fill: ${props => (props.active ? null : "lightgrey")};
    }
  }

  :focus {
    :after {
      color: grey;
    }

    svg {
      fill: ${props => (props.active ? null : "grey")};
    }
    outline: none;
  }
`;

const DownloadButton = styled.button`
  background: none;
  border: 2px solid lightcoral;
  cursor: pointer;
  font-size: 1rem;
  margin-bottom: 1rem;
  padding: 0.75rem 1rem;
  width: 100%;

  :hover {
    background: lightcoral;
  }
`;

const Notes = styled.ul`
  padding-left: 1rem;

  li {
    margin-top: 0.5rem;

    :first-of-type {
      margin-top: 0;
    }
  }
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

  :hover {
    background: ${props => (props.active ? null : "lightgrey")};
  }

  :focus {
    background: ${props => (props.active ? null : "grey")};
    outline: none;
  }
`;

const Tabs = styled.div`
  display: inline-block;
  margin-bottom: 1rem;
`;

export default class extends React.Component {
  state = {
    navCollapsed: true,
    tab: "editor"
  };

  componentDidMount() {
    this.setState({ navCollapsed: window.innerWidth < 640 });
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
    return (
      <GridConsumer>
        {({ state, makeGridCSS }) => (
          <Aside
            className="aside"
            navCollapsed={this.state.navCollapsed}
            style={{
              marginLeft: this.state.navCollapsed ? "16.5rem" : null,
              marginRight: this.state.navCollapsed ? "-16.5rem" : null
            }}
          >
            <AsideNav>
              <AsideNavFlex>
                <CollapseButton
                  aria-label={
                    this.state.navCollapsed ? "open editor" : "collapse editor"
                  }
                  navCollapsed={this.state.navCollapsed}
                  onClick={() => {
                    this.setState(state => {
                      return { navCollapsed: !state.navCollapsed };
                    });
                  }}
                >
                  {this.state.navCollapsed ? (
                    <IoIosArrowDropleft />
                  ) : (
                    <IoIosArrowDroprightCircle />
                  )}
                </CollapseButton>
                <Tabs>
                  <TabButton
                    active={this.state.tab === "editor"}
                    disabled={
                      this.state.tab === "editor" || this.state.navCollapsed
                    }
                    onClick={() => this.setState({ tab: "editor" })}
                  >
                    Editor
                  </TabButton>
                  <TabButton
                    active={this.state.tab === "code"}
                    disabled={
                      this.state.tab === "code" || this.state.navCollapsed
                    }
                    onClick={() => this.setState({ tab: "code" })}
                  >
                    Download
                  </TabButton>
                </Tabs>
              </AsideNavFlex>
            </AsideNav>
            {this.state.tab === "editor" ? (
              <React.Fragment>
                <ReactJson
                  displayDataTypes={false}
                  displayObjectSize={false}
                  enableClipboard={false}
                  onAdd={edit => makeGridCSS(edit.updated_src)}
                  onDelete={edit => makeGridCSS(edit.updated_src)}
                  onEdit={edit => makeGridCSS(edit.updated_src)}
                  src={state.config}
                  style={{
                    background: "white",
                    minHeight: "10rem",
                    overflowY: "auto",
                    padding: "1rem"
                  }}
                  theme="summerfruit:inverted"
                />
                <NotesTitle>Tips</NotesTitle>
                <Notes>
                  <li>
                    <small>
                      To help column widths scale between breakpoints, make sure
                      the next breakpoint’s <code>column</code> is divisible by
                      the previous breakpoint’s <code>column</code>.
                    </small>
                  </li>
                  <li>
                    <small>
                      Disabling <code>progressive</code> and{" "}
                      <code>subgrid</code> options and decreasing browser
                      compatibility will reduce file sizes.
                    </small>
                  </li>
                  <li>
                    <small>
                      For <code>support</code>, <code>displayGrid</code> has the
                      smallest file size and browser support.{" "}
                      <code>displayFlex</code> has the largest file size and
                      browser support. <code>cssVariables</code> is in the
                      middle.
                    </small>
                  </li>
                </Notes>
              </React.Fragment>
            ) : null}
            {this.state.tab === "code" ? (
              <React.Fragment>
                <div>
                  <DownloadButton
                    disabled={this.state.navCollapsed}
                    onClick={() => this.saveCSS(state.css, state.config.prefix)}
                  >
                    Download CSS
                  </DownloadButton>
                </div>
                <Code>{state.css}</Code>
              </React.Fragment>
            ) : null}
          </Aside>
        )}
      </GridConsumer>
    );
  }
}
