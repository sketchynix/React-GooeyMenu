/** @jsx React.DOM */

'use strict';

var React = require('react'),
    Menu,
    MenuItem;

MenuItem = React.createClass({
    propTypes: {
        angle: React.PropTypes.number,
        icon: React.PropTypes.string
    },
    openBubble(index) {
        var delay = index * 0.08;
        var $bounce= this.refs.bounce.getDOMNode();
        var $button = this.refs.button.getDOMNode();

        window.TweenMax.fromTo($bounce, 0.2, {
            transformOrigin:"50% 50%"
        },{
            delay :delay,
            scaleX: 0.8,
            scaleY: 1.2,
            force3D: true,
            ease: Quad.easeInOut,
            onComplete:function(){
                TweenMax.to( $bounce,0.15,{
                    // scaleX:1.2,
                    scaleY:0.7,
                    force3D:true,
                    ease:Quad.easeInOut,
                    onComplete:function(){
                        TweenMax.to($bounce,3,{
                            // scaleX:1,
                            scaleY:0.8,
                            force3D:true,
                            ease:Elastic.easeOut,
                            easeParams:[1.1,0.12]
                        })
                    }
                })
            }
        });

        TweenMax.to($button, 0.5,{
            delay:delay,
            y: 90,
            force3D:true,
            ease:Quint.easeInOut
        });
    },
    closeBubble(index){
        var delay = index * 0.08;
        var $bounce= this.refs.bounce.getDOMNode();
        var $button = this.refs.button.getDOMNode();

        TweenMax.fromTo($bounce,0.2,{
            transformOrigin:"50% 50%"
        },{
            delay: delay,
            scaleX:1,
            scaleY:0.8,
            force3D:true,
            ease:Quad.easeInOut,
            onComplete:function(){
                TweenMax.to($bounce, 0.15, {
                    // scaleX:1.2,
                    scaleY:1.2,
                    force3D:true,
                    ease:Quad.easeInOut,
                    onComplete:function(){
                        TweenMax.to($bounce, 3, {
                            // scaleX:1,
                            scaleY:1,
                            force3D:true,
                            ease:Elastic.easeOut,
                            easeParams:[1.1,0.12]
                        })
                    }
                })
            }
        });


        TweenMax.to($button, 0.3, {
            delay: delay,
            y: 0,
            force3D:true,
            ease:Quint.easeIn
        });
    },
    render() {
        var itemIconClass = 'menu-item-icon icon icon-' + this.props.icon;

        var itemStyle = {
            transform: 'rotate('+ this.props.angle +'deg)'
        };

        //ransform:"rotate("+(angle)+"deg)"
        return (
            /*jshint ignore:start */
            <li className="menu-item" style={itemStyle} ref="menuItem">
                <button className="menu-item-button"  onMouseDown={this.toggleIcon} ref="button">
                    <i className={itemIconClass}></i>
                </button>
                <div className="menu-item-bounce" ref="bounce"></div>
            </li>
            /*jshint ignore:end */
        );
    }
});

Menu = React.createClass({
    getInitialState() {
        return {
            on: false,

            menuItems: [
                {
                    id: 1,
                    icon: 'reply'
                },
                {
                    id: 2,
                    icon: 'trash'
                }
            ]
        };
    },
    componentDidMount(){
        //set the tween max
        if(window.TweenMax){
            window.TweenMax.globalTimeScale(0.8);
        }
    },
    tweenIconUp(){
        var el = this.refs.toggleIcon.getDOMNode();
        TweenMax.to(el, 0.1, { scale:1 });
    },
    toggleIcon() {
        var el = this.refs.toggleIcon.getDOMNode();

        this.setState({ on: !this.state.on });

        // TweenMax.to(el, 0.1, { scale:0.65 });
        TweenMax.to(el, 0.4,{
            rotation: this.state.on ? 45 : 0,
            ease:Quint.easeInOut,
            force3D:true
        });

        this.toggleMenu();
    },
    toggleMenu(){
        var i = 0;

        for(var prop in this.refs){
            var ref = this.refs[prop];
            if(ref.openBubble){
                this.state.on ? ref.openBubble(i) : ref.closeBubble(i);
                i++;
            }
        }
    },
    render() {
        /*jshint ignore:start */
        var angle = 180/this.state.menuItems.length;

        var menuItems = this.state.menuItems.map(function(item, i){
            var itemAngle = angle/(i+1);
            return <MenuItem key={item.id} data-icon={item.icon} angle={itemAngle} ref={'menuItem-' + i} />
        });

        return (
            <div className="menu">
                <div className="menu-wrapper">
                    <ul className="menu-items">
                        {menuItems}
                    </ul>
                    <button className="menu-toggle-button" onMouseDown={this.toggleIcon} onMouseUp={this.tweenIconUp}>
                        <i className="fa fa-plus menu-toggle-icon" ref="toggleIcon"></i>
                    </button>
                </div>
            </div>
        );
        /*jshint ignore:end */
    }
});

React.render(
    /*jshint ignore:start */
    <Menu />,
    /*jshint ignore:end */
    document.getElementById('app')
);
