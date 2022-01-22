import React from 'react';
import { Button} from '@material-ui/core';

export default function ActionButton(props) {
    const { children, onClick} = props;
    return (
        <Button 
        onClick={onClick}>
            {children}
        </Button>
    )
}