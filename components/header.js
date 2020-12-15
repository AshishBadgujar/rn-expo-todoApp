import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Header() {
    return (
        <View style={styles.header}>
            <Text style={styles.title}>My Todos</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#333',
        padding: 10,
        marginBottom: 10,
        elevation: 4,
        height: 60
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#ffce57'
    }
})