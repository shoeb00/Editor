import React, { Component, useEffect } from 'react'
import styles from '../styles/page.module.css';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js'
import dynamic from "next/dynamic";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import axios from "axios"

const Editor = dynamic(() => import("react-draft-wysiwyg").then(mod=>(mod.Editor)), { ssr: false });

function test(){
  console.log('---')
}



export default class page extends Component {
    constructor(props) {
        super(props);
        this.state = {
          editorState: EditorState.createEmpty(),
        };
      }
    
      onEditorStateChange = (editorState) => {
        const content = this.state.editorState.getCurrentContent() 
        const contentToSave = convertToRaw(content)
        console.log(contentToSave.blocks[0])
        axios.post('http://localhost:4000/save', contentToSave)
        this.setState({
          editorState,
        });
      };
      
    render() {
        const { editorState } = this.state
        return (
            <>
                <div className={styles.title}>
                    <h1>Text Editor</h1>
                </div>
                <div className={styles.main}>
                    <Editor
                    initialEditorState={editorState}
                    wrapperClassName="demo-wrapper"
                    editorClassName="demo-editor"
                    onEditorStateChange={this.onEditorStateChange
                    }
                    />
                </div>
            </>
        )
    }
}

