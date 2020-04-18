import React from 'react';

export class SidebarHeader extends React.Component {
    
   render() {

        const header = {
            position: 'relative',
            borderBottom: '1px solid #fff'
        }

        const initials = {
            position: 'absolute', 
            top: '25%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)', 
            fontSize: '32px'
        };

       return(
        <div style={header}>
            <img src="profile-image.jpg" className="rounded-circle mx-auto d-block mt-4" width="90px" height="90px" alt=""/>
            <div style={initials}>{this.props.initials.toUpperCase()}</div>
            <p className="text-center font-weight-bold mt-3 pb-3">{this.props.name}<br/>
            <span className="font-weight-light" style={{fontSize: '13px'}}>{this.props.email}</span></p>
        </div>
       );
   }
}

export class NavItem extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            itemType: 'nav-item'
        };
    }

    static getDerivedStateFromProps(props, state) {
        return {
            itemType: props.itemType || state.itemType
        };
    }

    render() {
        return(
			<li className={this.state.itemType} onClick={this.props.onClick}>
                <i className={this.props.icon + ' ml-3'}></i>
                <span className='ml-4'>{this.props.name}</span>
            </li>
        );
    }
}

export class NavDropdown extends React.Component {
    render() {
        return(
            <li>
				<span href={'#'+this.props.id} data-toggle="collapse" aria-expanded="false" className="dropdown-toggle nav-item">
                    <i className={this.props.icon + ' ml-3'}></i>
                    <span className='ml-3'>{this.props.name}</span>
                </span>
                <ul className="collapse list-unstyled" id={this.props.id}>
                    {
                        this.props.items.map((item) =>
                            <NavItem
                                itemType='drop-item' 
                                icon={item.icon}
                                name={item.name}
                                onClick={item.onClick}
                                key={item.name}
                            />
                        )
                    }
	            </ul>
            </li>
        );
    }
}