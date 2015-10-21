import React, { Component } from 'react';

const getDisplayName = (item) => (
  item.displayName || item.name || 'Component'
);

const defaultGetDelayFn = (props) => props.delay || 0;
const defaultPlaceholderFn = () => null;

export default (
  getDelayFn = defaultGetDelayFn,
  placeholderFn = defaultPlaceholderFn
) => (DecoratedComponent) => {
  return class extends Component {
    static displayName = `Delayed(${getDisplayName(DecoratedComponent)})`;

    state = {
      ready: false,
    };

    componentDidMount() {
      this.timeout = setTimeout(() => this.setState({
        ready: true,
      }), getDelayFn(this.props));
    }

    componentWillUnount() {
      clearTimeout(this.timeout);
    }

    render() {
      return this.state.ready ? (
        <DecoratedComponent {...this.props} />
      ) : placeholderFn(this.props);
    }
  };
};
