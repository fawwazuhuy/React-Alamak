import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'

export default function _layout() {
  return (
    <Tabs>
        <Tabs.Screen 
             name='index' 
             options={{
                 tabBarIcon: ({color}) =>(
                 <Ionicons name='compass' size={28} color={color} />
                 ),
             }} 
        />
        <Tabs.Screen 
            name='category'
            options={{
                tabBarIcon: ({color}) =>(
                <MaterialIcons name='space-dashboard' size={28} color={color} />
                ),
            }} 
        />
    </Tabs>
  )
}