import React from "react";
import styled from "styled-components";
import saveAs from "file-saver";
import Header from "../components/Header";
import Markdown from "../components/Markdown";
import PageContent from "../components/PageContent";
import readme from "../../README.md";

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
      <React.Fragment>
        <Header />
        <PageContent>
          <Markdown prefix={this.props.config.prefix}>
            {`## ${readme
              .split("##")
              .splice(1)
              .join("##")}`}
          </Markdown>
        </PageContent>
      </React.Fragment>
    );
  }
}
