import React from 'react'
import './ScrollAnimator.css'

class ScrollAnimator extends React.Component
{
    constructor(props) {
        super(props)
        this.state = { visible: false }
    }
    componentDidMount()
    {
        let rect = this.elem.getBoundingClientRect();
        this.top =  rect.top + window.pageYOffset;
        this.bottom = rect.bottom + window.pageYOffset;
        window.addEventListener('scroll', this.onScroll);
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll);
    }
    onScroll = () =>
    {
        let height = window.innerHeight || document.documentElement.clientHeight;
        if(window.scrollY <= this.top && window.scrollY + height >= this.bottom)
        {
            this.setState({visible: true});
        }
        else{
            this.setState({visible: false});
        }
    }
    render()
    {
    let children = this.props.children;
    children = React.Children.map(children, child=>(
        React.cloneElement(child, {
            className: (child.props.className || '') + (this.state.visible ? (' ' + (this.props.animClassName || '')) : ''),
            ref:(e)=>{this.elem = e}}
        )));
    return (
        <div>
            {children}
        </div>
    );
    }
};
export default ScrollAnimator;
