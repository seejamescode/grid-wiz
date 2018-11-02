import dynamic from "next/dynamic";
import React from "react";
import styled from "styled-components";
import saveAs from "file-saver";
import colors from "../utils/color";
import { IoIosArrowDropleft, IoIosArrowDroprightCircle } from "react-icons/io";
import { GridConsumer } from "./GridProvider";
const ReactJson = dynamic(() => import("react-json-view"), {
  ssr: false
});

const tooltipStyles = `
  position: relative;

  :before {
    content: "";
    border-style: solid;
    border-width: 8px 16px 8px 0;
    border-color: transparent black transparent transparent;
    bottom: 100%;
    position: absolute;
    left: calc(50%);
    transform: rotateZ(270deg);
  }

  :after {
    background: black;
    border-radius: 5px;
    bottom: calc(100% + 0.5rem);
    box-sizing: border-box;
    color: white;
    font-size: 0.75rem;
    left: 1rem;
    padding: 1rem;
    position: absolute;
    width: calc(100% - 0.75rem);
  }
`;

const Aside = styled.aside`
  background: ${colors.background2};
  box-sizing: border-box;
  height: 100%;
  display: flex;
  flex-direction: column;
  left: calc(100% - 320px);
  margin-right: 0px;
  overflow-x: hidden;
  overflow-y: auto;
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
    margin-left: ${props => (props.navCollapsed ? "3.5rem" : null)};
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

  .react-json-view
    > .object-container
    > .object-content
    > .object-key-val
    > .object-container
    > .object-content
    > .object-key-val
    > .object-container
    > .object-content
    > .object-key-val
    > .object-container
    > .object-content
    > .variable-row:nth-child(3):focus-within {
    ${tooltipStyles} :after {
      content: "Tip: Make sure column counts of different breakpoints are divisible by each other for smooth scaling.";
    }
  }

  .react-json-view
    > .object-container
    > .object-content
    > .object-key-val
    > .object-container
    > .object-content
    > .variable-row:nth-child(2):focus-within {
    ${tooltipStyles} :before {
      bottom: initial;
      top: 100%;
      transform: rotateZ(90deg);
    }

    :after {
      bottom: initial;
      content: "Tip: Review all support modes on the documentation page under 'Browser Compatibility'.";
      top: calc(100% + 0.5rem);
      z-index: 1;
    }
  }

  .react-json-view
    > .object-container
    > .object-content
    > .object-key-val
    > .object-container
    > .object-content
    > .variable-row:nth-child(4):focus-within,
  .react-json-view
    > .object-container
    > .object-content
    > .object-key-val
    > .object-container
    > .object-content
    > .variable-row:nth-child(5):focus-within {
    ${tooltipStyles} :after {
      content: "Tip: Disabling progressive and subgrid options will reduce the CSS file size.";
    }
  }
`;

const AsideNav = styled.nav`
  padding: 1rem;
`;

const AsideNavFlex = styled.div`
  align-items: center;
  display: flex;
  height: 2rem;
`;

const Buttons = styled.div`
  display: flex;
  flex-shrink: 0;
  margin-top: 1px;
`;

const Code = styled.code`
  background: white;
  color: black;
  overflow: auto;
  padding: 1rem;
`;

const CollapseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin-right: 1.45rem;
  padding: 0;
  position: relative;

  :after {
    color: ${colors.link};
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
    fill: ${colors.link};
    height: 1.4rem;
    width: 1.4rem;
  }

  :hover {
    :after {
      color: ${colors.linkHover};
    }

    svg {
      fill: ${colors.linkHover};
    }
  }

  :focus {
    :after {
      color: ${colors.linkFocus};
    }

    svg {
      fill: ${colors.linkFocus};
    }
    outline: none;
  }
`;

const DownloadButton = styled.button`
  background: ${colors.link};
  border: none;
  cursor: pointer;
  font-size: 0.875rem;
  height: 3.25rem;
  padding: 1rem;
  width: 100%;

  :hover {
    background: ${colors.linkHover};
  }

  :focus {
    background: ${colors.linkFocus};
    outline: none;
  }

  :active {
    background: ${colors.linkActive};
  }
`;

const CodeButton = DownloadButton.extend`
  margin-left: 1px;
  position: relative;
  width: 9.3rem;
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
                <h2>Grid Editor</h2>
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
                <Buttons>
                  <DownloadButton
                    disabled={this.state.navCollapsed}
                    onClick={() => this.saveCSS(state.css, state.config.prefix)}
                  >
                    <div>
                      Download CSS (
                      {Math.round(
                        (encodeURI(state.css).split(/%..|./).length - 1) / 1000
                      )}
                      kb)
                    </div>
                  </DownloadButton>
                  <CodeButton
                    disabled={this.state.navCollapsed}
                    onClick={() => this.setState({ tab: "code" })}
                  >
                    <div>View code</div>
                  </CodeButton>
                </Buttons>
              </React.Fragment>
            ) : null}
            {this.state.tab === "code" ? (
              <React.Fragment>
                <Code>{state.css}</Code>
                <Buttons>
                  <DownloadButton
                    disabled={this.state.navCollapsed}
                    onClick={() => this.setState({ tab: "editor" })}
                  >
                    <div>Return to edit mode</div>
                  </DownloadButton>
                </Buttons>
              </React.Fragment>
            ) : null}
          </Aside>
        )}
      </GridConsumer>
    );
  }
}
