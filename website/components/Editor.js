import React from "react";
const Blob = require("blob");
import styled from "styled-components";
import saveAs from "file-saver";
import gzip from "gzip-js";
import colors from "../utils/color";
import { IoIosArrowDropleft, IoIosArrowDroprightCircle } from "react-icons/io";
import { GridConsumer } from "./GridProvider";
import EditorEditArea from "./EditorEditArea";
import ViewCode from "./ViewCode";

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
  padding-top: 0.6rem;
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

const CodeButton = styled(DownloadButton)`
  margin-left: 1px;
  padding-top: 1rem;
  position: relative;
  width: 9.3rem;
`;

const EditButton = styled(DownloadButton)`
  padding-top: 1rem;
`;

const getGZipSize = function(css) {
  if (typeof window !== "undefined") {
    const blob = new Blob(gzip.zip(css, { level: 9 }));
    return ` or ${Math.round(blob.size / 1000)}kb gzipped`;
  }
  return "";
};

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
        {({ state }) => (
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
                <EditorEditArea />
                <Buttons>
                  <DownloadButton
                    disabled={this.state.navCollapsed}
                    onClick={() => this.saveCSS(state.css, state.config.prefix)}
                  >
                    <div>
                      Download CSS
                      <br />
                      <small>
                        (
                        {Math.round(
                          (encodeURI(state.css).split(/%..|./).length - 1) /
                            1000
                        )}
                        kb
                        {getGZipSize(state.css)})
                      </small>
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
                <ViewCode />
                <Buttons>
                  <EditButton
                    disabled={this.state.navCollapsed}
                    onClick={() => this.setState({ tab: "editor" })}
                  >
                    <div>Return to edit mode</div>
                  </EditButton>
                </Buttons>
              </React.Fragment>
            ) : null}
          </Aside>
        )}
      </GridConsumer>
    );
  }
}
