import dynamic from "next/dynamic";
import React from "react";
import styled from "styled-components";
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
    border-color: transparent white transparent transparent;
    bottom: 100%;
    position: absolute;
    left: calc(50%);
    transform: rotateZ(270deg);
  }

  :after {
    background: white;
    border-radius: 5px;
    bottom: calc(100% + 0.5rem);
    box-sizing: border-box;
    color: black;
    font-size: 0.75rem;
    left: 1rem;
    padding: 1rem;
    position: absolute;
    width: calc(100% - 0.75rem);
  }
`;

const Container = styled.div`
  display: flex;
  flex: 1;

  > * {
    width: 100%;
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

export default class extends React.Component {
  render() {
    return (
      <GridConsumer>
        {({ state, makeGridCSS }) => (
          <Container>
            <ReactJson
              displayDataTypes={false}
              displayObjectSize={false}
              enableClipboard={false}
              onAdd={edit => makeGridCSS(edit.updated_src)}
              onDelete={edit => makeGridCSS(edit.updated_src)}
              onEdit={edit => makeGridCSS(edit.updated_src)}
              src={state.config}
              style={{
                overflowY: "auto",
                padding: "1rem"
              }}
              theme={{
                base00: "#000",
                base01: "#363442",
                base02: "#5a566c",
                base03: "#726e87",
                base04: "#837bad",
                base05: "#9b87fd",
                base06: "#b3a5fe",
                base07: "#eeebff",
                base08: "#7765d2",
                base09: "#8e81cf",
                base0A: "#e59e57",
                base0B: "#7c756e",
                base0C: "#fec286",
                base0D: "#ecab69",
                base0E: "#a49bcf",
                base0F: "#dc9147"
              }}
            />
          </Container>
        )}
      </GridConsumer>
    );
  }
}
