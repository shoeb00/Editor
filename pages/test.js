import React, { Component } from 'react'
import { Editor } from './page'

export default class test extends Component {
    render() {
        return (
            <div>
                <textarea name="text" id="" cols="30" rows="10"></textarea>
                <Editor/>                
            </div>
        )
    }
}
