import React, { Component } from "react";
import config from "../utils/grid";
import gridWiz from "../../dist/grid-wiz.umd";

// first we will make a new context
const GridContext = React.createContext();

// Then create a provider Component
class GridProvider extends Component {
  state = {
    css: gridWiz(config),
    config
  };

  render() {
    return (
      <GridContext.Provider
        value={{
          state: this.state,
          makeGridCSS: config => {
            const breakpoints = config.breakpoints
              ? config.breakpoints.map(bp => {
                  if (bp === null) {
                    return {
                      ...this.state.config.breakpoints.slice(-1)[0],
                      name: `new${config.breakpoints.length}`
                    };
                  } else {
                    const prevConfigBP = this.state.config.breakpoints.find(
                      prevBP => bp.name === prevBP.name
                    );

                    return {
                      name: bp.name ? bp.name.toString() : prevConfigBP.name,
                      size: bp.size ? parseFloat(bp.size) : prevConfigBP.size,
                      columns: bp.columns
                        ? parseInt(bp.columns)
                        : prevConfigBP.columns,
                      gutter: bp.gutter
                        ? parseFloat(bp.gutter)
                        : prevConfigBP.gutter,
                      margin: bp.margin
                        ? parseFloat(bp.margin)
                        : prevConfigBP.margin
                    };
                  }
                })
              : [];
            const maxWidth = config.maxWidth
              ? parseFloat(config.maxWidth)
              : undefined;
            const prefix = config.prefix ? config.prefix.toString() : "";
            const progressive =
              config.progressive && config.progressive.toString() === "true"
                ? true
                : false;
            console.log(config.subgrid);
            const subgrid =
              config.subgrid && config.subgrid.toString() === "true"
                ? true
                : false;
            const support = config.support
              ? config.support.toString()
              : "displayGrid";

            const configValidated = {
              prefix,
              support,
              maxWidth,
              progressive,
              subgrid,
              breakpoints
            };

            this.setState({
              config: configValidated,
              css: gridWiz(configValidated)
            });
          }
        }}
      >
        {this.props.children}
      </GridContext.Provider>
    );
  }
}

// then make a consumer which will surface it
const GridConsumer = GridContext.Consumer;

export default GridProvider;
export { GridConsumer };
