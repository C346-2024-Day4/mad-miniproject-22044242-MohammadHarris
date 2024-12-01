import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

const CustomButton = ({onClick, color}) => {
    return (
        <TouchableOpacity>
            <Text>Create Account</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        
    }
})
export default CustomButton;
