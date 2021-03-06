import React from "react";
import LazyLoad from "react-lazyload";
import PropTypes from "prop-types";
import { Transition } from "react-transition-group";

const duration = 500;

const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0,
    display: "inline-block"
};

const transitionStyles = {
    entering: { opacity: 0 },
    entered: { opacity: 1 }
};

class FadeIn extends React.Component {
    state = {
        loaded: false
    };
    onLoad = () => this.setState({ loaded: true });

    render() {
        const { height, children, render, offset, ...restProps } = this.props,
            { loaded } = this.state;

        return (
            <LazyLoad
                height={height}
                offset={typeof offset === "undefined" ? 150 : offset}
                {...restProps}
            >
                <Transition in={loaded} timeout={duration}>
                    {state => (
                        <div
                            style={{
                                ...defaultStyle,
                                ...transitionStyles[state]
                            }}
                        >
                            {children && children(this.onLoad)}
                            {render && render(this.onLoad)}
                        </div>
                    )}
                </Transition>
            </LazyLoad>
        );
    }
}
FadeIn.propTypes = {
    height: PropTypes.number,
    children: PropTypes.func,
    render: PropTypes.func
};

export { FadeIn };
export default FadeIn;
