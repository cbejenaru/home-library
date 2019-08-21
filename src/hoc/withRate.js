import React from "react";

import ComentsContext from "../ComentContext";

const withRate = Component => {
  class ComentsComponent extends React.Component {
    render() {
      return (
        <ComentsContext.Consumer>
          {context => {
            return (
              <Component
                coments={context.coments}
                setComents={context.setComents}
                {...this.props}
              />
            );
          }}
        </ComentsContext.Consumer>
      );
    }
  }

  return ComentsComponent;
};

export default withRate;
