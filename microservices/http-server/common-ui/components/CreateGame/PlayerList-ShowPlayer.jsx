// Display each added players along with its dialog

import React from 'react';

// Material components
import Avatar from 'material-ui/Avatar';
import ListItem from 'material-ui/List/ListItem';
import ContentClear from 'material-ui/svg-icons/content/clear';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import base64 from 'base-64';
// var username = 'abc@xyz.in';

var ShowPlayer = React.createClass({
    delPlayer: function() {
        this.props.delete(this.props.playerIndex);
        this.setState({open: false});
    },
    getInitialState: function() {
        return {
            open: false,
        };
    },

    handleClose: function() {
        if(this.props.user == 'admin')
        {
            this.setState({open: false});
        }
    },

    handleOpen: function() {
        if(this.props.user == 'admin')
        {
            this.setState({open: true});
        }
    },

    render: function() {
        var username = (JSON.parse(base64.decode(localStorage.token.split('.')[1])).sub);
        const actions = [
            <div style={{width: '100%'}}><FlatButton
                label="Delete player"
                secondary={true}
                onTouchTap={this.delPlayer}
                style={{marginBottom: '5px'}}
            /></div>,
            <div style={{width: '100%'}}><FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.handleClose}
                style={{marginBottom: '5px'}}
            /></div>,
        ];
        const inactiveActions = [
            <div style={{width: '100%'}}><RaisedButton
                label="Resend Request"
                primary={true}
                style={{marginBottom: '5px'}}
                onTouchTap={this.markActive1}
            /></div>,
            <div style={{width: '100%'}}><FlatButton
                label="Delete player"
                secondary={true}
                onTouchTap={this.delPlayer}
                style={{marginBottom: '5px'}}
            /></div>,
            <div style={{width: '100%'}}><FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.handleClose}
                style={{marginBottom: '5px'}}
            /></div>
        ];

        var displayName;
        
        if (this.props.players.name === username)
        {
            displayName = 'You';
        }
        else
        {
            var endPos = this.props.players.name.indexOf('@'); 
            displayName = this.props.players.name.substr(0, endPos);
            displayName = displayName.substr(0,1).toUpperCase() + displayName.substr(1).toLowerCase();
        }

        //  Manage modal width according to devices
        if(this.props.device == 'mobile')
        {
            var width = '60%';
        }
        else
        {
            var width = '40%';
        }

        // Return component
        if(this.props.players.status === 'active')
        {
            if(this.props.players.user === 'admin')
            {
                return (
                    <ListItem
                        disabled={true}
                        leftAvatar={<Avatar src="./../img/Lobby/user.png" style={{top: '6px'}} />}
                        primaryText={
                            <span style={{color: 'black',fontWeight: 'bold'}}>
                                {displayName}
                            </span>
                        }
                        secondaryText={this.props.players.status}
                        innerDivStyle={{paddingBottom: '7px', paddingTop: '10px'}}
                    />
                );
            }
            else
            {
                return (
                    <div>
                        <ListItem
                            disabled={false}
                            leftAvatar={<Avatar src="./../img/Lobby/user.png" style={{top: '6px'}} />}
                            primaryText={displayName}
                            secondaryText={this.props.players.status}
                            innerDivStyle={{paddingBottom: '7px', paddingTop: '10px'}}
                            onTouchTap={this.handleOpen}
                        />
                        <Dialog
                            title={<h4 style={{textAlign: 'center'}}>{displayName}</h4>}
                            actions={actions}
                            modal={false}
                            open={this.state.open}
                            onRequestClose={this.handleClose}
                            actionsContainerStyle={{textAlign: 'center'}}
                            bodyStyle={{textAlign: 'center', paddingBottom: '5px'}}
                            contentStyle={{width: '50%'}}
                        >
                            <Avatar size={60} src="./../img/Lobby/user.png" style={{top: '3px'}} />
                            <br/>
                            <span style={{paddingTop: '5px', color: 'grey', fontStyle: 'italic'}}>{this.props.players.status}</span>
                        </Dialog>
                    </div>
                );
            }
        }
        else if(this.props.players.status === 'waiting for player')
        {
            return (
                
                <div>
                    <ListItem
                        disabled={false}
                        leftAvatar={
                            <Avatar src="./../img/Lobby/user.png" style={{top: '6px'}} />
                        }
                        primaryText={
                            <span style={{color: 'lightgrey',fontStyle: 'italic'}}>
                                {displayName}
                            </span>
                        }
                        secondaryText={this.props.players.status}
                        innerDivStyle={{paddingBottom: '7px', paddingTop: '10px'}}
                        onTouchTap={this.handleOpen}
                    />
                    <Dialog
                        title={<h4 style={{textAlign: 'center'}}>{displayName}</h4>}
                        actions={actions}
                        modal={false}
                        open={this.state.open}
                        onRequestClose={this.handleClose}
                        actionsContainerStyle={{textAlign: 'center'}}
                        bodyStyle={{textAlign: 'center', paddingBottom: '5px'}}
                        contentStyle={{width: '50%'}}
                    >
                        <Avatar size={60} src="./../img/Lobby/user.png" style={{top: '3px'}} />
                        <br/>
                        <span style={{paddingTop: '5px', color: 'grey', fontStyle: 'italic'}}>{this.props.players.status}</span>
                    </Dialog>
                </div>
            );
        }
        else
        {
            return (
                <div>
                    <ListItem
                        disabled={false}
                        leftAvatar={
                            <Avatar src="./../img/Lobby/user.png" style={{top: '6px'}} />
                        }
                        primaryText={
                            <span style={{color: 'lightgrey',fontStyle: 'italic'}}>
                                {displayName}
                            </span>
                        }
                        secondaryText={this.props.players.status}
                        innerDivStyle={{paddingBottom: '7px', paddingTop: '10px'}}
                        onTouchTap={this.handleOpen}
                    />
                    <Dialog
                        title={<h4 style={{textAlign: 'center'}}>{displayName}</h4>}
                        actions={inactiveActions}
                        modal={false}
                        open={this.state.open}
                        onRequestClose={this.handleClose}
                        actionsContainerStyle={{textAlign: 'center'}}
                        bodyStyle={{textAlign: 'center', paddingBottom: '5px'}}
                        contentStyle={{width: '50%'}}
                    >
                        <Avatar size={60} src="./../img/Lobby/user.png" style={{top: '3px'}} />
                        <br/>
                        <span style={{paddingTop: '5px', color: 'grey', fontStyle: 'italic'}}>{this.props.players.status}</span>
                    </Dialog>
                </div>
            );
        }
    }
});

export default ShowPlayer;